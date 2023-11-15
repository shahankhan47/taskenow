require('dotenv').config();
// Import the Technicain model
const Technician = require('../modals/Technician');
const Booking = require("../modals/Job");
const Payment = require("../modals/Payments")

// We need this stripe key here 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const addBankAccount = async (req, res) => {

    const technicianId = req.params.technicianId;
    const technician = await Technician.findById(technicianId);
    console.log(technician)

  // These are the Primary details needed
    const first_name = technician.firstName;
    const last_name  = technician.lastName;
    const email      = technician.email;
    const phone      = technician.phoneNumber;
    const addressLine1 = technician.addressLine1;
    const city = technician.city;
    const state = technician.state;
    const postal_code = technician.zip

  // Pass this four fields from the frontend
    try {
      const {
        accountNumber,
        routingNumber,
        ssnLast4,        
        dob,
      } = req.body;
  
      // Create a Stripe connected account
      const industry = "7372"
      const businessWebsite = "TaskeNow.com"
      const termsOfServiceAcceptance = {
        date :  Math.floor(Date.now() / 1000),
        ip : req.ip
      }
      const account = await stripe.accounts.create({
        type: 'custom',
        country: 'US',
        business_type: 'individual',
        individual: {
          first_name: first_name,
          last_name:  last_name,
          email: email,
          phone: phone,
          address: {
            line1: addressLine1,
            city: city,
            state: state,
            postal_code: postal_code,
          },
          dob: {
            day: dob.day,
            month: dob.month,
            year: dob.year,
          },
          ssn_last_4: ssnLast4,
        },
        business_profile: {
          url: businessWebsite,
          mcc: industry,
        },
        tos_acceptance: {
          date: termsOfServiceAcceptance.date,
          ip: termsOfServiceAcceptance.ip,
        },
        external_account: {
          object: 'bank_account',
          account_number: accountNumber,
          routing_number: routingNumber,
          country: 'US',
          currency: 'usd',
        },
        requested_capabilities: ['card_payments', 'transfers'],
      });
  
      console.log('Stripe connected account created:', account);
  

// This should be maintained in the Technician User Schema
      technician.stripePaymentDetails = {
        id: account.id,
        object: account.object,
        business_type: account.business_type,
        charges_enabled: account.charges_enabled,
        country: account.country,
        created: account.created,
        default_currency: account.default_currency,
        email: account.email,
        external_accounts: {
          data: account.external_accounts.data.map((externalAccount) => ({
            id: externalAccount.id,
            object: externalAccount.object,
            account_holder_name: externalAccount.account_holder_name,
            account_holder_type: externalAccount.account_holder_type,
            account_type: externalAccount.account_type,
            bank_name: externalAccount.bank_name,
            country: externalAccount.country,
            currency: externalAccount.currency,
            default_for_currency: externalAccount.default_for_currency,
            fingerprint: externalAccount.fingerprint,
            last4: externalAccount.last4,
            routing_number: externalAccount.routing_number,
            status: externalAccount.status,
          })),
        },
        individual: {
          id: account.individual.id,
          object: account.individual.object,
          account: account.individual.account,
          address: {
            city: account.individual.address.city,
            country: account.individual.address.country,
            line1: account.individual.address.line1,
            line2: account.individual.address.line2,
            postal_code: account.individual.address.postal_code,
            state: account.individual.address.state,
          },
          created: account.individual.created,
          dob: {
            day: dob.day,
            month: dob.month,
            year: dob.year,
          },
          first_name: account.individual.first_name,
          last_name: account.individual.last_name,
          relationship: {
            percent_ownership: account.individual.relationship.percent_ownership,
            title: account.individual.relationship.title,
          },
        },
        payouts_enabled: account.payouts_enabled,
      };
  
      await technician.save();
     
  
      // Return the connected account ID
      res.status(200).json({ account });
    } catch (error) {
      console.error('Error creating Stripe connected account:', error);
      res.status(500).json({ error: 'Failed to create Stripe connected account' });
    }
}

const updateBankAccount = async (req, res) => {
  const technicianId = req.params.technicianId;
  const technician = await Technician.findById(technicianId);

  try {
    const {
      accountNumber,
      routingNumber,
      ssnLast4,
      dob,
    } = req.body;

    // Create a Stripe connected account
    const industry = "7372";
    const businessWebsite = "TaskeNow.com";
    const termsOfServiceAcceptance = {
      date: Math.floor(Date.now() / 1000),
      ip: req.ip,
    };
    const account = await stripe.accounts.create({
        type: 'custom',
        country: 'US',
        business_type: 'individual',
        individual: {
          first_name: first_name,
          last_name:  last_name,
          email: email,
          phone: phone,
          address: {
            line1: addressLine1,
            city: city,
            state: state,
            postal_code: postal_code,
          },
          dob: {
            day: dob.day,
            month: dob.month,
            year: dob.year,
          },
          ssn_last_4: ssnLast4,
        },
        business_profile: {
          url: businessWebsite,
          mcc: industry,
        },
        tos_acceptance: {
          date: termsOfServiceAcceptance.date,
          ip: termsOfServiceAcceptance.ip,
        },
        external_account: {
          object: 'bank_account',
          account_number: accountNumber,
          routing_number: routingNumber,
          country: 'US',
          currency: 'usd',
        },
        requested_capabilities: ['card_payments', 'transfers'],
      });
  

    console.log('Stripe connected account updated:', account);

    // Save the updated Stripe connected account details to the installer document
    technician.stripePaymentDetails = {
      id: account.id,
      object: account.object,
      business_type: account.business_type,
      charges_enabled: account.charges_enabled,
      country: account.country,
      created: account.created,
      default_currency: account.default_currency,
      email: account.email,
      external_accounts: {
        data: account.external_accounts.data.map((externalAccount) => ({
          id: externalAccount.id,
          object: externalAccount.object,
          account_holder_name: externalAccount.account_holder_name,
          account_holder_type: externalAccount.account_holder_type,
          account_type: externalAccount.account_type,
          bank_name: externalAccount.bank_name,
          country: externalAccount.country,
          currency: externalAccount.currency,
          default_for_currency: externalAccount.default_for_currency,
          fingerprint: externalAccount.fingerprint,
          last4: externalAccount.last4,
          routing_number: externalAccount.routing_number,
          status: externalAccount.status,
        })),
      },
      individual: {
        id: account.individual.id,
        object: account.individual.object,
        account: account.individual.account,
        address: {
          city: account.individual.address.city,
          country: account.individual.address.country,
          line1: account.individual.address.line1,
          line2: account.individual.address.line2,
          postal_code: account.individual.address.postal_code,
          state: account.individual.address.state,
        },
        created: account.individual.created,
        dob: {
          day: dob.day,
          month: dob.month,
          year: dob.year,
        },
        first_name: account.individual.first_name,
        last_name: account.individual.last_name,
        relationship: {
          percent_ownership: account.individual.relationship.percent_ownership,
          title: account.individual.relationship.title,
        },
      },
      payouts_enabled: account.payouts_enabled,
    };

    await technician.save();

    // Return the connected account ID
    res.status(200).json({ account });
  } catch (error) {
    console.error('Error updating Stripe connected account:', error);
    res.status(500).json({ error: 'Failed to update Stripe connected account' });
  }
};

const deleteBankAccount = async (req, res) => {
    const technicianId = req.params.technicianId;
    const technician = await Technician.findById(technicianId);
  
    try {
      // Delete the existing Stripe connected account
      if (technician.stripePaymentDetails.id) {
        await stripe.accounts.del(technician.stripePaymentDetails.id);
      }
  
      // Remove the Stripe connected account details from the installer document
      technician.stripePaymentDetails = undefined;
  
      await technician.save();
  
      res.status(200).json({ message: 'Stripe connected account deleted successfully' });
    } catch (error) {
      console.error('Error deleting Stripe connected account:', error);
      res.status(500).json({ error: 'Failed to delete Stripe connected account' });
    }
  };

// Import the code for finding the unique sequence Id , from the unique Id generator for the payments
const { findMostRecentPayment } = require("") // enter the path here
  
// Create payment function
const createPayment = async (data) => {
    const {installer_id , isIncoming, payment_type, payment_id, date, amount, Job_Id, Job_Unique_id, user_id,client_secret } = data;
    const current_sequence_number = await findMostRecentPayment() + 1;
    let paymentFields = {
        client_secret,
        technician_id,
        user_id,
        payment_type,
        payment_id,
        date,
        amount,
        sequence_number: current_sequence_number,
        Job_Id,
        Job_Unique_id,
        seen:false, // Not Required Here , optional
        isIncoming
    };


    // Generate the sequence number here

    try {
        const payment = new Payment(paymentFields);
        console.log(payment);
        await payment.save();

        return "Success"
    } catch (err) {
        return "Failure"
    }
};

const hold_payment_on_card = async (req, res) => {
    try {
        // Get the card details and hold amount from the request body
        const { cardNumber, holderName, expirationDate, cvv, amount,booking_id , userId} = req.body;
        const payment_intent_type = req.params.payment_initiated_type;
        const technician_id = req.params.technicianId

        // Create a Payment Intent to hold the amount on the card
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe requires the amount in cents
            currency: 'usd', // Change to your desired currency

        // This Section needs to be updated with the Actual Card once we are in the Production Env
            payment_method_data: {
                type: 'card',
                card: {
                    token: 'tok_visa', // Use the test token for the card
                },
            },
            confirm: true,
            capture_method: 'manual', // Hold the funds but don't capture immediately
        });

        // Get the Payment Intent ID and save it in your database for future reference
        const paymentIntentId = paymentIntent.id;
        const booking = await Booking.findById(booking_id);
        const date_today =  new Date();
        await createPayment({payment_type:"booking",payment_id:paymentIntentId,amount,Job_Id:booking_id,date:date_today,user_id:userId,client_secret:paymentIntent.client_secret})
        booking.customer_payment_status = "Paid";
        await booking.save();

        // Return the Payment Intent ID to the client
        res.json({ message:"Paymnent succeddfully captured" });
    } catch (error) {
        console.error('Error creating hold:', error);
        res.status(500).json({ message: 'Error creating hold' });
    }
};

const refund_hold_with_charge = async (req,res)=>{
    try {
    const {payment_id,amount_to_be_charged} = req.body;
    const payment_intent = await Payment.findById(payment_id);
    const payment_intent_id = payment_intent.payment_id;
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
    // console.log(paymentIntent)

    const amount_to_be_refunded = paymentIntent.amount - amount_to_be_charged;
    await stripe.paymentIntents.capture(paymentIntent.id,{amount_to_capture:amount_to_be_charged}
    );



    payment_intent.amount=amount_to_be_refunded;
    payment_intent.date = new Date();
    await payment_intent.save();

    res.status(200).json("Success");
    } catch (error) {
    res.status(500).json(error)
    }
}
  
// function to update the exsisting amount to increase the amount 
const update_price_token = async (req, res) => {
try {
    const { existing_payment_id, new_amount } = req.body;// the card details are also required

    // Retrieve the existing payment intent
    const existingPaymentIntent = await Payment.findById(existing_payment_id);
    const existingPaymentIntentId = existingPaymentIntent.payment_id;

    // Retrieve the existing payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(existingPaymentIntentId);

    // Calculate the total amount by combining the existing and new amounts
    const totalAmount = paymentIntent.amount + new_amount;

    // Cancels the old payment intent 
    await stripe.paymentIntents.cancel(existingPaymentIntentId);

    // Create a new PaymentIntent with the combined amount
    const updatedPaymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: 'usd', // Change to your desired currency
        payment_method_data: {
            type: 'card',
            card: {
                token: 'tok_visa', // Use the test token for the card
            },
        },
        confirm: true,
        capture_method: 'manual', // Hold the funds but don't capture immediately
    });

    // Update the local payment intent with the new amount and date
    existingPaymentIntent.payment_id = updatedPaymentIntent.id;
    existingPaymentIntent.client_secret = updatedPaymentIntent.client_secret;
    existingPaymentIntent.amount = totalAmount;
    existingPaymentIntent.date = new Date();
    await existingPaymentIntent.save();

    res.status(200).json({ message: 'Payment intent updated successfully' });
} catch (error) {
    res.status(500).json(error);
}
};


const charge_Hold_amount_from_card = async (req, res) => {
    try {

        // Get the last transaction ID from the appropriate subscription field based on the payment_intent_type
        let lastTransactionId;

       // adding the customer here to reterieve the payment data done by him/her
       // The booking model is going to store the data for the payment Intent + The Customer will be storing the payment intents for the backup plans

      const booking = await Booking.findById(req.params.id);
      if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
            }
            console.log(booking._id)
            // This last transaction Id generated when the User/Super_admin is creating the job ticket
            lastTransactionId = booking.payment_status.payment_id;
        

        if (!lastTransactionId) {
            return res.status(400).json({ message: 'Transaction ID not found' });
        }

        // Use the Stripe API to capture the held amount on the card
        const paymentIntent = await stripe.paymentIntents.capture(lastTransactionId);

        // Check the paymentIntent status to see if the capture was successful
        if (paymentIntent.status === 'succeeded') {
            const booking = await Booking.findById(req.params.id);
            booking.payment_status.amount_captured_from_customer_card = true;
            return res.json({ message: 'Payment successfully captured' });
        } else {
            // Handle any errors or specific scenarios based on the paymentIntent status
            return res.status(500).json({ message: 'Payment capture failed' });
        }
    } catch (error) {
        console.error('Error capturing payment:', error);
        return res.status(500).json({ message: 'Error capturing payment' });
    }
};

async function initiatePayment(amount, technicainDetails) {
    try {
      // Create a card token
      const cardToken = await stripe.tokens.create({
        card: {
          number: '4242424242424242', // Replace with a valid card number
          exp_month: 12, // Replace with a valid expiration month
          exp_year: 2024, // Replace with a valid expiration year
          cvc: '123', // Replace with a valid CVC
        },
      });
  
      // Create a payment method
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: cardToken.id,
        },
      });
  
      // Create a payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
        transfer_data: {
          destination: technicianDetails.id,
          amount: amount,
        },
        payment_method: paymentMethod.id, // Attach the payment method to the PaymentIntent
      });
  
      console.log(paymentIntent);
  
      // Confirm the payment intent
      const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
  
      // Return the confirmed payment intent
      return confirmedPaymentIntent;
    } catch (error) {
      console.error('Error initiating payment:', error);
      throw new Error('Failed to initiate payment');
    }
}

const transfer_paymnet =  async (req, res) => {
    const { amount } = req.body;
    const userId = req.params.userId;
    const userType = req.params.userType;
    if(userType === 'Installer')
    {
        try {
            // Retrieve the installer details from the database
            const technicianDetails = await Technician.findById(userId);
            console.log(technicianDetails.stripePaymentDetails)
            // Check if installer details exist
            if (!technicianDetails) {
              return res.status(404).json({ error: 'Technician details not found' });
            }
        
            // Initiate the payment
            const paymentResult = await initiatePayment(amount, technicianDetails.stripePaymentDetails);
             console.log(paymentResult)
            // Return the payment result
            res.status(200).json({ paymentResult });
          } catch (error) {
            console.error('Failed to initiate payment:', error);
            res.status(500).json({ error: 'Failed to initiate payment' });
          }
    }
    // Rest for the other transfers
    
};

module.exports = {
    transfer_paymnet
}

module.exports = { charge_Hold_amount_from_card }
  
module.exports = {
    hold_payment_on_card,
    refund_hold_with_charge,
    update_price_token
}


module.exports = {
addBankAccount,
updateBankAccount,
deleteBankAccount

}
  