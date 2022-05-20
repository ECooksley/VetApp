DROP DATABASE IF EXISTS VETAPP;
CREATE DATABASE VETAPP;
USE VETAPP;

DROP TABLE IF EXISTS ANIMAL;
CREATE TABLE ANIMAL (
	AnimalID			integer 		NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Species				varchar(20)		NOT NULL,
    AnimalName			varchar(30),
    Breed				varchar(30),
    Weight				decimal(10,3),
    BirthDate			date,
    Sex					varchar(1),
    Colour				varchar(15),
    HealthStatus		varchar(50)		DEFAULT "Healthy",
    Tattoo				varchar(15),
    Microchip			varchar(30),
    ProfileURL			varchar(512),
    Request				integer			DEFAULT 0
);

INSERT INTO ANIMAL (Species, AnimalName, Breed, Weight, BirthDate, Sex, Colour) VALUES
	('Cat', 'Goose', 'Domestic Longhair', '2.1',(DATE '2021-04-15'), 'M', 'Tabby'),
	('Cat', 'Sylvie', 'Domestic Shorthair', '1.5', (DATE '2021-03-15'), 'F', 'Black'),
	('Cat', 'Fitz', 'Domestic Shorthair', '8.5', (DATE '2016-08-10'), 'M', 'Tabby'),
	('Cat', 'Panda', 'Domestic Shorthair', '4.0', (DATE '2005-06-15'), 'M', 'Tuxedo'),
	('Cat', 'Felix', 'Domestic Shorthair', '4.5', (DATE '2010-02-27'), 'M', 'Black'),
	('Dog', 'Grizz', 'Yorkshire Terrier', '6.5', (DATE '2002-11-21'), 'M', 'BlackBrown'),
	('Cow', 'Bessie', 'Aberdeen Angus', '1000', (DATE '2018-04-01'), 'F', 'BlackWhite'),
	('Horse', 'Silver', 'Great White Stallion', '540', (DATE '1850-01-01'), 'M', 'SilverWhite');

DROP TABLE IF EXISTS WEIGHT_HISTORY;
CREATE TABLE WEIGHT_HISTORY (
	AnimalID			integer			NOT NULL,
    EntryDate			date			NOT NULL,
    Weight				decimal(10,3),
    primary key (AnimalID, EntryDate),
    foreign key (AnimalID) references ANIMAL(AnimalID) 		ON DELETE CASCADE 		ON UPDATE CASCADE
);

INSERT INTO WEIGHT_HISTORY VALUES
	('1',(DATE '2021-11-26'),'2.1'),
	('2',(DATE '2021-11-26'),'1.5'),
	('3',(DATE '2021-11-26'),'8.5'),
	('4',(DATE '2021-11-26'),'4.0'),
	('5',(DATE '2021-11-26'),'4.5'),
	('6',(DATE '2021-11-26'),'6.5'),
	('7',(DATE '2021-11-26'),'1000'),
	('8',(DATE '2021-11-26'),'540'),
	('1',(DATE '2021-10-15'),'1.8'),
	('1',(DATE '2021-07-10'),'0.7');

DROP TABLE IF EXISTS DIST_FEATURES;
CREATE TABLE DIST_FEATURES (
	AnimalID			integer			NOT NULL,
    Feature				varchar(50)		NOT NULL,
    primary key (AnimalID, Feature),
    foreign key (AnimalID) references ANIMAL(AnimalID)		ON DELETE CASCADE 		ON UPDATE CASCADE
);

INSERT INTO DIST_FEATURES VALUES
	('1', 'Fluffy Tail'),
    ('1', 'Very Munchy'),
    ('6', 'Slightly Dead'),
    ('8', 'Very Very VERY Dead'),
    ('3', 'Loud'),
    ('3', 'CHOMK'),
    ('4', 'Very polite moocher'),
    ('5', 'Likes to nibble');

DROP TABLE IF EXISTS IMAGE;
CREATE TABLE IMAGE (
	ImageID				integer 		NOT NULL AUTO_INCREMENT PRIMARY KEY,
    AnimalID			integer			NOT NULL,
    URL					varchar(512)	NOT NULL,
    Image_Description	nvarchar(512),
    foreign key (AnimalID) references ANIMAL(AnimalID)		ON DELETE CASCADE 		ON UPDATE CASCADE
);

INSERT INTO IMAGE (AnimalID, URL, Image_Description) VALUES
	('8', 'https://static.wikia.nocookie.net/loneranger/images/4/4a/Silverbow.jpg/revision/latest/scale-to-width-down/202?cb=20110212220147','Silver and The Lone Ranger'),
    ('1', 'http://placekitten.com/300/300', 'Image 1'),
    ('1', 'http://placekitten.com/250/250', 'Image 2'),
    ('1', 'http://placekitten.com/400/400', '');
	

DROP TABLE IF EXISTS USERS;  
CREATE TABLE USERS ( 
	UserID				integer 		NOT NULL,
    FullName			varchar(50),
    UserRole			integer			NOT NULL,
    Email				varchar(100)	NOT NULL,
    Passwd				varchar(30)		NOT NULL,
    ActivationDate		date,
    ProfileURL			varchar(512),
    Request				integer			DEFAULT 0,
    primary key (UserID)
);

INSERT INTO USERS (UserID, FullName, UserRole, Email, Passwd, ActivationDate) VALUES
	('10098642', 'David Cooksley', '5', 'david.cooksley2@ucalgary.ca', 'hunter2', (DATE '2021-11-26')),
    ('10175487', 'Sir Evan Cooksley', '3', 'evan.cooksley@ucalgary.ca', 'wordpass', (DATE '2021-11-26')),
	('30000781', 'Mr. Khoi Nguyen', '1', 'baokhoi.nguyen@ucalgary.ca', '12345', (DATE '2021-11-26')),
    ('9876543', 'Dr. Emily Marasco', '4', 'emarasco@ucalgary.ca', 'ensf608', (DATE '2021-12-01')),
    ('12345678', 'Maya Al-Akkad','2','maya.alakkad@ucalgary.ca','54321', (DATE '2021-12-03'));

DROP TABLE IF EXISTS COMMENTS;
CREATE TABLE COMMENTS ( 
	CommentID			integer 		NOT NULL AUTO_INCREMENT PRIMARY KEY,
    AnimalID			integer 		NOT NULL,
    UserID				integer,
    CommentDate			date,
    CommentText			nvarchar(16384),
    foreign key (AnimalID) references ANIMAL(AnimalID)		ON DELETE CASCADE 		ON UPDATE CASCADE,
    foreign key (UserID) references USERS(UserID)			ON DELETE SET NULL		ON UPDATE CASCADE
);

INSERT INTO COMMENTS (AnimalID, UserID, CommentDate, CommentText) VALUES
	('1', '10098642', (DATE '2021-07-06'), 'Most Adorable'),
    ('1', '30000781', (DATE '2021-09-10'), 'Absolute gremlin when hungry'),
    ('1', '9876543', (DATE '2021-12-1'), 'Aww what a cute cat'),
    ('3', '10175487', (DATE '2021-11-26'), 'Little Devil'),
    ('8', '30000781', (DATE '2021-11-26'), "The accepted story of Silver's origin has the white horse living in Wild Horse Canyon. Sometime after the ambush at Bryant's Gap, the Lone Ranger and Tonto are in pursuit of Butch Cavendish when they are fired upon by Cavendish himself, and though he missed the Ranger, he shot and killed his horse. When the Lone Ranger mentions the horse and where it lives, he declares they'll be on the lookout for the horse while they continue their pursuit of Cavendish.

They soon find the white horse engaged in death battle with a buffalo, who has already wounded the horse and is about to finish it off when it is shot and killed by the Lone Ranger. The Masked Man and Tonto nurse the horse back to health, and though he badly wants the horse for his own, the Lone Ranger also understands that the horse has fought for his freedom and deserves to be free. When Tonto remarks that the horse, it's coat glistening in the sun, looks \"silver white\", the Lone Ranger calls out to him using the name \"Silver\", and for reasons stronger than gratitude, the horse decides to stay on with him. This started a new adventure for both the horse and Ranger.

The Lone Ranger spent several days training the mustang before he is ready to continue the pursuit of Butch Cavendish. With the new powerful horse as his ally, the Lone Ranger easily overtakes and captures Cavendish.

Silver sired a son, named Victor, who belonged to the Lone Ranger's nephew, Dan Reid Jr. ");
DROP TABLE IF EXISTS TREATMENT;
CREATE TABLE TREATMENT (
	TreatmentID			integer			NOT NULL AUTO_INCREMENT PRIMARY KEY,
	AnimalID			integer 		NOT NULL,
    UserID				integer,
    PrescribedDate		date,
    TreatmentType		varchar(50),
    Treat_Description	nvarchar(1024),
    NotifyDate			date,
    foreign key (AnimalID) references ANIMAL(AnimalID) 		ON DELETE CASCADE 		ON UPDATE CASCADE,
    foreign key (UserID) references USERS(UserID)			ON DELETE SET NULL		ON UPDATE CASCADE
);

INSERT INTO TREATMENT (AnimalID, UserID, PrescribedDate, TreatmentType, Treat_Description, NotifyDate) VALUES
	('5', '10175487', (DATE '2021-11-26'), 'Diet', 'No more dry food today.', NULL),
    ('1', '10098642', (DATE '2021-12-10'), 'Diet', 'No dry food, give wet food 3 times daily', (DATE '2022-01-10')),
    ('1', '9876543', (DATE '2021-12-15'), 'Exercise', 'Play with for no less than 30 min daily', NULL),
    ('7', '10175487', (DATE '2021-11-26'), 'Medicine', '200mg Ibuprofen in morning daily', (DATE '2021-12-26'));

