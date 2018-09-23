import { Validator } from 'jsonschema'

function getErrorMsg(lang, err) {
  if (!lang) return err.message
  const propMap = lang[err.property]
  if (!propMap) return err.message
  if (typeof propMap === 'string') return propMap
  const attrMap = propMap[err.name]
  if (!attrMap) {
    if (propMap['$default']) return propMap['$default']
    return err.message
  }

  return attrMap
}

export const validateFormFields = (instance, schema = {}, prop, lang) => {
  const validator = new Validator()
  const validatorResult = validator.validate(instance, schema, prop)
  const messages = {
    'instance.FIRSTNAME': {
      minLength: lang.mz_cashier_validation_name2,
      required: lang.mz_cashier_validation_name,
    },
    'instance.LASTNAME': {
      minLength: lang.mz_cashier_validation_name2,
      required: lang.mz_cashier_validation_name,
    },
    'instance.ADDRESS': {
      minLength: lang.mz_cashier_validation_address2,
      required: lang.mz_cashier_validation_address,
    },
    'instance.Country': {
      minLength: lang.mz_cashier_validation_country,
      required: lang.mz_cashier_validation_country,
    },
    'instance.CITY': {
      minLength: lang.mz_cashier_validation_city2,
      required: lang.mz_cashier_validation_city,
    },
    'instance.PHONE': {
      minLength: lang.mz_cashier_validation_phone2,
      required: lang.mz_cashier_validation_phone,
    },
  }
  const errors = {}
  const currentError = validatorResult.errors.filter((item) => {
    return item.property === `instance.${prop}`
  })
  const currentErrorText = () => currentError[0] !== undefined ? getErrorMsg(messages, currentError[0]) : false
  errors[prop] = currentErrorText()

  return {
    validatorResult,
    errors,
  }
}

export const validateForm = (instance, schema = {}, lang) => {
  const validator = new Validator()
  const validatorResult = validator.validate(instance, schema)
  const messages = {
    'instance.FIRSTNAME': {
      minLength: lang.mz_cashier_validation_name2,
      required: lang.mz_cashier_validation_name,
    },
    'instance.LASTNAME': {
      minLength: lang.mz_cashier_validation_name2,
      required: lang.mz_cashier_validation_name,
    },
    'instance.ADDRESS': {
      minLength: lang.mz_cashier_validation_address2,
      required: lang.mz_cashier_validation_address,
    },
    'instance.Country': {
      minLength: lang.mz_cashier_validation_country,
      required: lang.mz_cashier_validation_country,
    },
    'instance.CITY': {
      minLength: lang.mz_cashier_validation_city2,
      required: lang.mz_cashier_validation_city,
    },
    'instance.PHONE': {
      minLength: lang.mz_cashier_validation_phone2,
      required: lang.mz_cashier_validation_phone,
    },
  }
  const errors = validatorResult.errors.reduce((err, line) => {
    return { ...err, [line.property.slice(9)]: getErrorMsg(messages, line) }
  }, {})
  const isError = validatorResult.errors.length !== 0
  return {
    validatorResult,
    errors,
    isError,
  }
}