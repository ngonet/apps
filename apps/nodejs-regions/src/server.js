import { createApp } from './app.js';
import { CommuneModel } from './models/commune.js'; // Asegúrate de que este modelo siga siendo necesario aquí o si puede cargarse dinámicamente.

const env = process.env.NODE_ENV?.toLowerCase() || 'development';
console.log(`🌍 Entorno detectado: ${env}`);

const start = async () => {
  try {
    console.log(`🟡 Iniciando aplicación en modo ${env}`);
    await createApp({ 
      communeModel: CommuneModel, // Pasa el modelo si es una dependencia global
      environment: env // Pasa el entorno para configuración interna
    });
  } catch (err) {
    console.error('❌ Error al iniciar el servidor:', err);
    process.exit(1);
  }
};

start();
