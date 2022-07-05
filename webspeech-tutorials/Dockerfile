# Stage 1
FROM node AS builder
WORKDIR /app
COPY . .
RUN npm install -g
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=builder /app/dist/webspeech-tutorials /usr/share/nginx/html
RUN mv /etc/nginx/nginx.conf /etc/nginx/backup.nginx.conf
COPY nginx/*.conf /etc/nginx/

