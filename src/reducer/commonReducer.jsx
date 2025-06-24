const initialState = {
  loginProgram: '',
  profileImage: '',
  selectedActivity: null,
}

const commonReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case 'LOGIN_PROGRAM_VALUE':
      return { ...state, loginProgram: payload }
    case 'PROFILE_IMAGE':
      return { ...state, profileImage: payload }
    case 'SELECTED_ACTIVITY':
      return { ...state, selectedActivity: payload }
    default:
      return { ...state }
  }
}

export default commonReducer
