###Installation instructions:
1. 
git clone <repo-url>
cd project-name

2. 
Installing hangers

Frontend:
cd client
npm install

Backend:
cd server
npm install

3. 
In the server folder, create a file:  .env
and paste the following content into it (with your details):

PORT= 2500
DATABASE_URI= your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key
ADMIN_NAME=Admin
ADMIN_PHONE=0500000000
AI_KEY=your_openai_api_key

###Running the Project

Running the Server (Backend):
cd server
npm run dev

The server will run on:http://localhost:2500

Running the Client (Frontend):
In a new terminal window:
cd client
npm start

The site will open at:http://localhost:3000

###Database Seeder - Learning Platform
This project includes automated scripts for seeding initial data into the MongoDB database. These scripts ensure the system starts with pre-defined categories and sub-categories in an organized manner.

What do the scripts do?
1. Admin Seeding: Creates an initial admin user based on the credentials defined in the .env file.
2. Categories Seeding: Seeds the main list of learning categories.
3. Sub-Categories Seeding: Creates sub-categories linked to their respective parent categories.

Execution Instructions
The scripts are configured to run automatically when the server starts (if the database is empty). However, they can also be run manually as standalone files:

#Bash Categories script
node seed/categories.js

#Bash sub-Categories script
node seed/sub_categories.js


###Admin Access 

Admin Features:
Access to the Admin Dashboard.
Ability to View all users and their complete prompt history.



###Notes
Make sure MongoDB is running or Atlas is configured correctly
Ensure .env file exists in the server folder before running backend
Backend must run before frontend for full functionality


###Technologies used

Fronted:
1. React
2. React Router
3. Axios
4. CSS (custom styling)
5. MUI

Backend:
1. Node.js
2. Express.js
3. MongoDB
4. Mongoose
5. JWT Authentication


###Assumptions / Design Decisions
- Only admin users can view all users and their prompts.
- Regular users can view only their own prompt history
- Categories and sub-categories are stored in the database
- Users must log in before creating prompts
- JWT authentication is used for protected routes
- AI responses are generated in real-time using the official API connected via the environment variables.
- Each prompt is connected to a category and sub-category
