-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "ccaf" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "representatives" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company_id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT NOT NULL,
    "phone" TEXT,
    "cellphone" TEXT,
    "email" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "representatives_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "bank" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    CONSTRAINT "accounts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "document_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" INTEGER,
    CONSTRAINT "document_types_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "document_types" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "positions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parent_id" INTEGER,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "positions_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "positions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "parent_id" TEXT,
    "status" BOOLEAN DEFAULT true,
    "document_type_id" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "end_date" DATETIME,
    "company_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "salary" INTEGER DEFAULT 0,
    "hours" DECIMAL NOT NULL DEFAULT 0.0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "documents_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "documents" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "document_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "documents_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "documents_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents_positions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document_id" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,
    CONSTRAINT "documents_positions_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "documents_positions_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents_salaries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document_id" TEXT NOT NULL,
    "salary_id" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL DEFAULT 0.00,
    "since" DATETIME,
    "until" DATETIME,
    CONSTRAINT "documents_salaries_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "documents_salaries_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salaries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "discounts_documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document_id" TEXT NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL DEFAULT 0.00,
    "since" DATETIME,
    "until" DATETIME,
    CONSTRAINT "discounts_documents_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "discounts_documents_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "document_types_salaries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document_type_id" INTEGER NOT NULL,
    "salary_id" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL DEFAULT 0.00,
    "since" DATETIME,
    "until" DATETIME,
    CONSTRAINT "document_types_salaries_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "document_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "document_types_salaries_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salaries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "discounts_document_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "document_type_id" INTEGER NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL DEFAULT 0.00,
    "since" DATETIME,
    "until" DATETIME,
    CONSTRAINT "discounts_document_types_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "document_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "discounts_document_types_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rut" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "commune_id" TEXT NOT NULL,
    "phone" TEXT,
    "cellphone" TEXT,
    "email" TEXT,
    "birthdate" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "civil_status" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "burdens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "person_id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT NOT NULL,
    "birthdate" DATETIME NOT NULL,
    "nationality" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "burdens_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "healths_persons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "health" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "plan_value" DECIMAL NOT NULL DEFAULT 0.00,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "healths_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "afps_persons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "afp" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "afps_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "remunerations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "document_id" TEXT NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 30,
    "extra_hours" DECIMAL NOT NULL DEFAULT 0.00,
    "net_payment" INTEGER,
    "taxable" INTEGER,
    "tributory" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    CONSTRAINT "remunerations_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "salaries" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "taxable" BOOLEAN NOT NULL DEFAULT true,
    "proportional" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "remunerations_salaries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "remuneration_id" TEXT NOT NULL,
    "salary_id" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL DEFAULT 0.00,
    "since" DATETIME,
    "until" DATETIME,
    CONSTRAINT "remunerations_salaries_remuneration_id_fkey" FOREIGN KEY ("remuneration_id") REFERENCES "remunerations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "remunerations_salaries_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salaries" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legal" BOOLEAN NOT NULL DEFAULT true,
    "proportional" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "discounts_remunerations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "remuneration_id" TEXT NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "value" DECIMAL NOT NULL DEFAULT 0.00,
    "since" DATETIME,
    "until" DATETIME,
    CONSTRAINT "discounts_remunerations_remuneration_id_fkey" FOREIGN KEY ("remuneration_id") REFERENCES "remunerations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "discounts_remunerations_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_rut_key" ON "companies"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");

-- CreateIndex
CREATE UNIQUE INDEX "representatives_company_id_key" ON "representatives"("company_id");

-- CreateIndex
CREATE UNIQUE INDEX "representatives_rut_key" ON "representatives"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "users_rut_key" ON "users"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "document_types_code_key" ON "document_types"("code");

-- CreateIndex
CREATE UNIQUE INDEX "document_types_name_key" ON "document_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "positions_code_key" ON "positions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "positions_name_key" ON "positions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "documents_number_key" ON "documents"("number");

-- CreateIndex
CREATE UNIQUE INDEX "persons_rut_key" ON "persons"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "burdens_rut_key" ON "burdens"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "healths_persons_person_id_key" ON "healths_persons"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "afps_persons_person_id_key" ON "afps_persons"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "salaries_code_key" ON "salaries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "salaries_name_key" ON "salaries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_name_key" ON "discounts"("name");
