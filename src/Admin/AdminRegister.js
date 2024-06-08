import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
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
const AdminRegister= ()=>{
  const navigate = useNavigate();
  const[admin,setAdmin] = useState(initialState);

  const handleChange = (e) =>{
    e.preventDefault();
    const {name,value} = e.target;
    setAdmin({...admin,[name]:value});

  }

  const handleHome = () =>{
    navigate(`/`);
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
     try{
        const response = await axios.post(`http://localhost:8080/admin/adminRegister`,admin);
        console.log(response.data);
        alert("Admin Registered Successfully");
        setAdmin(initialState);
        navigate(`/`);
        console.log("Success");

     }
     catch(error){
      console.log("Error Registering admin",error);
     }
  }
  return(
    <React.Fragment>
      <form onSubmit={handleSubmit}>
      <div className="bodyForm reg">
      <div className="form1 reg">
        <h3>Register Admin</h3>
        <div className="fullCol">
        <div className="firstCol">
        <label htmlFor="firstName" className="lable">First Name</label>
        <input
         className="input" 
         type="text" 
         name ="firstName" 
         value={admin.firstName}
         onChange={handleChange}
         ></input>


        <label htmlFor="emailId" className="lable">Email Id</label>
        <input
         className="input" 
         type="text" 
         name ="emailId" 
         value={admin.emailId}
         onChange={handleChange}></input>


        <label htmlFor="gender" className="lable">Gender</label>
        <select className="input" id="gender" name="gender" value={admin.gender} onChange={handleChange}>
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
         value={admin.contactNo}
         onChange={handleChange}></input>


        <label htmlFor="street" className="lable">Street</label>
        <textarea
         className="input" 
         type="text" 
         name ="street" 
         value={admin.street}
         onChange={handleChange}></textarea>


        <label htmlFor="pincode" className="lable">Pincode</label>
        <input
         className="input" 
         type="text" 
         name ="pincode" 
         value={admin.pincode}
         onChange={handleChange}></input>
        </div>

        <div className="secondCol">
        <label htmlFor="lastName" className="lable">Last Name</label>
        <input
         className="input" 
         type="text" 
         name ="lastName" 
         value={admin.lastName}
         onChange={handleChange}></input>


        <label htmlFor="password" className="lable">Password</label>
        <input
         className="input" 
         type="password" 
         name ="password" 
         value={admin.password}
         onChange={handleChange}></input>

        <label htmlFor="bloodGroup" className="lable">Blood Group</label>
        <input
         className="input" 
         type="text" 
         name ="bloodGroup" 
         value={admin.bloodGroup}
         onChange={handleChange}></input>


        <label htmlFor="age" className="lable">Age</label>
        <input
         className="input" 
         type="text" 
         name ="age" 
         value={admin.age}
         onChange={handleChange}></input>


        <label htmlFor="City" className="lable">City</label>
        <input
         className="input" 
         type="text" 
         name ="city" 
         value={admin.city}
         onChange={handleChange}></input>
         </div>
         </div>
         <div className="btns">
         <button type="submit" className="buttonAdmin" >Register Admin</button>
         <button className="buttonAdmin" onClick={handleHome}>Home</button>
         </div>
         </div>
         
         
     
      </div>
      </form>
    </React.Fragment>
  )
}

export default AdminRegister;