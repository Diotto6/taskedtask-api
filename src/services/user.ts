import { UserRepository } from '../database/repositories'
import { UserDTO } from '../dto'

export class UserService {
  async find() {
    const repository = new UserRepository()
    const user = await repository.find()

    return user
  }

  async findOne(id: any) {
    const repository = new UserRepository()
    const user = await repository.findOne(id)

    return user
  }

  async create(userDTO: UserDTO) {
    const repository = new UserRepository()
    const user = await repository.create(userDTO)

    return user
  }

  async update(userDTO: UserDTO) {
    const repository = new UserRepository()
    const user = await repository.update(userDTO)

    return user
  }

  async delete(id: number) {
    const repository = new UserRepository()
    await repository.delete(id)
  }
}
