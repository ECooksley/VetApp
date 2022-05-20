package main.java.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.google.gson.Gson;

import main.java.model.Request;

public class RequestDBC {
	
	Connection conn;
	Statement stmt;
	ResultSet rs;
	Gson gs;
	
	
	public RequestDBC(Connection conn) {
		this.conn= conn;
		gs = new Gson();
	}
	
	public String getRequests(int role) {
		//Role 4 (Teacher), Role 5(Admin), Role 3(Technician)
		//Status 0(Available, 1(Requested), 2(Accepted by Admin), 3(Read), 4(Rejected)
		//if role == 4
		//Get all animal status 1, 2, 3, 4
		//Get all user status 1, 2
		//if role == 5
		//Get all animal status 1
		//Get all user status 1, 2
		//if role == 3
		//get all animal status 2
		try {
			ArrayList<Request> requests = new ArrayList<Request>();
			
			//Animal requests
			String type = "Approve Animal for Lab";
			
			if (role == 4) {
				String query = "SELECT AnimalName, AnimalID, Request from ANIMAL WHERE Request != ?";
				PreparedStatement pStat = conn.prepareStatement(query);
				pStat.setInt(1, 0);
				rs = pStat.executeQuery();
				
				while(rs.next()) {
					String name = rs.getString("AnimalName");
					int id = rs.getInt("AnimalID");
					int status = rs.getInt("Request");
					Request request = new Request(name, id, status, type);
					requests.add(request);
					System.out.println("Request for animal: " + request.getId() + " added.");
				}
			} else if(role == 5) {
				String query = "SELECT AnimalName, AnimalID, Request from ANIMAL WHERE Request = ?";
				PreparedStatement pStat = conn.prepareStatement(query);
				pStat.setInt(1, 1);
				rs = pStat.executeQuery();
				
				while(rs.next()) {
					String name = rs.getString("AnimalName");
					int id = rs.getInt("AnimalID");
					int status = rs.getInt("Request");
					Request request = new Request(name, id, status, type);
					requests.add(request);
					System.out.println("Request for animal: " + request.getId() + " added.");
				}
			} else if(role == 3) {
				String query = "SELECT AnimalName, AnimalID, Request from ANIMAL WHERE Request = ?";
				PreparedStatement pStat = conn.prepareStatement(query);
				pStat.setInt(1, 2);
				rs = pStat.executeQuery();
				
				while(rs.next()) {
					String name = rs.getString("AnimalName");
					int id = rs.getInt("AnimalID");
					int status = rs.getInt("Request");
					Request request = new Request(name, id, status, type);
					requests.add(request);
					System.out.println("Request for animal: " + request.getId() + " added.");
				}
			}
			
			//User requests
			if (role == 4 || role == 5) {
				String query = "SELECT UserID, FullName, Request from USERS WHERE Request = ? OR Request = ?";
				PreparedStatement pStat = conn.prepareStatement(query);
				pStat.setInt(1, 1);
				pStat.setInt(2, 2);
				rs = pStat.executeQuery();
				while (rs.next()) {
					String name = rs.getString("FullName");
					int id = rs.getInt("UserID");
					int status = rs.getInt("Request");
					if (status == 1) type = "Add User";
					if (status == 2) type = "Remove User";
					Request request = new Request(name, id, status, type);
					requests.add(request);
					System.out.println(type + " request for user: " + request.getId() + " added.");
				}
			}
			String json = gs.toJson(requests);
			return json;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	

	public String updateStatus(String json) {
		Request req = gs.fromJson(json, Request.class);
		String type = req.getType();
		int id = req.getId();
		int newStatus = req.getStatus();
		try {
			if (type.equals("Approve Animal for Lab")) {
				String query = "UPDATE ANIMAL SET Request = ? where AnimalID = ?";
				PreparedStatement pStat = conn.prepareStatement(query);
				pStat.setInt(1, newStatus);
				pStat.setInt(2, id);
				int rowCount = pStat.executeUpdate();
				return rowCount > 0 ? "Successfully updated status" : "Status was not updated";
			}
			if (type.equals("Add User") || type.equals("Remove User")) {
				String query = "UPDATE USERS SET Request = ? where UserID = ?";
				PreparedStatement pStat = conn.prepareStatement(query);
				pStat.setInt(1, newStatus);
				pStat.setInt(2, id);
				int rowCount = pStat.executeUpdate();
				return rowCount > 0 ? "Successfully updated status" : "Status was not updated";
			}	
			return "Error: Unknown request type";
		} catch (SQLException e) {
			e.printStackTrace();
			return "Something went wrong";
		}
		
	}
}
