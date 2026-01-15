const initialState = {
  roles: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_ROLES":
      return { ...state, roles: action.payload || [] };

    case "CLEAR_ROLES":
      return { ...state, roles: [] };

    default:
      return state;
  }
}
