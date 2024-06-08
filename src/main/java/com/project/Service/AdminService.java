package com.project.Service;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.project.Entity.Admin;
import com.project.Entity.Appointment;

@Service
public interface AdminService {
	public Admin saveAdmin(Admin admin);
	
	public Optional<Admin> getAdminByEmailId(String emailId);

	public Optional<Appointment> getAppointmentById(Long id);

	public Appointment saveAppointment(Appointment foundAppointment);

	
	
}
