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

  setName(name: string): void{
    this.name = name
  }

  setEmail(email: string): void{
    this.email = email
  }

  postTransaction(transaction: Transactions): void{
    this.transactions.push(transaction)
  }

  getTrasaction(id: string): Transactions | undefined{
    const transaction: Transactions | undefined = this.transactions.find((transaction) => {
      return id === transaction.getId()
    })

    return transaction
  }

  getTransactions(): Array<Transactions>{
    return this.transactions
  }

  setTransaction(id: string, transaction: Transactions): void{
    const transactionIndex = this.transactions.findIndex((element) => {
      return id === element.getId()
    })

    this.transactions[transactionIndex] = transaction
  }

  deleteTransaction(id:string): void{
    const filteredTransactions = this.transactions.filter((transaction) => {
      return transaction.getId() === id
    })

    this.transactions === filteredTransactions
  }
}
export default User