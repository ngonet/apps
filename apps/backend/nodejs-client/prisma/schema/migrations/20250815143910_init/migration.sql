-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rut" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "commune" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "ccaf" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);
INSERT INTO "new_companies" ("address", "ccaf", "commune", "created_at", "email", "id", "name", "phone", "rut", "update_at") SELECT "address", "ccaf", "commune", "created_at", "email", "id", "name", "phone", "rut", "update_at" FROM "companies";
DROP TABLE "companies";
ALTER TABLE "new_companies" RENAME TO "companies";
CREATE UNIQUE INDEX "companies_rut_key" ON "companies"("rut");
CREATE UNIQUE INDEX "companies_name_key" ON "companies"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
