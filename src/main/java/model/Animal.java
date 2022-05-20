package main.java.model;

import java.sql.Date;

public class Animal {
	
	private String name;
	private int id;
	private int status;
	private String species;
	private String breed;
	private float weight;
	private Date BirthDate;
	private String sex;
	private String colour;
	private String HealthStatus;
	private String tattoo;
	private String microchip;
	private String profileURL;
	private long BirthDateMS;
	
	public Animal(String name, String species) {
		setName(name);
		setSpecies(species);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	public String getProfileURL() {
		return profileURL;
	}

	public void setProfileURL(String profileURL) {
		this.profileURL = profileURL;
	}

	public String getBreed() {
		return breed;
	}

	public void setBreed(String breed) {
		this.breed = breed;
	}

	public Date getBirthDate() {
		return BirthDate;
	}

	public void setBirthDate(Date birthDate) {
		BirthDate = birthDate;
	}
	
	public void setBirthDateFromMS() {
		this.BirthDate = new Date(this.BirthDateMS);
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getColour() {
		return colour;
	}

	public void setColour(String colour) {
		this.colour = colour;
	}

	public String getHealthStatus() {
		return HealthStatus;
	}

	public void setHealthStatus(String healthStatus) {
		HealthStatus = healthStatus;
	}

	public String getTattoo() {
		return tattoo;
	}

	public void setTattoo(String tattoo) {
		this.tattoo = tattoo;
	}

	public String getMicrochip() {
		return microchip;
	}

	public void setMicrochip(String microchip) {
		this.microchip = microchip;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

}
