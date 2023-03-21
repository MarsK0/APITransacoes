import User from "./User"
import { NextFunction, Request, Response } from "express"
import IUserInfos from "../types/IUserInfos";
import Transactions from "./Transactions";

class Bank{
  public users: Array<User> = [new User('admin','admin','admin',0)]

  getUsers(): Array<User>{
    return this.users
  }

  postUser(req: Request, res: Response){
    
    try{
      if(
        req.body.name === '' ||
        req.body.cpf.length != 11 ||
        req.body.email === '' ||
        req.body.age < 0
      ) return res.status(400).json({message: 'Informações inválidas!'})
  
      const newUser = new User(
        req.body.name,
        req.body.cpf,
        req.body.email,
        req.body.age,
      )
      
      this.users.push(newUser)
      return res.status(201).json({message: 'Usuário cadastrado!', newUser})
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  getUserById(req: Request, res: Response){
    try{
      const id = req.params.id

      const selectedUser = this.users.find((user) => {
        return user.getId() === id
      })

      if(!selectedUser) return res.status(400).json({message: 'Usuário não encontrado1'})

      return res.status(200).json(selectedUser)
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  getUsersWithoutTransactions(req: Request, res: Response){
    try{
      const filter: string | undefined = req.query.filter as string

      const usersWithoutTransactions: Array<IUserInfos> = []

      if(filter){
        this.users.forEach((user) => {
          if(user.getName().indexOf(filter) > -1 ||
            user.getCpf().indexOf(filter) > -1 ||
            user.getEmail().indexOf(filter) > -1){
                const filteredUser: IUserInfos ={
                  id: user.getId(),
                  name: user.getName(),
                  cpf: user.getCpf(),
                  email: user.getEmail(),
                  age: user.getAge()
                }

                usersWithoutTransactions.push(filteredUser)
            }
        })
      }else{
        this.users.forEach((user) => {
          const _user: IUserInfos ={
            id: user.getId(),
            name: user.getName(),
            cpf: user.getCpf(),
            email: user.getEmail(),
            age: user.getAge()
          }

          usersWithoutTransactions.push(_user)
        })
      }

      if(usersWithoutTransactions.length > 0)return res.status(200).json(usersWithoutTransactions)

      return res.status(400).json({message: 'Nenhum usuário encontrado conforme parâmetros!'})
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  putUserById(req: Request, res: Response){
    try{
      const id = req.params.id
      const name = req.query.name as string | undefined
      const email = req.query.email as string | undefined

      if(!email && !name) return res.status(400).json({message: 'Não há informação a ser inserida'})

      const user = this.users.find((user) => {
        return user.getId() === id
      })

      if(!user) return res.status(400).json({message: 'Usuário não encontrado!'})
      if(name) user.setName(name)
      if(email) user.setEmail(email)

      let userWasNotModified: boolean = true

      this.users.forEach((element) => {
        if(element.getId() === user.getId()){
          element = user
          userWasNotModified = false
        }
      })

      if(userWasNotModified) return res.status(500).json({message: 'Erro interno!'})

      const userReturn: IUserInfos = {
        name: user.getName(),
        cpf: user.getCpf(),
        email: user.getEmail(),
        age: user.getAge(),
        id: user.getId()
      }

      return res.status(201).json(userReturn)
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  deleteUserById(req: Request, res: Response){
    try{
      const id = req.params.id

      const filteresUsers = this.users.filter((user) => {
        return user.getId() != id
      })

      if(filteresUsers.length === this.users.length) return res.status(400).json({message: 'Usuário não econtrado!'})

      this.users = filteresUsers

      return res.status(200).json({message: 'Usuário removido com sucesso!'})
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  postTransaction(req: Request, res: Response){
    try{
      const userid = req.params.userid
      const title = req.body.title
      const value = req.body.value
      const type = req.body.type

      const userIndex = this.users.findIndex((user) => {
        return userid === user.getId()
      })

      if(typeof title !== 'string' ||
        typeof value !== 'number' ||
        (type !== 'income' && type !== 'outcome')) return res.status(400).json({message: 'Informações inválidas'})

      if(value <= 0) return res.status(400).json({message: 'Valor de transação inválido!'})

      const transaction = new Transactions(title, value, type)

      this.users[userIndex].postTransaction(transaction)
      return res.status(201).json({message: 'Transação concluída!', transaction})
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }

  }

  getTransaction(req: Request, res: Response){
    try{
      const userid = req.params.userid
      const id = req.params.id

      const userIndex = this.users.findIndex((user) => {
        return userid === user.getId()
      })

      const transaction = this.users[userIndex].getTrasaction(id)

      if(!transaction) return res.status(400).json({message: 'Transação não encontrada!'})

      return res.status(200).json(transaction)

    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  getTransactions(req: Request, res: Response){
    try{
      const userid = req.params.userid

      const user = this.users.find((user) => {
        return userid === user.getId()
      })

      if(!user!.getTransactions()) return res.status(400).json({message: 'Não há transações realizadas para este usuário!'})

      const transactions = user!.getTransactions()

      const income = transactions.reduce((prev, curr) => {
        if(curr.getType() === 'income') return prev + curr.getValue()

        return prev
      }, 0)

      const outcome = transactions.reduce((prev, curr) => {
        if(curr.getType() === 'outcome') return prev + curr.getValue()

        return prev
      }, 0)

      const total = income - outcome

      return res.status(200).json({transactions, balance: {income, outcome, total}})
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  putTransactionById(req: Request, res: Response){
    try{
      const userid = req.params.userid
      const id = req.params.id
      const title = req.body.title
      const value = req.body.value
      const type = req.body.type

      if(typeof title !== 'string' ||
        typeof value !== 'number' ||
        (type !== 'income' && type !== 'outcome')) return res.status(400).json({message: 'Informações inválidas'})

      if(!title && !value && !type) return res.status(400).json({message: 'Não há informação a ser inserida'})

      const userIndex = this.users.findIndex((user) => {
        return userid === user.getId()
      })

      const transaction = this.users[userIndex].getTrasaction(id)

      if(!transaction) return res.status(400).json({message: 'Transação não encontrada!'})

      if(title) transaction.setTitle(title)
      if(value) transaction.setValue(value)
      if(type) transaction.setType(type)

      this.users[userIndex].setTransaction(id, transaction)

      return res.status(200).json({message: 'Transação alterada!', transaction})

    }catch(error){
      console.log(error)
      return res.status(500).json({message:'Erro interno!'})
    }
  }

  deleteTransactionById(req: Request, res: Response){
    try{
      const userid = req.params.userid
      const id = req.params.id

      const userIndex = this.users.findIndex((user) => {
        return user.getId() === userid
      })

      const transaction = this.users[userIndex].getTrasaction(id)

      if(!transaction) return res.status(400).json({message: 'Transação não encontrada!'})

      this.users[userIndex].deleteTransaction(id)

      return res.status(200).json({message: 'Transação excluída!', transaction})
      
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }
}

export default Bank