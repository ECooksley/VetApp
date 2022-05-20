package main.java.model;

public class Image {
	private int imageId;
	private int animalId;
	private String url;
	private String imageDescription;
	
	public Image(int id, String url, String descr) {
		setImageId(id);
		setImageDescription(descr);
		setUrl(url);
	}
	
	
	public int getImageId() {
		return imageId;
	}
	public void setImageId(int imageId) {
		this.imageId = imageId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getImageDescription() {
		return imageDescription;
	}
	public void setImageDescription(String imageDescription) {
		this.imageDescription = imageDescription;
	}


	public int getAnimalId() {
		return animalId;
	}


	public void setAnimalId(int animalId) {
		this.animalId = animalId;
	}
}
