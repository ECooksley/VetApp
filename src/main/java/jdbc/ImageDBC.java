package main.java.jdbc;
import java.sql.*;
import java.util.ArrayList;

import com.google.gson.Gson;

import main.java.model.Image;


public class ImageDBC {
	private Connection conn;
	private ResultSet rs;
	private Gson gs;
	
	public ImageDBC(Connection conn) {
		this.conn = conn;
		gs = new Gson();
	}
	
	public String getImagesForAnimal(int id){
		try {
			ArrayList<Image> images = new ArrayList<Image>();
			String query = "SELECT * FROM IMAGE WHERE AnimalID = ?";
			
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			rs = pStat.executeQuery();
			
			while (rs.next()) {
				int imgId = rs.getInt("ImageID");
				String url = rs.getString("URL");
				String descr = rs.getString("Image_Description");
				
				Image image = new Image(imgId, url, descr);
				images.add(image);
				}
			String json = gs.toJson(images);
			return json;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public String removeImage(int id) {
		try {
			String query = "DELETE from Image where ImageID = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			int rowCount = pStat.executeUpdate();
			return rowCount > 0 ? "Successfully deleted image" : "Failed to delete image";
		} catch (SQLException e) {
			e.printStackTrace();
			return "Something went wrong";
		}
	}
	
	public String insertImage(String json) {
		Image img = gs.fromJson(json, Image.class);
		try {
			 String query = "INSERT INTO IMAGE (AnimalID, URL, Image_Description) VALUES (?,?,?)";
			 PreparedStatement pStat = conn.prepareStatement(query);
			 pStat.setInt(1, img.getAnimalId());
			 pStat.setString(2, img.getUrl());
			 pStat.setString(3, img.getImageDescription());
			 int rowCount = pStat.executeUpdate();
			 return rowCount > 0 ? "Successfully inserted image" : "Image was not inserted";
		 } catch (SQLException e) {
			 e.printStackTrace();
			 return "Something went wrong";
		 }
	}

	public String updateDescription(String json) {
		Image img = gs.fromJson(json, Image.class);
		try {
			 String query = "UPDATE IMAGE SET Image_Description = ? WHERE ImageID = ?";
			 PreparedStatement pStat = conn.prepareStatement(query);
			 pStat.setInt(2, img.getImageId());
			 pStat.setString(1, img.getImageDescription());
			 int rowCount = pStat.executeUpdate();
			 return rowCount > 0 ? "Successfully updated image description" : "Image description was not updated";
		 } catch (SQLException e) {
			 e.printStackTrace();
			 return "Something went wrong";
		 }
	}
}
