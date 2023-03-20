import { Request, Response, NextFunction } from "express";
import { bank } from "../routes/routes";

async function isCpfValid(req: Request, res:Response, next: NextFunction){
  try{
    const cpfIsInvalid = bank.getUsers().some((user) =>{
      return user.getCpf() === req.body.cpf
    })

    if(cpfIsInvalid) return res.status(400).json({message: 'CPF já cadastrado!'})
  
    next()
  }catch(error){
    console.log(error)
    return res.status(500).json({message: 'Erro interno!'})
  }
}

export default isCpfValid