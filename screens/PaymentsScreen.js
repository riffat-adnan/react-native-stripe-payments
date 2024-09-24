// src/components/PaymentScreen.js
import React, {useState} from 'react';
import {Button, View, Text, StyleSheet, Alert} from 'react-native';
import {
  useStripe,
  CardField,
  useConfirmPayment,
  PaymentSheet,
} from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const {confirmPayment, initPaymentSheet} = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] =
    useState('');

  // Function to handle card payment
  const handleCardPayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Please fill in the card details');
      return;
    }

    const {error, paymentIntent} = await confirmPayment(
      paymentIntentClientSecret,
      {
        type: 'Card',
        billingDetails: {
          // Add billing details here if needed
        },
      },
    );

    if (error) {
      Alert.alert(`Payment failed: ${error.message}`);
    } else if (paymentIntent) {
      Alert.alert('Payment succeeded!');
      // Handle successful payment here (e.g., navigate to another screen)
    }
  };

  // Function to initialize and display the payment sheet
  const handlePaymentSheet = async () => {
    const {error} = await initPaymentSheet({
      paymentIntentClientSecret,
    });
    if (error) {
      Alert.alert(`Failed to initialize payment sheet: ${error.message}`);
      return;
    }

    const {error: paymentError} = await confirmPayment(
      paymentIntentClientSecret,
    );
    if (paymentError) {
      Alert.alert(`Payment failed: ${paymentError.message}`);
    } else {
      Alert.alert('Payment succeeded!');
      // Handle successful payment here
    }
  };

  const fetchPaymentIntent = async () => {
    const response = await fetch('YOUR_BACKEND_URL/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount: 1000}), // Example amount in cents
    });

    const {clientSecret} = await response.json();
    setPaymentIntentClientSecret(clientSecret);
  };

  React.useEffect(() => {
    fetchPaymentIntent();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Options</Text>

      {/* Card Payment */}
      <Text style={styles.subtitle}>Card Payment</Text>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button title="Pay with Card" onPress={handleCardPayment} />

      {/* Google Pay Button */}
      <Text style={styles.subtitle}>Google Pay</Text>
      <Button title="Pay with Google Pay" onPress={handlePaymentSheet} />

      {/* Apple Pay Button */}
      <Text style={styles.subtitle}>Apple Pay</Text>
      <Button title="Pay with Apple Pay" onPress={handlePaymentSheet} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default PaymentScreen;
