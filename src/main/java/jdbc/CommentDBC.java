package main.java.jdbc;
import java.sql.*;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import main.java.model.Comment;


public class CommentDBC {
	private Connection conn;
	private ResultSet rs;
	private Gson gs;
	
	public CommentDBC(Connection conn) {
		this.conn= conn;
		gs = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
	}
	
	public String getCommentsForAnimal(int id){
		try {
			ArrayList<Comment> comments  = new ArrayList<Comment>();
			String query = "SELECT CommentID, AnimalID, CommentText, UserID, FullName, CommentDate FROM comments natural join users where AnimalID = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			rs = pStat.executeQuery();

			while (rs.next()) {
				int cId = rs.getInt("CommentID");
				int uId = rs.getInt("UserID");
				int aId = rs.getInt("AnimalID");
				String name = rs.getString("FullName");
				Date commentDate = rs.getDate("CommentDate");
				String commentText = rs.getString("CommentText");
				Comment comment = new Comment(uId, aId, name, commentDate, commentText);
				comment.setCommentId(cId);
				comments.add(comment);
			}
			String json = gs.toJson(comments);
			return json;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public String getStudentCommentsForAnimal(int id){
		try {
			ArrayList<Comment> studentComments = new ArrayList<Comment>();
			String query = "SELECT CommentID, AnimalID, CommentText, UserId, FullName, CommentDate "
					+ "from COMMENTS NATURAL JOIN USERS where UserRole = ? and AnimalID = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, 1);
			pStat.setInt(2, id);
			rs = pStat.executeQuery();
			while(rs.next()) {
				int cId = rs.getInt("CommentID");
				int uId = rs.getInt("UserID");
				int aId = rs.getInt("AnimalID");
				String name = rs.getString("FullName");
				Date commentDate = rs.getDate("CommentDate");
				String commentText = rs.getString("CommentText");
				Comment comment = new Comment(uId, aId, name, commentDate, commentText);
				comment.setCommentId(cId);
				studentComments.add(comment);
			}
			
			String json = gs.toJson(studentComments);
			return json;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	public String removeComment(int id) {
		try {
			String query = "DELETE from Comments where CommentID = ?";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, id);
			int rowCount = pStat.executeUpdate();
			return rowCount > 0 ? "Successfully deleted comment" : "Comment was not deleted";
		} catch(SQLException e) {
			e.printStackTrace();
			return "Something went wrong";
		}
	}

	
	public String insertComment(String json) {
		Comment c = gs.fromJson(json, Comment.class);
		int aId = c.getAnimalId();
		int uId = c.getUserId();
		Date date = c.getCommentDate();
		String text = c.getCommentText();
		try {
			String query = "INSERT INTO COMMENTS (AnimalID, UserID, CommentDate, CommentText) VALUES (?,?,?,?)";
			PreparedStatement pStat = conn.prepareStatement(query);
			pStat.setInt(1, aId);
			pStat.setInt(2, uId);
			pStat.setDate(3, date);
			pStat.setString(4, text);
			int rowCount = pStat.executeUpdate();
			return rowCount > 0 ? "Successfully inserted comment" : "Comment was not inserted";
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "Something went wrong";
		}
	}
	
}
