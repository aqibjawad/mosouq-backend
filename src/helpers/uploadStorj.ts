import { Storj } from '@storj/nodejs-sdk';
import storjConfig from '../config/storjConfig';
import * as fs from 'fs';
import multer, { File } from 'multer';

interface UploadResult {
  fileName: string;
  fileUrl: string;
}

class StorjUpload {
  private storj: Storj;

  constructor() {
    this.storj = new Storj(storjConfig);
  }

  async uploadSingleFile(file: File): Promise<UploadResult> {
    try {
      const uploadResult = await this.storj.uploadFile(file.originalname, file.buffer);
      console.log(`File uploaded successfully: ${uploadResult.fileName}`);
      return { fileName: uploadResult.fileName, fileUrl: uploadResult.fileUrl };
    } catch (error) {
      console.error(`Error uploading file: ${error.message}`);
      throw error;
    }
  }

  async uploadMultipleFiles(files: File[]): Promise<UploadResult[]> {
    const uploadPromises = files.map((file) => this.storj.uploadFile(file.originalname, file.buffer));
    try {
      const uploadResults = await Promise.all(uploadPromises);
      console.log(
        `Files uploaded successfully: ${uploadResults
          .map((result) => result.fileName)
          .join(', ')}`
      );
      return uploadResults.map((result) => ({ fileName: result.fileName, fileUrl: result.fileUrl }));
    } catch (error) {
      console.error(`Error uploading files: ${error.message}`);
      throw error;
    }
  }
}

const storjUpload = new StorjUpload();

const singleFileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB file size limit
});

const multiFileUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB file size limit
  array: true, // Enable multi-file upload
});

export { storjUpload, singleFileUpload, multiFileUpload };