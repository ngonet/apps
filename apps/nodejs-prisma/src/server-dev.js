import { createApp } from './app.js';
import { AfcModel } from './models/afc.js';
import { AfpPersonModel } from './models/afp-person.js';
import { AfpModel } from './models/afp.js';
import { BurdenModel } from './models/burden.js';
import { CcafModel } from './models/ccaf.js';
import { CommuneModel } from './models/commune.js';
import { CompanyModel } from './models/company.js';
import { DailyIndicatorModel } from './models/daily-indicator.js';
import { DiscountDocumentModel } from './models/discount-document.js';
import { DiscountRemunerationModel } from './models/discount-remuneration.js';
import { DiscountModel } from './models/discount.js';
import { DocumentPositionModel } from './models/document-position.js';
import { DocumentSalaryModel } from './models/document-salary.js';
import { DocumentTypeModel } from './models/document-type.js';
import { DocumentModel } from './models/document.js';
import { FamilyAllowanceModel } from './models/family-allowance.js';
import { HealthPersonModel } from './models/health-person.js';
import { HealthModel } from './models/health.js';
import { PersonModel } from './models/person.js';
import { PositionModel } from './models/position.js';
import { ProvisionalIndicatorModel } from './models/provisional-indicator.js';
import { RemunerationSalaryModel } from './models/remuneration-salary.js';
import { RemunerationModel } from './models/remuneration.js';
import { RepresentativeModel } from './models/representative.js';
import { SalaryModel } from './models/salary.js';
import { SectionModel } from './models/section.js';
import { SingleTaxModel } from './models/single-tax.js';

await createApp(
  { communeModel: CommuneModel },
  { personModel: PersonModel },
  { healthModel: HealthModel },
  { afpModel: AfpModel },
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
  { dailyIndicatorModel: DailyIndicatorModel },
  { singleTaxModel: SingleTaxModel },
  { provisionalIndicatorModel: ProvisionalIndicatorModel },
  { sectionModel: SectionModel },
  { burdenModel: BurdenModel },
  { afcModel: AfcModel },
  { familyAllowanceModel: FamilyAllowanceModel },
  { ccafModel: CcafModel },
  { discountDocumentModel: DiscountDocumentModel },
  { documentSalaryModel: DocumentSalaryModel }
);
