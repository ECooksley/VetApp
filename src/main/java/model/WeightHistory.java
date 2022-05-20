package main.java.model;

import java.sql.Date;

public class WeightHistory {
	
	private float weight;
	private Date dateRecorded;
	
	public WeightHistory(float weight, Date dateRecorded) {
		this.setWeight(weight);
		this.setDateRecorded(dateRecorded);
	}
	
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public Date getDateRecorded() {
		return dateRecorded;
	}
	public void setDateRecorded(Date dateRecorded) {
		this.dateRecorded = dateRecorded;
	}
	

}
