# Start with base node image
FROM node:19.2.0-alpine3.15

# Set environment properties
ENV PORT 9001

COPY . .
RUN npm i
HEALTHCHECK CMD bash timeout 2 bash -c "</dev/tcp/localhost/$PORT"; echo $?

EXPOSE $PORT
CMD ["node","index.js"]