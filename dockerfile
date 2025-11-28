# Form Backend AWS EC2 deployment 

# --- Stage 1 : Build Stage ---
FROM node:22.13.0-alpine AS builder

# 1. Install OpenSSL
RUN apk add --no-cache openssl

WORKDIR /excali-Sketch 

# 2. Copy package files
COPY apps/backend/package.json .

# 3. Install dependencies
RUN npm install

# 4. FIX: Install Prisma 5 (Stable) explicitly
# We use @5 to get the latest version of v5 (compatible with your schema)
# instead of @latest (which is v7 and breaks your schema)
RUN npm install prisma@5 @prisma/client@5

# 5. Explicit Copy
COPY apps/backend/prisma ./prisma
COPY apps/backend/src ./src
COPY apps/backend/tsconfig.json . 

# 6. Generate and Build
RUN npx prisma generate
RUN npm run build

# 7. Prune
RUN npm prune --production

# --- Stage 2: Production Stage ---
FROM node:22.13.0-alpine 

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /excali-Sketch/node_modules ./node_modules
COPY --from=builder /excali-Sketch/dist ./dist
COPY --from=builder /excali-Sketch/package.json ./
COPY --from=builder /excali-Sketch/prisma ./prisma

EXPOSE 5000
CMD [ "npm", "run", "start" ]