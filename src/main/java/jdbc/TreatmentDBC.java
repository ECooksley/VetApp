package main.java.jdbc;
import java.sql.*;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import main.java.model.Treatment;

public class TreatmentDBC {
	private Connection conn;
	private ResultSet rs;
	private Gson gs;
	
	public TreatmentDBC(Connection conn) {
		this.conn = conn;
		gs = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	}
	
	public String getTreatmentsForAnimal(int id){
		try {
			ArrayList<Treatment> treatments = new ArrayList<Treatment>();
			String query = "SELECT TreatmentID, UserID, FullName, PrescribedDate, TreatmentType, Treat_Description, NotifyDate from treatment natural join users where AnimalID = ?";
			
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			rs = pStat.executeQuery();
			while(rs.next()) {
				int tId = rs.getInt("TreatmentID");
				int uId = rs.getInt("UserID");
				String name = rs.getString("FullName");
				Date prescribedDate = rs.getDate("PrescribedDate");
				String treatmentType = rs.getString("TreatmentType");
				String treatmentDescription = rs.getString("Treat_Description");
				Date notifyDate = rs.getDate("NotifyDate");
				Treatment treatment = new Treatment(tId, uId, name, prescribedDate, treatmentType, treatmentDescription, notifyDate);
				treatments.add(treatment);
			}
			String json = gs.toJson(treatments);
			return json;
			
			
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public String removeTreatment(int id) {
		try {
			String query = "DELETE from Treatment where TreatmentID = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			int rowCount = pStat.executeUpdate();
			return rowCount > 0 ? "Successfully deleted treatment" : "Failed to delete treatment";
		} catch (SQLException e) {
			e.printStackTrace();
			return "Something went wrong";
		}
	}
	
	public String insertTreatment(String json) {
		Treatment treatment = gs.fromJson(json, Treatment.class);
		 try {
			 String query = "INSERT INTO TREATMENT (AnimalID, UserID, PrescribedDate,"
			 		+ " TreatmentType, Treat_Description, NotifyDate) VALUES (?,?,?,?,?,?)";
			 PreparedStatement pStat = conn.prepareStatement(query);
			 pStat.setInt(1, treatment.getAnimalId());
			 pStat.setInt(2, treatment.getUserId());
			 pStat.setDate(3, treatment.getPrescribedDate());
			 pStat.setString(4, treatment.getTreatmentType());
			 pStat.setString(5, treatment.getTreatmentDescription());
			 pStat.setDate(6, treatment.getNotifyDate());
			 int rowCount = pStat.executeUpdate();
			 return rowCount > 0 ? "Successfully inserted treatment" : "Treatment was not inserted";
		 } catch (SQLException e) {
			 e.printStackTrace();
			 return "Something went wrong";
		 }
	}
}
