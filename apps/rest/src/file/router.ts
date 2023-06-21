import express from 'express';
import multer from 'multer';
import path from 'path';
import { cwd } from 'process';
import { uploadFileHandler } from './upload-file/handler';
import { getFileRecordHandler } from './get-file-record/handler';
import { listFileRecordHandler } from './list-file-record/handler';

const UPLOADS_PATH = path.join(cwd(), 'uploads');

const upload = multer({ dest: UPLOADS_PATH });

const file = express.Router();

file.post('/upload', upload.single('file'), uploadFileHandler);

file.get('/list', listFileRecordHandler);

file.get('/:fileId', getFileRecordHandler);

export default file;
