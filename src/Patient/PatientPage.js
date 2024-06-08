import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const initialState={
   patientName : '',
   patientContact:'',
   problem:'',
   doctorName:'Not Assigned to Doctor',
   prescription:'Not Assigned to Doctor',
   appointmentTakeDate:new Date().toISOString().slice(0,10),
   appointmentDate:'',
   appointmentStatus:'Not Assigned to Doctor',
   appointmentPrice: 'Not Assigned to Doctor'
}
const PatientPage = () =>{
  const {patientName} = useParams();
  const[appointment,setAppointment] = useState(initialState);
  const[showTakeAppointment, setShowTakeAppointment] = useState(false);
  const[showMyAppointments,setShowMyAppointments] = useState(false);
  const[takeAppointment,setTakeAppointment] = useState([]);
  const handleChange = (e)=>{
    const{name,value} = e.target;
    setAppointment({...appointment,[name]:value});
  }

  useEffect(() =>{
    const fetchContact = async() =>{
      try{
          const response = await axios.get(`http://localhost:8080/patient/getPatientByFirstName/${patientName}`);
          console.log(response.data);
          const {contactNo, firstName, lastName} = response.data;
          const patientFullName = `${firstName} ${lastName}`;
         setAppointment({...appointment,patientContact: contactNo, patientName: patientFullName});
      }
      catch(e) {
        console.log("Error fetching contact",e);
      }
    }
    fetchContact();
  },[patientName])

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:8080/patient/takeAppointment`,appointment);
      console.log(response.data);
      alert("Registered Appointment Successfully");
      setAppointment(initialState);
      window.location.reload();
      

    }
    catch(e){
      console.log("Error ",e);
    }
  }
  useEffect(() =>{
    const fetchAppointments = async() =>{
      try{
            
            const response = await axios.get(`http://localhost:8080/patient/getAppointments/${appointment.patientName}`);
            console.log(response.data);
            setTakeAppointment([response.data]);

      }
      catch(e){
        console.log("Error",e);
      }
    }
    fetchAppointments();
  },[appointment.patientName])

  const handleAppointmentRemove = async(e,id) =>{
    try{
        await axios.put(`http://localhost:8080/patient/cancelAppointment/${id}`,{appointmentStatus: 'Cancelled'});
        alert("Appointment Cancelled");
        
        window.location.reload();
    }
    catch(e){
      console.log("Error",e);
    }
  }
  return(
    <React.Fragment>
        <div className="form">
        <div className="container">
            <div className="navbar">
              <img src="/image/logo.jpg" width="30px" height="40px" alt="im" ></img>
              <Link to="/">HospitalManagementSystem</Link>
              <Link to="">Contact Us</Link>
              <Link to="">About Us</Link>

              <div className="login appointment">
                <Link to={`/patientPage/${patientName}/appointment`} onClick={() =>{setShowTakeAppointment(true);setShowMyAppointments(false)}}>Take Appointment</Link>
                <Link to={`/patientPage/${patientName}/myAppointments`} onClick={() =>{setShowMyAppointments(true);setShowTakeAppointment(false)}}>My Appointments</Link>
                <Link to="/">Logout</Link>
              </div>

            </div>
          </div>

          {showTakeAppointment &&(
            <div >
              <form className="form1" onSubmit={handleSubmit}>
                <h3>Take Appointment</h3>
                <label htmlFor="problem" className="lable appLable">Problem</label>
                <textarea id="problem" name="problem" className="inputLogin app" onChange={handleChange} value={appointment.problem}></textarea>

                <label htmlFor="appointmentDate" className="lable appLable">Appointment Date</label>
                <input type="date" id="appointmentDate" name="appointmentDate" className="inputLogin app" onChange={handleChange} value={appointment.appointmentDate}></input>

                <button className="buttonLogin" type="submit">Take Appointment</button>
              </form>
            </div>
          )}

          {showMyAppointments &&(
            <div>
              <h3 className="appointmentHeader">All Appointments</h3>
              <table className="tableAppointment">
                  <thead className="tableHeader">
                    <tr className="appointmentRow">
                      <td>Patient Name</td>
                      <td>Patient Contact</td>
                      <td>Problem</td>
                      <td>Doctor Name</td>
                      <td>Prescription</td>
                      <td>Appointment Take Date</td>
                      <td>Appointment Date</td>
                      <td>Appointment Status</td>
                      <td>Appointment Price</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody className="appointmentBody">
                    {takeAppointment.map((appointment)=>(
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.patientContact}</td>
                        <td>{appointment.problem}</td>
                        <td>{appointment.doctorName}</td>
                        <td>{appointment.prescription}</td>
                        <td>{appointment.appointmentTakeDate}</td>
                        <td>{appointment.appointmentDate}</td>
                        <td>{appointment.appointmentStatus}</td>
                        <td>{appointment.appointmentPrice}</td>
                        <td><button className="buttonLogin" onClick={(e) =>{handleAppointmentRemove(e, appointment.id)}} 
                        disabled ={appointment.appointmentStatus ==="Cancelled"}>Cancel</button></td>

                      </tr>
                      
                    ))}
                  </tbody>
              </table>
            </div>
          )}
          </div>
    </React.Fragment>
  )
}

export default PatientPage;