// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from "@ioc:Adonis/Core/Env"
import aws from "aws-sdk"

const s3 = new aws.S3({
    credentials: {
        accessKeyId: Env.get("S3_KEY"),
        secretAccessKey: Env.get("S3_SECRET")
    },
    region: Env.get("S3_REGION"),
    endpoint: Env.get("S3_ENDPOINT"),
    sslEnabled: true
})

export default class ObjectStoragesController {
    async upload(userUuid, buffer, filename){
        s3.putObject(
            {
                Body: buffer,
                Bucket: Env.get("S3_BUCKET"),
                Key: userUuid + "/" + filename
            },
            (err) => {
                if (err) {
                    throw err
                }
            }
        )
    }

    async download(userUuid, filename){
        return new Promise((resolve, reject) => {
            s3.getSignedUrl('getObject',{
                Bucket: Env.get("S3_BUCKET"),
                Key: `${userUuid}/${filename}`
            }, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}
