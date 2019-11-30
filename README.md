# Node.js ~ PostgreSQL ~ GraphQL application
## Why
 This project was done in the process of learning GraphQL, its basics at least, and how to connect it to a real 
 database rather than using in-code data structure like arrays.
## Install
### 1. Git clone the project
Clone this project onto your local machine by using the ***git clone $PROJECT_URL$***

### 2. Install PostgreSQL
Before diving into the code, you need to download postrges for your operating system, which you can 
do [here](https://www.postgresql.org/download/).
After the installation is done you can run the **pg_script.sql** or just copy its content into your script on PgAdmin 
of the database object which you have created.

### 3. Fill in the .env file
It needs to be filled by the data for connecting to postgres and the wanted PORT number of the express API.

### 4. Run npm install
In the root of this project run ***npm install*** to install all the needed packages

## Run
Run it with simple **npm start** command

## Testing
I have provided **GraphQL.postman_collection.json** which is a collection of requests for POSTMAN 
(open source REST API testing tool) to be sent toward the API. All the requests are supposed to be POST, as 
GraphQL uses it like that because it allows the client to send a body parameter as it can be seen from any of the 
provided requests.

### Note
Some values like *author_id* have to be changed according to how your users database looks like.
 
