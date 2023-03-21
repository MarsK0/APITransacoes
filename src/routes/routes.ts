import { Router } from "express";
import isCpfValid from "../middlewares/isCpfValid";
import Bank from "../classes/Bank";
import checkUser from "../middlewares/checkUser";

export const bank = new Bank()
const routes = Router()

routes.post('/users', isCpfValid, (req, res) => bank.postUser(req, res))
routes.get('/users/:id', (req, res) => bank.getUserById(req, res))
routes.get('/users', (req, res) => bank.getUsersWithoutTransactions(req, res))
routes.put('/users/:id', (req, res) => bank.putUserById(req, res))
routes.delete('/users/:id', (req, res) => bank.deleteUserById(req, res))
routes.post('/user/:userid/transactions', checkUser, (req, res) => bank.postTransaction(req, res))
routes.get('/user/:userid/transactions/:id', checkUser, (req, res) => bank.getTransaction(req, res))
routes.get('/users/:userid/transactions', checkUser, (req, res) => bank.getTransactions(req, res))
routes.put('/users/:userid/transactions/:id', checkUser, (req, res) => bank.putTransactionById(req, res))
routes.delete('/users/:userid/transactions/:id', checkUser, (req, res) => bank.deleteTransactionById(req, res))

export default routes