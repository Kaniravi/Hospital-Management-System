import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorPage = () =>{
  const navigate = useNavigate();
  const {doctorName} = useParams();
  const[doctorAppointments,setDoctorAppointments] = useState([]);
  const[showAppointments, setShowAppointments] = useState(false);
  const[showUpdate,setShowUpdate] = useState(false);
  const[update,setUpdate] = useState([]);
  const[updated,setUpdated] = useState(false);
  useEffect(()=>{
    const fetchDoctorAppointments = async() =>{
      try{
          const response = await axios.get(`http://localhost:8080/doctor/getDoctorAppointmentByDoctorName/${doctorName}`);
          console.log(response.data);
          setDoctorAppointments([response.data]);
      }
      catch(e){
        console.log("Error",e);
      }
    }
    fetchDoctorAppointments();
  },[doctorName])

  const handleUpdate = (e,appointment) =>{
    e.preventDefault();
    navigate(`/doctorPage/${doctorName}/${appointment.id}/update`);
    setShowAppointments(false);
    setShowUpdate(true);
    setUpdate(appointment);
  }

  const handleChange = (e) =>{
    const{name,value} = e.target;
    setUpdate({...update,[name]:value});
  }

  const handleUpdateSubmit = async(e) =>{
    e.preventDefault();
    try{
        const response = await axios.put(`http://localhost:8080/doctor/updateAppointment/${update.id}`,update);
        console.log(response.data);
        alert("Updated Successfully");
        setUpdated(true);
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
              <img src="/image/logo.jpg" width="30px" height="40px" ></img>
              <Link to="/">HospitalManagementSystem</Link>
              <Link to="">Contact Us</Link>
              <Link to="">About Us</Link>

              <div className="login doctorPage">
                <Link to ={`/doctorPage/${doctorName}/myAppointments`} onClick={() =>{setShowAppointments(true);setShowUpdate(false)}}>View My Appointments</Link>
                <Link to="/">Logout</Link>
              </div>

            </div>
          </div>
          {showAppointments &&(
            <div>
              <h3 className="tableDoctorHeader">All Appointments</h3>
              <table className="tableDoctorApp">
                <thead className="tableDoctorHead">
                  <tr className="tableDoctorRow">
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
                <tbody className="tableDoctorBody">
                  {doctorAppointments.map((appointment)=>(
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
                        <td><button className="doctorUpdate" onClick={(e)=>handleUpdate(e,appointment)}>Update Appointment</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {showUpdate &&(
           <div>
            <form className="updateForm" onSubmit={handleUpdateSubmit}>
              <h3 className="updateHeader">Update Appointment</h3>
              <label htmlFor="patientName" className="updateLabel">Patient Name</label>
              <input type="text" id="patientName" name="patientName" className="updateInput" value={update.patientName} readOnly></input>

              <label htmlFor="problem" className="updateLabel">Problem Description</label>
              <textarea id="problem" name="problem"  className="updateInput" value={update.problem} readOnly></textarea>

              <label htmlFor="appointmentDate" className="updateLabel">Appointment Date</label>
              <input type="date" id="appointmentDate" name="appointmentDate"  className="updateInput" value={update.appointmentDate} readOnly></input>


              <label htmlFor="prescription" className="updateLabel">Prescription</label>
              <textarea id="prescription" name="prescription"  className="updateInput" value={update.prescription} onChange={handleChange}></textarea>

              <label htmlFor="appointmentPrice" className="updateLabel">Treatment Price</label>
              <input type="text" id="appointmentPrice" name="appointmentPrice"  className="updateInput" value={update.appointmentPrice} onChange={handleChange}></input>

              <label htmlFor="appointmentStatus" className="updateLabel">Appointment Status</label>
              <select id="appointmentStatus" name="appointmentStatus"  className="updateInput" value={update.appointmentStatus} onChange={handleChange}>
                <option value="">Select Appointment Status</option>
                <option value="Treatment Done">Treatment Done</option>
                <option value="Cancel">Cancel</option>
              </select>

              <button className="buttonUpdate" type="submit" disabled={updated}>Update Appointment</button>
            </form>
           </div>
          )}
          </div>
    </React.Fragment>
  )
}

export default DoctorPage;