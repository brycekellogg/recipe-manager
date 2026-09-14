FROM node:26 AS build
WORKDIR /app
COPY package*.json tsconfig.json vite.config.ts ./
RUN npm install
COPY src /app/src/
ENV RECIPE_DIR=/content/
RUN npx vite build

FROM node:26-alpine AS release
WORKDIR /app
EXPOSE 3636/tcp
COPY package*.json .
RUN npm install --only=production
ENV RECIPE_DIR=/content/  \
    PORT=3636
COPY --from=build /app/build ./
CMD ["node", "index.js"]
