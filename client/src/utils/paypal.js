import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

/* {"paid":true,
"cancelled":false,
"payerID":"4P3JUJ3KC4VMC",
"paymentID":"PAY-9T34957465214091KLQ63NHQ",
"paymentToken":"EC-72L0624189929103M",
"returnUrl":"https://www.sandbox.paypal.com/?paymentId=PAY-9T34957465214091KLQ63NHQ&token=EC-72L0624189929103M&PayerID=4P3JUJ3KC4VMC",
"address":{"recipient_name":"test buyer","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},
"email":"s.chornyi8-buyer@gmail.com"} */

class Paypal extends Component {
  render() {
    const onSuccess = (payment) => {
      this.props.onSuccess(payment);
    }
    const onCancel = (data) => {
      this.props.transactionCanceled(data);
    }

    const onError = (error) => {
      console.log(JSON.stringify(error));
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;

    const client = {
      sandbox: 'Adgg6lNK1eofX4RW3tS-YjAbDzaWVZo9vL_UWiJsJbESXidNqQBYXwbjvq1HY_9ZUbTygAOeiPhwWetj',
      production: ''
    }

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    )
  }
}

export default Paypal;
