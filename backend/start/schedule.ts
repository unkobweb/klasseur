import Parameter from 'App/Models/Parameter';
import schedule from 'node-schedule';
import sha1 from 'sha1';

const fileSaveSchedule = {
    checksum: null,
    crontab: null
}
const dbSaveSchedule = {
    checksum: null,
    crontab: null
}

schedule.scheduleJob('*/1 * * * *', async () => {
    console.log('Running scheduler');
    const fileSaveParameter = await Parameter.query().where('name', 'file_save_scheduler').first()
    const dbSaveParameter = await Parameter.query().where('name', 'db_save_scheduler').first()

    console.log('fileSaveParameter', fileSaveParameter?.serialize());
    console.log('dbSaveParameter', dbSaveParameter?.serialize());
    if (fileSaveParameter) {
        if (fileSaveSchedule.checksum !== sha1(JSON.stringify(fileSaveParameter))) {
            //@ts-ignore
            if (fileSaveSchedule.crontab) fileSaveSchedule.crontab.cancel()
            fileSaveSchedule.checksum = sha1(JSON.stringify(fileSaveParameter))
            fileSaveSchedule.crontab = schedule.scheduleJob(fileSaveParameter.value, async () => {
                console.log('File save schedule')
            });
        }
    } else if (!fileSaveParameter && fileSaveSchedule.crontab) {
        //@ts-ignore
        fileSaveSchedule.crontab.cancel()
    }
    //same for db save
    if (dbSaveParameter) {
        if (dbSaveSchedule.checksum !== sha1(JSON.stringify(dbSaveParameter))) {
            //@ts-ignore
            if (dbSaveSchedule.crontab) dbSaveSchedule.crontab.cancel()
            dbSaveSchedule.checksum = sha1(JSON.stringify(dbSaveParameter))
            dbSaveSchedule.crontab = schedule.scheduleJob(dbSaveParameter.value, async () => {
                console.log('DB save schedule')
            });

            console.log(dbSaveSchedule)
        }
    } else if (!dbSaveParameter && dbSaveSchedule.crontab) {
        //@ts-ignore
        dbSaveSchedule.crontab.cancel()
    }
});