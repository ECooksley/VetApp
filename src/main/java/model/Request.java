package main.java.model;

public class Request {
	private String name;
	private int id;
	private int status;
	private String type;
	
	public Request(String name, int id, int status, String type) {
		setName(name);
		setId(id);
		setStatus(status);
		setType(type);
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}


}