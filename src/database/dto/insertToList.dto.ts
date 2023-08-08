import { Status } from '../schemas/listResult.schema';

export default class InsertToListDto {
  url: string;
  status: Status;
  updatedAt?: Date;
}
