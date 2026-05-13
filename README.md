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



###Admin Access (How to Login as Admin)

Admin Features:
Access to the Admin Dashboard.
Ability to View all users and their complete prompt history.

To access admin features (managing categories and viewing all prompts), use the following credentials:
username: admin
Password: admin1234



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
- AI responses are generated using a mock response.
- Each prompt is connected to a category and sub-category
