# Use official Node.js image to build the app
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the static files
FROM node:18-alpine AS production

# Install 'serve' to serve the build folder
RUN npm install -g serve

WORKDIR /app

# Copy build output from previous stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"] 