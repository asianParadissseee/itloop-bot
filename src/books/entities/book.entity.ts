import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор книги' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Великий Гэтсби', description: 'Название книги' })
  name: string;

  @Column()
  @ApiProperty({
    example: 'Классический роман, действие которого происходит в 1920-х годах.',
    description: 'Описание книги',
  })
  description: string;

  @Column()
  @ApiProperty({ example: 1925, description: 'Год издания книги' })
  year: number;

  @Column()
  @ApiProperty({ example: 'Ф. Скотт Фицджеральд', description: 'Автор книги' })
  author: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'path/to/book/file.pdf',
    description: 'Путь к файлу книги',
    required: true,
  })
  filePath?: string;

  @Column()
  @ApiProperty({ example: '821.111', description: 'УДК классификация книги' })
  udk: string;

  @Column()
  @ApiProperty({ example: '823.91', description: 'ББК классификация книги' })
  bbc: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'path/to/image.jpg',
    description: 'Путь к изображению книги',
  })
  img: string;

  @Column()
  @ApiProperty({ example: 200, description: 'Количество страниц в книге' })
  length: number;
}
