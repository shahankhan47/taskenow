require('dotenv').config();
// Import the Technicain model
const Technician = require('../modals/Technician');

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
  


  module.exports = {
    addBankAccount,
    updateBankAccount,
    deleteBankAccount

  }
  
