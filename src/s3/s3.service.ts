import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import {
  getSignedUrl,
  S3RequestPresigner,
} from '@aws-sdk/s3-request-presigner';
import { Hash } from '@aws-sdk/hash-node';

@Injectable()
export class S3Service {
  constructor() {}

  bucketName = '';
  s3Client = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
  });

  async uploadPublicFile(dataBuffer: Buffer, s3key: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Body: dataBuffer,
        Key: s3key,
        ContentDisposition: 'inline',
      });

      await this.s3Client.send(command);
      return s3key;
    } catch (error) {
      console.log(error);
    }
  }

  async generatePresignedUrl(filename: string, expiresIn: number = 3600) {
    console.log(filename);
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });

    return await getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
