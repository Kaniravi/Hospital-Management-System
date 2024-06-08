package com.project.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entity.Appointment;
import com.project.Entity.Doctor;
import com.project.Repository.AppointmentRepository;
import com.project.Repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	 @Transactional 
	public Doctor registerDoctor(Doctor doctor) {
		return doctorRepository.save(doctor);
	}

	 
	 @Transactional
	 public List<Doctor> getDoctors(){
		 return doctorRepository.findAll();
	 }
	 
	 @Transactional
	 public void removeDoctor(Long id) {
		doctorRepository.deleteById(id);
	 }
	 
	 @Transactional
	 public Optional<Doctor> getDoctorById(Long id){
		 return doctorRepository.findById(id);
	 }


	@Override
	public void saveDoctor(Doctor doctor) {
		doctorRepository.save(doctor);
		
	}


	@Override
	public Optional<Doctor> getDoctorById(String emailId) {
		return doctorRepository.findByEmailId(emailId);
	}


	@Override
	public Optional<Appointment> getDoctorByDoctorName(String doctorName) {
		return appointmentRepository.findDoctorByDoctorName(doctorName);
	}


	@Override
	public Optional<Appointment> getAppointmentById(Long id) {
		return appointmentRepository.findById(id);
	}


	@Override
	public void saveAppointment(Appointment found) {
		 appointmentRepository.save(found);
		
	}
	 
	 
}
