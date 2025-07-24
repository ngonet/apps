-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "commune_id" INTEGER NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "ccaf_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "representatives" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT NOT NULL,
    "phone" TEXT,
    "cellphone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "representatives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "bank_id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ccafs" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "rate_ccaf" DECIMAL(65,30) NOT NULL,
    "rate_fonasa" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "ccafs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_types" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "document_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "parent_id" TEXT,
    "status" BOOLEAN DEFAULT true,
    "document_type_id" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "company_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "salary" INTEGER DEFAULT 0,
    "hours" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents_positions" (
    "id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "position_id" INTEGER NOT NULL,

    CONSTRAINT "documents_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents_salaries" (
    "id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "salary_id" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "since" TIMESTAMP(3),
    "until" TIMESTAMP(3),

    CONSTRAINT "documents_salaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts_documents" (
    "id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "since" TIMESTAMP(3),
    "until" TIMESTAMP(3),

    CONSTRAINT "discounts_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "commune_id" INTEGER NOT NULL,
    "phone" TEXT,
    "cellphone" TEXT,
    "email" TEXT,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "civil_status" TEXT NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "burdens" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "first_surname" TEXT NOT NULL,
    "second_surname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "burdens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healths" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DECIMAL(65,30) DEFAULT 0.07,

    CONSTRAINT "healths_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "healths_persons" (
    "id" TEXT NOT NULL,
    "health_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "plan_value" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "healths_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "afps" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dependent_rate" DECIMAL(65,30) NOT NULL,
    "independent_rate" DECIMAL(65,30) NOT NULL,
    "sis_rate" DECIMAL(65,30) NOT NULL,
    "since" TIMESTAMP(3),
    "until" TIMESTAMP(3),

    CONSTRAINT "afps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "afps_persons" (
    "id" TEXT NOT NULL,
    "afp_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "afps_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provisional_indicators" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "max_tax_income_afp" DECIMAL(65,30) NOT NULL,
    "max_tax_income_inp" DECIMAL(65,30) NOT NULL,
    "max_tax_income_afc" DECIMAL(65,30) NOT NULL,
    "min_tax_income_dep_indep" INTEGER NOT NULL,
    "min_tax_income_salary_grade" INTEGER NOT NULL,
    "min_tax_income_18_65" INTEGER NOT NULL,
    "min_tax_income_no_rem" INTEGER NOT NULL,
    "min_tax_income_domestic_worker" INTEGER NOT NULL,
    "apv_top_monthly" DECIMAL(65,30) NOT NULL,
    "apv_top_annual" DECIMAL(65,30) NOT NULL,
    "deposit_agreement_top_annual" DECIMAL(65,30) NOT NULL,
    "deposit_agreement_private_home" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "provisional_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_indicators" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uf" DECIMAL(65,30) NOT NULL,
    "utm" INTEGER NOT NULL,

    CONSTRAINT "daily_indicators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "single_taxs" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "rent_since" DECIMAL(65,30) NOT NULL,
    "rent_until" DECIMAL(65,30),
    "factor" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30) NOT NULL,
    "rate" DECIMAL(65,30),

    CONSTRAINT "single_taxs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "afcs" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cic_indefinite_employer" DECIMAL(65,30) NOT NULL,
    "cic_indefinite_worker" DECIMAL(65,30) NOT NULL,
    "cic_temporary_employer" DECIMAL(65,30) NOT NULL,
    "cic_temporary_worker" DECIMAL(65,30) NOT NULL,
    "cic_housekeeper_employer" DECIMAL(65,30) NOT NULL,
    "cic_housekeeper_worker" DECIMAL(65,30) NOT NULL,
    "fcs_indefinite_employer" DECIMAL(65,30) NOT NULL,
    "fcs_temporary_employer" DECIMAL(65,30) NOT NULL,
    "fcs_housekeeper_employer" DECIMAL(65,30) NOT NULL,
    "cai_housekeeper_employer" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "afcs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_allowances" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "rent_since" INTEGER NOT NULL,
    "rent_until" INTEGER NOT NULL,
    "date_since" TIMESTAMP(3) NOT NULL,
    "date_until" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_allowances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provinces" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region_id" INTEGER NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communes" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,

    CONSTRAINT "communes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remunerations" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "document_id" TEXT NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 30,
    "extra_hours" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "net_payment" INTEGER,
    "taxable" INTEGER,
    "tributory" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "remunerations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salaries" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "taxable" BOOLEAN NOT NULL DEFAULT true,
    "proportional" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "salaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remunerations_salaries" (
    "id" TEXT NOT NULL,
    "remuneration_id" TEXT NOT NULL,
    "salary_id" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "since" TIMESTAMP(3),
    "until" TIMESTAMP(3),

    CONSTRAINT "remunerations_salaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "legal" BOOLEAN NOT NULL DEFAULT true,
    "proportional" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts_remunerations" (
    "id" TEXT NOT NULL,
    "remuneration_id" TEXT NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "since" TIMESTAMP(3),
    "until" TIMESTAMP(3),

    CONSTRAINT "discounts_remunerations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons_salaries" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "salary_id" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "since" TIMESTAMP(3),
    "until" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "persons_salaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discounts_persons" (
    "id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "discount_id" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "since" TIMESTAMP(3),
    "until" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "discounts_persons_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "ccafs_code_key" ON "ccafs"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ccafs_rut_key" ON "ccafs"("rut");

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
CREATE UNIQUE INDEX "healths_code_key" ON "healths"("code");

-- CreateIndex
CREATE UNIQUE INDEX "healths_rut_key" ON "healths"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "healths_name_key" ON "healths"("name");

-- CreateIndex
CREATE UNIQUE INDEX "healths_persons_person_id_key" ON "healths_persons"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "afps_code_key" ON "afps"("code");

-- CreateIndex
CREATE UNIQUE INDEX "afps_rut_key" ON "afps"("rut");

-- CreateIndex
CREATE UNIQUE INDEX "afps_name_key" ON "afps"("name");

-- CreateIndex
CREATE UNIQUE INDEX "afps_persons_person_id_key" ON "afps_persons"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "provisional_indicators_date_key" ON "provisional_indicators"("date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_indicators_date_key" ON "daily_indicators"("date");

-- CreateIndex
CREATE UNIQUE INDEX "single_taxs_date_rent_since_key" ON "single_taxs"("date", "rent_since");

-- CreateIndex
CREATE UNIQUE INDEX "afcs_date_key" ON "afcs"("date");

-- CreateIndex
CREATE UNIQUE INDEX "family_allowances_section_date_since_key" ON "family_allowances"("section", "date_since");

-- CreateIndex
CREATE UNIQUE INDEX "regions_code_key" ON "regions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "regions_name_key" ON "regions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "regions_abbreviation_key" ON "regions"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_code_key" ON "provinces"("code");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_name_key" ON "provinces"("name");

-- CreateIndex
CREATE UNIQUE INDEX "communes_code_key" ON "communes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "communes_name_key" ON "communes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "salaries_code_key" ON "salaries"("code");

-- CreateIndex
CREATE UNIQUE INDEX "salaries_name_key" ON "salaries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_code_key" ON "discounts"("code");

-- CreateIndex
CREATE UNIQUE INDEX "discounts_name_key" ON "discounts"("name");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_commune_id_fkey" FOREIGN KEY ("commune_id") REFERENCES "communes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_ccaf_id_fkey" FOREIGN KEY ("ccaf_id") REFERENCES "ccafs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "representatives" ADD CONSTRAINT "representatives_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "banks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_types" ADD CONSTRAINT "document_types_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "document_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "positions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "document_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_positions" ADD CONSTRAINT "documents_positions_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_positions" ADD CONSTRAINT "documents_positions_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_salaries" ADD CONSTRAINT "documents_salaries_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents_salaries" ADD CONSTRAINT "documents_salaries_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts_documents" ADD CONSTRAINT "discounts_documents_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts_documents" ADD CONSTRAINT "discounts_documents_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_commune_id_fkey" FOREIGN KEY ("commune_id") REFERENCES "communes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "burdens" ADD CONSTRAINT "burdens_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healths_persons" ADD CONSTRAINT "healths_persons_health_id_fkey" FOREIGN KEY ("health_id") REFERENCES "healths"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "healths_persons" ADD CONSTRAINT "healths_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "afps_persons" ADD CONSTRAINT "afps_persons_afp_id_fkey" FOREIGN KEY ("afp_id") REFERENCES "afps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "afps_persons" ADD CONSTRAINT "afps_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provinces" ADD CONSTRAINT "provinces_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "remunerations" ADD CONSTRAINT "remunerations_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "remunerations_salaries" ADD CONSTRAINT "remunerations_salaries_remuneration_id_fkey" FOREIGN KEY ("remuneration_id") REFERENCES "remunerations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "remunerations_salaries" ADD CONSTRAINT "remunerations_salaries_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts_remunerations" ADD CONSTRAINT "discounts_remunerations_remuneration_id_fkey" FOREIGN KEY ("remuneration_id") REFERENCES "remunerations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts_remunerations" ADD CONSTRAINT "discounts_remunerations_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons_salaries" ADD CONSTRAINT "persons_salaries_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "persons_salaries" ADD CONSTRAINT "persons_salaries_salary_id_fkey" FOREIGN KEY ("salary_id") REFERENCES "salaries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts_persons" ADD CONSTRAINT "discounts_persons_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discounts_persons" ADD CONSTRAINT "discounts_persons_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
