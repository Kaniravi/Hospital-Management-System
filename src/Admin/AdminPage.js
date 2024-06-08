import React, { useEffect, useState } from "react";
import { Link, useAsyncError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UpdateDoctor from "./UpdateDoctor";
import axios from "axios";

const AdminPage = () =>{
  const {adminName} = useParams();
  const navigate = useNavigate();

  const[showDoctors,setShowDoctors] = useState(false);
  const[doctors,setDoctors] = useState([]);
  const[showPatients, setShowPatients] = useState(false);
  const[patients,setPatients] = useState([]);
  const[showAppointments, setShowAppointments] = useState(false);
  const[takeAppointment,setTakeAppointment] = useState([]);
  const[assign,setAssign] = useState([]);
  const[showAssign, setShowAssign] = useState(false);
  const[selectedAppointment, setSelectedAppointment] = useState({});

 

  const handleDoctorRegister = (e) =>{
      e.preventDefault();
      navigate(`/adminPage/${adminName}/doctorRegister`);
      
  }

  const handleRemoveClick = async (e, id) => {
    e.preventDefault();
    try {
        await axios.delete(`http://localhost:8080/admin/deleteDoctor/${id}`);
        
        alert("Doctor removed successfully");
        window.location.reload();
        navigate(`/adminPage`);
    } catch (error) {
        console.error("Error removing doctor", error);
    }
};

const handleRemovePatient = async(e, id) =>{
  e.preventDefault();
  try{
      await axios.delete(`http://localhost:8080/admin/removePatient/${id}`);
      alert("Patient removed successfully");
      window.location.reload();
      navigate(`/adminPage`);
    
  }
  catch(e){
    console.log("Error removing patient",e);
  }
}

 const handleUpdateClick = async(e, id)=>{
   navigate(`/adminPage/${adminName}/updateDoctor/${id}`);
 }

 const handleDoctorAssign = (e) =>{
  const {name,value} = e.target;
  setAssign({...assign,[name]:value});
 }

  useEffect(()=>{
    const fetchDoctors = async() =>{
      try{
        const response = await axios.get(`http://localhost:8080/doctor/getDoctors`);
        const data = response.data;
        setDoctors(data);
        console.log(response.data);
      }
      catch(e){
        console.log("Error fetching Doctors",e);
      }
    }
    fetchDoctors();
  },[]);


  useEffect (() =>{
    const fetchPatients = async() =>{
      try{
        const response = await axios.get(`http://localhost:8080/patient/getPatients`);
        console.log(response.data);
        setPatients(response.data);
      }
      catch(e){
        console.log("Error fetching Patients",e);
      }
    }
    fetchPatients();
  },[]);


  
  useEffect(() =>{
    const fetchAppointments = async() =>{
      try{
            const response = await axios.get(`http://localhost:8080/patient/getAppointments`);
            console.log(response.data);
            setTakeAppointment(response.data);

      }
      catch(e){
        console.log("Error",e);
      }
    }
    fetchAppointments();
  },[])

  const handleAssign = (id, appointment) =>{
    navigate(`/adminPage/${adminName}/${id}/assignDoctor`);
    setShowAppointments(false);
    setShowDoctors(false);
    setShowPatients(false);
    setShowAssign(true);
    setSelectedAppointment(appointment);
  }

  const handleAssignSubmit = async(e) =>{
 
    try{
        const updatedAppointment ={
          ...selectedAppointment,
          doctorName: assign.doctorName,
          prescription:'',
          appointmentStatus:"Assigned",
          appointmentPrice:" Treatment Pending",
          

        }
        const response = await axios.put(`http://localhost:8080/admin/updateAppointment/${selectedAppointment.id}`,updatedAppointment);
        console.log(response.data);
        alert("Updated Successfully");
        navigate(`/adminPage/${adminName}`);
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

              <div className="login">
               <Link to ={`/adminPage/${adminName}`} onClick={() =>{ setShowDoctors(false); setShowPatients(true); setShowAppointments(false); setShowAssign(false)}}>View Patients</Link>
                <Link to = {`/adminPage/${adminName}`} onClick={()=>{setShowDoctors(true);setShowPatients(false);setShowAppointments(false); setShowAssign(false)}}>View Doctors</Link>
                <Link to ={`/adminPage/${adminName}/checkAppointments`} onClick={() =>{setShowAppointments(true);setShowDoctors(false);setShowPatients(false); setShowAssign(false)}}>Check All Appointments</Link>
                <Link to="/adminPage/doctorRegister" onClick={handleDoctorRegister}>Register Doctor</Link>
                <Link to="/adminPage/adminLogin">Login</Link>
                <Link to="/">Logout</Link>
              </div>

            </div>
          </div>
          
          {showDoctors &&(
            <div>
              <h2 className="tableHeading">All Doctor</h2>
              <table className="tableDoctor">
                <thead>
                <tr className="tableRowDoctor">
                  <th className="tableHeader">Doctor</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Id</th>
                  <th>Specialist</th>
                  <th>Experience</th>
                  <th>Age</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody className="tableBody">
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td><img src={`data:image/jpeg;base64,${doctor.photo}`} alt="doctor" width="70px"/></td>
                    <td>{doctor.firstName}</td>
                    <td>{doctor.lastName}</td>
                    <td>{doctor.emailId}</td>
                    <td>{doctor.specialist}</td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.age}</td>
                    <td>{doctor.contactNo}</td>
                    <td>{`${doctor.street}, ${doctor.city} - ${doctor.pincode}`}</td>
                    <td><button className="buttonLogin" onClick={(e) => handleRemoveClick(e, doctor.id)}>Remove</button>
                    <button className="buttonLogin" onClick={(e)=>handleUpdateClick(e, doctor.id)}>Update</button></td>
                  
                  </tr>
                ))}
              </tbody>

              </table>
            </div>
          )}


           
         {showPatients && (
          <div>
            <h2 className="tableHeading">All Patients</h2>
            <table className="tableDoctor">
              <thead>
                <tr className="tableRowDoctor">
                
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Id</th>
                  <th>BloodGroup</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Phone No</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="tableBody">
              {patients.map((patient)=>(
                <tr key={patient.id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.emailId}</td>
                <td>{patient.bloodGroup}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.contactNo}</td>
                <td>{patient.street} {patient.city} - {patient.pincode}</td>
                <td><button className="buttonLogin" onClick={(e)=>{handleRemovePatient(e, patient.id)}}>Remove</button></td>
              </tr>
              ))}

              </tbody>
            </table>

          </div>

         )}


         {showAppointments && (
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
                        <td>
                          {
                          appointment.appointmentStatus==="Cancelled" ?(
                            <button className="buttonLogin" disabled>Cancelled</button>
                          ):
                          (appointment.appointmentStatus ==="Assigned" || appointment.appointmentStatus ==="Treatment Done") ?(
                            <button className="buttonLogin" disabled>AssignedToDoctor</button>
                          ):
                          (appointment.appointmentStatus ==="Not Assigned to Doctor") &&(
                            <button className="buttonLogin" onClick={()=>{handleAssign(appointment.id, appointment)}}>AssignToDoctor</button>
                          )}
                        </td>

                      </tr>
                      
                    ))}
                  </tbody>
              </table>
            </div>
         )}

         {showAssign &&(
          <div>
          
            <form className="assignForm" onSubmit={handleAssignSubmit}>
            <h2 className="assignHeader">Assign Doctor</h2>
            <label htmlFor="patientName" className="assignLabel">Patient Name</label>
            <input type="text" id="patientName" name="patientName" className="assignInput" value={selectedAppointment.patientName}></input>

            <label htmlFor="problem" className="assignLabel">Problem Description</label>
            <textarea type="text" id="problem" name="problem" className="assignInput" value={selectedAppointment.problem}></textarea>


            <label htmlFor="appointmentDate" className="assignLabel">Appointment Date</label>
            <input type="date" id="appointmentDate" name="appointmentDate" className="assignInput" value={selectedAppointment.appointmentDate}></input>

            <label htmlFor="doctorName" className="assignLabel">Doctor</label>
            <select id="doctorName" name="doctorName" className="assignInput" value={assign.doctorName} onChange={handleDoctorAssign}>
              <option value="">Select Doctor</option>
              <option value="Williamson">Williamson</option>
              <option value="Stella">Stella</option>
              <option value="Sandra">Sandra</option>
              <option value="Henry">Henry</option>
              <option value="Robertson">Robertson</option>
            </select>

            <button className="buttonAssign" type="submit">Assign Doctor</button>
            </form>
          </div>
         )}
    
        
          </div>
    </React.Fragment>
  )
}

export default AdminPage;