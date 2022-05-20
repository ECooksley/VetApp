USE VETAPP;

# 1. Show all tables and explain how they are related to one another (keys, triggers, etc.)
SELECT * FROM ANIMAL;
SELECT * FROM COMMENTS;
SELECT * FROM DIST_FEATURES;
SELECT * FROM IMAGE;
SELECT * FROM TREATMENT;
SELECT * FROM USERS;
SELECT * FROM WEIGHT_HISTORY;

#2. Basic retrieval query
SELECT AnimalID, AnimalName, Species FROM ANIMAL;

#3. Retrieval query with ordered results
SELECT AnimalName, Species, Weight FROM ANIMAL ORDER BY Weight DESC;

#4. Nested retrieval query
SELECT * FROM COMMENTS AS C WHERE C.UserID IN
(SELECT UserID FROM USERS WHERE UserRole = 1);

# 5. Retrieval query using joined tables
SELECT AnimalName, Feature FROM ANIMAL NATURAL JOIN DIST_FEATURES;

# 6. Update operation with any necessary triggers
UPDATE USERS SET UserID = 30000782 WHERE UserID = 30000781;

# 7. Deletion operation with any necessary triggers
DELETE FROM ANIMAL WHERE AnimalID = 1;

UPDATE ANIMAL SET Request = 1 WHERE AnimalID = 1;
UPDATE USERS SET Request = 2 WHERE UserID = 10098642;
SELECT UserID, FullName, Request from USERS WHERE Request = 1 OR Request = 2;