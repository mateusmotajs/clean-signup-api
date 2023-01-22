import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hash') })
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')

    expect(hashSpy).toHaveBeenCalledWith('any_password', salt)
  })

  test('should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashedPassword = await sut.encrypt('any_password')

    expect(hashedPassword).toBe('hash')
  })
})
