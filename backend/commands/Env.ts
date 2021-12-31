import { BaseCommand } from '@adonisjs/core/build/standalone'
import { existsSync, readFileSync, writeFileSync } from 'fs'

export default class Env extends BaseCommand {

  /**
   * Command name is used to run the command
   */
  public static commandName = 'env'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run () {
    const {default: Parameter} = await import('App/Models/Parameter');
    if (!existsSync('config/parameters.json')) {
      writeFileSync('config/parameters.json', '{}');
      console.log('Created /config/parameters.json');
    }
    const config = JSON.parse(readFileSync('config/parameters.json','utf-8'));
    const parameters = await Parameter.all();
    for (let i = 0; i < parameters.length; i++) {
      config[parameters[i].name] = parameters[i].value;
    }
    writeFileSync('config/parameters.json', JSON.stringify(config, null, 2));
    console.log('Updated /config/parameters.json');
  }
}
