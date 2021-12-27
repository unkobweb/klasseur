import Parameter from 'App/Models/Parameter';
import schedule from 'node-schedule';
import mysqldump from 'mysqldump';
import Env from '@ioc:Adonis/Core/Env';
import Drive from '@ioc:Adonis/Core/Drive';
import fs from 'fs';
import sha1 from 'sha1';
import archiver from 'archiver';
import User from 'App/Models/User';

const fileSaveSchedule = {
    checksum: null,
    crontab: null
}
const dbSaveSchedule = {
    checksum: null,
    crontab: null
}

async function saveDb() {
    const dbSaveParameter = await Parameter.query().where('name', 'db_save_scheduler').first()

    if (dbSaveParameter) {
        if (dbSaveSchedule.checksum !== sha1(JSON.stringify(dbSaveParameter))) {
            //@ts-ignore
            if (dbSaveSchedule.crontab) dbSaveSchedule.crontab.cancel()
            dbSaveSchedule.checksum = sha1(JSON.stringify(dbSaveParameter))
            dbSaveSchedule.crontab = schedule.scheduleJob(dbSaveParameter.value, async () => {
                // if backup folder doesn't exist, create it and if ./backup/db doesn't exist, create it
                if (!fs.existsSync('./backup')) fs.mkdirSync('./backup')
                if (!fs.existsSync('./backup/db')) fs.mkdirSync('./backup/db')
                // create a file with the current date
                const date = new Date()
                const dateString = date.getTime()
                const fileName = `./backup/db/${dateString}.sql`
                // create the file
                fs.writeFileSync(fileName, '')
                mysqldump({
                    connection: {
                        host: Env.get('MYSQL_HOST'),
                        user: Env.get('MYSQL_USER'),
                        //@ts-ignore
                        password: Env.get('MYSQL_PASSWORD'),
                        database: Env.get('MYSQL_DB_NAME'),
                    },
                    dumpToFile: `./backup/db/${dateString}.sql`,
                });
            });
        }
    } else if (!dbSaveParameter && dbSaveSchedule.crontab) {
        //@ts-ignore
        dbSaveSchedule.crontab.cancel()
    }
}

async function saveFiles() {
    const fileSaveParameter = await Parameter.query().where('name', 'file_save_scheduler').first()

    if (fileSaveParameter) {
        if (fileSaveSchedule.checksum !== sha1(JSON.stringify(fileSaveParameter))) {
            //@ts-ignore
            if (fileSaveSchedule.crontab) fileSaveSchedule.crontab.cancel()
            fileSaveSchedule.checksum = sha1(JSON.stringify(fileSaveParameter))
            fileSaveSchedule.crontab = schedule.scheduleJob(fileSaveParameter.value, async () => {
                const users = await User.query().preload('documents')
                // if backup folder doesn't exist, create it and if ./backup/files doesn't exist, create it
                if (!fs.existsSync('./backup')) fs.mkdirSync('./backup')
                if (!fs.existsSync('./backup/files')) fs.mkdirSync('./backup/files')

                const output = fs.createWriteStream(`./backup/files/${new Date().getTime()}.zip`);
                const archive = archiver('zip', {
                    zlib: { level: 9 }
                });

                // for each user, add the user folder to the zip
                for (const user of users) {
                    archive.directory(`./files/${user.uuid}`, `${user.uuid}`);
                    // for each document, get the buffer from the drive and add the document to the zip
                    for (const document of user.documents) {
                        const buffer = await Drive.get(`${user.uuid}/${document.filename}`)
                        archive.append(buffer, { name: `${user.uuid}/${document.filename}` })
                    }
                }

                archive.pipe(output);
                archive.finalize();

                console.log('File save schedule')
            });
        }
    } else if (!fileSaveParameter && fileSaveSchedule.crontab) {
        //@ts-ignore
        fileSaveSchedule.crontab.cancel()
    }
}

schedule.scheduleJob('*/1 * * * *', async () => {
    saveDb()
    saveFiles()
});

saveDb()
saveFiles()