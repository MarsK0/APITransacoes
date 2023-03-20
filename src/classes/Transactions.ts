import { v4 as uuid } from "uuid"

class Transactions{
  
  private id: string = uuid()

  constructor(
    private title: string,
    private value: number,
    private type: 'revenue'|'expense'
  ){}

  getId(): string{
    return this.id
  }

  getTitle(): string{
    return this.title
  }

  getValue(): number{
    return this.value
  }

  getType(): 'revenue'|'expense'{
    return this.type
  }
}

export default Transactions