// App.js
import React from 'react';
import {SafeAreaView} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './src/components/PaymentScreen';

const App = () => {
  return (
    <StripeProvider
      publishableKey="YOUR_PUBLISHABLE_KEY" // Replace with your Stripe publishable key
      merchantIdentifier="merchant.com.yourapp" // Required for Apple Pay
      // You may also configure other parameters like `urlScheme` for deep linking
    >
      <SafeAreaView style={{flex: 1}}>
        <PaymentScreen />
      </SafeAreaView>
    </StripeProvider>
  );
};

export default App;
