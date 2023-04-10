import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routers/product.router';
import catRouter from './routers/category.router';
import userRouter from './routers/user.router';
dotenv.config()

const app = express();
const port = process.env.PORT

app.use(express.static(__dirname));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

var corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus:200
}

app.use(cors(corsOptions))



mongoose.connect('mongodb+srv://divya1234:e98sm5XQwDZoHY10@cluster0.jmnr6i1.mongodb.net/test')
  .then(() => console.log('Connected to ecommerce database!!!'));

app.use('/category',catRouter);
app.use('/product', productRouter)
app.use('/user',userRouter)
