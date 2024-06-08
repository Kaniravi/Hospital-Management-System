import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const initialState ={
  firstName:"",
  lastName:"",
  emailId:"",
  password:"",
  gender:"",
  specialist:"",
  contactNo:"",
  age:"",
  experience:"",
  street:"",
  city:"",
  pincode:"",
  photo:null
}
const RegisterDoctor   = () =>{
    const {adminName} = useParams();
    const navigate = useNavigate();
    const[doctor,setDoctor] = useState(initialState);
    const handleChange = (e) =>{
      const{name,value} = e.target;
      setDoctor({...doctor,[name]:value});
    }

    const handleImageChange = (e) =>{
      const file = e.target.files[0];
      setDoctor({...doctor,photo:file});
     
    }
    const handleHome = ()=>{
      navigate(`/`);
    }
    const handleSubmit = async(e) =>{
      e.preventDefault();
      try{
          const formData = new FormData();
          formData.append("firstName",doctor.firstName);
          formData.append("lastName",doctor.lastName);
          formData.append("emailId", doctor.emailId);
          formData.append("password", doctor.password);
          formData.append("gender", doctor.gender);
          formData.append("specialist", doctor.specialist);
          formData.append("age", doctor.age);
          formData.append("contactNo", doctor.contactNo);
          formData.append("experience",doctor.experience);
          formData.append("street", doctor.street);
          formData.append("city", doctor.city);
          formData.append("pincode", doctor.pincode);
          formData.append("photo", doctor.photo);

          const response = await axios.post(`http://localhost:8080/admin/registerDoctor`,formData,{
            headers:{
              "Content-Type" :"multipart/form-data"
            }
          })
          alert("Doctor Registered Successfully");
          console.log(response.data);
          setDoctor(initialState);
          navigate(`/adminPage/${adminName}`);
      }
      catch(e){
        console.log("Error registering doctor",e);
      }
    }
     return(
      <React.Fragment>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="bodyForm">
      <div className="form1">
        <h3>Register Doctor</h3>
        <div className="fullCol">
        <div className="firstCol">
        <label htmlFor="firstName" className="lable">First Name</label>
        <input
         className="input" 
         type="text" 
         name ="firstName" 
         value={doctor.firstName}
         onChange={handleChange}
         ></input>


        <label htmlFor="emailId" className="lable">Email Id</label>
        <input
         className="input" 
         type="text" 
         name ="emailId" 
         value={doctor.emailId}
         onChange={handleChange}></input>


        <label htmlFor="gender" className="lable">Gender</label>
        <select className="input" id="gender" name="gender" value={doctor.gender} onChange={handleChange}>
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
         value={doctor.contactNo}
         onChange={handleChange}></input>


        <label htmlFor="street" className="lable">Street</label>
        <textarea
         className="input" 
         type="text" 
         name ="street" 
         value={doctor.street}
         onChange={handleChange}></textarea>


        <label htmlFor="pincode" className="lable">Pincode</label>
        <input
         className="input" 
         type="text" 
         name ="pincode" 
         value={doctor.pincode}
         onChange={handleChange}></input>
        </div>

        <div className="secondCol">
        <label htmlFor="lastName" className="lable">Last Name</label>
        <input
         className="input" 
         type="text" 
         name ="lastName" 
         value={doctor.lastName}
         onChange={handleChange}></input>


        <label htmlFor="password" className="lable">Password</label>
        <input
         className="input" 
         type="password" 
         name ="password" 
         value={doctor.password}
         onChange={handleChange}></input>

        <label htmlFor="specialist" className="lable">Specialist</label>
        <select id="specialist" name="specialist" value={doctor.specialist} className="input" onChange={handleChange}>
          <option value="">Select Specialist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Dentist">Dentist</option>
          <option value="Physiotheraphy">Physiotheraphy</option>
          
        </select>


        <label htmlFor="age" className="lable">Age</label>
        <input
         className="input" 
         type="text" 
         name ="age" 
         value={doctor.age}
         onChange={handleChange}></input>

        <label htmlFor="experience" className="lable">Experience</label>
        <input
        className="input"
        type="text"
        name="experience"
        id="experience"
        value={doctor.experience}
        onChange={handleChange}
        >
        </input>


        <label htmlFor="City" className="lable">City</label>
        <input
         className="input" 
         type="text" 
         name ="city" 
         value={doctor.city}
         onChange={handleChange}></input>
         </div>

         <label htmlFor="photo" className="photo">Select Doctor Image</label>
         <input
         className="input photoInput"
         
         type ="file"
         id="photo"
         name="photo"
         
         onChange={handleImageChange}>
         </input>
         </div>
         <div className="btns">
         <button type="submit" className="buttonAdmin" >Register Doctor</button>
         <button className="buttonAdmin" onClick={handleHome}>Home</button>
         </div>
         </div>
         
         
     
      </div>
      </form>
      </React.Fragment>
     )
}

export default RegisterDoctor;