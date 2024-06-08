package com.project.Entity;

import java.sql.Blob;

import javax.sql.rowset.serial.SerialBlob;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	
	
	private String firstName;
	private String lastName;
	private String emailId;
	private String password;
	private String gender;
	private String experience;
	private String specialist;
	private String age;
	private String contactNo;
	private String street;
	private String city;
	private String pincode;
	
	@Column(length = 100000)
	private String photo;
}
