import Database from '@ioc:Adonis/Lucid/Database';
import Env from '@ioc:Adonis/Core/Env';

/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
Database.from('parameters').then(async (config) => {
    // for each parameter set it as env variable
    for (let i = 0; i < config.length; i++) {
        Env.set(config[i].name, config[i].value)
    }
}).catch(err => {
    console.log(err)
    process.exit(1)
});