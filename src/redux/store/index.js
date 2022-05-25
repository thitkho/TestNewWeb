import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import RootReducer from '../reducer';
import CounterReducer from '../slice/counter.slice/index';
import PostReducer from '../slice/post.slice';
import userSlice from '../slice/user.slice';
import { alertReducer } from '../reducer/alert.reducer';

export const StoreRedux = configureStore({
  reducer:{
    counter: CounterReducer,
    post: PostReducer,
    users: userSlice,
    alerts: alertReducer,
  },
  middleware:[logger, thunk],
})