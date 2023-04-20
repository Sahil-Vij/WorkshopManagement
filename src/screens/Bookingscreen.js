import React from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import displayRazorpay from "../utils/PaymentGateway";
import Swal from "sweetalert2";
function Bookingscreen() {
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [event, setevent] = useState();
  const [persons, setPersons] = useState(1);
  const [maxPersons, setMaxPersons] = useState();
  

  // const eventDate = moment(event.Date, "DD-MM-YYYY").toDate();
  // const eventCharges=event.Charges;
  const [TotalAmount, setTotalAmount] = useState();
  const [Date, setDate] = useState();
  let { id } = useParams();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (
          await axios.post("/api/events/geteventbyid", { eventid: id })
        ).data;
        setevent(data);
        setTotalAmount(data.Charges);
        setDate(data.Date);
        setMaxPersons(data.SeatAvailability - data.currentbookings.length);
        setloading(false);
        console.log(data);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  function increasePersons() {
    const maxPersons = event.SeatAvailability - event.currentbookings.length;
    if (persons < maxPersons) {
      setPersons(persons + 1);
      setTotalAmount((persons + 1) * event.Charges);
    } else {
      alert("Maximum number of persons reached.");
    }
  }
  
  function decreasePersons() {
    if (persons > 1) {
      setPersons(persons - 1);
      setTotalAmount((persons - 1) * event.Charges);
    }
  }
  
  async function bookevent(transactionid,persons) {
    const bookingDetails = {
      event,
      user: JSON.parse(localStorage.getItem("currentUser"))._id,
      Date,
      persons,
      TotalAmount,
      transactionid
    };
    try {
      setloading(true);
      const result = await axios.post(
        "/api/bookings/bookevent",
        bookingDetails
      );
      console.log(result);
      setloading(false);
      Swal.fire("Congratulations", "Booking Sucessful", "success").then(
        (result) => {
          window.location.href = "/profile";
        }
      );
    } catch (error) {
      console.log(error);
      setloading(false);
      Swal.fire("Sorry", "Something went wrong", "error");
    }
  }
  // const xyz=event._id;
  // console.log("xyz",xyz);

  async function handlepayment(eventId,persons) {
    console.log("eventID",eventId,persons);
    //return false;
    const xyz=await displayRazorpay(eventId, persons,bookevent);
    //xyz.razorpay_payment_id
  }

  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : event ? (
        <div>
          <div className="row mt-5 bs">
            <div className="col-md-6">
              <h1>{event.name}</h1>
              <img src={event.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-4">
              <div>
                <b>
                  <h1>Booking Details</h1>
                  <hr></hr>
                  <p>Name : {user.name}</p>
                  <p>Date : {event.Date} </p>
                  <p>Timings : {event.Timings}</p>
                  <p>Type : {event.type}</p>
                  <p>{}</p>
                  {/* <p>SeatAvailability : {event.SeatAvailability}</p> */}
                  <p>
                    Seats Available :
                    {maxPersons}
                  </p>
                  <div className="row">
    <p style={{marginLeft:'12px'}}>Total Persons : </p>
    <button className="btn btn-primary mr-2 ml" onClick={decreasePersons} style={{marginLeft:'10px'}}>-</button>
    <p style={{marginLeft:'10px',marginRight:'10px'}}>{persons}</p>
    <button className="btn btn-primary" onClick={increasePersons}>+</button>
  </div>
                </b>
              </div>
              <hr />
              <div>
                <p>Amount per person : Rs. {event.Charges} </p>

                <p>Total Amount : Rs. {TotalAmount}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if(maxPersons>0){
                    handlepayment(event._id,persons)
                  }
                  }}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>
          <Error />
        </h1>
      )}
    </div>
  );
}

export default Bookingscreen;
