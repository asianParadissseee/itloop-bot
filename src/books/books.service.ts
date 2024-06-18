import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import * as fs from 'node:fs';
import * as path from 'node:path';

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
  ) {}

  async create(
    createBookDto: CreateBookDto,
    file: Express.Multer.File,
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
    if (file) {
      const uploadsDir = path.join(__dirname, '..', 'uploads');

      // Ensure the uploads directory exists
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      const uploadPath = path.join(uploadsDir, file.originalname);
      fs.writeFileSync(uploadPath, file.buffer);
      book.filePath = file.originalname; // Store only the filename
    }

    return await this.booksRepository.save(book);
  }

  async findAll(): Promise<BookEntity[]> {
    const books = await this.booksRepository.find();
    const hostUrl = 'http://localhost:8080/uploads/'; // Base URL for file access

    return books.map(book => {
      if (book.filePath) {
        book.filePath = `${hostUrl}${book.filePath}`; // Construct the URL
      }
      return book;
    });
  }

  async findOne(id: number): Promise<BookEntity> {
    const book = await this.booksRepository.findOne({ where: { id } });
    const hostUrl = 'http://localhost:8080/uploads/'; // Base URL for file access

    if (book && book.filePath) {
      book.filePath = `${hostUrl}${book.filePath}`; // Construct the URL
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<BookEntity> {
    await this.booksRepository.update(id, updateBookDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
