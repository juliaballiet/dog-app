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
