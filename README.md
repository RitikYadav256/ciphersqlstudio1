**CipherSQLStudio 🧠💻**

An interactive SQL practice platform with AI-powered hints

**📌 Project Overview**

CipherSQLStudio is a web-based platform designed to help users practice SQL queries in a structured way.
It allows users to view SQL questions, write queries, execute them, and get AI-powered hints (without revealing full answers) to improve learning.

The project uses React for the frontend, Node.js & Express for the backend, MongoDB for data storage, and Google Gemini AI for intelligent hint generation.

**🛠️ Tech Stack**
Frontend

React.js

Axios

CSS / Modules

Backend

Node.js

Express.js

MongoDB (Mongoose)

Google Gemini AI API

Tools

Git & GitHub

Postman

dotenv

📂 Project Structure
CipherSQLStudio/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   └── index.js
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md

⚙️ Prerequisites

Make sure you have the following installed:

Node.js (v18 or above)

npm

MongoDB (local or Atlas)

Git

Google Gemini API Key

🚀 Project Setup Instructions
1️⃣** Clone the Repository**
git clone https://github.com/RitikYadav256/ciphersqlstudio1
cd CipherSQLStudio

**2️⃣ Backend Setup**

cd backend
npm install
**
Create .env file**
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key


📌 Note:

Do NOT add quotes around values

.env file is ignored by Git for security

**3️⃣ Start Backend Server**
npm run dev


or

node index.js


Server will run at:

http://localhost:5000

**4️⃣ Frontend Setup**

Open a new terminal:

cd frontend
npm install
npm run dev


**Frontend will run at:**

http://localhost:5173

🧪 **API Endpoints**
Method	Endpoint	Description
POST	/api/code/hint	Generate AI hint for SQL question
GET	/api/questions	Fetch SQL questions
🤖 AI Hint Feature

**Uses Google Gemini (gemini-1.5-flash)**

Provides conceptual hints only

Does not reveal full SQL answers

Helps learners think logically

🔐 Environment Variables

This project uses environment variables for security.

**Example file:**

**.env.example**

PORT=5000
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_api_key

**❗ Security Notes**

API keys are stored in .env

.env is excluded using .gitignore

Never push secrets to GitHub
**
📈 Future Enhancements**

SQL query execution sandbox

User authentication

Difficulty-based questions

**Leaderboard**

PostgreSQL/MySQL support

AI feedback on query optimization

**👨‍💻 Author**

Ritik Yadav
B.Tech CSE | Full Stack Developer 
