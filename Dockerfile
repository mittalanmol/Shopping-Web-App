# Step 1: Use an official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (or yarn.lock if using yarn)
COPY package*.json ./

# Step 4: Install project dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that Vite will run on (5176)
EXPOSE 5176

# Step 7: Set the environment variable to specify the desired port for Vite
# ENV VITE_PORT=5176

# # Step 8: Run the Vite dev server on the specified port
# CMD ["npm", "run", "dev", "--", "--port", "5176"]

# Step 7: Run the Vite dev server on all network interfaces
CMD ["npm", "run", "dev", "--", "--host", "--port", "5176"]