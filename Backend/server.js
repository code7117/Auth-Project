require('dotenv').config(); // ✅ Load environment variables first
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/mongodb');
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 4000;




// Connect to MongoDB
connectDB();
const allowedOrigins =['http://localhost:3000','https://auth-13.onrender.com'
  
]
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins , credentials: true }));

// API Endpoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter)


// Start Server
app.listen(port, () => {
  console.log(`Server started on Port: ${port}`);
});
