export default async function displayRazorpay(eventId,persons,bookevent) {
  const data = await fetch("http://localhost:5000/api/bookings/razorpay", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({eventId,persons})
  }).then((t) => t.json());

  console.log(data);
  console.log("event xyz",eventId);
  const options = {
    key: "rzp_live_UdoyiWq2qD8o7V",
    currency: data.currency,
    amount: data.amount,
    name: "CIY",
    description: "Wallet Transaction",
    image: "",
    order_id: data.id,
    handler: function (response) {
      
       //alert("PAYMENT ID ::" + response.razorpay_payment_id);
      // alert("ORDER ID :: " + response.razorpay_order_id);
      bookevent(response.razorpay_payment_id); // call bookevent function here
      return response;
    },
    notes: {
      eventId: eventId // add event id to notes
    }
  };


  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
