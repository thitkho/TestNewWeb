//https://medium.com/exelerate/the-simplest-way-to-combine-react-redux-and-firestore-typescript-353bea49cdbd
//https://zenn.dev/aono/articles/84964fae727445

import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Container from '@mui/material/Container';


//
import { Provider } from "react-redux";
import { configureStore, createSlice, ThunkAction } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
const CollectionListener = () => {

  return(
    <div>CollectionListerner</div>
  )
}
const DocListener = () => {
  return(
    <div>DocListerner</div>
  )
}
const LazyLoad = () => {
  return(
    <div>LazyLoad</div>
  )
}
const Navbar = () => {

  return(
    <div>Navbar</div>
  )
}
const Home = () => {
  return(
    <div>Home</div>
  )
}

const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  DONE: "DONE"
}
const GenericState = {
  data:[],
  status: "",
  error: ()=>{}
}
const createGenericSlice = ({
  name = 'Generic',
  initialState = GenericState,
  reducers
}) => {

  return createSlice({
    name,
    initialState,
    reducers: {
      loading(state){
        state.status = STATUS.LOADING
      },
      success(state, action){
        state.data = action.payload
        state.status = STATUS.DONE
      },
      error(state, action){
        state.data = action.payload
        state.status = STATUS.ERROR
      },
      ...reducers
    }
  })
}
//const { loading, success, error} = createGenericSlice.action;
const userSlice = createGenericSlice({

});
const { userReducer } = userSlice.reducer;
const notificationSlice = createGenericSlice({

});
const { notificationReducer } = notificationSlice.reducer;
const documentExampleSlice = createGenericSlice({

})
const { documentExampleReducer } = documentExampleSlice.reducer;

const store = configureStore({
  reducer:{
    notification: notificationReducer,
    documentExample: documentExampleReducer,
    user: userReducer
  },
});
const RootDispatch = store.dispatch;
const RootState = store.getState;
const AppThunk = ThunkAction();
const ChildCRUD = () => {

  return(
    <BrowserRouter>
      <div>
        <Navbar />
        <Container>
          <Route
              exact
              path="/"
              element = {<Home/>}
          />
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/collection">
            <CollectionListener />
          </Route>
          <Route path="/doc">
            <DocListener />
          </Route>
          <Route path="/">
            <LazyLoad />
          </Route>
        </Container>
      </div>
    </BrowserRouter>
  )
}
const FsCRUD = () => {

  return(
    <Provider store={store}>
      <ChildCRUD />
    </Provider>
  )
}
export default FsCRUD;