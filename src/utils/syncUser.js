/* middleware to trigger sync user update */

export default (store) => (next) => (action) => {
  // List of need sync data trigger
  const needTriggerActions = [
    '_SIGNUP', 'LOGIN', 'LOGOUT', 'GET_USER_INFO', 'SOCIAL_CONNECT', 'SOCIAL_UNLINK'
  ];
  // make sure the action happen first
  const result = next(action);

  // Matching all FULFILLED and REJECTED but Not PENDING actions
  // NOTE: '_PENDING' is not attached to the pending action name (for async actions);
  const doIt = needTriggerActions.filter((actionPrefix) => {
    return (
      (action.type.search(actionPrefix) !== -1 && //action is FULFILLED or REJECTED
      (action.type.search('_FULFILLED') !== -1 || action.type.search('_REJECTED') !== -1)) ||
      action.type === 'LOGOUT' //action is LOGOUT
      );
  });

  if (doIt.length ) {
    //console.info(`Trigger an update action on the action ${action.type}`);
    store.dispatch({type: '[DUMMY_ACTION_TRIGGER_SYNC_DATA]'});
   };
  return result;
}
