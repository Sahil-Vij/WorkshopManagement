import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function Event({ event, fromdate, todate ,searchKey}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();


  const fromDateObj = moment(fromdate, "DD-MM-YYYY").toDate();
  const toDateObj = moment(todate, "DD-MM-YYYY").toDate();
  const eventDate = moment(event.Date, "DD-MM-YYYY").toDate();
  const isEventInRange = eventDate >= fromDateObj && eventDate <= toDateObj;

  if (!isEventInRange) {
    return null;
  }

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={event.imageurls[0]} className="smallimg" />
      </div>
      <div className="col-md-7 docs" >
        <h1>{event.name}</h1>
        <b>
          {" "}
          {/* <p>Seat Availability : {event.SeatAvailability}</p> */}
          <p style={{paddingTop:'8px'}}>Date : {event.Date}</p>
          {/* <p>Phone Number : {event.phonenumber}</p> */}
          <p>Type : {event.type}</p>
        </b>
        <div style={{ float: "right" }}>
          
          {/* <Link to={`/book/${event._id}`}>
            <button className="btn btn-primary m-2">Book Now</button>
          </Link> */}
          <button className="btn btn-primary m-2" onClick={() => {
  if (!user) {
    navigate("/login");
  } else {
    navigate(`/book/${event._id}`);
  }
}}>Book Now</button>

          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{event.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {event.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p style={{ paddingTop: "10px" }}>{event.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Event;
