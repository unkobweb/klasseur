/**
 * Config source: https://git.io/JBt3o
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DriveConfig } from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'
import {readFileSync} from 'fs'

const config = JSON.parse(readFileSync('config/parameters.json','utf-8'))

/*
|--------------------------------------------------------------------------
| Drive Config
|--------------------------------------------------------------------------
|
| The `DriveConfig` relies on the `DisksList` interface which is
| defined inside the `contracts` directory.
|
*/
const driveConfig: DriveConfig = {
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk to use for managing file uploads. The value is driven by
  | the `DRIVE_DISK` environment variable.
  |
  */
  disk: config.DRIVE_DISK || 'local',

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Uses the local file system to manage files. Make sure to turn off serving
    | files when not using this disk.
    |
    */
    local: {
      driver: 'local',
      visibility: 'public',
      root: Application.tmpPath('uploads'),
      serveFiles: true,
      basePath: '/uploads',
    },

    s3: {
      driver: 's3',
      visibility: 'public',
      key: config.S3_KEY,
      secret: config.S3_SECRET,
      region: config.S3_REGION,
      //@ts-ignore
      bucket: config.S3_BUCKET,
      endpoint: config.S3_ENDPOINT,
    },

    /*
    |--------------------------------------------------------------------------
    | GCS Driver
    |--------------------------------------------------------------------------
    |
    | Uses the Google cloud storage to manage files. Make sure to install the GCS
    | drive separately when using it.
    |
    |**************************************************************************
    | npm i @adonisjs/drive-gcs
    |**************************************************************************
    |
    */
    // gcs: {
    //   driver: 'gcs',
    //   visibility: 'public',
    //   keyFilename: Env.get('GCS_KEY_FILENAME'),
    //   bucket: Env.get('GCS_BUCKET'),

      /*
      |--------------------------------------------------------------------------
      | Uniform ACL - Google cloud storage only
      |--------------------------------------------------------------------------
      |
      | When using the Uniform ACL on the bucket, the "visibility" option is
      | ignored. Since, the files ACL is managed by the google bucket policies
      | directly.
      |
      |**************************************************************************
      | Learn more: https://cloud.google.com/storage/docs/uniform-bucket-level-access
      |**************************************************************************
      |
      | The following option just informs drive whether your bucket is using uniform
      | ACL or not. The actual setting needs to be toggled within the Google cloud
      | console.
      |
      */
    //   usingUniformAcl: false
    // },
  },
}

export default driveConfig
