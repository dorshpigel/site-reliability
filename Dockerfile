# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose port 3000 for the NestJS application
EXPOSE 3000

# Install MongoDB locally
RUN apt-get update && apt-get install -y mongodb

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Start MongoDB on port 27017 and then start the Node.js application
CMD mongod --bind_ip 0.0.0.0 --port 27017 --dbpath /data/db & npm run start
