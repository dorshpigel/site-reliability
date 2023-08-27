import { ApiProperty } from '@nestjs/swagger/dist';

export default class URLDto {
  @ApiProperty({ type: String })
  url: string;
}
