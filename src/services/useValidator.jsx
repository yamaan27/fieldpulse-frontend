import React, { useState } from 'react'
import SimpleReactValidator from 'simple-react-validator'

// const useValidator = (customMessage = {}, customValidator = {}) => {
//     const [show, setShow] = useState(false)
//     const validator = new SimpleReactValidator({
//         messages:  <span className="error-message">{customMessage}</span>,
//         validators: customValidator
//     })

//     if (show) {
//         validator.showMessages()
//     }

//     return [validator, setShow]
// }

// export default useValidator

const useValidator = (customMessage = {}, customValidator = {}) => {
  const [show, setShow] = useState(false)

  // Add the custom validation rule
  const extendedValidators = {
    ...customValidator,
    mobile_number_format: {
      message: 'The :attribute must contain only numbers and hyphens (-).',
      rule: (val) => {
        return /^[0-9-]+$/.test(val) // Validate that only numbers and hyphens are present
      },
      messageReplace: (message) =>
        message.replace(':attribute', 'Mobile number'),
    },
    alpha_num_space: {
      message:
        'The :attribute must contain only alphabets, numbers, and spaces.',
      rule: (val) => {
        return /^[a-zA-Z0-9\s]+$/.test(val) // Regex to validate alphabets, numbers, and spaces
      },
      messageReplace: (message) => message.replace(':attribute', 'This field'),
    },
    in_range: {
      message: 'The :attribute must be a number between 1 and 10.',
      rule: (val) => {
        const numericValue = parseInt(val, 10)
        return numericValue >= 1 && numericValue <= 10 // Check if the value is between 1 and 10
      },
      messageReplace: (message) => message.replace(':attribute', 'This field'), // Replace placeholder with field name
    },
  }

  const validator = new SimpleReactValidator({
    messages: customMessage,
    validators: extendedValidators,
  })

  if (show) {
    validator.showMessages()
  }

  return [validator, setShow]
}

export default useValidator
