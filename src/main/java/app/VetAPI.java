package main.java.app;

import java.io.IOException;
import static spark.Spark.*;
import main.java.jdbc.DatabaseConnector;

public class VetAPI {

    public static void apiCalls(DatabaseConnector dbc) {
    			port(8000);
    			
    			CorsFilter.apply(); // Apply CorsFilter to fix CORS errors when running server and front-end on the same machine.
    			
    			before((req,res) -> res.type("application/json"));
    			
    			//Get All Animals
    			//name, id (int), status (int), species, profileURL
    			get("/animal", (req,res) -> {
    				return dbc.getAnimalDBC().getAnimals();
    			});
    			
    			// Story ID: VET666-22 - Student Comments Endpoint
    			get("/animal/:id/student_comments", (request, reponse)-> {
    				return dbc.getCommentDBC().getStudentCommentsForAnimal(Integer.parseInt(request.params(":id")));
    			});
    			
    			//Get comments for animal :id
    			get("/animal/:id/comments", (req,res) -> {
    				return dbc.getCommentDBC().getCommentsForAnimal(Integer.parseInt(req.params(":id")));
    			});
    			
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/comments", (req, res) -> {
    				return "ok";
    			});
    			//STORY ID: VET666-14 - make comments about animals
    			post("/comments", (req,res) -> {
    				return dbc.getCommentDBC().insertComment(req.body());
    			});
    			
    			delete("/comments/:id", (req, res) -> {
    				return dbc.getCommentDBC().removeComment(Integer.parseInt(req.params(":id")));
    			});
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/comments/:id", (req, res) -> {
    				return "ok";
    			});
    			
    			//Story ID: VET-666-25 - Search and view animal profiles
    			//Also Story ID: VET666-27
    			get("/animal/search/:searchquery", (req, res)-> {
    				return dbc.getAnimalDBC().searchAnimals(req.params(":searchquery"));
    			});
    			
    			get("/animal/:id/profile", (req, res)-> {
    				return dbc.getAnimalDBC().getAnimalByID(Integer.parseInt(req.params(":id")));
    			});
    			
    			put("/animal/:id/profile", (req, res) -> {
    				return dbc.getAnimalDBC().updateAnimal(req.body());
    			});
    			options("/animal/:id/profile", (req, res) -> {
    				return "ok";
    			});
    			
    			get("/animal/:id/features", (req, res) -> {
    				return dbc.getAnimalDBC().getFeaturesByID(Integer.parseInt(req.params(":id")));
    			});
    			
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/animal/:id/features", (req, res) -> {
    				return "ok";
    			});
    			
    			post("/animal/:id/features", (req, res) -> {
    				return dbc.getAnimalDBC().insertFeature(req.body(), Integer.parseInt(req.params(":id")));
    			});
    			
    			put("/animal/:id/features", (req, res) -> {
    				return dbc.getAnimalDBC().removeFeature(req.body(), Integer.parseInt(req.params(":id")));
    			});
    			
    			//STORY ID: VET666-5 - Login Page Endpoint
    			get("/login/:name/:pass", (req, res) -> {
    				return dbc.getUserDBC().validate(req.params(":name"), req.params(":pass"));
    			});
    			
    			//STORY ID: VET666-6
    			//No API necessary
    					
    			//STORY ID: VET666-8 - Admin add users
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/users", (req, res) -> {
    				return "ok";
    			});
    			
    			post("/users", (req, res) -> {
    				return dbc.getUserDBC().insertNewUser(req.body());
    			});
    			
    			//STORY ID: VET666-20/21 - User add/remove requests
    			put("/users/requests", (req, res) -> {
    				return dbc.getRequestDBC().updateStatus(req.body());
    			});
    			
    			//STORY ID: VET666-9 - Admin edit users
    			put("/users/:id", (req, res) -> {
    				return dbc.getUserDBC().updateUser(req.body());
    			});
    			
    			get("/users", (req, res) -> {
    				return dbc.getUserDBC().getAllUsers();
    			});
    			
    			get("/users/:id", (req, res) -> {
    				return dbc.getUserDBC().getUserById(Integer.parseInt(req.params(":id")));
    			});
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/users/:id", (req, res) -> {
    				return "ok";
    			});
    			
    			//STORY ID: VET666-10 - Admin remove users
    			delete("/users/:id", (req, res) -> {
    				return dbc.getUserDBC().removeUser(Integer.parseInt(req.params(":id")));
    			});
    			
    			//VET666-30 - No extra API endpoint necessary
    			
    			//STORY ID: VET666-36 - add an animal
    			post("/animal", (req,res) -> {
    				//add the animal
    				return dbc.getAnimalDBC().insertNewAnimal(req.body());
    			});
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/animal", (req, res) -> {
    				return "ok";
    			});
    			
    			//STORY ID: VET666-12 - upload photos of animals
    			get("/animal/:id/images", (req,res) -> {
    				return dbc.getImageDBC().getImagesForAnimal(Integer.parseInt(req.params(":id")));
    			});
    			
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/images", (req, res) -> {
    				return "ok";
    			});
    			
    			post("/images", (req, res) -> {
    				return dbc.getImageDBC().insertImage(req.body());
    			});
    			
    			put("/images", (req, res) -> {
    				return dbc.getImageDBC().updateDescription(req.body());
    			});
    			
    			delete("/images/:id", (req, res) -> {
    				return dbc.getImageDBC().removeImage(Integer.parseInt(req.params(":id")));
    			});
    			
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/images/:id", (req, res) -> {
    				return "ok";
    			});
    			
    			//Put new request status
    			put("/animal/:id/lab-status", (req,res) -> {
    				return dbc.getRequestDBC().updateStatus(req.body());
    			});
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/animal/:id/lab-status", (req,res) -> {
    				return "ok";
    			});
    			
    			//STORY ID: VET666-28 - automatic notifications of needed treatments
    			get("/animal/:id/treatments", (req,res) -> {
    				return dbc.getTreatmentDBC().getTreatmentsForAnimal(Integer.parseInt(req.params(":id")));
    			});
    			
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/treatments", (req, res) -> {
    				return "ok";
    			});
    			post("/treatments", (req, res) -> {
    				return dbc.getTreatmentDBC().insertTreatment(req.body());
    			});
    			
    			delete("/treatments/:id", (req, res) -> {
    				return dbc.getTreatmentDBC().removeTreatment(Integer.parseInt(req.params(":id")));
    			});
    			
    			// Options method required on endpoint to resolve CORS issues when running server and front-end on the same machine.
    			options("/treatments/:id", (req, res) -> {
    				return "ok";
    			});
    		    
    			// requests
    			get("/user/:role/requests", (req,res) -> {
    				System.out.println("get-requests request");
    				return dbc.getRequestDBC().getRequests(Integer.parseInt(req.params(":role")));
    			});
    }
    
	public static void main(String[] args) throws IOException{
		DatabaseConnector dbc = new DatabaseConnector();
		apiCalls(dbc);
	}

}
