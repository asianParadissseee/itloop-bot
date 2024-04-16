import { Router } from 'express';
import botController from '../controllers/bot.controller.js';

const router = Router()

router.post("/bot/", botController.sendMessage)

export default router