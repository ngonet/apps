# --- Fase Builder ---
FROM node:20-alpine AS builder

WORKDIR /app

# Instala herramientas necesarias para prisma y dependencias
RUN apk add --no-cache openssl

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instala TODAS las dependencias, incluidas las de desarrollo
RUN npm ci

# Copiar el resto del código fuente (incluye schema.prisma, etc.)
COPY . .

RUN npm run build

# Elimina las devDependencies para producción
RUN npm prune --omit=dev

# --- Fase Final ---
FROM node:20-alpine

WORKDIR /app

# Establece entorno de producción
ENV NODE_ENV=production

# Copia solo lo necesario desde el builder
COPY --from=builder /app /app

# Expone el puerto del servidor
EXPOSE 5173

# Comando de inicio
CMD ["npm", "run preview"]
