import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import catRouter from './routers/category.router';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routers/product.router';
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
  origin: 'http://localhost:3000',
  optionsSuccessStatus:200
}

app.use(cors(corsOptions))



mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => console.log('Connected to ecommerce database!!!'));

app.use('/category',catRouter);
app.use('/product', productRouter)
