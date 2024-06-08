package com.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Long> {

	
	public Doctor deleteByEmailId(String emailId);
	public Optional<Doctor> findByEmailId(String emailId);
	public Optional<Doctor> findDoctorByFirstName(String firstName);
}
