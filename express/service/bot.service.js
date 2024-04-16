import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const TOKEN = process.env['BOT_TOKEN'];
const CHAT_ID = process.env['CHAT_ID'];
const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}`;

export const sendMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    await axios.post(API_URL, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: text,
    });
    res.status(200).send({ success: true, message: 'Message sent successfully!' });
  } catch (e) {
    next(e); // Pass any errors to the error handler middleware
  }
};