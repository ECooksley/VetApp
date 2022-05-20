package main.java.jdbc;

import java.sql.*;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import main.java.model.Animal;
import main.java.model.Request;
import main.java.model.User;

public class AnimalDBC {
	private Connection conn;
	private Statement stmt;
	private PreparedStatement prepStmt;
	private ResultSet rs;
	private Gson gs;
	
	public AnimalDBC(Connection conn) {
		this.conn= conn;
		gs = new GsonBuilder().serializeNulls().create();
	}
	
	public String getAnimals() {
		try {
			ArrayList<Animal> animals = new ArrayList<Animal>();
			String query = "SELECT * from Animal";
			Statement stmt = conn.createStatement();
			rs = stmt.executeQuery(query);
			
			while(rs.next()) {
				String name = rs.getString("AnimalName");
				int id = rs.getInt("AnimalID");
				int request = rs.getInt("Request");
				String species = rs.getString("Species");
				String breed = rs.getString("Breed");
				float weight = rs.getFloat("Weight");
				Date birthdate = rs.getDate("BirthDate");
				String sex = rs.getString("Sex");
				String colour = rs.getString("Colour");
				String healthstatus = rs.getString("HealthStatus");
				String tattoo = rs.getString("Tattoo");
				String microchip = rs.getString("Microchip");
				String url = rs.getString("ProfileURL");
				
				Animal animal = new Animal(name, species);
				animal.setId(id);
				animal.setStatus(request);
				animal.setBreed(breed);
				animal.setWeight(weight);
				animal.setBirthDate(birthdate);
				animal.setSex(sex);
				animal.setColour(colour);
				animal.setHealthStatus(healthstatus);
				animal.setTattoo(tattoo);
				animal.setMicrochip(microchip);
				animal.setProfileURL(url);
				
				animals.add(animal);
			}
			String json = gs.toJson(animals);
			return json;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String getAnimalByID(int id) {
		try {
			String query = "SELECT * from Animal where AnimalID = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			rs = pStat.executeQuery();
			if (rs.next()) {
				String name = rs.getString("AnimalName");
				int aId = rs.getInt("AnimalID");
				int request = rs.getInt("Request");
				String species = rs.getString("Species");
				String url = rs.getString("ProfileURL");
				Animal animal = new Animal(name, species);
				animal.setId(aId);
				animal.setStatus(request);
				String breed = rs.getString("Breed");
				animal.setBreed(breed);
				float weight = rs.getFloat("Weight");
				animal.setWeight(weight);
				Date bDate = rs.getDate("BirthDate");
				animal.setBirthDate(bDate);
				String sex = rs.getString("Sex");
				animal.setSex(sex);
				String colour = rs.getString("Colour");
				animal.setColour(colour);
				String hStatus = rs.getString("HealthStatus");
				animal.setHealthStatus(hStatus);
				String tattoo = rs.getString("Tattoo");
				animal.setTattoo(tattoo);
				String mChip = rs.getString("MicroChip");
				animal.setMicrochip(mChip);
				String pURL = rs.getString("ProfileURL");
				animal.setProfileURL(pURL);
				String json = gs.toJson(animal);
				return json;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return "Animal " + id + " not found.";
	}
	

	public String getFeaturesByID(int id) {
		try {
			ArrayList<String> features = new ArrayList<String>();
			String query = "SELECT Feature FROM ANIMAL NATURAL JOIN DIST_FEATURES where AnimalID = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			ResultSet res = pStat.executeQuery();
			while (res.next()) {
				String feature = res.getString("Feature");
				features.add(feature);
			}
			String json = gs.toJson(features);
			return json;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	public String searchAnimals(String searchQuery) {
		try {
			ArrayList<Animal> animals = new ArrayList<Animal>();
			
			String query = "SELECT DISTINCT AnimalName, AnimalID, Request, Species, Breed, Weight, BirthDate, Sex, Colour, HealthStatus, Tattoo, Microchip, ProfileURL from Animal NATURAL JOIN Dist_Features WHERE (AnimalName = ? OR Species = ? OR Breed = ? "
					+ "OR Sex = ? OR Colour = ? OR HealthStatus = ? OR Tattoo = ? OR Microchip = ? OR Feature = ?)";
//			String query = "SELECT * from Animal WHERE AnimalName=?";
			
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setString(1, searchQuery);
			pStat.setString(2, searchQuery);
			pStat.setString(3, searchQuery);
			pStat.setString(4, searchQuery);
			pStat.setString(5, searchQuery);
			pStat.setString(6, searchQuery);
			pStat.setString(7, searchQuery);
			pStat.setString(8, searchQuery);
			pStat.setString(9, searchQuery);
			
			rs = pStat.executeQuery();
			
			while(rs.next()) {
				String name = rs.getString("AnimalName");
				int id = rs.getInt("AnimalID");
				int request = rs.getInt("Request");
				String species = rs.getString("Species");
				String breed = rs.getString("Breed");
				float weight = rs.getFloat("Weight");
				Date birthdate = rs.getDate("BirthDate");
				String sex = rs.getString("Sex");
				String colour = rs.getString("Colour");
				String healthstatus = rs.getString("HealthStatus");
				String tattoo = rs.getString("Tattoo");
				String microchip = rs.getString("Microchip");
				String url = rs.getString("ProfileURL");
				
				Animal animal = new Animal(name, species);
				animal.setId(id);
				animal.setStatus(request);
				animal.setBreed(breed);
				animal.setWeight(weight);
				animal.setBirthDate(birthdate);
				animal.setSex(sex);
				animal.setColour(colour);
				animal.setHealthStatus(healthstatus);
				animal.setTattoo(tattoo);
				animal.setMicrochip(microchip);
				animal.setProfileURL(url);
				
				animals.add(animal);
			}
			String json = gs.toJson(animals);
			return json;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	

	public String updateAnimal(String json) {
		try {
			Animal animal = gs.fromJson(json, Animal.class);
			String query = "UPDATE ANIMAL SET Species = ?, AnimalName = ?, Breed = ?, Weight = ?, BirthDate = ?, Sex = ?, "
					+ "Colour = ?, HealthStatus = ?, Tattoo = ?, Microchip = ? WHERE AnimalID = ?";
			prepStmt = conn.prepareStatement(query);
			prepStmt.setString(1, animal.getSpecies());
			prepStmt.setString(2, animal.getName());
			prepStmt.setString(3, animal.getBreed());
			prepStmt.setFloat(4, animal.getWeight());
			prepStmt.setDate(5, animal.getBirthDate());
			prepStmt.setString(6, animal.getSex());
			prepStmt.setString(7, animal.getColour());
			prepStmt.setString(8, animal.getHealthStatus());
			prepStmt.setString(9, animal.getTattoo());
			prepStmt.setString(10, animal.getMicrochip());
			prepStmt.setInt(11, animal.getId());
			prepStmt.executeUpdate();
			return "Updated animal: " + animal.getId();
		} catch (SQLException e) {
			e.printStackTrace();
			return "Problem with updating animal";
		}
	}
	
	public String insertNewAnimal(String json) {
		try {
			Gson gson = new Gson();
			Animal animal = gson.fromJson(json, Animal.class);
			animal.setBirthDateFromMS();
			String query = "INSERT INTO ANIMAL (Species, AnimalName, Breed, Weight, BirthDate, Sex, Colour) VALUES (?,?,?,?,?,?,?)";
			prepStmt = conn.prepareStatement(query);
			prepStmt.setString(1, animal.getSpecies());
			prepStmt.setString(2, animal.getName());
			prepStmt.setString(3, animal.getBreed());
			prepStmt.setFloat(4, animal.getWeight());
			prepStmt.setDate(5, animal.getBirthDate());
			prepStmt.setString(6, animal.getSex());
			prepStmt.setString(7, animal.getColour());
			prepStmt.executeUpdate();
			return "Successfully added new animal";
			
			
			
		} catch (SQLException e) {
			return "Problem adding new animal: " + e;
		}
	}
	
	public String insertFeature(String newFeature, int id) {
		try {
			String query = "INSERT INTO DIST_FEATURES VALUES (?,?)";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			pStat.setString(2, newFeature);
			int rowCount = pStat.executeUpdate();
			return rowCount > 0 ? "Successfully inserted feature" : "Feature was not inserted";
		} catch (SQLException e) {
			e.printStackTrace();
			return "Something went wrong";
		}
	}
	
	
	public String removeFeature(String feature, int id) {
		try {
			String query = "DELETE from DIST_FEATURES where AnimalID = ? AND Feature = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			pStat.setString(2, feature);
			int rowCount = pStat.executeUpdate();
			return rowCount > 0 ? "Successfully deleted feature" : "Feature was not deleted";
		} catch(SQLException e) {
			e.printStackTrace();
			return "Something went wrong";
		}
	}
	
	
	

	
}
