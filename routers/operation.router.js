import express from 'express'
import { operation, getOperation } from '../controllers/operation.controller'

const operationRouter = express.Router()

operationRouter.post('/operation', operation)
operationRouter.get('/get-operation', getOperation)

export default operationRouter