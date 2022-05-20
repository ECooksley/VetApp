package main.java.jdbc;

import java.sql.*;
import java.util.ArrayList;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import main.java.model.User;

public class UserDBC {
	private Connection conn;
	private Statement stmt;
	private PreparedStatement prepStmt;
	private ResultSet rs;
	private Gson gson;
	public UserDBC(Connection conn) {
		this.conn = conn;
		gson = buildGson();
	}
	
	private Gson buildGson() {
		ExclusionStrategy strategy = new ExclusionStrategy() {

			@Override
			public boolean shouldSkipField(FieldAttributes f) {
				if (f.getDeclaringClass() == User.class && f.getName().equals("password")) return true;
				return false;
			}
			@Override
			public boolean shouldSkipClass(Class<?> clazz) {
				return false;
			}
		};
		return new GsonBuilder().addSerializationExclusionStrategy(strategy).create();
	}
	
	public String getAllUsers() {
		try {
			ArrayList<User> users = new ArrayList<User>();
			stmt = conn.createStatement();
			String query = "SELECT * from USERS WHERE Request = 0";
			rs = stmt.executeQuery(query);
			while (rs.next()) {
				int id = rs.getInt("UserID");
				String name = rs.getString("FullName");
				int userRole = rs.getInt("UserRole");
				String email = rs.getString("Email");
				String password = rs.getString("Passwd");
				Date activationDate = rs.getDate("ActivationDate");
				String profileURL = rs.getString("ProfileURL");
				User user = new User(id, activationDate, email, userRole, name, password, profileURL);
				users.add(user);
			}
			return gson.toJson(users);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String getUserById(int id) {	
		try {
			String query = "SELECT * from USERS WHERE UserID = ?";
			prepStmt = conn.prepareStatement(query);
			prepStmt.setInt(1, id);
			rs = prepStmt.executeQuery();
			rs.next();
			String name = rs.getString("FullName");
			int userRole = rs.getInt("UserRole");
			String email = rs.getString("Email");
			String password = rs.getString("Passwd");
			Date activationDate = rs.getDate("ActivationDate");
			String profileURL = rs.getString("ProfileURL");
			User user = new User(id, activationDate, email, userRole, name, password, profileURL);
			return gson.toJson(user);
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String insertNewUser(String json) {
		try {
			User user = gson.fromJson(json, User.class);
			String query = "INSERT INTO USERS (UserID, FullName, UserRole, Email, Passwd, ActivationDate) VALUES (?,?,?,?,?,?)";
			prepStmt = conn.prepareStatement(query);
			prepStmt.setInt(1, user.getUserID());
			prepStmt.setString(2, user.getName());
			prepStmt.setInt(3, user.getRole());
			prepStmt.setString(4,  user.getEmail());
			prepStmt.setString(5, user.getPassword());
			prepStmt.setDate(6, new java.sql.Date(System.currentTimeMillis()));
			prepStmt.executeUpdate();
			return "Successfully added new user";
			
			
			
		} catch (SQLException e) {
			return "Problem adding new user: " + e;
		}
	}
	
	public String removeUser(int id) {
		try {
			String query = "DELETE FROM USERS WHERE UserID = ?";
			prepStmt = conn.prepareStatement(query);
			prepStmt.setInt(1, id);
			int rowCount = prepStmt.executeUpdate();
			return (rowCount > 0) ? ("Successfully removed user " + id) : ("No user matches id " + id);
			//return "" + rowCount;
			
			
		} catch (SQLException e) {
			return "Problem removing user " + id + ": " + e;
		}
	}
	
	public String updateUser(String json) {
		try {
			User user = gson.fromJson(json, User.class);
			String query = "UPDATE USERS SET FullName = ?, UserRole = ?, Email = ?, ProfileURL = ? WHERE UserID = ?";
			prepStmt = conn.prepareStatement(query);
			prepStmt.setInt(5, user.getUserID());
			prepStmt.setString(1, user.getName());
			prepStmt.setInt(2, user.getRole());
			prepStmt.setString(3,  user.getEmail());
			prepStmt.setString(4, user.getProfileURL());
			prepStmt.executeUpdate();
			return "Updated user: " + user.getUserID();
		} catch (SQLException e) {
			return "Problem Updating user: " + e;
		}
	}
	
	public String validate(String email, String inputPass) {
		try {
			String query = "SELECT * FROM USERS WHERE Email = ?";
			prepStmt = conn.prepareStatement(query);
			prepStmt.setString(1, email);
			rs = prepStmt.executeQuery();
			if (rs.next()) {
				int id = rs.getInt("UserID");
				String name = rs.getString("FullName");
				int userRole = rs.getInt("UserRole");
				String password = rs.getString("Passwd");
				Date activationDate = rs.getDate("ActivationDate");
				String profileURL = rs.getString("ProfileURL");
				User user = new User(id, activationDate, email, userRole, name, password, profileURL);
				if (inputPass.equals(user.getPassword())) {
					return gson.toJson(user);
				}
				return ("Invalid password.");
			}
			return ("Invalid username.");
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
