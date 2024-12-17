# Stage 1: Build the application using a Node.js image from ECR
FROM 891377367684.dkr.ecr.ap-south-1.amazonaws.com/node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application source code
COPY . .

# Build the application (useful for React, Angular, etc.)
RUN npm run build

# Stage 2: Use Nginx for serving the application
FROM nginx:1.21-alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Clean the default Nginx content
RUN rm -rf ./*

# Copy built application from the previous stage
COPY --from=build /app/build ./

# Expose the Nginx default port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
