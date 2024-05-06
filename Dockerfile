# Build stage
FROM node:latest as builder

WORKDIR /app-react

# COPY package.json package-lock.json ./
# RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
