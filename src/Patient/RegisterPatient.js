import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const initialState ={
  firstName:"",
  lastName:"",
  emailId:"",
  password:"",
  gender:"",
  bloodGroup:"",
  contactNo:"",
  age:"",
  street:"",
  city:"",
  pincode:""
}
const RegisterPatient  = () =>{
  const navigate = useNavigate();
  const [patient, setPatient] = useState(initialState);

  const handleHome = () =>{
    navigate(`/`);
  };

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setPatient({...patient,[name]:value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:8080/patient/registerPatient`,patient);
      console.log(response.data);
      alert("Patient Registered Successfully");
      setPatient(initialState);
      navigate(`/`);
    }
    catch(e){
      console.log("Error registering patient",e);
    }
  }
  return(
    <React.Fragment>
       <form onSubmit={handleSubmit}>
      <div className="bodyForm reg">
      <div className="form1 reg">
        <h3>Register Patient</h3>
        <div className="fullCol">
        <div className="firstCol">
        <label htmlFor="firstName" className="lable">First Name</label>
        <input
         className="input" 
         type="text" 
         name ="firstName" 
         value={patient.firstName}
         onChange={handleChange}
         ></input>


        <label htmlFor="emailId" className="lable">Email Id</label>
        <input
         className="input" 
         type="text" 
         name ="emailId" 
         value={patient.emailId}
         onChange={handleChange}></input>


        <label htmlFor="gender" className="lable">Gender</label>
        <select className="input" id="gender" name="gender" value={patient.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>

        </select>
         

         <label htmlFor="contactNo" className="lable">Contact No</label>
        <input
         className="input" 
         type="text" 
         name ="contactNo" 
         value={patient.contactNo}
         onChange={handleChange}></input>


        <label htmlFor="street" className="lable">Street</label>
        <textarea
         className="input" 
         type="text" 
         name ="street" 
         value={patient.street}
         onChange={handleChange}></textarea>


        <label htmlFor="pincode" className="lable">Pincode</label>
        <input
         className="input" 
         type="text" 
         name ="pincode" 
         value={patient.pincode}
         onChange={handleChange}></input>
        </div>

        <div className="secondCol">
        <label htmlFor="lastName" className="lable">Last Name</label>
        <input
         className="input" 
         type="text" 
         name ="lastName" 
         value={patient.lastName}
         onChange={handleChange}></input>


        <label htmlFor="password" className="lable">Password</label>
        <input
         className="input" 
         type="password" 
         name ="password" 
         value={patient.password}
         onChange={handleChange}></input>

        <label htmlFor="bloodGroup" className="lable">Blood Group</label>
        <input
         className="input" 
         type="text" 
         name ="bloodGroup" 
         value={patient.bloodGroup}
         onChange={handleChange}></input>


        <label htmlFor="age" className="lable">Age</label>
        <input
         className="input" 
         type="text" 
         name ="age" 
         value={patient.age}
         onChange={handleChange}></input>


        <label htmlFor="City" className="lable">City</label>
        <input
         className="input" 
         type="text" 
         name ="city" 
         value={patient.city}
         onChange={handleChange}></input>
         </div>
         </div>
         <div className="btns">
         <button type="submit" className="buttonAdmin" >Register Patient</button>
         <button className="buttonAdmin" onClick={handleHome}>Home</button>
         </div>
         </div>
         
         
     
      </div>
      </form>
    </React.Fragment>
  )

}

export default RegisterPatient;