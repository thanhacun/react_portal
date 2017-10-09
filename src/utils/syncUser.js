/* middleware to trigger sync user update */

export default (store) => (next) => (action) => {
  // List of need sync data trigger
  const needTriggerActions = ['LOGIN', 'LOGOUT', 'GET_USER_INFO'];
  // make sure action happen first
  let result = next(action);

  // Matching all actions beginning with
  let doIt = needTriggerActions.filter(function(actionName){
    return action.type.search(actionName) !== -1;
  });

  if (doIt.length ) {
    //console.info(`Trigger an update action on the action ${action.type}`);
    store.dispatch({type: '[DUMMY_ACTION_TRIGGER_SYNC_DATA]'});
   };
  return result;
}
