const initialState = {
  username: "",
  userID: 0,
  profileImg: ""
};

const CREATE_USER = "CREATE_USER";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export function createUser(userID, username, profileImg) {
  return {
    type: CREATE_USER,
    payload: { userID, username, profileImg }
  };
}

export default reducer;
