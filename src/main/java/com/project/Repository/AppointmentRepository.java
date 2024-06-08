package com.project.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.Entity.Appointment;
import com.project.Entity.Doctor;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

	

	Optional<Appointment> findDoctorByDoctorName(String doctorName);

	Optional<Appointment> findByPatientName(String patientName);

}
