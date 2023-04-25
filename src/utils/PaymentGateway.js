export default async function displayRazorpay(eventId,persons,bookevent) {
const data = await fetch("/api/bookings/razorpay", {
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
  key: data.key_id,
  currency: data.currency,
  amount: data.amount,
  name: "CIY",
  description: "Wallet Transaction",
  image: "",
  order_id: data.id,
  handler: function (response) {
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
