import { createApp } from './app.js';
import { AfpPersonModel } from './models/afp-person.js';
import { BurdenModel } from './models/burden.js';
import { CompanyModel } from './models/company.js';
import { DiscountDocumentModel } from './models/discount-document.js';
import { DiscountRemunerationModel } from './models/discount-remuneration.js';
import { DiscountModel } from './models/discount.js';
import { DocumentPositionModel } from './models/document-position.js';
import { DocumentSalaryModel } from './models/document-salary.js';
import { DocumentTypeModel } from './models/document-type.js';
import { DocumentModel } from './models/document.js';
import { HealthPersonModel } from './models/health-person.js';
import { PersonModel } from './models/person.js';
import { PositionModel } from './models/position.js';
import { RemunerationSalaryModel } from './models/remuneration-salary.js';
import { RemunerationModel } from './models/remuneration.js';
import { RepresentativeModel } from './models/representative.js';
import { SalaryModel } from './models/salary.js';

await createApp(
  { personModel: PersonModel },
  { healthPersonModel: HealthPersonModel },
  { afpPersonModel: AfpPersonModel },
  { companyModel: CompanyModel },
  { representativeModel: RepresentativeModel },
  { documentTypeModel: DocumentTypeModel },
  { documentModel: DocumentModel },
  { positionModel: PositionModel },
  { documentPositionModel: DocumentPositionModel },
  { remunerationModel: RemunerationModel },
  { discountModel: DiscountModel },
  { discountRemunerationModel: DiscountRemunerationModel },
  { salaryModel: SalaryModel },
  { remunerationSalaryModel: RemunerationSalaryModel },
  { burdenModel: BurdenModel },
  { discountDocumentModel: DiscountDocumentModel },
  { documentSalaryModel: DocumentSalaryModel }
);
