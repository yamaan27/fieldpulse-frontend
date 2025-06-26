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


export const reverseGeocode = async (lat, lng) => {
  const apiKey = "YOUR_GOOGLE_API_KEY"; // 🔒 keep this safe
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
  );
  const data = await response.json();

  if (!data.results || !data.results.length) return "Unknown Location";

  const components = data.results[0].address_components;
  const area = components.find((c) =>
    c.types.includes("sublocality")
  )?.long_name;
  const city = components.find((c) => c.types.includes("locality"))?.long_name;
  const pincode = components.find((c) =>
    c.types.includes("postal_code")
  )?.long_name;

  return [area, city, pincode].filter(Boolean).join(", ");
};
