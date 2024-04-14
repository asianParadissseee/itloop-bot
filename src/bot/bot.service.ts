import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as process from 'process';
import axios from 'axios';
import { CreateBotDto } from './dto/create-bot.dto';

@Injectable()
export class BotService {
  private TOKEN = process.env.BOT_TOKEN;
  private CHAT_ID = process.env.CHAT_ID;
  private API_URL = `https://api.telegram.org/bot${this.TOKEN}/sendMessage?chat_id=-4145136644`;

  getFormatData(data: CreateBotDto) {
    let messageDto = `Имя <b>${data.name}</b>\n`;
    messageDto += `Телефон <b>${data.phoneNumber}</b>\n`;
    return messageDto;
  }

  async sendData(createBotDto: CreateBotDto) {
    try {
      await axios.post(this.API_URL, {
        chat_id: this.CHAT_ID,
        parse_mode: 'html',
        text: this.getFormatData(createBotDto),
      });
      console.log(createBotDto);
    } catch (e) {
      if (e instanceof Error) {
        console.error('Error status:', e.message);
      }
      throw new InternalServerErrorException(`Ошибка отправки ${e.message}`);
    }
  }
}
