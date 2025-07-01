# --- Fase Builder ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/

# Instala dependencias 
RUN npm ci 

# --- Fase Final ---
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
COPY . .

# Asegúrate de copiar el script de seeding si está en otro directorio
#COPY prisma/seed.js ./prisma/  # Si usas un script personalizado

#CMD ["node", "index.js"]
