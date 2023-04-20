import axios from "axios";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Sucess from "../components/Sucess";


function Register() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  // const [password, setPassword] = useState("");
  // const [cpassword, setcpassword] = useState("");
  const[mobileNumber,setMobileNumber]=useState();
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const[success,setsuccess]=useState();

   async function register(){
  {
        const user={
        name,
        email,
        mobileNumber,
       
    }
    try{
        setloading(true);
        const result=await axios.post('/api/users/register',user).data
        setloading(false);
        setsuccess(true);
        setName('');
        setemail('');
        setMobileNumber('');
        // setPassword('');
        // setcpassword('');
    }catch(error){
        console.log(error);
        setloading(false);
        seterror(true);
    }
}
  }
  return (
    <div>
        {loading && (<Loader/>)}
        {error && (<Error/>)}
       
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-5 mt-5">
        {success && (<Sucess message='registration sucess'/>)}
          <div className="bs">
            <h2>Register Here</h2>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
              placeholder="Enter Your Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            {/* <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => setcpassword(e.target.value)}
            /> */}
            <button className="btn btn-primary mt-3" onClick={register}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
