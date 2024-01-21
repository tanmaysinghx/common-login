# Step 1: Use the official Node.js base image
FROM node:latest

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy application files
COPY . .

# Step 4: Install dependencies
RUN npm install

# Step 5: Build the application
RUN npm run build --prod

# Step 6: Expose port
EXPOSE 4200

# Step 7: Unit test cases
RUN ng test

# Step 7: Run the application
CMD ["npm", "start"]
