export const userManagementHeader = [
  { label: 'Name' },
  { label: 'Email' },
  { label: 'Phone Number' },
  { label: 'Role' },
  { label: 'Actions' },
]

export const validateInput = (name, value) => {
  let errorMessage = ''
  switch (name) {
    case 'name': {
      const nameRegex = /^[a-zA-Z\s]+$/
      if (!value.trim()) {
        errorMessage = 'Name is required'
      } else if (!nameRegex.test(value)) {
        errorMessage = 'Name must not contain special characters or numbers'
      }
      break
    }
    case 'role': {
      if (!value.trim()) {
        errorMessage = 'Role is required'
      }
      break
    }
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value.trim()) {
        errorMessage = 'Email is required'
      } else if (!emailRegex.test(value)) {
        errorMessage = 'Invalid email format'
      }
      break
    }
    case 'number': {
      const numberRegex = /^\d+$/
      if (!value.trim()) {
        errorMessage = 'Mobile Number is required'
      } else if (!numberRegex.test(value)) {
        errorMessage = 'Mobile Number must be numeric'
      } else if (value.length !== 10) {
        errorMessage = 'Mobile Number must be exactly 10 digits'
      }
      break
    }
    case 'mobileNumber': {
      const numberRegex = /^\d+$/
      if (!value.trim()) {
        errorMessage = 'Mobile Number is required'
      } else if (!numberRegex.test(value)) {
        errorMessage = 'Mobile Number must be numeric'
      } else if (value.length !== 10) {
        errorMessage = 'Mobile Number must be exactly 10 digits'
      }
      break
    }
    case 'password': {
      if (!value.trim()) {
        errorMessage = 'Password is required'
      } else if (value.length < 8) {
        errorMessage = 'Password must be at least 8 characters long'
      } else if (!/[A-Z]/.test(value)) {
        errorMessage = 'Password must contain at least one uppercase letter'
      } else if (!/[a-z]/.test(value)) {
        errorMessage = 'Password must contain at least one lowercase letter'
      } else if (!/[0-9]/.test(value)) {
        errorMessage = 'Password must contain at least one number'
      } else if (!/[!@#$%^&*]/.test(value)) {
        errorMessage = 'Password must contain at least one special character'
      }
      break
    }
    default:
      break
  }
  return errorMessage
}

// export const userManagementList = [
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
//   {
//     name: 'Kunal Raj',
//     email: 'Kunalraj@gmail.com',
//     phone: '+91 987654321',
//     role: 'Delivery Head',
//     actions: '',
//   },
// ]

export const roleOptions = [
  { value: 'BU', label: 'BU' },
  { value: 'SC', label: 'SC' },
  { value: 'BOD', label: 'BOD' },
  { value: 'COO', label: 'COO' },
  { value: 'PM', label: 'PM' },
]

export const monthsOptions = [
  { value: 3, label: '3 months' },
  { value: 6, label: '6 months' },
  { value: 9, label: '9 months' },
  { value: 12, label: '12 months' },
  { value: 18, label: '18 months' },
]
