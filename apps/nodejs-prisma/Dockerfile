# --- Fase Builder ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./

RUN apk add --no-cache openssl

# Instala dependencias 
RUN npm ci --ignore-scripts

# Copiar el resto del código (incluye schema.prisma, etc.)
COPY . .

# Generar cliente Prisma en node_modules/@prisma/client
RUN npx prisma generate

# --- Fase Final ---
FROM node:18-alpine
WORKDIR /app

# Copiar app completa con dependencias y Prisma client generado
COPY --from=builder /app /app

EXPOSE 3000

#CMD ["node", "server.js"]
