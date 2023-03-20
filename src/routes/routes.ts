import { Router } from "express";
import Bank from "../classes/Bank";
import isCpfValid from "../middlewares/isCpfValid";

export const bank = new Bank()
const routes = Router()

routes.post('/users', isCpfValid,(req, res) => bank.postUser(req, res))
routes.get('/users/:id', (req, res) => bank.getUserById(req, res))
routes.get('/users', (req, res) => bank.getUsersWithoutTransactions(req, res))
routes.put('/users/:id', (req, res) => bank.putUserById(req, res))
routes.delete('/users/:id', (req, res) => {})
routes.post('/user/:userId/transactions', (req, res) => {})
routes.get('/user/:userId/transactions/:id', (req, res) => {})
routes.get('/users/:userId/transactions', (req, res) => {})
routes.put('/users/:userId/transactions/:id:', (req, res) => {})
routes.delete('/users/:userId/transactions/:id:', (req, res) => {})

export default routes