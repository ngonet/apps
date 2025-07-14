import { createApp } from './app.js';
import { CommuneModel } from './models/commune.js';

await createApp({ communeModel: CommuneModel });
