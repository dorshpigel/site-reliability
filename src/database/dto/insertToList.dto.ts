import { ApiProperty } from '@nestjs/swagger/dist';
import { Status } from '../schemas/listResult.schema';

export default class InsertToListDto {
  @ApiProperty({ type: String })
  url: string;

  @ApiProperty({ type: Status })
  status: Status;

  @ApiProperty({ type: Date })
  updatedAt?: Date;
}
