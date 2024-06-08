package com.project.Entity;


import javax.persistence.Table;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

@Table(name="admin")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	
	
	private String firstName;
	private String lastName;
	private String emailId;
	private String password;
	private String gender;
	private String bloodGroup;
	private String age;
	private String contactNo;
	private String street;
	private String city;
	private String pincode;
}
