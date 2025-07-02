const env = process.env.NODE_ENV?.toLowerCase() || "development";

console.log(`🌍 Entorno detectado: ${env}`);

const start = async () => {
  try {
    if (env === "development" || env === "dev" || env === "local") {
      console.log("🟡 Ejecutando en modo desarrollo");
      await import('./server-dev.js');
    } else {
      console.log("🟢 Ejecutando en modo producción");
      await import('./server-prod.js');
    }
  } catch (err) {
    console.error("❌ Error al iniciar el servidor:", err);
    process.exit(1);
  }
};

start();

