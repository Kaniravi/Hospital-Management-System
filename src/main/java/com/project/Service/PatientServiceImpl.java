package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entity.Appointment;
import com.project.Entity.Patient;
import com.project.Repository.AppointmentRepository;
import com.project.Repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService {
	
	 @Autowired
	 private PatientRepository patientRepository;
	 
	 @Autowired
	 private AppointmentRepository appointmentRepository;

     public Patient register(Patient patient) {
		return patientRepository.save(patient);
	}

	@Override
	public List<Patient> getPatients() {
		return patientRepository.findAll();
	}

	@Override
	public void removePatient(Long id) {
		patientRepository.deleteById(id);
		
	}

	@Override
	public Optional<Patient> getPatient(String emailId) {
		return patientRepository.findByEmailId(emailId);
	}

	@Override
	public Optional<Patient> getPatientByFirstName(String firstName) {
		return patientRepository.findByFirstName(firstName);
	}

	@Override
	public Appointment takeAppointment(Appointment appointment) {
		return appointmentRepository.save(appointment);
	}

	@Override
	public List<Appointment> getAppointments() {
		return appointmentRepository.findAll();
	}

	@Override
	public void cancelAppointment(Long id) {
		appointmentRepository.deleteById(id);
		
	}

	@Override
	public Optional<Appointment> getAppointmentById(Long id) {
		return appointmentRepository.findById(id);
	}

	@Override
	public Optional<Appointment> getAppointments(String patientName) {
		return appointmentRepository.findByPatientName(patientName);
	}
}
