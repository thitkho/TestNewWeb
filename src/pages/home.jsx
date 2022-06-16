//https://medium.com/exelerate/the-simplest-way-to-combine-react-redux-and-firestore-typescript-353bea49cdbd
//https://zenn.dev/aono/articles/84964fae727445

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Container from '@mui/material/Container';


//
import { Provider } from "react-redux";
import { configureStore, createSlice} from "@reduxjs/toolkit";
import  thunk  from 'redux-thunk';
import  {initializeApp}  from 'firebase/app';
import  logger  from 'redux-logger';
import { useEffect, useState } from 'react';
import { getFirestore } from "firebase/firestore";
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
const firebaseConfig2 = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  mesurentId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}
const firebase = initializeApp(firebaseConfig2);
const db = getFirestore(firebase);

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
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState("huhu")
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
const initUser = {
  ...GenericState,
  data:[
    {
      id: 1,
      name: "",
      email: "abc@abc.com"
    }
  ]
}
const userSlice = createGenericSlice({
  name: "user",
  initialState: initUser,
  reducers: {
    success(state, action){
      console.log(state.email);
    }
  }
});
const { userReducer } = userSlice.reducer;
const initNotification = {
  ...GenericState,
  data: [
    {
      id: 1,
      title: "",
      description: "",
      type: "",
      createdAt: "",
      subcollections: []
    }
  ]
}
const notificationSlice = createGenericSlice({
  name: "notifi",
  initialState: initNotification,
  reducers:{},
});
const { notificationReducer } = notificationSlice.reducer;
const initDocument = {
  id: 1,
  field: "column",
}
const documentExampleSlice = createGenericSlice({
  name: "document",
  initialState: initDocument,
  reducers: {}
})
const { documentExampleReducer } = documentExampleSlice.reducer;

const store = configureStore({
  reducer:{
    notification: notificationSlice.reducer,
    documentExample: documentExampleSlice.reducer,
    user: userSlice.reducer
  },
  middleware:[logger, thunk]
});
const RootDispatch = store.dispatch;
const RootState = store.getState;
//hook
const ListenerState ={
  name: "",
  unsubscribe: () => {}
}
const useFirestore = (path) =>{

  const collListenerRef = useRef([]);
  const docListenerRef = useRef([]);
  const lastDocRef = useRef([]);

  useEffect(()=>{

    return()=>{
      collListenerRef.current.forEach(listener=>{listener.unsubscribe()});
      docListenerRef.current.forEach(listener => {listener.unsubscribe()});
    }
  },[collListenerRef]);

  const dispatch = useDispatch();
  
  const collection = () => {}
  const doc = () => {}
  const id = () => {}
  const create = () => {}
  const update = () => {}
  const remove = () => {}
  const unsubscribe = () => {}
  return{
    collection, doc, id, create, update, remove, unsubscribe
  }
}
const ChildCRUD = () => {

  return(
    <BrowserRouter>
        <Navbar />
        <Container>
        <Routes>
          <Route path="/"  element = {<Home/>}/>
          <Route path="/collection" element={<CollectionListener />}>    
          </Route>
          <Route path="/doc" element={<DocListener />}>
            
          </Route>
          <Route path="/lazy" element={<LazyLoad />}>
            
          </Route>
        </Routes>

        </Container>

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