import { ApiProperty } from '@nestjs/swagger/dist';

export default class ResultRquestDto {
  @ApiProperty({ type: String })
  url: string;
}
