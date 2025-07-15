# Base image
FROM node:20-slim

# Install system dependencies
RUN apt-get update -y && \
    apt-get install -y openssl wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install pnpm globally
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package and lock files first
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the project
COPY . .

# Copy and make init.sh executable
COPY init.sh .
RUN chmod +x init.sh

# Expose the port expected by Cloud Run
ENV PORT=8080
EXPOSE 8080

# Run the init script
CMD ["sh", "./init.sh"]
