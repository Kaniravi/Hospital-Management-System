package com.project.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.project.Entity.Appointment;
import com.project.Entity.Doctor;
import com.project.Service.DoctorService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/doctor")
public class DoctorController {
	
	@Autowired
	private DoctorService doctorService;
	
	
	
	@GetMapping("/getDoctors")
	public List<Doctor> getDoctors(){
		List<Doctor> doctorList = doctorService.getDoctors();
		return doctorList;
	}
	
	@GetMapping("/getDoctor/{emailId}")
	public ResponseEntity<Doctor> getDoctor(@PathVariable String emailId){
		Optional<Doctor> doctor = doctorService.getDoctorById(emailId);
		if(doctor.isPresent()) {
			return ResponseEntity.ok(doctor.get());
			
		}
		else {
			return ResponseEntity.notFound().build();
		}
		
	}
	@GetMapping("/getDoctorAppointmentByDoctorName/{doctorName}")
	public ResponseEntity<Appointment> getDoctorByFirstName(@PathVariable String doctorName){
		Optional<Appointment> doctor = doctorService.getDoctorByDoctorName(doctorName);
		if(doctor.isPresent()) {
			return ResponseEntity.ok(doctor.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/updateAppointment/{id}")
	public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id,@RequestBody Appointment updatedAppointment) {
		Optional<Appointment> appointment = doctorService.getAppointmentById(id);
		if(appointment.isPresent()) {
			Appointment found = appointment.get();
			found.setAppointmentPrice(updatedAppointment.getAppointmentPrice());
			found.setPrescription(updatedAppointment.getPrescription());
			found.setAppointmentStatus(updatedAppointment.getAppointmentStatus());
			
			doctorService.saveAppointment(found);
			return ResponseEntity.ok(found);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}

}
