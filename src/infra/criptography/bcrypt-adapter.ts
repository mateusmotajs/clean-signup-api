import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BcryptAdapter implements Encrypter {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.salt)
    return await new Promise(resolve => { resolve(hashedPassword) })
  }
}
