import { combineReducers } from 'redux';
import { get_notes_reducer } from './HomeReducer';

/*
    Using ComboneReducers to combine the reduces,
    in future the application may have multiple reducers
*/

const allReducers = combineReducers({
  data: get_notes_reducer,
});

export default allReducers;
