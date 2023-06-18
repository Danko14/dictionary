FROM node:18.3-alpine as build 
WORKDIR /build

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm ci

COPY ./src ./src
RUN npm run build

FROM node:18.3-alpine
WORKDIR /app

COPY --from=build /build/package*.json ./
RUN npm ci --only=production

COPY --from=build /build/dist ./dist

CMD ["npm", "start"]
