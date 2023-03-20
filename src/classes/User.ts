import { v4 as uuid } from "uuid"
import Transactions from "./Transactions"

class User{

  private id: string = uuid()
  private transactions: Array<Transactions> = []

  constructor(
    private name: string,
    private cpf: string,
    private email: string,
    private age: number,
  ){}

  getId(): string{
    return this.id
  }

  getName(): string{
    return this.name
  }

  getCpf(): string{
    return this.cpf
  }

  getEmail(): string{
    return this.email
  }

  getAge(): number{
    return this.age
  }
}
export default User