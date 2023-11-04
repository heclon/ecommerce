import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

interface File {
  fileName: string
  body: Buffer
  mimeType: string
}

export interface ProviderProfileImage extends File {
  providerId: string
}

export interface ProviderProfileImageUploadResult {
  key: string
  bucket: string
  version: string
  url: string
}

export default class AwsService {
  private s3Client: S3Client
  private bucket: string
  private region: string

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.ecommerce_AWS_REGION,
      credentials: {
        accessKeyId: process.env.ecommerce_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.ecommerce_AWS_SECRET_ACCESS_KEY as string,
      },
    })
    this.bucket = `ecommerce-${this.getEnvironment()}`
    this.region = process.env.ecommerce_AWS_REGION as string
  }
  private getEnvironment() {
    if (process.env.RACK === 'production') {
      return 'production'
    }
    return 'staging'
  }
  private makePublicKey = ({ fileName, mimeType, providerId }: ProviderProfileImage) => {
    const fileType = mimeType.split('/')?.pop() ?? 'png'
    const timestamp = Date.now().valueOf()
    return `shopfront-public/${providerId}/${fileName}-${timestamp}.${fileType}`
  }

  public async uploadProviderMedia(file: ProviderProfileImage): Promise<ProviderProfileImageUploadResult> {
    const key = this.makePublicKey(file)
    const putObjectArgs = {
      Bucket: this.bucket,
      Key: key,
      Body: file.body,
    }
    const result = await this.s3Client.send(new PutObjectCommand(putObjectArgs))
    return {
      key,
      version: result.VersionId as string,
      url: `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`,
      bucket: this.bucket,
    }
  }

  public async deleteMedia(key: string): Promise<void> {
    const deleteObjectArgs = {
      Bucket: this.bucket,
      Key: key,
    }
    await this.s3Client.send(new DeleteObjectCommand(deleteObjectArgs))
  }
}
