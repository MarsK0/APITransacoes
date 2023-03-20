import User from "./User"
import { NextFunction, Request, Response } from "express"
import IUserInfos from "../types/IUserInfos";

class Bank{
  private users: Array<User> = [];

  getUsers(): Array<User>{
    return this.users
  }

  postUser(req: Request, res:Response){
    
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
      return res.status(201).json({message: `${newUser.getName()} cadastrado com id ${newUser.getId()}`})
    }catch(error){
      console.log(error)
      return res.status(500).json({message: 'Erro interno!'})
    }
  }

  getUserById(req: Request, res: Response){
    const id = req.params.id

    const selectedUser = this.users.find((user) => {
      return user.getId() === id
    })

    if(!selectedUser) return res.status(400).json({message: 'Usuário não encontrado1'})

    return res.status(200).json(selectedUser)
  }

  getUsersWithoutTransactions(req: Request, res: Response){
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
  }

  putUserById(req: Request, res: Response){
    
  }
}

export default Bank