import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const initialState={
  role :"",
  emailId: "",
  password:""

}
const Login = () =>{
  const navigate = useNavigate();
  const[role,setRole] =useState(' ');
  const[user,setUser] = useState(initialState);
  const handleRoleChange = (e) =>{
    
    setRole(e.target.value);
  }

  const handleInputChange = (e) =>{
    const{name,value} = e.target;
    setUser({...user,[name]:value});
  }
  const handleHome = () =>{
    navigate(`/`);
  }

  const handleLoginSubmit= async(e) =>{
     e.preventDefault();
     try{
      let response;
      if(role === "Admin" || role==="admin"){
        response = await axios.get(`http://localhost:8080/admin/getAdmin/${user.emailId}`);
        const storedPassword = response.data.password;
        if(user.password === storedPassword){
          console.log(user);
          console.log("User found successfully",response.data);
          const adminName= response.data.firstName;
          navigate(`/adminPage/${adminName}`);
        }
        else{
          alert("Invalid Password");

        }

      }
      if(role === "Patient" || role ==="patient"){
        response = await axios.get(`http://localhost:8080/patient/getPatient/${user.emailId}`);
        const storedPassword = response.data.password;
        if(user.password === storedPassword){
          console.log(user);
          console.log("User found successfully",response.data);
          const patientName = response.data.firstName;
          navigate(`/patientPage/${patientName}`);
        }
      }
      if(role ==="Doctor" || role ==="doctor"){
        response = await axios.get(`http://localhost:8080/doctor/getDoctor/${user.emailId}`);
        const storedPassword = response.data.password;
        if(user.password === storedPassword){
          console.log(user);
          console.log("User found successfully",response.data);
          const doctorName = response.data.firstName;
          navigate(`/doctorPage/${doctorName}`);
        }
      }


     }
     catch(error){
      console.log("Error during login",error);
     }

  }
  return(
    <React.Fragment>
          <div className="form2">
      <form onSubmit={handleLoginSubmit}>
        <h3>User Login</h3>
        <label htmlFor="role" className="labelLogin">User Role</label>
        <select 
        id="role" 
        name="role" 
        className="inputLogin" 
        value={user.role} 
        onChange={e =>{
          handleRoleChange(e);
          handleInputChange(e);
        }}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>

        <label htmlFor="emailId" className="labelLogin">EmailId</label>
        <input
         type="text"
         className="inputLogin"
         id="emailId"
         name="emailId"
         value={user.emailId}
         onChange={handleInputChange}
        >
        </input>

        <label htmlFor="password" className="labelLogin">Password</label>
        <input
          type="password"
          className="inputLogin"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        >
        </input>
        <button className="buttonLogin" >Login</button>
        <span style={{marginRight: "10px"}}></span>
        <button className="buttonLogin" onClick={handleHome}>Home</button>
      </form>
      </div>
    </React.Fragment>
  )
}

export default Login;