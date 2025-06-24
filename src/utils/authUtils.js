// Function to store the user's role in localStorage
export const setUserRole = (role) => {
  localStorage.setItem('userRole', role)
}

// Function to retrieve the user's role from localStorage
export const getUserRole = () => {
  return localStorage.getItem('userRole')
}

// Function to clear the user's role (for logout scenarios)
export const clearUserRole = () => {
  localStorage.removeItem('userRole')
}

// Function to store the user data in localStorage
export const setUserData = (user) => {
  localStorage.setItem('userData', JSON.stringify(user))
}

export const setUserEmail = (email) => {
  localStorage.setItem('userEmail', email)
}

export const getUserEmail = () => {
  return localStorage.getItem('userEmail')
}

// // Function to retrieve the user data from localStorage
export const getUserData = () => {
  const userData = localStorage.getItem('userData')
  return userData ? JSON.parse(userData) : null
}

// Function to clear the user data (for logout scenarios)
export const clearUserData = () => {
  localStorage.removeItem('userData')
}
