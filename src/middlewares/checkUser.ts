import { Request, Response, NextFunction } from "express";
import { bank } from "../routes/routes";

function checkUser(req: Request, res: Response, next: NextFunction){
      try{
        const userid = req.params.userid

        const user = bank.getUsers().find((user) => {
          return userid === user.getId()
        })

        if(!user) return res.status(400).json({message: 'Usuário não encontrado!'})

        next()
      }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Erro interno'})
      }
}

export default checkUser