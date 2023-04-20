import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import { auth, firebase } from "../firebase";

function Loginscreen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
   const [showOTP, setShowOTP] = useState(false);
  // const [otp, setOTP] = useState("");
  const [otp, setotp] = useState('');
    const [show, setshow] = useState(false);
    const [final, setfinal] = useState('');
  const handlePhoneSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/users/verifyMobileNumber", {
        mobileNumber,
      });
      const result=response.data;
      console.log(result);
      localStorage.setItem("currentUser",JSON.stringify(result))
      setLoading(false);
      setShowOTP(true);
      let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber("+91"+mobileNumber, verify).then((result) => {
            setfinal(result);
            alert("code sent")
            setshow(true);
        })
            .catch((err) => {
                alert(err);
                window.location.reload()
            });
      
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error",error);
    }
  };
  const ValidateOtp = () => {
    if (otp === null || final === null)
        return;
    final.confirm(otp).then((result) => {
     
        window.location.href = "/home";
    }).catch((err) => {
        alert("Wrong code");
    })
}
  return (
    <div>
      {loading && <Loader />}
      <div className="row justify-content-center mt-2 ">
        <div className="col-md-5 mt-2">
          {error && <Error message="Invalid Credentials" />}
          <div className="bs">
            <h2>Login Here</h2>
            
              <Form onSubmit={handlePhoneSubmit}>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </Form.Group>
                {!show && <div id="recaptcha-container"></div>}
                {!show && <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
                  Get OTP
                </Button>}
              </Form>
              {show && 
              <Form style={{marginTop:"15px"}} >
                <Form.Group controlId="formOTP">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setotp(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={ValidateOtp } style={{marginTop:"10px"}}>
                  Verify
                </Button>
              
              </Form>
}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
