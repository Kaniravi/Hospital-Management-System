package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.project.Entity.Appointment;
import com.project.Entity.Doctor;

import jakarta.transaction.Transactional;

@Service
public interface DoctorService {
	public Doctor registerDoctor(Doctor doctor);
	
	public List<Doctor> getDoctors();
	
	@Transactional
	public void removeDoctor(Long id);

	
	@Transactional
	public Optional<Doctor> getDoctorById(Long id);

	public void saveDoctor(Doctor doctor);

	public Optional<Doctor> getDoctorById(String emailId);

	public Optional<Appointment> getDoctorByDoctorName(String doctorName);

	public Optional<Appointment> getAppointmentById(Long id);

	public void saveAppointment(Appointment found);
	
	
}
