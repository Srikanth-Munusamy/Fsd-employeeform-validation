# Base image for Node.js
FROM node:20 AS base

# ================= Frontend Stage ================= #
FROM base AS client
WORKDIR /app/client
COPY client/ .
RUN npm install
RUN npm run build   # Production build for frontend

# ================= Backend Stage ================= #
FROM base AS server
WORKDIR /app/server
COPY server/ .
RUN npm install

# Final Stage: Run Backend & Serve Frontend
FROM base
WORKDIR /app

# Copy backend
COPY --from=server /app/server /app/server

# Copy frontend build files to backend's static directory
COPY --from=client /app/client/build /app/server/public

# Install backend dependencies
WORKDIR /app/server
RUN npm install

EXPOSE 5000
CMD ["node", "server.js"]
