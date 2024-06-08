package com.project.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import com.project.Entity.Admin;
import com.project.Entity.Appointment;
import com.project.Repository.AdminRepository;
import com.project.Repository.AppointmentRepository;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
    @Transactional 
	public Admin saveAdmin(Admin admin) {
		return adminRepository.save(admin);
	}

	@Override
	public Optional<Admin> getAdminByEmailId(String emailId) {
	     return adminRepository.findByEmailId(emailId);	
	}

	@Override
	public Optional<Appointment> getAppointmentById(Long id) {
		return appointmentRepository.findById(id);
	}

	@Override
	public Appointment saveAppointment(Appointment foundAppointment) {
		return appointmentRepository.save(foundAppointment);
	}

	
	
	
}
