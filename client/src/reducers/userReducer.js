export const initialState = null;

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'USER':
      return {
        payload,
      };
    default:
      return state;
  }
};
