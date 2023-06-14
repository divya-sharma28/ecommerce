import express from 'express'
import { vendorControl } from '../controllers/vendor_control.controllers'

const venderControlRouter = express.Router()

venderControlRouter.post('/vendor-user', vendorControl)

export default venderControlRouter