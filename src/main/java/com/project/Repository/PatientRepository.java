package com.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
	public Optional<Patient> findByEmailId(String emailId);

	public Optional<Patient> findByFirstName(String firstName);
}
