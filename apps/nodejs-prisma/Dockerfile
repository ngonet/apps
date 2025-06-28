FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm install
RUN npx prisma generate
COPY . .
CMD ["sh", "-c", "npx prisma migrate deploy && node index.js"]
