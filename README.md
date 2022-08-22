# Techwondoe Assigniment

Assigniment for a Intership opportunity.

## Database Import

<+> Get the SQL files from `/project/Databse/` 

<+> Import into your MySQL Workbench or whichever Framwork You are using (Exported from MYSQL Workbench)

<+> The Tables have a predefined Schema named `techwondoe`.

<+> There should be 2 tables one for the reviews content named `reviews`  and other for jwt and auth named `users` 

<+> Set the Schema to Default Scehma

## Deploy and Run the Service

## Server

#### You can Deploy the Service localy manully using `.env` Enviromnetal variables (RECOMMENDED)

<+> Locate to the Directory `/project/server` Where the Backend Server Application is situated

<+> Run the commnad `npm install` to get all the required dependency in order for the application to run. 

<+> Here create a file named `.env` in the root server folder (`/project/server`)

![env](https://user-images.githubusercontent.com/84328880/185962545-4be96c8b-afee-4874-aa00-0f541802a8b6.PNG)

<+> The Content for the `.env` file will be

```
# Msql-DB
PORT = 8001
HOST = {YOUR_MSQL_HOST_DB} - (localhost for local enviorment)
DB_PORT = 3306
USER = {YOUR_MYSQL_USERNAME}
PASSWORD = {YOUR_MYSQL_PASSWORD}
DATABASE = techwondo

# jwt
SECRET = TRa4sdYR21ES
```
<+> Run the Command `npm run dev` for the Application to run in typescript and use nodemon (The Development enviorment)

#### OR

<+> Run the Command `npm run build` for the Application to compile a javascript version of the Application (The Production enviorment) and after Run `npm start` for the Application to start running [note : we must copy the `.env` file into the built folder afther the build is done situated at `/project/server/build`]

![built env](https://user-images.githubusercontent.com/84328880/185965580-3a96b4c3-0c85-40f2-92c3-caaa9837e320.PNG)


### OR

#### You can use the Docker Configurations and make an image and container of the Service on your respective Docker Hub/ Docker Destop App

### React

<+> Locate to the Directory `/project/client` Where the Frontend Client Application is situated

<+> Run the commnad `npm install` to get all the required dependency in order for the application to run.

<+> Run the Command `npm start` to Start the React Application 


