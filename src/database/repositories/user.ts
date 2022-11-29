import { UserEntity } from "../entities";
import { UserDTO } from "../../dto";

export class UserRepository {
  async find(email: string) {
    const user = await UserEntity.find({ where: { email: email } });
    return user;
  }

  async findOne(email: string) {
    const user = await UserEntity.findOne(email);
    return user;
  }

  async create(userDTO: UserDTO) {
    const user = await new UserEntity(
      userDTO.firstName,
      userDTO.lastName,
      userDTO.email,
      userDTO.password,
      userDTO.passwordConfirm!
    );
    user.save();

    return user;
  }

  async update(userDTO: UserDTO) {
    const user = await UserEntity.findOne(userDTO.id);

    if (user) {
      user.email = userDTO.email;
      user.password = userDTO.password;
      await user.save();
    }

    return user;
  }

  async delete(userID: number) {
    await UserEntity.delete(userID);
  }
}
