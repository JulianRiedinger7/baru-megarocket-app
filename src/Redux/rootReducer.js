import { combineReducers } from 'redux';

// Import reducers below
import trainersReducer from './Trainers/reducers';
import classReducer from './Classes/reducers';
import activititesReducer from './Activities/reducers';
import membersReducer from './Members/reducers';
import adminsReducer from './Admins/reducers';

const rootReducers = combineReducers({
  classes: classReducer,
  trainers: trainersReducer,
  members: membersReducer,
  activities: activititesReducer,
  admins: adminsReducer
});

export default rootReducers;
