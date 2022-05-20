package main.java.model;

import java.sql.Date;

public class Treatment {
	private int treatmentId;
	private int animalId;
	private int userId;
	private String name;
	private Date prescribedDate;
	private String treatmentType;
	private String treatmentDescription;
	private Date notifyDate;
	
	public Treatment(int tId, int uId, String name, Date pDate, String type, String descr, Date nDate) {
		setName(name);
		setNotifyDate(nDate);
		setPrescribedDate(pDate);
		setTreatmentDescription(descr);
		setTreatmentId(tId);
		setTreatmentType(type);
		setUserId(uId);
	}
	
	public int getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Date getPrescribedDate() {
		return prescribedDate;
	}
	public void setPrescribedDate(Date prescribedDate) {
		this.prescribedDate = prescribedDate;
	}
	public String getTreatmentType() {
		return treatmentType;
	}
	public void setTreatmentType(String treatmentType) {
		this.treatmentType = treatmentType;
	}
	public String getTreatmentDescription() {
		return treatmentDescription;
	}
	public void setTreatmentDescription(String treatmentDescription) {
		this.treatmentDescription = treatmentDescription;
	}
	public Date getNotifyDate() {
		return notifyDate;
	}
	public void setNotifyDate(Date notifyDate) {
		this.notifyDate = notifyDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public int getAnimalId() {
		return animalId;
	}

	public void setAnimalId(int animalId) {
		this.animalId = animalId;
	}
}
