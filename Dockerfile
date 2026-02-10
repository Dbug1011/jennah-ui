# Stage 1: Build the React App
# We use Node to compile your TypeScript into static HTML/JS
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
# We throw away the Node files and just keep the final 'dist' folder
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# START COMMAND
# We use 'sed' to replace $PORT with the real port number Google assigns us
CMD sh -c "sed -i 's/\$PORT/'\"\$PORT\"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"