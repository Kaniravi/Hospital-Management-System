import React from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import RegisterDoctor from "./Admin/RegisterDoctor";
import { useNavigate } from "react-router-dom";

const Home = () =>{
  const navigate = useNavigate();
  const RegisterAdmin = () =>{
      navigate(`/admin/adminRegister`);
  }

  const RegisterPatient = () =>{
    navigate(`/patient/registerPatient`);
  }
  return(
      <React.Fragment>
        <div className="form">
        <div className="container">
            <div className="navbar">
              <img src="./image/logo.jpg" width="30px" height="40px" ></img>
              <a href="#">HospitalManagementSystem</a>
              <a href="#">About Us</a>
              <a href="#">Contact Us</a>

              <div className="login">
                 <Link to ="/login">View Patient</Link>
                <Link to="/login">View Doctors</Link>
                <a href="/login">Check All Appointments</a>
                <Link to="/login">Register Doctor</Link>
                <Link to="/user/userLogin">Login</Link>
                <Link to="/">Logout</Link>
              </div>

            </div>
          
        </div>
        <div className="firstRow">
          <div className="col1">
              <img src="./image/1.jpg"></img>
          </div>
          <div className="col2">
            <img src="./image/2.jpg"></img>
          </div>
        </div>

        <div className="doctors">
  <div className="col3">
    <img src="./image/d1.jpg"></img>
    <div className="doctorInfo">
      <h4>Williamson</h4>
      <h5>Specialist: Dermatologist</h5>
      <h6>Experience: 2</h6>
      <h6>Age: 30</h6>
    </div>
  </div>
  <div className="col3">
    <img src="./image/d2.jpg"></img>
    <div className="doctorInfo">
      <h4>Stella</h4>
      <h5>Specialist: Neurologist</h5>
      <h6>Experience: 4</h6>
      <h6>Age: 28</h6>
    </div>
  </div>
  <div className="col3">
    <img src="./image/d3.jpg"></img>
    <div className="doctorInfo">
      <h4>Sandra</h4>
      <h5>Specialist: Dentist</h5>
      <h6>Experience: 1</h6>
      <h6>Age: 25</h6>
    </div>
  </div>
  <div className="col3">
    <img src="./image/d4.jpg"></img>
    <div className="doctorInfo">
      <h4>Henry</h4>
      <h5>Specialist: Cardiologist</h5>
      <h6>Experience: 10</h6>
      <h6>Age: 50</h6>
    </div>
  </div>
  <div className="col3">
    <img src="./image/d5.jpg"></img>
    <div className="doctorInfo">
      <h4>Robertson</h4>
      <h5>Specialist: Physiotheraphy</h5>
      <h6>Experience: 7</h6>
      <h6>Age: 39</h6>
    </div>
  </div>
  <hr></hr>
  <div className="footer">
    <div className="col4">
      <h3>HOSPITAL MANAGEMENT</h3>
      <p>The Hospital Mangement helps register complete patient information. It captures and stores the medical history, treatment required, details of their previous visits, upcoming appointments if any, reports, insurance details and more. It helps eliminate the need to get these detials on every visit.</p>
      
    </div>
    <div className="col4">
      <h3>ABOUT US</h3>
      <a href='#'>Link1</a>
      <a href='#'>Link2</a>
      <a href='#'>Link3</a>
      <a href='#'>Link4</a>
    </div>

    <div className="col4">
      <h3>CONTACT US</h3>
      <a href='#'>Link1</a>
      <a href='#'>Link2</a>
      <a href='#'>Link3</a>
      <a href='#'>Link4</a>
    </div>

    <div className="col4">
      <h3>CAREERS</h3>
      <a href='#'>Link1</a>
      <a href='#'>Link2</a>
      <a href='#'>Link3</a>
      <a href='#'>Link4</a>
    </div>

    <div className="col4">
      <h3>LINKS</h3>
      <a href='#'>Link1</a>
      <a href='#'>Link2</a>
      <a href='#'>Link3</a>
      <a href='#'>Link4</a>
    </div>
  </div>
  <hr></hr>
  <div className="bottom">
    <h3>Register for free: </h3>
    <h3>Admin</h3>
    <button className="button" onClick={RegisterAdmin}>Sign Up </button><br></br>
    <br></br>
    
    <h3>  Patient</h3>
    <button className="button" onClick={RegisterPatient}>Sign Up</button>

  </div>
  <hr className="footerHr"></hr>
</div>
</div>


        
        
      </React.Fragment>
  )
}

export default Home;