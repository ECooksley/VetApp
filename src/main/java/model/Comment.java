package main.java.model;
import java.sql.Date;

public class Comment {
	private int commentId;
	private int userId;
	private int animalId;
	private String name;
	private Date commentDate;
	private String commentText;
	
	public Comment(int uId, int aId, String name, Date date, String text) {
		setUserId(uId);
		setAnimalId(aId);
		setName(name);
		setCommentDate(date);
		setCommentText(text);
	}
	
	public int getCommentId() {
		return commentId;
	}
	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}
	public Date getCommentDate() {
		return commentDate;
	}
	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}
	public String getCommentText() {
		return commentText;
	}
	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getAnimalId() {
		return animalId;
	}

	public void setAnimalId(int animalId) {
		this.animalId = animalId;
	}
	

}
