# Build stage: Using official Node.js v23.3.0 Alpine image from Docker Hub
FROM node:23.3.0-alpine as build

# Set the working directory for the build phase
WORKDIR /app

# Set the NODE_PATH environment variable in a persistent way
ENV NODE_PATH=/app/node_modules/.bin:$PATH

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --force

# Copy the rest of the application code
COPY . ./

# Run build command (without ENV_NAME)
RUN npm run build

# Production stage: Using NGINX stable Alpine from your provided ECR URI
FROM 891377367684.dkr.ecr.ap-south-1.amazonaws.com/nginxstablealpine

# Copy the build output from the build stage to NGINX's HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom nginx configuration file (ensure the file exists in your project)
COPY scripts/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for NGINX
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
