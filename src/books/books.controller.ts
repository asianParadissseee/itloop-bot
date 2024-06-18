import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor('filePath'))
  @ApiOperation({ summary: 'Создать новую книгу' })
  @ApiResponse({ status: 201, description: 'Книга успешно создана.' })
  @ApiResponse({ status: 400, description: 'Некорректные данные.' })
  @ApiBody({ type: CreateBookDto })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
    @UploadedFile() img: Express.Multer.File,
  ) {
    return await this.booksService.create(createBookDto, file, img);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех книг' })
  @ApiResponse({ status: 200, description: 'Список книг успешно получен.' })
  async findAll() {
    return await this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о книге по ID' })
  @ApiParam({ name: 'id', description: 'Идентификатор книги' })
  @ApiResponse({
    status: 200,
    description: 'Информация о книге успешно получена.',
  })
  @ApiResponse({ status: 404, description: 'Книга не найдена.' })
  async findOne(@Param('id') id: number) {
    return await this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить информацию о книге по ID' })
  @ApiParam({ name: 'id', description: 'Идентификатор книги' })
  @ApiResponse({
    status: 200,
    description: 'Информация о книге успешно обновлена.',
  })
  @ApiResponse({ status: 404, description: 'Книга не найдена.' })
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return await this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить книгу по ID' })
  @ApiParam({ name: 'id', description: 'Идентификатор книги' })
  @ApiResponse({ status: 200, description: 'Книга успешно удалена.' })
  @ApiResponse({ status: 404, description: 'Книга не найдена.' })
  async remove(@Param('id') id: number) {
    return await this.booksService.remove(id);
  }
}
