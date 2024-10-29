FROM node:18.18.2-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18.18.2-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/node_modules /app/node_modules

RUN npm install --only=production

USER node

CMD ["npm", "run", "start:container"]
