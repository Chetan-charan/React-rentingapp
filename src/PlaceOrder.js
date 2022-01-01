import { useState } from 'react';
import Button from '@mui/material/Button';
import {  url } from './App';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

export function PlaceOrder({state,dispatch}) {

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);

  async function handleOrder() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    let data = {
      amount: state.orderAmount,
     
    };

    fetch(`${url}/payment/placeorder`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then((response) => response.json())
      .then((data2) => setOrderId(data2.id));

    if (orderId) {
      const options = {
        key: 'rzp_test_6jxVwaoOnk2gWt',
        currency: 'INR',
        amount: data.amount,
        order_id: orderId,
        "handler": function (response) {

          fetch(`${url}/payment/verification`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              razorpay_payment_id: response.razorpay_payment_id, 
              razorpay_order_id: response.razorpay_order_id, 
              amount: state.orderAmount,
              customer: state.customerDetails,
              items: state.itemsOrdered,
              dateRange: state.dateRange,
            }),

          }).then((data) => data.json())
            .then((data2) =>{
              setPaymentStatus(data2.message);
              dispatch({ type: "settoInitial"});
            } );

        },
      };
      const paymentObject =  window.Razorpay(options);
      paymentObject.open();
    }

  }
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return <div className='payment-checkout'>
    
    {paymentStatus ? <div><p>{paymentStatus}, your order ID: {orderId}. </p><p>Thanks for shopping with us!! 😀</p></div> : <div>
    {state.itemsOrdered.map((item,index) => <div className='item-pay' key={index}><div className='item-payable'>{item.name}</div>
    <div>₹ {item.price} X {state.days}</div></div>)}

    <div><p>Total Amount Payable: <span style={{marginLeft: '67px'}}>₹ {state.orderAmount}</span></p> 
    <ColorButton style={{marginLeft: '210px',marginTop:'15px'}} onClick={handleOrder} variant="contained">Pay</ColorButton></div>
    </div>}
  </div>;


}
