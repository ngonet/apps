FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY prisma ./prisma/
RUN npx prisma generate
COPY . .
CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]
