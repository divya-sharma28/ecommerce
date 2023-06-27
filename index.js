import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routers/product.router';
import catRouter from './routers/category.router';
import userRouter from './routers/user.router';
import locRouter from './routers/location.router';
import vendorRouter from './routers/vendor.router';
import adminRouter from './routers/admin.router';
import cartRouter from './routers/cart.router';
import statusRouter from './routers/status.router';
import venodorOrdersRouter from './routers/vendor_orders.router';
import operationRouter from './routers/operation.router';
import vendorModel from './models/vendor.model';

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



mongoose.connect('mongodb+srv://divya1234:e98sm5XQwDZoHY10@cluster0.jmnr6i1.mongodb.net/test')
  .then(() => console.log('Connected to database!!!'));


  // mongoose.connection.collection('vendors').createIndex({ vendor_location: "2dsphere" });
 

app.use('/category',catRouter);
app.use('/product', productRouter);
app.use('/user',userRouter);
app.use('/location',locRouter);
app.use('/vendor', vendorRouter);
app.use('/admin', adminRouter);
app.use('/cart',cartRouter)
app.use('/status',statusRouter)
app.use('/vendor-orders', venodorOrdersRouter)
app.use('/vendor-user', operationRouter)

