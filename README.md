# University of Calgary Veternarian Application Prototype
### Authors: David Cooksley, Evan Cooksley, Khoi Nguyen

## Description
A prototype animal management application for the University of Calgary Veternarian department. The application has a web-based front-end, which allows users to log in with different access levels, manage other users, manage animals, and view/edit animal profiles. The front-end is connected to a Java based server which connects to a SQL database. 

## Instructions
1. Run the SQL script to load the database: [vetapp.sql](https://github.com/Software-Engineering-Courses-Moshirpour/final-project-uofeng607-666/blob/main/database/vetapp.sql)  
2. Enter and save appropriate SQL credentials in [DatabaseCredentials.java](https://github.com/Software-Engineering-Courses-Moshirpour/final-project-uofeng607-666/blob/main/src/main/java/jdbc/DatabaseCredentials.java)
3. Configue java side of project as Maven project. 
4. Add [mysql-connector-java-8.0.27.jar](https://github.com/Software-Engineering-Courses-Moshirpour/final-project-uofeng607-666/blob/main/mysql-connector-java-8.0.27.jar) to java build path
5. Run the backend server: [VetAPI.java](https://github.com/Software-Engineering-Courses-Moshirpour/final-project-uofeng607-666/blob/main/src/main/java/app/VetAPI.java). Make sure SQL server is also running.
6. Open command line in directory [frontend/vet-app](https://github.com/Software-Engineering-Courses-Moshirpour/final-project-uofeng607-666/tree/main/frontend/vet-app)
7. Install required packages as listed in [package.json](https://github.com/Software-Engineering-Courses-Moshirpour/final-project-uofeng607-666/blob/main/frontend/vet-app/package.json)
8. In the command line, run the command 'npm start'
