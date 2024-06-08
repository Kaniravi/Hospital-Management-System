package com.project.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.Builder;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String patientName;
	private String patientContact;
	private String problem;
	private String doctorName;
	private String prescription;
	private String appointmentTakeDate;
	private String appointmentDate;
	private String appointmentStatus;
	private String appointmentPrice;
	
}
