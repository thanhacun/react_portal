const updateUserState = (store) => (next) => (action) => {
  console.log(store.getState().user);
  next(action);
};

export default updateUserState;
