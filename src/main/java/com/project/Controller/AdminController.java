package com.project.Controller;
import java.util.Base64;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Optional;
import java.sql.Blob;
import javax.imageio.ImageIO;
import javax.sql.rowset.serial.SerialBlob;
import javax.sql.rowset.serial.SerialException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.project.Entity.Admin;
import com.project.Entity.Appointment;
import com.project.Entity.Doctor;
import com.project.Service.AdminService;
import com.project.Service.DoctorService;
import com.project.Service.PatientService;

import jakarta.transaction.Transactional;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired
    private AdminService adminService;
    
    @Autowired
    private DoctorService doctorService;
    
    @Autowired
    private PatientService patientService;
    
    @PostMapping("/adminRegister")
    public Admin saveAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }
    
    @GetMapping("/getAdmin/{emailId}")
    public ResponseEntity<Admin> getAdminByEmailId(@PathVariable String emailId){
        Optional<Admin> admin = adminService.getAdminByEmailId(emailId);
        
        if(admin.isPresent()) {
            System.out.print(admin);
            return ResponseEntity.ok(admin.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/registerDoctor")
    public Doctor registerDoctor(@RequestParam("photo") MultipartFile photo,
                                 @RequestParam("firstName") String firstName,
                                 @RequestParam("lastName") String lastName,
                                 @RequestParam("emailId") String emailId,
                                 @RequestParam("password") String password,
                                 @RequestParam("gender") String gender,
                                 @RequestParam("specialist") String specialist,
                                 @RequestParam("experience") String experience,
                                 @RequestParam("contactNo") String contactNo,
                                 @RequestParam("age") String age,
                                 @RequestParam("street") String street,
                                 @RequestParam("city") String city,
                                 @RequestParam("pincode") String pincode) throws IOException {
        Doctor doctor = new Doctor();
        // Convert photo to byte array
        byte[] bytes = photo.getBytes();

        // Encode the byte array to Base64 string
		String encodedImage = Base64.getEncoder().encodeToString(bytes);
        

		// Set the encoded image string and other attributes in the Doctor object
		doctor.setPhoto(encodedImage);
		doctor.setFirstName(firstName);
		doctor.setLastName(lastName);
		doctor.setEmailId(emailId);
		doctor.setPassword(password);
		doctor.setGender(gender);
		doctor.setSpecialist(specialist);
		doctor.setContactNo(contactNo);
		doctor.setExperience(experience);
		doctor.setAge(age);
		doctor.setStreet(street);
		doctor.setCity(city);
		doctor.setPincode(pincode);

		// Call the service to register the Doctor
		Doctor newDoctor = doctorService.registerDoctor(doctor);
		return newDoctor;
    }
    
    @Transactional
    @DeleteMapping("/deleteDoctor/{id}")
    public void removeDoctor(@PathVariable Long id) {
    	doctorService.removeDoctor(id);
    }
    
    @Transactional
    @GetMapping("/getDoctorById/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id){
    	Optional<Doctor> doctor = doctorService.getDoctorById(id);
    	if(doctor.isPresent()) {
    		return ResponseEntity.ok(doctor.get());
    	}
    	else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    @PutMapping("/updateDoctor/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
    	Optional<Doctor> updatedDoctor = doctorService.getDoctorById(id);
    	if(updatedDoctor.isPresent()) {
    		updatedDoctor.get().setFirstName(doctor.getFirstName());
    		updatedDoctor.get().setLastName(doctor.getLastName());
    		updatedDoctor.get().setEmailId(doctor.getEmailId());
    		updatedDoctor.get().setPassword(doctor.getPassword());
    		updatedDoctor.get().setAge(doctor.getAge());
    		updatedDoctor.get().setExperience(doctor.getExperience());
    		updatedDoctor.get().setCity(doctor.getCity());
    		updatedDoctor.get().setContactNo(doctor.getContactNo());
    		updatedDoctor.get().setGender(doctor.getGender());
    		updatedDoctor.get().setPincode(doctor.getPincode());
    		updatedDoctor.get().setStreet(doctor.getStreet());
    		updatedDoctor.get().setSpecialist(doctor.getSpecialist());
    		updatedDoctor.get().setPhoto(doctor.getPhoto());
    		
    		doctorService.saveDoctor(updatedDoctor.get());
    		return ResponseEntity.ok(updatedDoctor.get());
    		
    	}
    	else {
    		return ResponseEntity.notFound().build();
    	}
    }
    
    @DeleteMapping("/removePatient/{id}")
    public void removePatient(@PathVariable Long id) {
    	patientService.removePatient(id);
    }
    
    @PutMapping("/updateAppointment/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment updatedAppointment){
    	Optional<Appointment> appointment = adminService.getAppointmentById(id);
    	if(appointment.isPresent()) {
    		Appointment foundAppointment = appointment.get();
    		foundAppointment.setAppointmentPrice(updatedAppointment.getAppointmentPrice());
    		foundAppointment.setDoctorName(updatedAppointment.getDoctorName());
    		foundAppointment.setAppointmentStatus(updatedAppointment.getAppointmentStatus());
    		foundAppointment.setPrescription(updatedAppointment.getPrescription());
    		
    		Appointment appointmentUpdate = adminService.saveAppointment(foundAppointment);
    		
    		return ResponseEntity.ok(appointmentUpdate);
    		
    	}
    	else {
    		return ResponseEntity.notFound().build();
    	}
    }
}
