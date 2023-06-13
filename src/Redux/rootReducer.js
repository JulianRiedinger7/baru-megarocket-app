import { combineReducers } from 'redux';

// Import reducers below
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';
import subscriptionsReducer from './Subscriptions/reducers';

const rootReducers = combineReducers({
  activities: activititesReducer,
  classes: classReducer,
  members: membersReducer,
  subscriptions: subscriptionsReducer,
  trainers: trainersReducer
});

export default rootReducers;
