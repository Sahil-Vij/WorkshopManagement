import React, { useEffect, useState } from 'react';
import { Tabs } from "antd";
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from 'sweetalert2';
import { Divider, Space, Tag } from 'antd';
const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  return (
    <div className='ml-3 mt-3 '>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
    const[bookings,setbookings]=useState();
    const[loading,setloading]=useState(false);
    const[error,seterror]=useState();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setloading(true);
        const data = await(await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data;
        console.log(data);
        setbookings(data);
        setloading(false);
      } catch (error) {
        console.log({ error });
        seterror(error)
        setloading(false);
      }
    };

    fetchBookings();
  }, []);

    async function cancelBooking(bookingid,eventid){
        try{
            setloading(true);
            const result=(await axios.post('/api/bookings/cancelbooking',{bookingid,eventid})).data;
            console.log("result",result);
            Swal.fire('Congrats','Your booking cancelled sucessfully','sucess').then(result=>{
                window.location.reload();
            })
        }catch(error){
            console.log(error);
            setloading(false);
            Swal.fire('Oops','Something went wrong','error');
        }
    }
  return (
    <div className='row'>
     <div className='col-md-6'>
        {loading && <Loader/>}
        {bookings && (bookings.map(booking=>{
            return(<div className='bs'>
                <h1>{booking.event}</h1>
                <p style={{paddingTop:'15px'}}><b>Booking id:</b> {booking._id}</p>
                <p><b>Date of Event:</b> {booking.Date}</p>
                {/* <p><b>Persons: {booking.persons}</b></p> */}
                <p><b>Transaction id:</b> {booking.transactionid}</p>
                <p><b>Total Amount:</b> Rs. {booking.TotalAmount}</p>
                <p><b>Status:</b> {booking.status == 'booked' ? (<Tag color="green">CONFIRMED</Tag>):(<Tag color="orange">CANCELLED</Tag>)}</p>

                {booking.status!='cancelled' && (
                    <div className='text-right'>
                    <button className='btn btn-primary' onClick={()=>{cancelBooking(booking._id,booking.eventid)}}>
                        Cancel Booking</button>
                </div>
                )}

            </div>)
        }))}
     </div>
    </div>
  );
}
