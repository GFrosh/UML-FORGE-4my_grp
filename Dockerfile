# ── Stage 1: Build ──────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ── Stage 2: Runtime ────────────────────────────────────────────
FROM node:20-slim AS runtime

# Install Java (required by PlantUML) and Graphviz (required for most diagram types)
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-jre-headless \
    graphviz \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Download PlantUML jar
RUN wget -q -O /usr/local/bin/plantuml.jar \
    https://github.com/plantuml/plantuml/releases/latest/download/plantuml.jar

# Create the plantuml wrapper script so `plantuml` works as a CLI command
RUN printf '#!/bin/sh\nexec java -jar /usr/local/bin/plantuml.jar "$@"\n' \
    > /usr/local/bin/plantuml \
    && chmod +x /usr/local/bin/plantuml

WORKDIR /app

# Copy only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built output from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
