package main.java.model;

import java.sql.Date;

public class User {
	private int userID;
	private Date activationDate;
	private String email;
	private int role;
	private String name;
	private String password;
	private String profileURL;
	
	public User(int userID, Date activationDate, String email, int role, String name, String password, String profileURL) {
		this.userID = userID;
		this.activationDate = activationDate;
		this.setEmail(email);
		this.setRole(role);
		this.setName(name);
		this.setPassword(password);
		this.setProfileURL(profileURL);
	}

	public int getUserID() {
		return userID;
	}

	public Date getActivationDate() {
		return activationDate;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getRole() {
		return role;
	}

	public void setRole(int role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfileURL() {
		return profileURL;
	}

	public void setProfileURL(String profileURL) {
		this.profileURL = profileURL;
	}
	
	public static String getRoleString(int i) {
		switch (i) {
		case 1:
            return "Student";
        case 2:
            return "Care Attendant";
        case 3:
            return "Health Technician";
        case 4:
            return "Teaching Technician";
        case 5:
            return "Admin";
        default:
            return "Unknown";
		}
	}
	
	public static int getRoleNumber(String s) {
		switch (s) {
		case "Student":
			return 1;
		case "Care Attendant":
			return 2;
		case "Health Technician":
			return 3;
		case "Teaching Technician":
			return 4;
		case "Admin":
			return 5;
		default:
			return 0;
		}
	}
	
}
