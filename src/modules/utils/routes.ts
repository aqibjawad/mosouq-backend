import 'dotenv/config';
import express from 'express';
import { uploadSingleFile } from './controller';
import { upload, uploadToMemory } from '../../helpers/upload';

const router = express.Router();


router.post("/upload-single-file", uploadToMemory.single("file"), uploadSingleFile)

export default router;
