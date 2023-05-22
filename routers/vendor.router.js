import express from 'express';
import { register, login, getVendors, getVendor, updateVendor, deleteVendor } from '../controllers/vendor.controller';

import { vendorControl } from '../controllers/vendor_control.controllers';

const vendorRouter = express.Router();

vendorRouter.post('/register',register);
vendorRouter.post('/login',login);
vendorRouter.get('/get-vendor',getVendors);
vendorRouter.get('/get-vendor/:vendorID',getVendor);
vendorRouter.patch('/update-vendor/:vendorID',updateVendor);
vendorRouter.delete('/delete-vendor/:vendorID',deleteVendor);

vendorRouter.post('/vendor-location',vendorControl)

export default vendorRouter;
