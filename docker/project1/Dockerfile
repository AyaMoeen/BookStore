# build nodejs
FROM node:14 AS builder

# wet work directory
WORKDIR /home/

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# build ubuntu
FROM ubuntu:latest

# Update packages
RUN apt-get update -y && \
    apt-get install -y curl

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs

# Install Docker Compose
RUN apt-get install -y docker-compose

# Copy the Docker Compose file
COPY file.yaml /home/

# Set the working directory
WORKDIR /home/

# Expose port
EXPOSE 3001

# Run Docker Compose to start the services defined in file.yaml
CMD ["docker-compose", "-f", "file.yaml", "up"]



