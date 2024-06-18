import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ){}

  async create(
    createBookDto: CreateBookDto,
    file: Express.Multer.File,
    img: Express.Multer.File,
  ) {
    const book = new BookEntity();
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.year = createBookDto.year;
    book.author = createBookDto.author;
    book.udk = createBookDto.udk;
    book.bbc = createBookDto.bbc;
    book.img = createBookDto.img;
    book.length = createBookDto.length;
    if (img) {
      const uploadImgDir = path.join(__dirname, '..', 'images');
      if (!fs.existsSync(uploadImgDir)) {
        fs.mkdirSync(uploadImgDir);
        const uploadPath = path.join(uploadImgDir, file.originalname);
        fs.writeFileSync(uploadPath, file.buffer);
        book.img = uploadPath;
      }
    }
    if (file) {
      const uploadsDir = path.join(__dirname, '..', 'uploads');

      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      const uploadPath = path.join(uploadsDir, file.originalname);
      fs.writeFileSync(uploadPath, file.buffer);
      book.filePath = uploadPath;
    }

    return await this.booksRepository.save(book);
  }

  async findAll(): Promise<BookEntity[]> {
    return await this.booksRepository.find();
  }

  async findOne(id: number): Promise<BookEntity> {
    return await this.booksRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    await this.booksRepository.update(id, updateBookDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
