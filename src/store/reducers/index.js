import { combineReducers } from 'redux';

import missions from './missions';
import user from './user';
import profile from './profile';
import avatar from './avatar';
import history from './history';

export default combineReducers({
    missions,
    user,
    profile,
    avatar,
    history
});