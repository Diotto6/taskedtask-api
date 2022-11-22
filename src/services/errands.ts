import { ErrandRepository } from "../database/repositories";
import { ErrandDTO } from "../dto";

export class ErrandService {
  async find(userId: string) {
    const repository = new ErrandRepository();
    const errands = await repository.find(userId);

    return errands;
  }
  async findOne(id: string) {
    const repository = new ErrandRepository();
    const errand = await repository.findOne(id);

    return errand;
  }

  async create(errandDTO: ErrandDTO) {
    const repository = new ErrandRepository();
    const errands = await repository.create(errandDTO);

    return errands;
  }

  async update(errandDTO: ErrandDTO) {
    const repository = new ErrandRepository();
    const errand = await repository.update(errandDTO);

    return errand;
  }

  async delete(errandId: string) {
    const repository = new ErrandRepository();
    await repository.delete(errandId);
  }
}
