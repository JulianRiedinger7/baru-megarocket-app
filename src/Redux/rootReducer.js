import { combineReducers } from 'redux';
import { superadminsReducer } from 'Redux/SuperAdmins/reducers';

// Import reducers below
import toastReducer from 'Redux/Shared/ResponseToast/reducer';
import trainersReducer from 'Redux/Trainers/reducers';
import classReducer from 'Redux/Classes/reducers';
import activititesReducer from 'Redux/Activities/reducers';
import membersReducer from 'Redux/Members/reducers';
import adminsReducer from 'Redux/Admins/reducers';
import subscriptionsReducer from 'Redux/Subscriptions/reducers';
import loginMembersReducer from 'Redux/LoginMembers/reducers';
import authReducer from 'Redux/Auth/reducer';

const rootReducers = combineReducers({
  superadmins: superadminsReducer,
  activities: activititesReducer,
  toast: toastReducer,
  classes: classReducer,
  members: membersReducer,
  admins: adminsReducer,
  subscriptions: subscriptionsReducer,
  trainers: trainersReducer,
  loginMembers: loginMembersReducer,
  auth: authReducer
});

export default rootReducers;
