# Stage 1 - the build process  
FROM node:16 as build-deps  
WORKDIR /ui/app
COPY package.json package-lock.json ./
RUN npm config set strict-ssl false
RUN npm install
COPY . ./
RUN npm run build  
RUN npm install -g serve  
EXPOSE 3000 
CMD ["serve", "-s", "build"]