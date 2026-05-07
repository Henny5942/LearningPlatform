require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions=require("./config/corsOptions")
const connectDB = require('./config/dbConn');
const { default: mongoose } = require('mongoose');
const PORT = process.env.PORT || 4000;

const app = express();
connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/users', require('./routes/userRouter'));
app.use('/api/prompts', require('./routes/promptRouter'));
app.use('/api/categories', require('./routes/categoryRouter'));
app.use('/api/subcategories', require('./routes/subCategoryRouter'));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

mongoose.connection.once('open',()=>{
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`server running on ${PORT}`))
})

mongoose.connection.on('error',err=>{
  console.log(err)
})
