FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --silent

COPY . .

RUN npm run build

FROM nginx:1.24-alpine

RUN apk add --no-cache curl

RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

RUN ls -la /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]