import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()
const TOKEN = process.env['BOT_TOKEN'];
const CHAT_ID = process.env['CHAT_ID'];
const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}`;


const sendMessage = async (req, res) => {
  const data = await req.body;
  try {
    await axios.post(API_URL, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: data.text,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      error: `Ошибка отправки сообщения ${e}`,
    });
  }
};

export default { sendMessage }