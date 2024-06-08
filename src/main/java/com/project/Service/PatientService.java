package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.Entity.Appointment;
import com.project.Entity.Patient;

@Service
public interface PatientService {
	public Patient register(Patient patient);

	public List<Patient> getPatients();

	public void removePatient(Long id);

	public Optional<Patient> getPatient(String emailId);

	public Optional<Patient> getPatientByFirstName(String firstName);

	public Appointment takeAppointment(Appointment appointment);

	public List<Appointment> getAppointments();

	public void cancelAppointment(Long id);

	public Optional<Appointment> getAppointmentById(Long id);

	public Optional<Appointment> getAppointments(String patientName);
}	
