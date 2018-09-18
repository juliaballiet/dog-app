CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);



CREATE TABLE "dogs" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer REFERENCES "users" NOT NULL,
	"name" varchar(240) NOT NULL,
	"breed" varchar(240) NOT NULL,
	"weight" integer NOT NULL,
	"birthday" DATE NOT NULL,
	"photo_path" varchar(500)
);



CREATE TABLE "foods" (
	"id" SERIAL PRIMARY KEY,
	"type" varchar(240) NOT NULL,
	"brand" varchar(240) NOT NULL,
	"variety" varchar(240) NOT NULL,
	"amount" varchar(240) NOT NULL,
	"user_id" integer REFERENCES "users" NOT NULL
);



CREATE TABLE "supplements" (
	"id" SERIAL PRIMARY KEY,
	"variety" varchar(240) NOT NULL,
	"brand" varchar(240) NOT NULL,
	"amount" varchar(240) NOT NULL,
	"user_id" integer REFERENCES "users" NOT NULL,
);



CREATE TABLE "medications" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(240) NOT NULL,
	"brand" varchar(240),
	"dose" varchar(240) NOT NULL,
	"user_id" integer REFERENCES "users" NOT NULL,
);



CREATE TABLE "feedings" (
	"id" SERIAL PRIMARY KEY,
	"dog_id" integer REFERENCES "dogs" NOT NULL,
	"food_id" integer REFERENCES "foods" NOT NULL,
	"supplement_id" integer REFERENCES "supplements" NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
);



CREATE TABLE "meds_given" (
	"id" SERIAL PRIMARY KEY,
	"dog_id" integer REFERENCES "dogs" NOT NULL,
	"medication_id" integer REFERENCES "medications" NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
);



CREATE TABLE "activities" (
	"id" SERIAL PRIMARY KEY,
	"activity" varchar(240) NOT NULL,
	"description" varchar(500) NOT NULL,
	"user_id" integer REFERENCES "users" NOT NULL,
);



CREATE TABLE "exercise" (
	"id" SERIAL PRIMARY KEY,
	"dog_id" integer REFERENCES "dogs" NOT NULL,
	"activity_id" integer REFERENCES "activities" NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
	"notes" varchar(1000) NOT NULL,
);



CREATE TABLE "skills" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(240) NOT NULL,
	"description" varchar(500) NOT NULL,
	"user_id" integer REFERENCES "users" NOT NULL,
);



CREATE TABLE "training" (
	"id" SERIAL PRIMARY KEY,
	"dog_id" integer REFERENCES "dogs" NOT NULL,
	"skill_id" integer REFERENCES "skills" NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
	"notes" varchar(500) NOT NULL,
);



CREATE TABLE "skills_training" (
	"id" SERIAL PRIMARY KEY,
	"skill_id" integer REFERENCES "skills" NOT NULL,
	"training_id" integer REFERENCES "training" NOT NULL,
);



CREATE TABLE "activities_exercise" (
	"id" SERIAL PRIMARY KEY,
	"activity_id" integer REFERENCES "activities" NOT NULL,
	"exercise_id" integer REFERENCES "exercise" NOT NULL,
);

-- MOCK DATA:

INSERT INTO "dogs" ("user_id", "name", "breed", "weight", "birthday")
VALUES (1, 'Cosmia', 'Kishu Ken', 28, '2015-08-27'), ('kibble', 'Orijen', 'Six Fish', 1, 1), 
('kibble', 'Farmina', 'Boar and Apple', 1, 1), ('kibble', 'Acana', 'Grasslands', 1, 1), 
('kibble', 'Fromm', 'Game Bird', .75, 1);

INSERT INTO "feedings" ("dog_id", "food_id", "date", "time")
VALUES (2, 1, '2018-09-10', '18:00'), (2, 1, '2018-09-11', '09:00'), (2, 2, '2018-09-11', '18:00'), (2, 1, '2018-09-12', '08:00'), 
(2, 2, '2018-09-12', '16:00'), (2, 2, '2018-09-13', '09:00'), (2, 3, '2018-09-13', '17:00'), (2, 1, '2018-09-14', '09:30'), 
(2, 1, '2018-09-14', '19:00'), (2, 3, '2018-09-15', '08:45'), (2, 3, '2018-09-15', '17:00'), (2, 3, '2018-09-16', '09:00'), 
(2, 4, '2018-09-16', '16:30'), (2, 1, '2018-09-17', '09:00'), (2, 4, '2018-09-17', '17:00');

INSERT INTO "exercise" ("dog_id", "date", "duration", "notes")
VALUES (2, '2018-09-10', 30, 'ran hard'), (2, '2018-09-11', 15, 'quick walk'), (2, '2018-09-12', 45, 'walked really well after flirt pole'),
(2, '2018-09-13', 60, 'ignored all other dogs');

INSERT INTO "exercise" ("dog_id", "date", "duration")
VALUES (2, '2018-09-14', 30), (2, '2018-09-15', 25),
(2, '2018-09-16', 30), (2, '2018-09-17', 50);

INSERT INTO "activities" ("activity", "user_id")
VALUES ('walk', 1), ('dog park', 1), ('flirt pole', 1), ('hiking', 1), ('run', 1), ('fetch', 1);

INSERT INTO "activities_exercise" ("activity_id", "exercise_id")
VALUES (2, 1), (1, 2), (3, 3), (1, 3), (2, 4), (4, 4), (5, 5), (6, 6), (1, 7), (2, 8);

INSERT INTO "skills" ("name", "user_id")
VALUES ('down', 1), ('sit pretty', 1), ('down-stay', 1), ('up', 1), ('stand', 1), ('off', 1);

