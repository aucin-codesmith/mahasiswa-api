CREATE TABLE "mahasiswa" (
	"id" serial PRIMARY KEY NOT NULL,
	"nim" varchar(20) NOT NULL,
	"nama" varchar(100) NOT NULL,
	"jurusan" varchar(100),
	"umur" integer NOT NULL,
	CONSTRAINT "mahasiswa_nim_unique" UNIQUE("nim")
);
