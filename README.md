# React Native Payments Integration with Stripe

This is a sample React Native application demonstrating payment integration using Stripe, featuring support for card payments, Google Pay, and Apple Pay. 

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Setup](#backend-setup)
- [Testing](#testing)
- [License](#license)

## Features

- Card payment integration with Stripe using the Stripe React Native SDK.
- Support for Google Pay and Apple Pay.
- Simple and intuitive user interface.

## Requirements

- React Native 0.60 or later
- Node.js 12 or later
- Stripe account for API keys

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/riffat-adnan/react-native-payments.git
   cd react-native-payments
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install the Stripe React Native SDK:**

   ```bash
   npm install @stripe/stripe-react-native
   ```

4. **Link the library (if using React Native CLI):**

   ```bash
   npx pod-install ios
   ```

5. **Setup environment variables:**
   
   Create a `.env` file and add your Stripe secret key:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

## Usage

1. Start the Metro bundler:

   ```bash
   npm start
   ```

2. Run the application on your desired platform:

   For iOS:
   ```bash
   npm run ios
   ```

   For Android:
   ```bash
   npm run android
   ```

3. **Payment Screen:** 

   The main payment screen includes options for:
   - Card payments
   - Google Pay
   - Apple Pay

   Fill in the card details or click the respective buttons to make payments.

## Backend Setup

You need to set up a backend server to create payment intents. Here's a simple example using Express.js:

1. **Create a new directory for your backend:**

   ```bash
   mkdir backend
   cd backend
   npm init -y
   npm install express stripe body-parser
   ```

2. **Create `server.js` in the backend directory:**

   ```javascript
   const express = require('express');
   const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY'); // Replace with your Stripe secret key
   const bodyParser = require('body-parser');

   const app = express();
   app.use(bodyParser.json());

   app.post('/create-payment-intent', async (req, res) => {
     const { amount } = req.body; // Get amount from request body
     try {
       const paymentIntent = await stripe.paymentIntents.create({
         amount,
         currency: 'usd', // Change currency if needed
         payment_method_types: ['card', 'google_pay', 'apple_pay'], // Specify payment methods
       });
       res.json({ clientSecret: paymentIntent.client_secret });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

3. **Start your backend server:**

   ```bash
   node server.js
   ```

4. Ensure your React Native app points to the correct backend URL in `fetchPaymentIntent` function.

## Testing

- Use test card numbers provided by Stripe to test card payments. 
- For Google Pay and Apple Pay, testing is only supported on physical devices.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.