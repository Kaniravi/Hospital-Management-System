package com.project.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.Entity.Appointment;
import com.project.Entity.Patient;
import com.project.Service.PatientService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/patient")
public class PatientController {
	@Autowired
	private PatientService patientService;
	
	@PostMapping("/registerPatient")
	public Patient registerPatient(@RequestBody Patient patient) {
		Patient newPatient = patientService.register(patient);
		return newPatient;
	}
	
	@GetMapping("/getPatients")
	public List<Patient> getPatients(){
		List<Patient> patients = patientService.getPatients();
		return patients;
	}
	
	@GetMapping("/getPatient/{emailId}")
	public ResponseEntity<Patient> getPatient(@PathVariable String emailId){
		Optional<Patient> patient = patientService.getPatient(emailId);
		if(patient.isPresent()) {
			return ResponseEntity.ok(patient.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/getPatientByFirstName/{firstName}")
	public ResponseEntity<Patient> getPatientByFirstName(@PathVariable String firstName){
		Optional<Patient> patient = patientService.getPatientByFirstName(firstName);
		if(patient.isPresent()) {
			return ResponseEntity.ok(patient.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PostMapping("/takeAppointment")
	public Appointment takeAppointment(@RequestBody Appointment appointment) {
	    Appointment newAppointment = patientService.takeAppointment(appointment);
	    return newAppointment;
	}
	@GetMapping("/getAppointments")
	public List<Appointment> getAppointments(){
		List<Appointment> appointment = patientService.getAppointments();
		return appointment;
	}
	
	@GetMapping("/getAppointments/{patientName}")
	public ResponseEntity<Appointment> getAppointments(@PathVariable String patientName){
		Optional<Appointment> appointment = patientService.getAppointments(patientName);
		if(appointment.isPresent()) {
			return ResponseEntity.ok(appointment.get());
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	
	/*
	
	@DeleteMapping("/cancelAppointment/{id}")
	public void cancelAppointment(@PathVariable Long id) {
		patientService.cancelAppointment(id);
	}*/
	
	@PutMapping("/cancelAppointment/{id}")
	public ResponseEntity<Appointment> cancelAppointment(@PathVariable Long id, @RequestBody Appointment appointmentUpdate){
		Optional<Appointment> appointment = patientService.getAppointmentById(id);
		if(appointment.isPresent()) {
			Appointment foundAppointment = appointment.get();
			foundAppointment.setAppointmentStatus(appointmentUpdate.getAppointmentStatus());
			Appointment updatedAppointment = patientService.takeAppointment(foundAppointment);
			return ResponseEntity.ok(updatedAppointment);
			
		}
		else {
			return ResponseEntity.notFound().build();
		}
		
	}
}

