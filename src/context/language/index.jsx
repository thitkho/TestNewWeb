// https://dev.to/vetswhocode/build-a-crud-firestore-app-in-react-gatsby-with-hooks-4ig9
// https://qiita.com/hibohiboo/items/3d0665b9a85342f42264
//https://github.com/hibohiboo/create-now
// ireabase/config/firestore.rules
// rules_version = '2';
// service cloud.firestore {
//   function isSignedIn() {
//     return request.auth != null;
//   }
//   function isOwner(rsc) {
//     // データ作成した本人であることを確認
//     return isSignedIn() && request.auth.uid == rsc.data.uid;
//   }

//   // マッチングルール
//   match /databases/{database}/documents {
//     match /others/memolist/{documents=**} {
//       allow read, create, update
//       allow delete: if isOwner(resource)
//     }
//   }
// }
import React, { useEffect, useState, forwardRef } from 'react';
import {
  combineReducers,
  configureStore,
  EnhancedStore,
  createSlice
} from '@reduxjs/toolkit'
// import rootReducer from './rootState'
import logger from 'redux-logger'
import { Provider, useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Container, CssBaseline, Link, Typography } from '@mui/material';
import {
  Box,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  Paper,
  Tabs,
  Tab,
} from '@mui/material'
import { Search, StarBorder } from '@mui/icons-material'
import MaterialTable from 'material-table'
import AddBox from '@mui/icons-material/AddBox'
import ArrowDownward from '@mui/icons-material/ArrowDownward'
import Check from '@mui/icons-material/Check'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import Clear from '@mui/icons-material/Clear'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Edit from '@mui/icons-material/Edit'
import FilterList from '@mui/icons-material/FilterList'
import FirstPage from '@mui/icons-material/FirstPage'
import LastPage from '@mui/icons-material/LastPage'
import Remove from '@mui/icons-material/Remove'
import SaveAlt from '@mui/icons-material/SaveAlt'
import ViewColumn from '@mui/icons-material/ViewColumn'
const personInit = {
  name: "tan dep trai",
  age: 30,
}
const DecrementAge = (state) => {
  state.age--
}
const PersonSlice = createSlice({
  name: "person",
  initialState: personInit,
  reducers:{//(reducer + action)
    incrementAge(state, action){
      if(state.age < 5){
        state.age++
      }else{
        state.age += action.payload
      }
      
    },
    de: DecrementAge,
    changeName: (state, action)=>{
      state.name = action.payload
    }
  }
})

//const {incrementAge, changeName, de} = PersonSlice.actions;

//const PersonReducer = PersonSlice.reducer;

const MemoListItem = {
  name: "",
  tags: [],
  memo: "",
  point: 0,
  uid: "",
  id: "",
  nickname: "",
  url: "",
  crateAt: "",
}
const genres = {
  scenarios: 'シナリオ',        //kichban
  tools: 'ツール',              //congcu
  assets: '素材',               //tainguyen
  communities: 'コミュニティ',  //congdong
  readings: '読み物',           //tailieudoc
  systems: 'システム',          //hethong
  supplements: 'サプリメント',  //bosung
} 
const memoListStateInit = {
  current: 'scenarios',
  list: {
    scenarios: [
      MemoListItem,
      MemoListItem
    ],
    tools: [1, 2, 3],
    systems: [],
    readings: [],
    communities: [],
    supplements: [],
    assets: [],
  },
  searchTags: '',
  isSortCreated: false,
}
const memoListSlice = createSlice({
  name: 'memo',
  initialState: memoListStateInit,
  reducers: {
    setList: (state, action) => {
      state.list[action.payload.current] = action.payload.list
    }
  }
})
const {setList} = memoListSlice.actions;

const MemoListRead = async (dispatch) => {

}
const RootReducer = combineReducers({
  person: PersonSlice.reducer,
  memo: memoListSlice.reducer
  
});
const RootPreloadedState = {
  person: PersonSlice.getInitialState(),
  // scenario: scenarioInit,
  // entrySheet: entryInit,
  // auth: authInit,
  // lost: lostInit,
  memo: memoListSlice.getInitialState(),
  // trpgManual: trpgManualInit,
  // game: gameInit,
  // tyranoudon: tyranoudonInit,
  // hakoniwa: hakoniwaInit,
}
const setupStore = (preloadedState) => {
  const middlewares = [logger, thunk]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = configureStore({
    reducer: RootReducer,    
    middleware: middlewares,
    devTools: true,
    preloadedState,
  });

  return store
}
const usePerson = () => {
  const dispatch = useDispatch();

  return useSelector((state)=>{
    const person = state.person
    //dispatch(PersonSlice.actions.changeName("tan dt"));
    return {
      person
    }
  })
  
}
const store = setupStore(RootPreloadedState);
const TestRedux = () => {
  //const person = useSelector((state)=>state.person)
  const {person} = usePerson();
  //const dispatch = useDispatch();

  return(
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <label>name: {person.name}</label>
      <label>age: {person.age}</label>
      <button>increment</button>
    </div>
  )
}
const Home = () => {
  return(
    <div>
      <Typography>HOME</Typography>
      <TestRedux />
    </div>
  )
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
})
const viewTable = {
  search: false,
  sorting: false,
  paging: false,
  draggable: false,
  rowStyle: {
    whiteSpace: 'nowrap',
  },
  headerStyle: {
    whiteSpace: 'nowrap',
  },
}

const TWITTER_USER_NAME = 'hibohiboo'
const SITE_NAME = 'hibohiboo TRPG サポートページ'
const SITE_DOMAIN = 'https://create-now.now.sh'
const Component = ({
  title,
  description,
  url,
  image = 'https://lostrpg-751c1.firebaseapp.com/assets/images/losttop.png',
  keywords = 'LOSTRPG,廃墟,子供たち,キャラクターシート,TRPG,廃墟の森,ポストアポカリプス',
}) => (
  <head>
    <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
    <meta name="twitter:creator" content={`@${TWITTER_USER_NAME}`} />
    <meta
      name="twitter:card"
      content={image ? 'summary_large_image' : 'summary'}
    />
    {title && <meta name="og:title" content={title} />}
    {url && <meta name="og:url" content={`${SITE_DOMAIN}${url}`} />}
    {description && <meta name="description" content={description} />}
    {description && <meta name="og:description" content={description} />}
    {image && <meta name="og:image" content={image} />}
    {keywords && <meta name="keywords" content={keywords} />}
    <meta property="og:site_name" content={SITE_NAME} />
  </head>
)

const separator = '-'
//TODO:useViewmodel
const useViewModel = () => {

  const dispatch = useDispatch();
  return useSelector((state)=>{
    const stateMemo = state.memo;
    //console.log(stateMemo.current);
    
    //console.log(stateMemo.list[stateMemo.current])
    return{
      currentName: stateMemo.current,      
      //data: stateMemo.list[stateMemo.current].map((item)=>({...item, tags: item.tags.join(separator),}))
    }
  })
}
const TableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}
const MemoList = () => {
  const vm = useViewModel();
  const [value, setValue] = useState(0);
  const columns = [
    {title: '★', field: 'point', type: 'numeric', editable: 'never', renderData: '',},
    {title: '名称', field: 'nickname',renderData: '',},
    {title: '名前', field: 'name',renderData: '',},
    {title: 'タグ', field: 'tag',renderData: '',},
    {title: '', field: '',renderData: '',},
    {title: '', field: '',renderData: '',},
  ]

  return(
    <Container>
      {/* //title */}
      <Typography>Memo List</Typography>
      {/* //login */}
      <p>
        <Link href={'/auth/login'}>Login</Link>
      </p>
      {/* //paper */}
      {/* //search */}
      {/* materailTable */}
      <MaterialTable
        title={vm.currentName}
        icons={TableIcons}
        // options={vm.options}
        columns={columns}
        // data={vm.data}
        // editable={vm.editHandler}
        // localization={vm.localization}
      />
      <Link href='/'>Back</Link>
    </Container>
  )
}
const MyApp = () => {

  return(
    <Provider store={store}>
      <React.Fragment>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
              <Component {...pageProps} />
            </I18n> */}
            <MemoList />
            <Home />
          </ThemeProvider>
        </React.Fragment>
    </Provider>
  )
}
export default MyApp;

