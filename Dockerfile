# Build Angular app
FROM node:20 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

#  Serve with Nginx
FROM nginx:alpine

# Copy built files to Nginx html folder
COPY --from=build /app/dist/employee-management-frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
