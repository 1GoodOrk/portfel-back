# FROM node:25 AS build
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install the application dependencies
# RUN npm install

# # Copy the rest of the application files
# COPY . .

# # Build the NestJS application
# RUN npm run build

# # Expose the application port
# EXPOSE 27182

# # Command to run the application
# CMD ["node", "dist/main"]

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# EXPOSE 27182

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist
FROM node:26

CMD ["node", "dist/main"]

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:26

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]