import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { TabPane } = Tabs;

function Adminscreen() {
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
      window.location.href = "/home";
    }
  });
  return (
    <div className="mt-3 ml-3 mr-3 bs">
      <h1 className="text-center" style={{ fontSize: "30px" }}>
        <b>Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Events" key="2">
          <Events />
        </TabPane>
        <TabPane tab="Add Event" key="3">
          <Addevent />
        </TabPane>
        <TabPane tab="Users List" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("/api/bookings/getallbookings");
        setbookings(response.data);
        setloading(false);
      } catch (error) {
        seterror(error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <th>Booking Id</th>
            <th>User Id</th>
            <th>Event</th>
            <th>Date</th>
            <th>Status</th>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.event}</td>
                    <td>{booking.Date}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function Events() {
  const [events, setevents] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("/api/events/getallevents");
        setevents(response.data);
        setloading(false);
      } catch (error) {
        seterror(error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Events</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <th>Event Id</th>
            <th>Name</th>
            <th>Type</th>
            <th>Phone Number</th>
            <th>Amount</th>
            <th>Date</th>
          </thead>
          <tbody>
            {events.length &&
              events.map((event) => {
                return (
                  <tr>
                    <td>{event._id}</td>
                    <td>{event.name}</td>
                    <td>{event.type}</td>
                    <td>{event.phonenumber}</td>
                    <td>{event.Charges}</td>
                    <td>{event.Date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("/api/users/getallusers");
        setusers(response.data);
        setloading(false);
      } catch (error) {
        seterror(error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>IsAdmin</th>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export function Addevent() {
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();
  
  const [name, setName] = useState();
  const [SeatAvailability, setSeatAvailability] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [Date, setDate] = useState();
  const [Charges, setCharges] = useState();
  const [Timings, setTimings] = useState();
  const [description, setdescription] = useState();
  const [type,settype]=useState();
  const [image1, setimage1] = useState();
  const [image2, setimage2] = useState();
  const [image3, setimage3] = useState();

  async function addevent(){
    const newevent={
    name,
    SeatAvailability,
    phonenumber,
    Date,
    Charges,
    Timings,
    description,
    type,
    imageurls:[image1,image2,image3]
    }
    console.log(newevent);
    try{
        setloading(true);
        const result=await (await axios.post('/api/events/addevent',newevent)).data;
        console.log(result);
        setloading(false);
    }
    catch(error){
        console.log(error);
        setloading(false);
    }
  }
  return (
    <div className="row">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Enter event's name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Enter Seat's Availability"
          value={SeatAvailability}
          onChange={(e)=>setSeatAvailability(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Instructor's Phone Number"
          value={phonenumber}
          onChange={(e)=>setphonenumber(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Date in format DD-MM-YYYY"
          value={Date}
          onChange={(e)=>setDate(e.target.value)}
        />
        <input type="text" 
        className="form-control" 
        placeholder="Amount"
        value={Charges}
          onChange={(e)=>setCharges(e.target.value)}
         />
        <input type="text" 
         className="form-control" 
         placeholder="Timings"
         value={Timings}
         onChange={(e)=>setTimings(e.target.value)}
        />
      </div>
      <div className="col-md-5">
        <input type="text" 
         className="form-control" 
         placeholder="Description" 
         value={description}
         onChange={(e)=>setdescription(e.target.value)}
        />
         <input type="text" 
         className="form-control" 
         placeholder="Type" 
         value={type}
         onChange={(e)=>settype(e.target.value)}
        />

        <input type="text" 
         className="form-control" 
         placeholder="Image URL-1"
         value={image1}
         onChange={(e)=>setimage1(e.target.value)} 
        />

        <input type="text" 
         className="form-control"
         placeholder="Image URL-2"
         value={image2}
         onChange={(e)=>setimage2(e.target.value)}
        />

        <input type="text"
          className="form-control"
          placeholder="Image URL-3"
          value={image3}
          onChange={(e)=>setimage3(e.target.value)}
        />

        <div className="text-right">
          <button className="btn btn-primary mt-4" onClick={addevent}>Add Event</button>
        </div>
      </div>
    </div>
  );
}
