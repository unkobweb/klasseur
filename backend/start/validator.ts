/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('tagFormat', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }

  // check if value contain only letters, numbers and dash
  if (!value.match(/^[a-zA-Z0-9-]+$/)) {
    options.errorReporter.report(
        options.pointer,
        'tagFormat',
        'tag format validation failed',
        options.arrayExpressionPointer
      )
  }
})