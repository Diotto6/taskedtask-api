import { ErrandDTO } from "../../dto";
import { ErrandEntity } from "../entities/errands";

export class ErrandRepository {
  async find(userId: string) {
    const errands = await ErrandEntity.find({ where: { userId } });

    return errands;
  }

  async findOne(id: string) {
    const errands = await ErrandEntity.findOne(id);

    return errands;
  }

  async create(errandDTO: ErrandDTO) {
    const errand = await new ErrandEntity(errandDTO.message, errandDTO.userId);
    errand.save();
    return errand;
  }

  async update(errandDTO: ErrandDTO) {
    const errand = await ErrandEntity.findOne(errandDTO.id);

    if (errand) {
      errand.message = errandDTO.message;
      await errand.save();
    }

    return errand;
  }

  async delete(errandID: string) {
    await ErrandEntity.delete(errandID);
  }
}
