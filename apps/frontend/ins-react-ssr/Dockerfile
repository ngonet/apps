# --- Etapa 1: Construcción (Builder) ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copia solo los archivos de dependencias para aprovechar la caché de Docker
COPY package.json package-lock.json* ./

# Instala TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copia el resto del código y ejecuta el build de producción
COPY . .
RUN npm run build

# --- Etapa 2: Producción (Final) ---
FROM node:20-alpine

WORKDIR /app

# Instala solo las dependencias de producción
# Esto asegura que las devDependencies no estén en la imagen final
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Copia los archivos necesarios desde la etapa de construcción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

# Exponer el puerto y definir el comando de inicio
EXPOSE 5173
CMD ["node", "server.js"]
