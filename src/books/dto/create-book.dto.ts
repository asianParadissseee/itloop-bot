import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Название книги' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Описание книги' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Год издания книги' })
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'Автор книги' })
  @IsString()
  author: string;

  @ApiProperty({ description: 'Универсальная десятичная классификация' })
  @IsString()
  udk: string;

  @ApiProperty({ description: 'Библиотечно-библиографическая классификация' })
  @IsString()
  bbc: string;

  // @ApiProperty({
  //   type: 'string',
  //   format: 'binary',
  //   description: 'Обложка книги',
  // })
  @ApiProperty({ description: 'Обложка книги' })
  img: string;

  @ApiProperty({ description: 'Кол-во книг' })
  @IsNumber()
  length: number;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Файл книги' })
  filePath: any;
}
