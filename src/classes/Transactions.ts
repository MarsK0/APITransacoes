import { v4 as uuid } from "uuid"

class Transactions{
  
  private id: string = uuid()

  constructor(
    private title: string,
    private value: number,
    private type: 'income'|'outcome'
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

  getType(): 'income'|'outcome'{
    return this.type
  }

  setTitle(title: string): void{
    this.title = title
  }

  setValue(value: number): void{
    this.value = value
  }

  setType(type: 'income'|'outcome'): void{
    this.type = type
  }
}

export default Transactions