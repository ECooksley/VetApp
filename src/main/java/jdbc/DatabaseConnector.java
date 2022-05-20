package main.java.jdbc;
import java.sql.*;
import java.util.ArrayList;
import com.google.gson.Gson; //FOR TEST PURPOSES

import main.java.model.Comment;
import main.java.model.Image;
import main.java.model.Treatment;
import main.java.model.User;



public class DatabaseConnector implements DatabaseCredentials {
	private Connection conn;
	private CommentDBC commentDBC;
	private TreatmentDBC treatmentDBC;
	private ImageDBC imageDBC;
	private UserDBC userDBC;
	private RequestDBC requestDBC;
	private AnimalDBC animalDBC;
	

	public DatabaseConnector() {
		initializeConnection();
		commentDBC = new CommentDBC(conn);
		treatmentDBC = new TreatmentDBC(conn);
		imageDBC = new ImageDBC(conn);
		userDBC = new UserDBC(conn);
		requestDBC = new RequestDBC(conn);
		animalDBC = new AnimalDBC(conn);
	}
	
	public void initializeConnection() {
		try {
			conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}
	
	public void close() {
		try {
			System.out.println("Closing database connection.");
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public UserDBC getUserDBC() {
		return userDBC;
	}

	public TreatmentDBC getTreatmentDBC() {
		return treatmentDBC;
	}

	public ImageDBC getImageDBC() {
		return imageDBC;
	}
	public CommentDBC getCommentDBC() {
		return commentDBC;
	}

	public RequestDBC getRequestDBC() {
		return requestDBC;
	}
	
	public AnimalDBC getAnimalDBC() {
		return animalDBC;
	}
}
