# Msisdn-Categorizer-Frontend
This service lists all phone numbers in the database categorized into various countries

# RUNNING STEPS FOR THE SERVICE
Note: Node must be installed on your machine to run this project. Preferrably Node version 16

## USING IDE
Note: You must have installed a javascript based IDE preferrably Visual Studio Code
1. Clone the project from github onto your machine
2. Open the project using visual studio code
3. Run `npm install` to setup all the dependencies
4. Run `npm start` to start the service which will launch the service on default port 3000 though this can be changed
5. Ensure the backend is running on `localhost:8080` which is what is configured in the frontend service.
   If this was changed then you can update the url in the app.js file, line number 31.
6. Access the service on your browser via the link: `http://localhost:3000/`

## USING DOCKER IMAGE
Note: You must have docker installed
### BUILDING THE IMAGE
1. Change directory into the project folder
2. Build the image by running `docker build -t msisdn-categorizer-frontend:v1.0.0 .`
3. If you run `docker images` you should see `msisdn-categorizer-frontend` in the list

### RUNNING THE IMAGE
1. Run the image `docker run --rm -p 3000:3000 msisdn-categorizer-frontend:v1.0.0`
2. This will launch the image on port 3000
3. Access the service on your browser via the link: `http://localhost:3000/`