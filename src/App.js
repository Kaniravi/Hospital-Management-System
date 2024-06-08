import './App.css';
import Home from './Home';
import AdminRegister from './Admin/AdminRegister';
import AdminPage from './Admin/AdminPage';
import Login from './Login';
import RegisterDoctor from './Admin/RegisterDoctor';
import UpdateDoctor from './Admin/UpdateDoctor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPatient from './Patient/RegisterPatient';
import PatientPage from './Patient/PatientPage';
import DoctorPage from './Doctor/DoctorPage';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/admin/adminRegister" element={<AdminRegister />} />
          <Route path="/user/userLogin" element ={<Login/>} />
          <Route path="/adminPage/:adminName" element ={<AdminPage />} />
          <Route path ="/adminPage/:adminName/doctorRegister" element ={<RegisterDoctor/>} />
          <Route path="/doctorRegister" element ={<RegisterDoctor/>} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/adminPage/:adminName/updateDoctor/:id" element={<UpdateDoctor/>}></Route>
          <Route path="/patient/registerPatient" element ={<RegisterPatient/>} />
          <Route path="/patientPage/:patientName" element ={<PatientPage/>} />
          <Route path ="/patientPage/:patientName/appointment" element ={<PatientPage/>} />
          <Route path="/patientPage/:patientName/myAppointments" element={<PatientPage/>}/>
          <Route path="/patientPage" element={<PatientPage/>}/>
          <Route path="/adminPage/:adminName/checkAppointments" element={<AdminPage/>} />
          <Route path="/admin/:id/assignDoctor" element ={<AdminPage/>} />
          <Route path="/adminPage/:adminName/:id/assignDoctor" element={<AdminPage/>}/>
          <Route path ="/doctorPage/:doctorName" element ={<DoctorPage/>} />
          <Route path="/doctorPage/:doctorName/myAppointments" element={<DoctorPage/>}/>
          <Route path="/doctorPage/:doctorName/:id/update" element={<DoctorPage/>}/>
          <Route path="/adminPage/:adminName" element ={<AdminPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
