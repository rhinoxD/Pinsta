export const initialState = null;

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'USER':
      return {
        payload,
      };
    case 'CLEAR':
      return null;
    case 'UPDATE':
      return {
        ...state,
        followers: payload.followers,
        following: payload.following,
      };
    default:
      return state;
  }
};
