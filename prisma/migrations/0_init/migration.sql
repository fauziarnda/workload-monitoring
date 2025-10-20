CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."employee_status" AS ENUM ('Available', 'Unavailable', 'On Project');

-- CreateEnum
CREATE TYPE "public"."employee_type" AS ENUM ('Organik', 'Mitra');

-- CreateEnum
CREATE TYPE "public"."job_status" AS ENUM ('DRAFT', 'FINALIZED', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."job_type" AS ENUM ('Sensus/Survey', 'Kegiatan Lain');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."employee_mitra_details" (
    "employee_id" UUID NOT NULL,
    "date_of_birth" DATE,
    "last_education" TEXT,
    "village" TEXT,
    "sub_district" TEXT,

    CONSTRAINT "employee_mitra_details_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "public"."employee_organik_details" (
    "employee_id" UUID NOT NULL,
    "department" TEXT,

    CONSTRAINT "employee_organik_details_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "public"."employees" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "img_url" TEXT,
    "employee_type" "public"."employee_type" NOT NULL,
    "status" "public"."employee_status" DEFAULT 'Available',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."experience_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "experience_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."job_assignments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "job_id" UUID NOT NULL,
    "employee_id" UUID NOT NULL,

    CONSTRAINT "job_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."jobs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "type" "public"."job_type",
    "start_date" DATE,
    "end_date" DATE,
    "transport_allowance" DECIMAL,
    "estimated_honorarium" DECIMAL,
    "honor_document_basis" DECIMAL,
    "status" "public"."job_status" DEFAULT 'DRAFT',
    "created_by" UUID,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mitra_experiences" (
    "id" BIGSERIAL NOT NULL,
    "employee_id" UUID NOT NULL,
    "experience_type_id" INTEGER NOT NULL,
    "year" INTEGER,

    CONSTRAINT "mitra_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organik_work_history" (
    "id" BIGSERIAL NOT NULL,
    "employee_id" UUID NOT NULL,
    "job_title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "start_date" DATE,
    "end_date" DATE,

    CONSTRAINT "organik_work_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "experience_types_name_key" ON "public"."experience_types"("name" ASC);

-- AddForeignKey
ALTER TABLE "public"."employee_mitra_details" ADD CONSTRAINT "employee_mitra_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."employee_organik_details" ADD CONSTRAINT "employee_organik_details_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."job_assignments" ADD CONSTRAINT "job_assignments_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."job_assignments" ADD CONSTRAINT "job_assignments_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."jobs" ADD CONSTRAINT "jobs_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."employees"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mitra_experiences" ADD CONSTRAINT "mitra_experiences_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."mitra_experiences" ADD CONSTRAINT "mitra_experiences_experience_type_id_fkey" FOREIGN KEY ("experience_type_id") REFERENCES "public"."experience_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."organik_work_history" ADD CONSTRAINT "organik_work_history_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

