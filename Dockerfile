# Step 1: Build the ReactJS project
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the ReactJS build using a static file server
FROM nginx:alpine

# Copy the build files from the build stage to the Nginx public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start the Nginx server (default behavior)
CMD ["nginx", "-g", "daemon off;"]
