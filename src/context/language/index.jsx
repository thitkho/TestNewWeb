//firestore crud

import {Timestamp, getFirestore, getDoc, doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc, getDocs} from "firebase/firestore";
import React, { useEffect, useState, forwardRef } from 'react';
import {
  combineReducers,
  configureStore,
  EnhancedStore,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  nanoid
} from '@reduxjs/toolkit';
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
// import rootReducer from './rootState'
import { createServer } from "miragejs"
import logger from 'redux-logger'
import { Provider, useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Container, CssBaseline, LinearProgress, Link, styled} from '@mui/material';
import {
  Box,
  Switch,
  Chip,
  Paper,
  Tabs,
  Tab,
} from '@mui/material'
import { ExpandMoreOutlined, Input, MoreVert, Search, Share, StarBorder } from '@mui/icons-material'
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
// import usePagination from 'firestore-pagination-hook'
import { serverTimestamp } from "firebase/firestore";
import  {initializeApp}  from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Favorite from "@mui/icons-material/Favorite";
import { MaterialUIControllerProvider, themeLight, TTBox, TTButton, TTInput, TTProgress, TTTypography } from "../fullAppUi";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import TestCard from "./CardComponet";
const bgImage_su = require("../assets/images/bg-sign-up-cover.jpeg");
const bgImage = require("../assets/images/bg-sign-in-basic.jpeg");
const availableColors = ['green', 'blue', 'orange', 'purple', 'red']

const capitalize = (s) => s[0].toUpperCase() + s.slice(1)

//data mock
const data = {
  card1:{
    id:1,
    title: "base",
    name: "hiragana",
    count: 0,
    description:{
      a:{
        
      }
    }
  },
  card2:{
    id:2,
    title: "base",
    name: "katakana",
    description:{
      
    }
  },
  card3:{
    id:3,
    title: "kotoba",
    name: "ad",
    description:{
      
    }
  },
}
//Pre-Begin-intermediate-advenced-expert-master
const detail_type1 = {    //文字
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
const detailBegin = {   //言葉
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
const detail = {        //漢字
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
const detailInter = {   //文法
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
//firebase
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

const RootPath = {
  MASTER: "master",
  BOOK: "books",
  USER: "user",
  GRAMMAR: "Grammar"

}
const SecondPath =  {
  MASTER: "card",
  BOOK: "book",

}
const ThirdPathBook = {

}
const FirestoreRef = (path, pathId) => {

  //const basePath = 'mode/development';

  const pathStr = `${path}/${path+pathId}`
  console.log(pathStr);
  return collection(db, pathStr);
}
const useFirestore =(path) => {

  const id = 1;
  const create = () => {}
  const add = () => {}
  const deleteId = () => {}
  const update = () => {}
  const docDb = () => {}
  const colectionDb = () => {}

  return{
    id, create, add, deleteId, update, docDb, colectionDb
  }
}

//helper - timerModify
const increment = (state, type, action) => {
  switch (type) {
      case "hours":
          state[type] >= 0 && state[type] < 12
              ? action({
                  ...state,
                  [type]: state[type] + 1,
              })
              : action(state);
          break;
      case "minutes":
          state[type] >= 0 && state[type] < 60
              ? action({
                  ...state,
                  [type]: state[type] + 1,
              })
              : action(state);
          break;
      case "seconds":
          state[type] >= 0 && state[type] < 60
              ? action({
                  ...state,
                  [type]: state[type] + 1,
              })
              : action(state);
          break;
  }
}
const decrement = (state, type, action) => {
  switch (type) {
      case "hours":
          state[type] > 0 && state[type] <= 12
              ? action({
                  ...state,
                  [type]: state[type] - 1,
              })
              : action(state);
          break;
      case "minutes":
          state[type] > 0 && state[type] <= 60
              ? action({
                  ...state,
                  [type]: state[type] - 1,
              })
              : action(state);
          break;
      case "seconds":
          state[type] > 0 && state[type] <= 60
              ? action({
                  ...state,
                  [type]: state[type] - 1,
              })
              : action(state);
          break;
  }
}
//timer
const timerInit = {
  timer: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      notes:""
  },
  reminderData: ""
};

const timerSlice = createSlice({
  name: "timer",
  initialState: timerInit,
  reducers: {
      setTimer: (state, action) => ({
          ...state, timer: action.payload
      }),
      setReminderData: (state, action) => ({
          ...state, reminderData: action.payload
      }),
      reset: (state) => { state = initialState }
  },
});

const { setTimer, setReminderData, reset } = timerSlice.actions;
function CountDown() {
  const [timerState, setTimerState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { timer } = useSelector((state) => state.timerSlice);
  const [over, setOver] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimerState(timer);
  }, [timer])
  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  })
  useEffect(() => {
    over && dispatch((setTimer(timerState)))
  }, [over])

  const tick = () => {
    if (timerState.hours == 0 && timerState.minutes == 0 && timerState.seconds == 0) setOver(true)
    else if (timerState.minutes == 0 && timerState.seconds == 0)
      setTimerState({
        hours: timerState.hours - 1,
        minutes: 59,
        seconds: 59
      });
    else if (timerState.seconds == 0)
      setTimerState({
        hours: timerState.hours,
        minutes: timerState.minutes - 1,
        seconds: 59
      });
    else
      setTimerState({
        hours: timerState.hours,
        minutes: timerState.minutes,
        seconds: timerState.seconds - 1
      });
  };

  return (
    <div className="countDown">
      {
        //over && <Popup />
      }
      <div id="hours" className="timeDisplay">{timerState.hours}</div>
      <div id="minutes" className="timeDisplay">{timerState.minutes}</div>
      <div id="seconds" className="timeDisplay">{timerState.seconds}</div>
    </div>
  );
}

//bug
let lastid = 0;
const bugSlice = createSlice({
  name: "Bugs",
  initialState: [],
  reducers: {
    // Action : Action / Event Handlers
    BugAdded: (bugs, action) => {
      bugs.push({ id: ++lastid, desc: action.payload.desc, resolved: false });
    },
    BugRemoved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs.splice(index, 1);
    },
    BugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    BugToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

const { BugAdded, BugRemoved, BugResolved, BugToUser } = bugSlice.actions;

const bugByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// Selector
// export const unResolveBugsSelector = (state) => {
//   return state.entities.bugs.filter((bug) => bug.resolved === false);
// };

// Memorization - Selector with cache data - Install package reselect
// export const unResolveBugsSelector = createSelector(
//   (state) => state.entities.bugs,
//   (state) => state.entities.projects,
//   (bugs, projects) => bugs.filter((bug) => !bug.resolved)
// );
//redux
// const initTodo = {
//   status: 'idle',
//   entities:{}
// }
//
const todoAdapter = createEntityAdapter();
const initState = todoAdapter.getInitialState({
  status: 'idle',
})
const GetDataTodo = async () => {

  var todos = [];
  const q = query(collection(db, "plan"),  orderBy("id", "desc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    todos.push(doc.data());
  });
  // const test = onSnapshot(q, (snapshot) => {
  //   return snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
  //   //console.log("a",a);
  //   // snapshot.docs.map(doc => todos.push({...doc.data(), id: doc.id}))
  //   // var idtest = 7
  //   // snapshot.docs.map(doc => {
  //   //   // console.log("doc", doc.data())
  //   //   return todos.push(
  //   //     {id: idtest++,title: "asf"+idtest, content: "af"+ idtest, time: "fasdf"}
  //   //   )}
  //   // return true;
  //   // )

  // });
  // test();
  const a = [{a:"a"}, {b:"b"}]
  const b = [{c:"c"}, {b:"b"}, {e:"e"}]
  const c = [...a, ...b]
  //todos.map(item=>console.log("onSnapshot:",item))
  // console.log("firestore todos c:", c);
  todos.push({
    id: 4, title: "tan1", content: "abc1", time: "213222"
  })
  todos.push({
    id: 5, title: "tan1", content: "abc1", time: "213222"
  })
  todos.push({
    id: 6, title: "tan1", content: "abc1", time: "213222"
  })
  console.log("firestore todos c:", todos);
  console.log("firestore todos:", todos.length);
  return todos
  // return [
  //   {id: 1, title: "tan1", content: "abc1", time: "213222"},
  //   {id: 2, title: "tan2", content: "ab2", time: "213222"},
  // ]
}
//thunks
export const fetchTodo = createAsyncThunk('todos/fetchTodo', async()=>{
  // const reponse = await 
  // const id = 1;
  // const title = "tan dep trai"
  // return [
  //   {id: id, title: title, completed: true, content: "lenrn react"},
  //   {id: id+1, title: title+1, completed: false, content: "learn redux"}
  // ]
  // const response = await client.get('/fakeApi/todos')
  //   .then(res => console.log(res))
  //   .then(err => console.log(err))
  // return response.todos
  // const todos = []
  // fetch("/fetchApi/todos")
  // .then((res)=>res.json())
  // .then((json)=>{
  //   json.todos.map((item)=>todos.push(item));
  // })
  // console.log("todos:", todos);
  const todos = await GetDataTodo();
  console.log("redux todos:",  todos);
  return todos;

  
});
const setTodo = async (text) => {
  // console.log("test text:", text)
  const todoRef = collection(db, "plan");
  const item = {
    id: nanoid(),
    title: "shopping",
    content: text,
    time: "2022/07/04"
  }
  //const response = 
  await setDoc(doc(todoRef, "plan"+item.id), item)
  // .then((res)=>{
  //   console.log(res);
  //   return item;
  // })
  // .catch((err)=>{
  //   console.log(err);
  // });
  // console.log("test end:",response)
  return item;

}
export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async (text) => {
  // console.log(text);
  // const initialTodo = { text }
  // console.log(initialTodo);
  
  // // const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  // return {id: 5, title: "heloo", completed: false, content: text}
  const initialTodo = { text }
  // const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  // return response.todo
  const response = setTodo(text)
  // console.log("save: ", response);

  return response;

});
const todoSlice = createSlice({
  name: 'todo',
  initialState:initState,
  reducers:{
    setLists(state, action){
        
        //state.entities[action.] = action.payload
    },
    todoDeleted: todoAdapter.removeOne,
    allTodoCompleted(state, action){
      Object.values(state.entities).forEach(todo=>{
        todo.completed = true
      })
    },
    completedTodoCleared(state, action){
      const completedId = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id)
      todoAdapter.removeMany(state, completedId);
    },
    todoAdded(state,action){
      const todo = action.payload;
      state.entities[todo.id] = todo;
    },
    todoToggled(state, action){
      const todoId = action.payload;
      const todo = state.entities[todoId];
      todo.completed = !todo.completed;
    },
    todoLoading(state, actions){
      return{...state, status: 'loading'}
    },

    //
    todoColorSelected: {
      reducer(state, action){
        const {color, todoId} = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color){
        return{payload:{todoId, color}}
      }      
    },
    // todoDeleted(state, action){
    //   delete state.entries[action.payload];
    // }
  },
  extraReducers: build => {build
    .addCase(fetchTodo.pending, (state, action)=>{
      state.status = 'loading'
    })
    // .addCase(fetchTodo.fulfilled, (state, action)=>{
    //   const newEntities = {};
    //   console.log("fulfilled: ",);
    //   action.payload.map((item,index)=>{
    //     console.log(item);
    //     return {...newEntities, ...item}
    //   })
    //   action.payload.forEach((todo, index, array)=>{
    //     console.log(todo);
    //   })
    //   action.payload.forEach(todo=>state.entities = {...newEntities, ...todo});
    //   //   newEntities[todo.id] = todo;
    //   // });
      
    //   state.status = 'idle'
    //   console.log("entity:",newEntities);
    // })
    // .addCase(fetchTodo.fulfilled, (state, action)=>{
    //   console.log("action.payload:", action.payload);
    //   todoAdapter.addMany(state, action.payload);
    //   state.status = 'idle'
    // })
    .addCase(fetchTodo.fulfilled, (state, action)=>{
      console.log("addCase:", action.payload);
      const itemTest =       [
        {id: 1, title: "tan1", content: "abc1", time: "213222"},
        {id: "2", title: "tan2", content: "abc2", time: "213222"},
        {id: "3", title: "tan3", content: "abc3", time: "213222"}
      ]

      const test = [...itemTest, ...action.payload];
      console.log(action.payload.length);
      console.log("test addCase:", test);
      todoAdapter.setAll(state, action.payload)
    })
    .addCase(saveNewTodo.fulfilled, (state, action)=>todoAdapter.addOne(state, action.payload))
    // .addCase(saveNewTodo.fulfilled, (state, action)=>{
    //   const todo = action.payload
    //   state.entities[todo.id] = todo
    // })
  }
  
});
const {
  todoColorSelected, 
  allTodoCompleted,
  todoLoading, 
  todoToggled, 
  todoAdded, 
  completedTodoCleared,
  todoDeleted,
} = todoSlice.actions;

const {selectAll: selectTodo, selectById: selectTodoById} = todoAdapter.getSelectors(state=>state.todos)

const selectTodoId = createSelector(
  selectTodo,
  todos => todos.map((todo)=>{
    console.log("test test todo",todo);
    return todo
  })
);
const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodo,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo,idx) => {
    console.log("todo {0}: {1}",idx,todo);
    return todo.id
  })
)
const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload
    },
    colorFilterChanged: {
      reducer(state, action) {
        let { color, changeType } = action.payload
        const { colors } = state
        switch (changeType) {
          case 'added': {
            if (!colors.includes(color)) {
              colors.push(color)
            }
            break
          }
          case 'removed': {
            state.colors = colors.filter(
              (existingColor) => existingColor !== color
            )
          }
          default:
            return
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        }
      },
    },
  },
})

const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions

const planAdapter = createEntityAdapter();
const planInit = planAdapter.getInitialState({
  status: 'idle',
});
const planCreateNew = createAsyncThunk("plan/planCreateNew", async (item)=>{
  console.log(item);
})
const planSlice = createSlice({
  name: 'plan',
  initialState: planInit,
  reducers: {
    planCreateNewOne(state, action){
      console.log(action.payload);
      // planAdapter.addOne(action.payload);
    },
    planAdded(state,action){state.push(action.payload)},
    planToggled(state, action){
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    planLoading(state, actions){
      return{...state, status: 'loading'}
    }
  },
  extraReducers:{
    [planCreateNew.fulfilled]:(state, action)=>planAdapter.addOne(action.payload),
  }
  // extraReducers: (build)=>{build
  //   .addCase(planCreateNew.fulfilled, (state, action)=>planAdapter.addOne(state, action));
  // }
});
const { planCreateNewOne } = planSlice.actions;
const { selectAll: selectPlan } = planAdapter.getSelectors((state)=>state.plan)
// const filterTest = createSelector(
//   selectPlan,
//   (plans)=> plans
// )
const RootReducers = combineReducers({
  todos: todoSlice.reducer,
  filters: filtersSlice.reducer,
  plan: planSlice.reducer,
  bug: bugSlice.reducer,
  timer: timerSlice.reducer,
})
export const store = configureStore({
  devTools: true,
  // preloadedState: {},
  reducer: RootReducers,
  middleware:[thunk],
})
//app
const HeaderTodo = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)

  const handleKeyDown = async (e) => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      // Create and dispatch the thunk function itself
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      // And clear out the text input
      setText('')
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className="loader" /> : null

  return (
    <header className="header">
      <input
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}
const TodoListItem = ({ id }) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state) => selectTodoById(state, id))
  const { title, content, completed, color } = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id))
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch(todoColorSelected(todo.id, color))
  }

  const onDelete = () => {
    dispatch(todoDeleted(todo.id))
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div>
        <div>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div>{content}</div>
        </div>
        <div>
          <select
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button onClick={onDelete}>X
            {/* <TimesSolid /> */}
          </button>
        </div>
      </div>
    </li>
  )
}

const TodoList = () => {

  const todoIds = useSelector(selectFilteredTodoIds)
  const todos = useSelector(selectTodoId);
  console.log("todoIds",todoIds);
  console.log("selectTodoId: ", todos)
  // console.log(todoAdapter.getSelectors(state=>state.todos));
  const loadingStatus = useSelector((state) => state.todos.status)

  // if (loadingStatus === 'loading') {
  //   return (
  //     <div>
  //       <div/>
  //     </div>
  //   )
  // }

  const renderedListItems = todoIds.map((todoId) => {

    return <TodoListItem key={todoId} id={todoId} />
  })

  return (
    <div>
      <label>old list</label>
      <ul>{renderedListItems}</ul>
      <label>new list</label>
      {todos.map((item)=>{
        return(
          <label key={item.id}>{item.id}</label>
        )
      })}
    </div>
  )

}

const Footer = () => {
  const dispatch = useDispatch()

  const todosRemaining = useSelector((state) => {
    // console.log("state",state);
    const uncompletedTodos = selectTodo(state).filter(
      (todo) => !todo.completed
    )
    return uncompletedTodos.length
  })

  const { status, colors } = useSelector((state) => state.filters)

  const onMarkCompletedClicked = () => dispatch(allTodoCompleted())
  const onClearCompletedClicked = () => dispatch(completedTodoCleared())

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType))

  const onStatusChange = (status) => dispatch(statusFilterChanged(status))

  return (
    <footer>
      <div>
        <h5>Actions</h5>
        <button onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

// let server = createServer();
// server.get("/api/users", { users: [{ id: 1, name: "Bob", age: 30 }] });
// server.get("/api/todos", { todos: [{ id: 1, content: "tan dep" }] });
// server.get("/fetchApi/todos", {todos: [
//   {id: 1, content: "abc", completed: false, color: 'blue'},
//   {id: 2, content: "tan dep trai", completed: false, color: 'green'},
//   {id: 3, content: "learn redux", completed: false, color: 'red'},
//   {id: 4, content: "learn angula", completed: true, color: 'blue'},
//   {id: 5, content: "learn react", completed: false, color: 'blue'},
// ]})
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const LinearProgressLabel = (props) => {

  return(
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Box sx={{width: '90%', mr: 1}}>
        <TTProgress variant="contained" {...props}/>
      </Box>
      <Box sx={{minWidth: 50}}>
        <Typography variant="body2">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

const TabStyle = styled(Tabs)((theme, ownState)=>{

  return{
    display: 'flex',
    flexDirection: 'column',
    '&.MuiTab-root.Mui-selected': {
      color: 'gold',
  },
  }
})
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const CardCom = (

) => {
  
  // const plan = useSelector(filterTest);
  // const plan1 = useSelector(state=>state.plan)
  // console.log(plan);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("newValue",newValue)
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [progress, setProgress] = useState(10);

  useEffect(()=>{
    const timer = setInterval(()=>{
      setProgress((prevProgress)=>(prevProgress >= 100?10:prevProgress+10))
    }, 5000);
    return()=>{
      clearInterval(timer);
    };
  },[]);
  return(
    <Card sx={{maxWidth: 450, zIndex: 5}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], borderRadius:2 }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
        onClick={()=>console.log("card Header click")}
      />
      <Box sx={{width: '100%', marginTop: -3}}>
        <LinearProgressLabel value = {progress}/>
      </Box>
      <CardMedia
        component="img"
        height="50"
        image="/logo512.png"
        alt="Paella dish"
        sx={(theme)=>{
          return{
            position: 'absolute',
            zIndex: -1,

          }
        }}
      />
      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection:'row-reverse' }}>

          <Tabs sx={{minWidth: '20%'}} orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">

              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />

          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography>Item One</Typography>
            <Typography variant="body2" color="text.secondary" >
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TTTypography>Item Two</TTTypography>
            
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TTTypography>Item Three</TTTypography>
          </TabPanel>
        </Box>
      </CardContent>

      
      <CardActions disableSpacing>
        <IconButton size="small" aria-label="add to favorites" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Favorite />
        </IconButton>
        <IconButton size="small" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Share />
        </IconButton>
        <IconButton size="small" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Share />
        </IconButton>
        <IconButton size="small" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Share />
        </IconButton>
        <IconButton color="info" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'info',
          fontSize: 10,
          width: 30,
          height: 30
        }}>
          <Share aria-disabled/>
        </IconButton>
        <TTButton variant="contained" color={"success"} sx={{
          
        }}> Get Start </TTButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreOutlined />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

function CardLayout({cardHeight, cardWidth, image, children }) {

  // console.log("Basic layout");
  return (
    <TTBox
      width={cardWidth}
      height={cardHeight}
      sx={{ overflowX: "hidden" }}
    >
      <TTBox
        position="absolute"
        // width={cardWidth}
        // minHeight={cardHeight}
        zIndex={-1}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.info.main, 0.5),
              rgba(gradients.info.state, 0.5)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <TTBox px={1} width="100%" height="100%" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </TTBox>
    </TTBox>
  );
}
const Level = {
  n0: {
    id: 0,
    text: "N0",
  },
  n1: {
    id: 1,
    text: "jlpt N1",
  },
  n2: {
    id: 2,
    text: "jlpt N2",
  },
  n3: {
    id: 3,
    text: "jlpt N3",
  },
  n4: {
    id: 4,
    text: "jlpt N4",
  },
  n5: {
    id: 5,
    text: "jlpt N5",
  },
  np: {
    id: 6,
    text: "Np",
  },
}
const PlanUp = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { plan, planName, dateStart, dateEnd, info } = event.target.elements;
    
    const planItem = {
      target: "N5",
      planName: "planName_test",
      info: "info_test",
      time: "dateEnd - dateStart_test",
    }
    console.log(planItem);
    // await dispatch(planCreateNew(planItem))

    navigate("/card");
  }
  return (
    <CardLayout image={bgImage} cardWidth={550} cardHeight={550}>
    {/* <BasicLayout image={bgTest2}> */}
      <Card sx={{mt: 5, }}>
        <TTBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <TTTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Plan
          </TTTypography>
        </TTBox>
        <TTBox pt={4} pb={3} px={3}>
          <TTBox component="form" role="form" onSubmit={handleSubmit}>
            <Grid container  justifyContent={"center"} spacing={2} >
              <Grid item xs={10}>
                <TextField
                    select
                    label="Target"
                    name="plan"
                    value={age}
                    onChange={handleChange}
                    helperText="Please select your target"
                    fullWidth
                    sx={{justifyContent: 'center', alignItem: 'center'}}
                  >
                    {Object.values(Level).map((item)=>(
                      <MenuItem key={item.id} value={item.id}>{item.text}</MenuItem>
                    ))}
                  </TextField>
              </Grid>
              <Grid item xs={10} lg={2}>
                <TTInput 
                  type="text" 
                  name="nameplan" 
                  label="Plan name"
                  fullWidth
                  // disabled 
                  // error
                  // success
                />
              </Grid>              
              <Grid item xs={10} lg={2}>
                <TTInput type="list" label="info" name="info" fullWidth />
              </Grid>
              <Grid item display="flex" xs={10} lg={2}>
                <TTInput type="date" label="date start" name="dateStart" mr={2} fullWidth />
                <TTInput type="date" label="date end" name="dateEnd" fullWidth />
              </Grid>
              <Grid item>
              
              </Grid>
            </Grid>
            <TTBox mt={2} mb={1}>
              <TTButton 
                variant="gradient" 
                color="info" 
                fullWidth = {true}
                type="submit"
              >
                Create Plan
              </TTButton>
            </TTBox>
          </TTBox>
        </TTBox>
      </Card>
    </CardLayout>
  );
}
const defaultValues = {
  name: "",
  age: 0,
  gender: "",
  os: "",
  favoriteNumber: 0,
};
const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="age"
            label="Age"
            type="number"
            value={formValues.age}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              name="os"
              value={formValues.os}
              onChange={handleInputChange}
            >
              <MenuItem key="mac" value="mac">
                Mac
              </MenuItem>
              <MenuItem key="windows" value="windows">
                Windows
              </MenuItem>
              <MenuItem key="linux " value="linux">
                Linux
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <div style={{ width: "400px" }}>
            Favorite Number
            <Slider
              value={formValues.favoriteNumber}
              onChange={handleSliderChange("favoriteNumber")}
              defaultValue={1}
              step={1}
              min={1}
              max={3}
              marks={[
                {
                  value: 1,
                  label: "1",
                },
                {
                  value: 2,
                  label: "2",
                },
                {
                  value: 3,
                  label: "3",
                },
              ]}
              valueLabelDisplay="off"
            />
          </div>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

const DataItemCard = {
  title:"",
  titleDetail: "",
  icon: "",
  time: "2022年07月07日",
  timer:30,
  exp: 30,
  start: 3,
  howto:"",
  example:[],
  meaning:""
}
const useViewModel = () => {

  return DataItemCard
}
const RefireCrud = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [test, setTest] = useState(false);
  const viewModel = useViewModel()
  useEffect(()=>{
    

    console.log("fetchTodo");
    // const test = async () => await setDoc(doc(collection(db, "plan"), "plan1"), {
    //   id: 1,
    //   title: "learn",
    //   content: "hoc nua hoc mai"
    // });
    // test()
    // .then((res)=> console.log("sucess"))
    // .catch((err)=> console.log("error"))
    // console.log("test useEffect")
    
  },[]);
  // useEffect(()=>{
  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setUsers(json.users)
  //     })
  // },[])
  return(
      
        <MaterialUIControllerProvider>
        <ThemeProvider theme={themeLight}>
          
        <div>
          <nav>
            <section>
              <h1>Redux Fundamentals Example</h1>
              <button onClick={()=>setTest(!test)}>set {!test}</button>
            </section>
          </nav>
          <main>
            <section>
              <h2>Todos</h2>
              {/* <CountDown/> */}
              <div>
                <HeaderTodo />
                <TodoList />
                <Footer />
              </div>
            </section>
          </main>
          {/* <ul>
            {users.map((user) => (
                  <li key={user.id}>{user.name}:{user.age}</li>
                ))}
          </ul> */}


        </div>
        <Routes>
            <Route path="/" element={<TTButton onClick={()=>{
              console.log("button click");
              navigate("/plan")
            }}>new plan</TTButton>}/>
            <Route path="/plan" element={<PlanUp/>}/>
            <Route path="/card" element={<CardCom/>}/>
            <Route path="/cal" element={<ExpCalculator/>}/>
          </Routes>
        </ThemeProvider>

        </MaterialUIControllerProvider>

  )
}
const EXP = {

}
function ExpCalculator(){
  const TimeScore = () => {
    //10p-1score
    return(
      <div>
        <label>time start</label>
        <label>time end</label>
        <label>time learn</label>
        <label>time test</label>
      </div>
    )
  }
  return(
    <div>
      <TimeScore />
    </div>
  )
}
function TestCrud() {
  const [input, setInput] = useState("")

  //GETTINGS LISTS
  const [lists, setLists] = useState([])
    useEffect(()=> {
      const q = query(collection(db, "shopping-lists"),  orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setLists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        setInput("")
      });
        return () => unsubscribe()
  }, [])   
//ENDS HERE

//ADDING LISTS
  const handleClick = (e) => {
    e.preventDefault()

    if(input) {
      addDoc(collection(db, "shopping-lists"), {
        name: input,
        timestamp: new Date()
      }).catch(err => console.error(err))
    }//end of If statement
  
  }//end of handleClick

  //DELETE A DOC
  async function deleteDocument(id) {
      let request = await deleteDoc(doc(db, "shopping-lists", id));
      // console.log(request)
  } 
  //UPDATE A DOC

  async function updateDocument(id) {
    const itemRef = doc(db, "shopping-lists", id);
    let name =  prompt("What would you like to update it to?")
    setDoc(itemRef, {
      name: name,
      timestamp: new Date()
    })
  
}
  
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center flex-col">
      <h2 className="text-2xl text-gray-800 font-bold mb-6">Shopping List</h2>

      <div className="w-2/3 border shadow-md p-7">
      
        <form className="flex items-center justify-between mb-7">
            <input 
              type="text" name="item" 
              className="w-2/3 h-10 p-3 outline-none border border-gray-500"
              value={input}
              onChange={e => setInput(e.target.value)}
              />
            <button className="bg-green-400 p-3 rounded text-white" onClick={handleClick}>Save</button>
        </form>
        <div className="w-full ">
            {lists.map(list => (
              <div className="border-b w-full h-16 flex items-center justify-between" key={list.id}>
                <p>{list.name}</p>
                <div>
                  <IconButton   onClick={() => updateDocument(list.id)}>
                    <EditIcon/>
                  </IconButton>
                  
                  <IconButton onClick={() => deleteDocument(list.id)}>
                  <DeleteIcon/>
                  </IconButton>
                
                </div>
           
          </div>
            ))}        
        </div>
      </div>
    </div>
  );
}
export default RefireCrud;

//------------------------------------------------ new plan-----------------

// function CardLayout({cardHeight, cardWidth, image, children }) {

//   // console.log("Basic layout");
//   return (
//     <TTBox
//       width={cardWidth}
//       height={cardHeight}
//       sx={{ overflowX: "hidden" }}
//     >
//       <TTBox
//         position="absolute"
//         width={cardWidth}
//         minHeight={cardHeight}
//         zIndex={-1}
//         sx={{
//           backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
//             image &&
//             `${linearGradient(
//               rgba(gradients.info.main, 0.5),
//               rgba(gradients.info.state, 0.5)
//             )}, url(${image})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       />
//       <TTBox px={1} width="100%" height="100%" mx="auto">
//         <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
//           <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
//             {children}
//           </Grid>
//         </Grid>
//       </TTBox>
//     </TTBox>
//   );
// }
// export const PlanUp = () => {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
//   //
//   const handleSubmit = (event) => {
//       event.preventDefault();
//       //firebase
//       const { email, password } = event.target.elements;

//   }
//   return (
//     <CardLayout image={bgImage} cardWidth={550} cardHeight={550}>
//     {/* <BasicLayout image={bgTest2}> */}
//       <Card sx={{mt: 5, }}>
//         <TTBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           mx={2}
//           mt={-3}
//           p={2}
//           mb={1}
//           textAlign="center"
//         >
//           <TTTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//             Plan
//           </TTTypography>
//           {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
//             <Grid item xs={2}>
//               <TTTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <FacebookIcon color="inherit" fontSize="small"/>
//               </TTTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <TTTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <GitHubIcon color="inherit" fontSize="small"/>
//               </TTTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <TTTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <GoogleIcon color="inherit" fontSize="small"/>
//               </TTTypography>
//             </Grid>
//           </Grid> */}
//         </TTBox>
//         <TTBox pt={4} pb={3} px={3}>
//           <TTBox component="form" role="form" onSubmit={handleSubmit}>
//             <Grid container justifyContent={"center"} spacing={2}>
//               <Grid item xs={10}>
//                 <TextField
//                     id="outlined-select-currency"
//                     select
//                     label="Level"
//                     value={age}
//                     onChange={handleChange}
//                     helperText="Please select your currency"
//                     fullWidth
//                   >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                   {/* {currencies.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))} */}
//                   </TextField>
//                   {/* <TextField
//                     type="select"
//                     value={age}
//                     label="Age"
//                     name='Age'
//                     onChange={handleChange}
//                   >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                   </TextField> */}
//               </Grid>
//               <Grid item xs={10}>
//                 <TTInput 
//                   type="combobox" 
//                   name="name plan" 
//                   label=""
//                   fullWidth
//                   // disabled 
//                   // error
//                   // success
//                 />
//               </Grid>              
//               <Grid item>
//                 <TTInput type="list" label="" name="password" fullWidth />
//               </Grid>
//               <Grid item display="flex" flexDirection={"row"}>
//                 <TTInput type="date" label="date start" name="dateStart" mr={2} fullWidth />
//                 <TTInput type="date" label="date end" name="dateEnd" fullWidth />
//               </Grid>
//               <Grid item>
              
//               </Grid>
//             </Grid>
//             {/* <TTBox mb={2}>
//             <TTInput 
//                   type="combobox" 
//                   name="name plan" 
//                   label=""
//                   fullWidth
//                   // disabled 
//                   // error
//                   // success
//                 />
//             </TTBox>
//             <TTBox mb={2}>
//               <TTInput type="text" label="" name="password" fullWidth />
//             </TTBox>
//             <TTBox mb={2} display="flex" flexDirection="row">
//             <TTInput type="date" label="date start" name="dateStart" mr={2} fullWidth />
//             <TTInput type="date" label="date end" name="dateEnd" fullWidth />
//             </TTBox> */}
//             <TTBox mt={2} mb={1}>
//               <TTButton 
//                 variant="gradient" 
//                 color="info" 
//                 fullWidth = {true}
//                 type="submit"
//                 // onClick={handleSubmit}
//               >
//                 Create Plan
//               </TTButton>
//             </TTBox>
//           </TTBox>
//         </TTBox>
//       </Card>
//     </CardLayout>
//   );
// }
//------------------------------------------------ new plan-----------------
//https://medium.com/exelerate/the-simplest-way-to-combine-react-redux-and-firestore-typescript-353bea49cdbd
//https://zenn.dev/aono/articles/84964fae727445
//https://github.com/Rajatgms/react-shop/tree/master/src/slice
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Container from '@mui/material/Container';
import moment from 'moment';

//TODO: lodash, immer
import { Provider, useSelector } from "react-redux";
import { combineReducers, configureStore, createSlice} from "@reduxjs/toolkit";
import  thunk  from 'redux-thunk';
import  {initializeApp}  from 'firebase/app';
import  logger  from 'redux-logger';
import { useEffect, useState } from 'react';
import { 
  query, 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  getFirestore, 
  onSnapshot, 
  setDoc, 
  updateDoc 
} from "firebase/firestore";
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card } from "@mui/material";
import { getDocs } from 'firebase/firestore';

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

const SortOptions = {
  attribute: "",
  order: "",//OrderByDirection,
};
const CollectionOptions = {
  listen: false,
  listenerName: "",
  sort: SortOptions,
  queries: [],
  limit: 10,
  lazyLoad: false,
};

const DocumentOptions = {
  listen: false,
  listenerName: "",
  subcollections: [{ path: "", storeAs: "" }],
};

const QueryOptions = {
  attribute: "",
  operator: "",//WhereFilterOp,
  value: []
};
const getQuery = (coll, options) => {

  const baseQuery = getFirestoreRef(coll);
  let query = baseQuery;
    if (options && options.queries) {
        const { queries } = options;
        queries.forEach(({ attribute, operator, value }) => {
        query = query.where(attribute, operator, value);
        });
    }

    if (options && options.sort) {
        const { attribute, order } = options.sort;
        query = query.orderBy(attribute, order);
    }

    if (options && options.limit) {
        query = query.limit(options.limit);
    }
    return query;
}
const CollectionListener = () => {
  const initData = {
    title: "",
    description: ""
  }
  const [data, setData] = useState(initData);

  const {notifications, loading, error} = useSelector((state) => ({
      notifications: state.notifi.data,
      loading: state.notifi.status === STATUS.LOADING,
      error: state.notifi.errors
  }))
  // const firestore = useFirestore<Notification[]>('notifications');
  const fireStore = useFirestore('notification');
  useEffect(() => {
      fireStore.collection(notificationSlice.actions, {listen: true});
  }, [fireStore]);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!data.title || !data.description) return;
      // db.collection('mode/development/notifications')
      //     .add({
      //         title: data.title,
      //         description: data.description,
      //         createdAt: new Date(),
      //         type: 'order_placed'
      // }).then().catch(e => console.log(e));
      addDoc(collection(db, 'mode/development/notifications'), {
                title: data.title,
                description: data.description,
                createdAt: new Date(),
                type: 'order_placed'
        }).then(()=>{console.log("addDoc success")}).catch(e=>console.log(e));
  }

  return (
      <>
      <div>
          <div>
              <div>
                  {loading && (
                      <p>Loading...</p>
                  )}
                  {(!loading && !notifications?.length) && (
                      <>
                      <p>There is not data in your database.</p>
                      <p>Go to home page and click the button Add mock data or add manually through the form.</p>
                      </>
                  )}
                  {error && (
                      <p>{error}</p>
                  )}
                  {notifications && (
                      notifications.map(n => (
                          <div key={n.id} style={{ width: '18rem' }}>
                              <div>
                                  <label>{n.title}</label>
                                  <label className="mb-2 text-muted">{n.createdAt}</label>
                                  <label>
                                      {n.description}
                                  </label>
                              </div>
                          </div>
                      ))    
                  )}
              </div>
              <div>
                  <form onSubmit={handleSubmit}>
                    <form controlId="formBasicEmail">
                      <label>Title</label>
                      <input onChange={(e) => setData({...data, title: e.target.value})} type="text" placeholder="Enter title" />
                    </form>
                    <br></br>
                    <form controlId="formBasicPassword">
                        <label>Description</label>
                        <input onChange={(e) => setData({...data, description: e.target.value})} type="text" placeholder="Description" />
                    </form>
                        <br></br>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                  </form>
              </div>
          </div>
          
      </div>
      </>
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
const users = [
  {
    id: '5e884ff1b51cc1956a5avgc0',
    name: 'Naum',
    email: 'naum@exelerate.me'
  },
  {
    id: '5e883xf1b51cc1956avl1ec0',
    name: 'Ilcho',
    email: 'ilcho@exelerate.me'
  },
  {
    id: '5e8453f1b51cc195hs5a1ec0',
    name: 'Elena',
    email: 'elena@exelerate.me'
  },
  {
    id: '5e1283f1b51cc1956fga1ec0',
    name: 'Ivan',
    email: 'ivan@exelerate.me'
  },
  {
    id: '5e8883f1b51cc19565la1ec0',
    name: 'Zoki',
    email: 'zoki@exelerate.me'
  },
  {
    id: '5e88sdf1b51cc1956a5a1ec0',
    name: 'Toshe',
    email: 'toshe@exelerate.me'
  },
  {
    id: '5e8883f1bfgcc1956a5a1ec0',
    name: 'Boban',
    email: 'boban@exelerate.me'
  },
];
const notifications = [
  {
    id: '5e8883f1b51cc1956a5a1ec0',
    createdAt: moment()
    .subtract(2, 'hours')
    .toDate(),
    description: 'Dummy text',
    title: 'Your order is placed',
    type: 'order_placed'
  },
  {
    id: '5e8883f7ed1486d665d8be1e',
    createdAt: moment()
    .subtract(1, 'day')
    .toDate(),
    description: 'You have 32 unread messages',
    title: 'New message received',
    type: 'new_message'
  },
  {
    id: '5e8883fca0e8612044248ecf',
    createdAt:  moment()
    .subtract(3, 'days')
    .toDate(),
    description: 'Dummy text',
    title: 'Your item is shipped',
    type: 'item_shipped'
  },
  {
    id: '5e88840187f6b09b431bae68',
    createdAt: moment()
    .subtract(7, 'days')
    .toDate(),
    description: 'You have 32 unread messages',
    title: 'New message received',
    type: 'new_message'
  },
  {
    id: 'ge88840187f6b09b401bae68',
    createdAt: moment()
    .subtract(7, 'days')
    .toDate(),
    description: 'You have 32 unread messages',
    title: 'Your item is too large',
    type: 'error_shipment'
  }
];
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addData = async () => {
    setLoading(true);
    
    for (const not of notifications) {
      await db.collection('mode/development/notifications').doc(not.id).set(not)
        .then(() => {
          setError('');
          console.log('Mock data added!');
        })
        .catch(e => {
          console.log('error adding mock data', e);
          setError(e.message);
        });
    }
    for (const user of users) {
      await db.collection('mode/development/users').doc(user.id).set(user)
        .then(() => {
          setError('');
          console.log('Mock data added!');
        })
        .catch(e => {
          console.log('error adding mock data', e);
          setError(e.message);
        });
    }
    await db.collection('mode/development/examples').doc('Documentstandeptrai').set({
      field: 'valueee'
    })
    setLoading(false);
  }
  const firestore = useFirestore('notifications');
  const navi = useNavigate();
  
  return (
    <div >
        <header >
        <label>test id: {firestore.id()}</label>
        <hr></hr>
        <button onClick={()=>navi("/collection")}>collection page</button>
        <button onClick={()=>navi("/doc")}>doc page</button>
        <hr></hr>
        
        <p>Create firebase project, firebase web app and a database, then add the app config in the .env file</p>

        <p>When you are done click the button to add mock data to your firebase firestore database.</p>
        <button disabled={loading} onClick={addData} size="lg">Add mock data</button>
        {error && (
            <p>{error}</p>
        )}
        </header>

    </div>
  );
}

const STATUS = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  DONE: "DONE"
}
const GenericState = {
  data:[],
  status: STATUS.LOADING,
  error: false
}
function createGenericSlice({
  name = 'Generic',
  initialState = GenericState,
  reducers
}){

  createSlice({
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
const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    success(state, action){
      console.log(state.email);
    }
  }
});
const userReducer = userSlice.reducer;
const initNotification = {
  data: [
    {
      id: 1,
      title: "tan dep trai",
      description: "tan sieu dep trai",
      type: "test",
      createdAt: "2022-06-26",
      subcollections: []
    }
  ]
}
const notificationSlice = createSlice({
  name: "notifi",
  initialState: initNotification,
  reducers:{
    loading(state) {
      state.status = STATUS.LOADING;
    },
    success: {
      reducer: (state, action) => {
        state.data = action.payload;
        state.status = STATUS.DONE;
      },
      prepare: (notifications) => {
        const mapped = notifications.map(n => {
          return {...n, createdAt: "20252639"}
        })
        return {payload: mapped};
      }
    },
    
  },
});
//const { notificationReducer } = notificationSlice.reducer;
const initDocument = {
  id: 1,
  field: "column",
}
const documentExampleSlice = createGenericSlice({
  name: "document",
  initialState: initDocument,
  reducers: {}
})
//const { documentExampleReducer } = documentExampleSlice.reducer;

// const rootReducer = combineReducers({
//   // notification: notificationSlice.reducer,
//   // documentExample: documentExampleSlice.reducer,
//   user: userReducer,
// })
const initPerson = {
  name: "tan dep trai",
  age: 30,
}
const DecrementAge = (state) => {
  state.age--
}
const PersonSlice = createSlice({
  name: "person",
  initialState: initPerson,
  reducers:{//reducer + action
    incrementAge(state){state.age++},
    de: DecrementAge,
    changeName: (state, action)=>{
      state.name = action.payload
    }
  }
})

const {incrementAge, changeName, de} = PersonSlice.actions;
const PersonReducer = PersonSlice.reducer;
//redux: store
const StateRoot = {
  person: initPerson,
  notifi: initNotification,
  user: initUser,
}

const reducerRoot = combineReducers({
  notifi: notificationSlice.reducer,
  person: PersonReducer,
  user: userReducer,
})
const store = configureStore({
  reducer: reducerRoot,
  preloadedState: StateRoot,

});

const TestNotifi = () => {

  const {notifications, loading, error} = useSelector((state) => ({
    notifications: state.notifi.data,
    loading: state.notifi.status === STATUS.LOADING,
    error: state.notifi.errors
  }));
  const dispath = useDispatch();

  return(
    <div>
      <label>test notifications </label>
      {notifications.map((item,index) => {
        return(
          <div key={item+index}>
          <label key={item+index}>{item.title}</label>
          <label>{item.createdAt}</label>
          </div>
        )
      })}
      {/* <label>notifications: {notifications}</label> */}
      <button onClick={()=>dispath(notificationSlice.actions.success([{
          id: 100,
          title: "tan dep sieu trai cap vu tru",
          description: "tan sieu dep trai",
          type: "test tst ",
          createdAt: "2022-06-27",
          subcollections: []
      }]))}>notifiaction actions test</button>
      <label>loading: {loading}</label>
      <label>error: {error}</label>
    </div>
  )
}
// const RootDispatch = store.dispatch;
//const RootState = store.getState(State);
//hook
const ListenerState ={
  name: "",
  unsubscribe: () => {}
}
const getFirestoreRef = (path) => {
  const basePath = 'mode/development';
  console.log(`${basePath}/${path}`);
  return collection(db, `${basePath}/${path}`);
}
const collectionApi = (
  query,
  actions,
  dispatch,
  collectionListenersRef,
  lastDocRef,
  options
) => {
  dispatch(actions.loading());
  if (options && options?.listen) {
      const listener = getDocs(query)
        .then( querySnapshot => {
              const data = [];
              if (querySnapshot.empty) {
                  dispatch(actions.success([]));
                  return;
              }
              querySnapshot.forEach(doc =>
                  data.push({ id: doc.id, ...doc.data() })
              );
              console.log('test', data);
              dispatch(actions.success(data));
              if (options.lazyLoad) {
                  lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
              }
          })
        .catch(
          error => {
              dispatch(actions?.error(error.message));
              console.log('collection streaming error', error.message);
          }
        );
      collectionListenersRef.current.push({name: options.listenerName, unsubscribe: listener});
  } else {
      getDocs(query)
          .then(querySnapshot => {
              const data = [];
              querySnapshot.forEach(doc =>
                  data.push(({ id: doc.id, ...doc.data() } ) )
              );
              dispatch(actions.success((data )));
              if (options && options.lazyLoad) {
                  lastDocRef.current = querySnapshot.docs[querySnapshot.docs.length - 1];
              }
          })
          .catch(error => {
              console.log('collection get error', error.message);
              dispatch(actions?.error(error.message));
          });
  }
  
}
const docApi = (
  path, id, actions, dispatch, docListenerRef, options
) => {
  const docRef = doc(getFirestoreRef(path), id)
  dispatch(actions.loading());
  if(options.listen){
    const listener = onSnapshot(docRef, docSnapshot => {
      if(docSnapshot.exists){
        dispatch(actions.error("Document does not exists"));
        return
      }
      console.log("pelod", {id: docSnapshot.id, ...docSnapshot.data()});
      dispatch(actions.success({id: docSnapshot.id, ...docSnapshot.data()}));
    });
    docListenerRef.current.push({name: options.listenerName, unsubscribe: listener});
  }else{
    console.log("docRef.path", docRef.path);
    getDoc(docRef)
      .then(doc => {
        if(!doc.exists){
          dispatch(actions.error('document does not exists'))
          return
        }
        let result = {id: doc.id, ...doc.data()}
        dispatch(actions.success(result));
        for(const subcoll of options.subCollection){
          console.log(subcoll)
          getDocs(collection(doc.ref, subcoll.path))
            .then(snap => {
              if(!snap.empty || snap.docs.length){
                result[subcoll.storeAs] = snap.docs.map(doc=>{
                  return{id: doc.id, ...doc.data()};
                })
                dispatch(actions.success(result));
              }
            })
            .catch(err=>{
              console.log('get document error 1', err)
            })
        }
      })
      .catch(err => {
        console.log('get document error 2', err);
        dispatch(actions.error(err.message));
      })
  }

}
const useFirestore = (path) => {

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
  const getQuery = (collection , options) => {
    const baseQuery = getFirestoreRef(collection);
    let query = baseQuery;
    if (options && options.queries) {
        const { queries } = options;
        queries.forEach(({ attribute, operator, value }) => {
        query = query.where(attribute, operator, value);
      });
    }

    if (options && options.sort) {
        const { attribute, order } = options.sort;
        query = query.orderBy(attribute, order);
    }

    if (options && options.limit) {
        query = query.limit(options.limit);
    }

    return query;
};
  const collection = (actions, options) => {
    let query = getQuery(path, options);

    collectionApi(query, actions, dispatch, collListenerRef, lastDocRef, options);
    
    if (options?.lazyLoad) {
        return {
            loadMore: (limit) => {
                limit && (query = getQuery(path, {...options, limit}));
                query = query.startAfter(lastDocRef.current);
                collectionApi(query, actions, dispatch, collListenerRef, lastDocRef, options);
            }
        }
    }
  }
  const doc = async (
    id, actions, options
  ) => {
    docApi(path, id, actions, dispatch, docListenerRef, options);
  }

  const id = () => {
    const ref = getFirestoreRef(path);
    return ref.id
  }
  const create = async (data) => {
    return addDoc(getFirestoreRef(path), data)
    // return getFirestoreRef(path)
    // .add(data)
    .then(res => console.log('Document created with id: ', res.id))
    .catch(e => console.log('Error creating document', e))
  }
  const update = (id, data) => {
    updateDoc(getFirestoreRef(path), id)
  }
  const remove = (id) => {
    getFirestoreRef(path)
    
  }
  const unsubscribe = (listenerName) => {}

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
          <Route path="/test" element = {<TestNotifi/>}/>
          <Route path="/"  element = {<Home />}/>
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


const Colors=({data})=>{
  return(
      <>
        {
          data && data.map((d)=>{
             return(
                  <div className="card" key={d.id} style={{background:d.color}}>
                  <div className="container">
                      <h4><b>{d.name}</b></h4> 
                      <p>{d.color}</p> 
                  </div>
                  </div>
             )
         })
        }
      </>
  )
}
const FetchComplexData=()=>{
    const [Data,setData]=useState({
        Company:'',
        Description:''
    })
    const [colorsData,setColorsData]=useState([])
    useEffect(()=>{
        fetch('https://reqres.in/api/unknown')
            .then(res=>{
                console.log('Response from main API: ',res)
                console.log('Home Data: ',res.data.ad)
                let companyData=res.data.ad;
                setData({Company:companyData.company,Description:companyData.text})
                console.log('Colors Data: ',res.data.data)
                setColorsData(res.data.data)
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    return(
        <>
            <h1>{Data.Company}</h1>
            <p>{Data.Description}</p>
            <Colors data={colorsData}/>
        </>
    )
}

export default FsCRUD;

// crud

import {Timestamp, getFirestore, getDoc, doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc, getDocs} from "firebase/firestore";
import React, { useEffect, useState, forwardRef } from 'react';
import {
  combineReducers,
  configureStore,
  EnhancedStore,
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  nanoid
} from '@reduxjs/toolkit';
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
// import rootReducer from './rootState'
import { createServer } from "miragejs"
import logger from 'redux-logger'
import { Provider, useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, Collapse, Container, CssBaseline, LinearProgress, Link, styled} from '@mui/material';
import {
  Box,
  Switch,
  Chip,
  Paper,
  Tabs,
  Tab,
} from '@mui/material'
import { ExpandMoreOutlined, Input, MoreVert, Search, Share, StarBorder } from '@mui/icons-material'
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
// import usePagination from 'firestore-pagination-hook'
import { serverTimestamp } from "firebase/firestore";
import  {initializeApp}  from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { useRef } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import Favorite from "@mui/icons-material/Favorite";
import { MaterialUIControllerProvider, themeLight, TTBox, TTButton, TTInput, TTProgress, TTTypography } from "../fullAppUi";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import TestCard from "./kanjiFeature";
import KanjiFeature from "./kanjiFeature";
const bgImage_su = require("../assets/images/bg-sign-up-cover.jpeg");
const bgImage = require("../assets/images/bg-sign-in-basic.jpeg");
const availableColors = ['green', 'blue', 'orange', 'purple', 'red']

const capitalize = (s) => s[0].toUpperCase() + s.slice(1)

//data mock
const data = {
  card1:{
    id:1,
    title: "base",
    name: "hiragana",
    count: 0,
    description:{
      a:{
        
      }
    }
  },
  card2:{
    id:2,
    title: "base",
    name: "katakana",
    description:{
      
    }
  },
  card3:{
    id:3,
    title: "kotoba",
    name: "ad",
    description:{
      
    }
  },
}
//Pre-Begin-intermediate-advenced-expert-master
const detail_type1 = {  //文字
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
const detailBegin = {   //言葉
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
const detail = {        //漢字
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
const detailInter = {   //文法
  mean:[],      //tieng viet
  howToUse:[],  //list string
  sample:[],
  read:[],      //romaji
  write:[],     //japanese
  kanji:[],     //
  count: 0,     //use count 
}
//firebase
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

const RootPath = {
  MASTER: "master",
  BOOK: "books",
  USER: "user",
  GRAMMAR: "Grammar"
}
const SecondPath =  {
  MASTER: "card",
  BOOK: "book",

}
const ThirdPathBook = {

}
const FirestoreRef = (path, pathId) => {

  //const basePath = 'mode/development';

  const pathStr = `${path}/${path+pathId}`
  //console.log(pathStr);
  return collection(db, pathStr);
}
const useFirestore =(path) => {

  const id = 1;
  const create = () => {}
  const add = () => {}
  const deleteId = () => {}
  const update = () => {}
  const docDb = () => {}
  const colectionDb = () => {}

  return{
    id, create, add, deleteId, update, docDb, colectionDb
  }
}

//helper - timerModify
const increment = (state, type, action) => {
  switch (type) {
      case "hours":
          state[type] >= 0 && state[type] < 12
              ? action({
                  ...state,
                  [type]: state[type] + 1,
              })
              : action(state);
          break;
      case "minutes":
          state[type] >= 0 && state[type] < 60
              ? action({
                  ...state,
                  [type]: state[type] + 1,
              })
              : action(state);
          break;
      case "seconds":
          state[type] >= 0 && state[type] < 60
              ? action({
                  ...state,
                  [type]: state[type] + 1,
              })
              : action(state);
          break;
  }
}
const decrement = (state, type, action) => {
  switch (type) {
      case "hours":
          state[type] > 0 && state[type] <= 12
              ? action({
                  ...state,
                  [type]: state[type] - 1,
              })
              : action(state);
          break;
      case "minutes":
          state[type] > 0 && state[type] <= 60
              ? action({
                  ...state,
                  [type]: state[type] - 1,
              })
              : action(state);
          break;
      case "seconds":
          state[type] > 0 && state[type] <= 60
              ? action({
                  ...state,
                  [type]: state[type] - 1,
              })
              : action(state);
          break;
  }
}
//timer
const timerInit = {
  timer: {
      hours: 0,
      minutes: 0,
      seconds: 0,
      notes:""
  },
  reminderData: ""
};

const timerSlice = createSlice({
  name: "timer",
  initialState: timerInit,
  reducers: {
      setTimer: (state, action) => ({
          ...state, timer: action.payload
      }),
      setReminderData: (state, action) => ({
          ...state, reminderData: action.payload
      }),
      reset: (state) => { state = initialState }
  },
});

const { setTimer, setReminderData, reset } = timerSlice.actions;
function CountDown() {
  const [timerState, setTimerState] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { timer } = useSelector((state) => state.timerSlice);
  const [over, setOver] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimerState(timer);
  }, [timer])
  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  })
  useEffect(() => {
    over && dispatch((setTimer(timerState)))
  }, [over])

  const tick = () => {
    if (timerState.hours == 0 && timerState.minutes == 0 && timerState.seconds == 0) setOver(true)
    else if (timerState.minutes == 0 && timerState.seconds == 0)
      setTimerState({
        hours: timerState.hours - 1,
        minutes: 59,
        seconds: 59
      });
    else if (timerState.seconds == 0)
      setTimerState({
        hours: timerState.hours,
        minutes: timerState.minutes - 1,
        seconds: 59
      });
    else
      setTimerState({
        hours: timerState.hours,
        minutes: timerState.minutes,
        seconds: timerState.seconds - 1
      });
  };

  return (
    <div className="countDown">
      {
        //over && <Popup />
      }
      <div id="hours" className="timeDisplay">{timerState.hours}</div>
      <div id="minutes" className="timeDisplay">{timerState.minutes}</div>
      <div id="seconds" className="timeDisplay">{timerState.seconds}</div>
    </div>
  );
}

//bug
let lastid = 0;
const bugSlice = createSlice({
  name: "Bugs",
  initialState: [],
  reducers: {
    // Action : Action / Event Handlers
    BugAdded: (bugs, action) => {
      bugs.push({ id: ++lastid, desc: action.payload.desc, resolved: false });
    },
    BugRemoved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs.splice(index, 1);
    },
    BugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    BugToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },
  },
});

const { BugAdded, BugRemoved, BugResolved, BugToUser } = bugSlice.actions;

const bugByUserSelector = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );

// Selector
// export const unResolveBugsSelector = (state) => {
//   return state.entities.bugs.filter((bug) => bug.resolved === false);
// };

// Memorization - Selector with cache data - Install package reselect
// export const unResolveBugsSelector = createSelector(
//   (state) => state.entities.bugs,
//   (state) => state.entities.projects,
//   (bugs, projects) => bugs.filter((bug) => !bug.resolved)
// );
//redux
// const initTodo = {
//   status: 'idle',
//   entities:{}
// }
//
const todoAdapter = createEntityAdapter();
const initState = todoAdapter.getInitialState({
  status: 'idle',
})
const GetDataTodo = async () => {

  var todos = [];
  const q = query(collection(db, "plan"),  orderBy("id", "desc"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // //console.log(doc.id, " => ", doc.data());
    todos.push(doc.data());
  });
  // const test = onSnapshot(q, (snapshot) => {
  //   return snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
  //   ////console.log("a",a);
  //   // snapshot.docs.map(doc => todos.push({...doc.data(), id: doc.id}))
  //   // var idtest = 7
  //   // snapshot.docs.map(doc => {
  //   //   // //console.log("doc", doc.data())
  //   //   return todos.push(
  //   //     {id: idtest++,title: "asf"+idtest, content: "af"+ idtest, time: "fasdf"}
  //   //   )}
  //   // return true;
  //   // )

  // });
  // test();
  const a = [{a:"a"}, {b:"b"}]
  const b = [{c:"c"}, {b:"b"}, {e:"e"}]
  const c = [...a, ...b]
  //todos.map(item=>//console.log("onSnapshot:",item))
  // //console.log("firestore todos c:", c);
  todos.push({
    id: 4, title: "tan1", content: "abc1", time: "213222"
  })
  todos.push({
    id: 5, title: "tan1", content: "abc1", time: "213222"
  })
  todos.push({
    id: 6, title: "tan1", content: "abc1", time: "213222"
  })
  //console.log("firestore todos c:", todos);
  //console.log("firestore todos:", todos.length);
  return todos
  // return [
  //   {id: 1, title: "tan1", content: "abc1", time: "213222"},
  //   {id: 2, title: "tan2", content: "ab2", time: "213222"},
  // ]
}
//thunks
export const fetchTodo = createAsyncThunk('todos/fetchTodo', async()=>{
  // const reponse = await 
  // const id = 1;
  // const title = "tan dep trai"
  // return [
  //   {id: id, title: title, completed: true, content: "lenrn react"},
  //   {id: id+1, title: title+1, completed: false, content: "learn redux"}
  // ]
  // const response = await client.get('/fakeApi/todos')
  //   .then(res => //console.log(res))
  //   .then(err => //console.log(err))
  // return response.todos
  // const todos = []
  // fetch("/fetchApi/todos")
  // .then((res)=>res.json())
  // .then((json)=>{
  //   json.todos.map((item)=>todos.push(item));
  // })
  // //console.log("todos:", todos);
  const todos = await GetDataTodo();
  //console.log("redux todos:",  todos);
  return todos;

  
});
const setTodo = async (text) => {
  // //console.log("test text:", text)
  const todoRef = collection(db, "plan");
  const item = {
    id: nanoid(),
    title: "shopping",
    content: text,
    time: "2022/07/04"
  }
  //const response = 
  await setDoc(doc(todoRef, "plan"+item.id), item)
  // .then((res)=>{
  //   //console.log(res);
  //   return item;
  // })
  // .catch((err)=>{
  //   //console.log(err);
  // });
  // //console.log("test end:",response)
  return item;

}
export const saveNewTodo = createAsyncThunk('todos/saveNewTodo', async (text) => {
  // //console.log(text);
  // const initialTodo = { text }
  // //console.log(initialTodo);
  
  // // const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  // return {id: 5, title: "heloo", completed: false, content: text}
  const initialTodo = { text }
  // const response = await client.post('/fakeApi/todos', { todo: initialTodo })
  // return response.todo
  const response = setTodo(text)
  // //console.log("save: ", response);

  return response;

});
const todoSlice = createSlice({
  name: 'todo',
  initialState:initState,
  reducers:{
    setLists(state, action){
        
        //state.entities[action.] = action.payload
    },
    todoDeleted: todoAdapter.removeOne,
    allTodoCompleted(state, action){
      Object.values(state.entities).forEach(todo=>{
        todo.completed = true
      })
    },
    completedTodoCleared(state, action){
      const completedId = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id)
      todoAdapter.removeMany(state, completedId);
    },
    todoAdded(state,action){
      const todo = action.payload;
      state.entities[todo.id] = todo;
    },
    todoToggled(state, action){
      const todoId = action.payload;
      const todo = state.entities[todoId];
      todo.completed = !todo.completed;
    },
    todoLoading(state, actions){
      return{...state, status: 'loading'}
    },

    //
    todoColorSelected: {
      reducer(state, action){
        const {color, todoId} = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color){
        return{payload:{todoId, color}}
      }      
    },
    // todoDeleted(state, action){
    //   delete state.entries[action.payload];
    // }
  },
  extraReducers: build => {build
    .addCase(fetchTodo.pending, (state, action)=>{
      state.status = 'loading'
    })
    // .addCase(fetchTodo.fulfilled, (state, action)=>{
    //   const newEntities = {};
    //   //console.log("fulfilled: ",);
    //   action.payload.map((item,index)=>{
    //     //console.log(item);
    //     return {...newEntities, ...item}
    //   })
    //   action.payload.forEach((todo, index, array)=>{
    //     //console.log(todo);
    //   })
    //   action.payload.forEach(todo=>state.entities = {...newEntities, ...todo});
    //   //   newEntities[todo.id] = todo;
    //   // });
      
    //   state.status = 'idle'
    //   //console.log("entity:",newEntities);
    // })
    // .addCase(fetchTodo.fulfilled, (state, action)=>{
    //   //console.log("action.payload:", action.payload);
    //   todoAdapter.addMany(state, action.payload);
    //   state.status = 'idle'
    // })
    .addCase(fetchTodo.fulfilled, (state, action)=>{
      //console.log("addCase:", action.payload);
      const itemTest =       [
        {id: 1, title: "tan1", content: "abc1", time: "213222"},
        {id: "2", title: "tan2", content: "abc2", time: "213222"},
        {id: "3", title: "tan3", content: "abc3", time: "213222"}
      ]

      const test = [...itemTest, ...action.payload];
      //console.log(action.payload.length);
      //console.log("test addCase:", test);
      todoAdapter.setAll(state, action.payload)
    })
    .addCase(saveNewTodo.fulfilled, (state, action)=>todoAdapter.addOne(state, action.payload))
    // .addCase(saveNewTodo.fulfilled, (state, action)=>{
    //   const todo = action.payload
    //   state.entities[todo.id] = todo
    // })
  }
  
});
const {
  todoColorSelected, 
  allTodoCompleted,
  todoLoading, 
  todoToggled, 
  todoAdded, 
  completedTodoCleared,
  todoDeleted,
} = todoSlice.actions;

const {selectAll: selectTodo, selectById: selectTodoById} = todoAdapter.getSelectors(state=>state.todos)

const selectTodoId = createSelector(
  selectTodo,
  todos => todos.map((todo)=>{
    //console.log("test test todo",todo);
    return todo
  })
);
const selectFilteredTodos = createSelector(
  // First input selector: all todos
  selectTodo,
  // Second input selector: all filter values
  (state) => state.filters,
  // Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompletions = status === StatusFilters.All
    if (showAllCompletions && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed
    // Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus
      const colorMatches = colors.length === 0 || colors.includes(todo.color)
      return statusMatches && colorMatches
    })
  }
)

const selectFilteredTodoIds = createSelector(
  // Pass our other memoized selector as an input
  selectFilteredTodos,
  // And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo,idx) => {
    //console.log("todo {0}: {1}",idx,todo);
    return todo.id
  })
)
const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusFilterChanged(state, action) {
      state.status = action.payload
    },
    colorFilterChanged: {
      reducer(state, action) {
        let { color, changeType } = action.payload
        const { colors } = state
        switch (changeType) {
          case 'added': {
            if (!colors.includes(color)) {
              colors.push(color)
            }
            break
          }
          case 'removed': {
            state.colors = colors.filter(
              (existingColor) => existingColor !== color
            )
          }
          default:
            return
        }
      },
      prepare(color, changeType) {
        return {
          payload: { color, changeType },
        }
      },
    },
  },
})

const { colorFilterChanged, statusFilterChanged } = filtersSlice.actions

const planAdapter = createEntityAdapter();
const planInit = planAdapter.getInitialState({
  status: 'idle',
});
const planCreateNew = createAsyncThunk("plan/planCreateNew", async (item)=>{
  //console.log(item);
})
const planSlice = createSlice({
  name: 'plan',
  initialState: planInit,
  reducers: {
    planCreateNewOne(state, action){
      //console.log(action.payload);
      // planAdapter.addOne(action.payload);
    },
    planAdded(state,action){state.push(action.payload)},
    planToggled(state, action){
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    },
    planLoading(state, actions){
      return{...state, status: 'loading'}
    }
  },
  extraReducers:{
    [planCreateNew.fulfilled]:(state, action)=>planAdapter.addOne(action.payload),
  }
  // extraReducers: (build)=>{build
  //   .addCase(planCreateNew.fulfilled, (state, action)=>planAdapter.addOne(state, action));
  // }
});
const { planCreateNewOne } = planSlice.actions;
const { selectAll: selectPlan } = planAdapter.getSelectors((state)=>state.plan)
// const filterTest = createSelector(
//   selectPlan,
//   (plans)=> plans
// )
const RootReducers = combineReducers({
  todos: todoSlice.reducer,
  filters: filtersSlice.reducer,
  plan: planSlice.reducer,
  bug: bugSlice.reducer,
  timer: timerSlice.reducer,
})
export const store = configureStore({
  devTools: true,
  // preloadedState: {},
  reducer: RootReducers,
  middleware:[thunk],
})
//app
const HeaderTodo = () => {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle')
  const dispatch = useDispatch()

  const handleChange = (e) => setText(e.target.value)

  const handleKeyDown = async (e) => {
    // If the user pressed the Enter key:
    const trimmedText = text.trim()
    if (e.which === 13 && trimmedText) {
      // Create and dispatch the thunk function itself
      setStatus('loading')
      await dispatch(saveNewTodo(trimmedText))
      // And clear out the text input
      setText('')
      setStatus('idle')
    }
  }

  let isLoading = status === 'loading'
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className="loader" /> : null

  return (
    <header className="header">
      <input
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  )
}

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key]
    const handleClick = () => onChange(value)
    const className = value === status ? 'selected' : ''

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}
const TodoListItem = ({ id }) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state) => selectTodoById(state, id))
  const { title, content, completed, color } = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    dispatch(todoToggled(todo.id))
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch(todoColorSelected(todo.id, color))
  }

  const onDelete = () => {
    dispatch(todoDeleted(todo.id))
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div>
        <div>
          <input
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div>{content}</div>
        </div>
        <div>
          <select
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button onClick={onDelete}>X
            {/* <TimesSolid /> */}
          </button>
        </div>
      </div>
    </li>
  )
}

const TodoList = () => {

  const todoIds = useSelector(selectFilteredTodoIds)
  const todos = useSelector(selectTodoId);
  //console.log("todoIds",todoIds);
  //console.log("selectTodoId: ", todos)
  // //console.log(todoAdapter.getSelectors(state=>state.todos));
  const loadingStatus = useSelector((state) => state.todos.status)

  // if (loadingStatus === 'loading') {
  //   return (
  //     <div>
  //       <div/>
  //     </div>
  //   )
  // }

  const renderedListItems = todoIds.map((todoId) => {

    return <TodoListItem key={todoId} id={todoId} />
  })

  return (
    <div>
      <label>old list</label>
      <ul>{renderedListItems}</ul>
      <label>new list</label>
      {todos.map((item)=>{
        return(
          <label key={item.id}>{item.id}</label>
        )
      })}
    </div>
  )

}

const Footer = () => {
  const dispatch = useDispatch()

  const todosRemaining = useSelector((state) => {
    // //console.log("state",state);
    const uncompletedTodos = selectTodo(state).filter(
      (todo) => !todo.completed
    )
    return uncompletedTodos.length
  })

  const { status, colors } = useSelector((state) => state.filters)

  const onMarkCompletedClicked = () => dispatch(allTodoCompleted())
  const onClearCompletedClicked = () => dispatch(completedTodoCleared())

  const onColorChange = (color, changeType) =>
    dispatch(colorFilterChanged(color, changeType))

  const onStatusChange = (status) => dispatch(statusFilterChanged(status))

  return (
    <footer>
      <div>
        <h5>Actions</h5>
        <button onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}

// let server = createServer();
// server.get("/api/users", { users: [{ id: 1, name: "Bob", age: 30 }] });
// server.get("/api/todos", { todos: [{ id: 1, content: "tan dep" }] });
// server.get("/fetchApi/todos", {todos: [
//   {id: 1, content: "abc", completed: false, color: 'blue'},
//   {id: 2, content: "tan dep trai", completed: false, color: 'green'},
//   {id: 3, content: "learn redux", completed: false, color: 'red'},
//   {id: 4, content: "learn angula", completed: true, color: 'blue'},
//   {id: 5, content: "learn react", completed: false, color: 'blue'},
// ]})
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
const LinearProgressLabel = (props) => {

  return(
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Box sx={{width: '90%', mr: 1}}>
        <TTProgress variant="contained" {...props}/>
      </Box>
      <Box sx={{minWidth: 50}}>
        <Typography variant="body2">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

const TabStyle = styled(Tabs)((theme, ownState)=>{

  return{
    display: 'flex',
    flexDirection: 'column',
    '&.MuiTab-root.Mui-selected': {
      color: 'gold',
  },
  }
})
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const CardCom = (

) => {
  
  // const plan = useSelector(filterTest);
  // const plan1 = useSelector(state=>state.plan)
  // //console.log(plan);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    //console.log("newValue",newValue)
  };

  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [progress, setProgress] = useState(10);

  useEffect(()=>{
    const timer = setInterval(()=>{
      setProgress((prevProgress)=>(prevProgress >= 100?10:prevProgress+10))
    }, 5000);
    return()=>{
      clearInterval(timer);
    };
  },[]);
  return(
    <Card sx={{maxWidth: 450, zIndex: 5}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], borderRadius:2 }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"//console.log("card Header click")}
      />
      <Box sx={{width: '100%', marginTop: -3}}>
        <LinearProgressLabel value = {progress}/>
      </Box>
      <CardMedia
        component="img"
        height="50"
        image="/logo512.png"
        alt="Paella dish"
        sx={(theme)=>{
          return{
            position: 'absolute',
            zIndex: -1,

          }
        }}
      />
      <CardContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', flexDirection:'row-reverse' }}>

          <Tabs sx={{minWidth: '20%'}} orientation="vertical" value={value} onChange={handleChange} aria-label="basic tabs example">

              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />

          </Tabs>
          <TabPanel value={value} index={0}>
            <Typography>Item One</Typography>
            <Typography variant="body2" color="text.secondary" >
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TTTypography>Item Two</TTTypography>
            
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TTTypography>Item Three</TTTypography>
          </TabPanel>
        </Box>
      </CardContent>

      
      <CardActions disableSpacing>
        <IconButton size="small" aria-label="add to favorites" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Favorite />
        </IconButton>
        <IconButton size="small" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Share />
        </IconButton>
        <IconButton size="small" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Share />
        </IconButton>
        <IconButton size="small" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'blue',
        }}>
          <Share />
        </IconButton>
        <IconButton color="info" aria-label="share" sx={{
          borderRadius:10,
          backgroundColor: 'info',
          fontSize: 10,
          width: 30,
          height: 30
        }}>
          <Share aria-disabled/>
        </IconButton>
        <TTButton variant="contained" color={"success"} sx={{
          
        }}> Get Start </TTButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreOutlined />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

function CardLayout({cardHeight, cardWidth, image, children }) {

  // //console.log("Basic layout");
  return (
    <TTBox
      width={cardWidth}
      height={cardHeight}
      sx={{ overflowX: "hidden" }}
    >
      <TTBox
        position="absolute"
        // width={cardWidth}
        // minHeight={cardHeight}
        zIndex={-1}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.info.main, 0.5),
              rgba(gradients.info.state, 0.5)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <TTBox px={1} width="100%" height="100%" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </TTBox>
    </TTBox>
  );
}
const Level = {
  n0: {
    id: 0,
    text: "N0",
  },
  n1: {
    id: 1,
    text: "jlpt N1",
  },
  n2: {
    id: 2,
    text: "jlpt N2",
  },
  n3: {
    id: 3,
    text: "jlpt N3",
  },
  n4: {
    id: 4,
    text: "jlpt N4",
  },
  n5: {
    id: 5,
    text: "jlpt N5",
  },
  np: {
    id: 6,
    text: "Np",
  },
}
const PlanUp = () => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { plan, planName, dateStart, dateEnd, info } = event.target.elements;
    
    const planItem = {
      target: "N5",
      planName: "planName_test",
      info: "info_test",
      time: "dateEnd - dateStart_test",
    }
    //console.log(planItem);
    // await dispatch(planCreateNew(planItem))

    navigate("/card");
  }
  return (
    <CardLayout image={bgImage} cardWidth={550} cardHeight={550}>
    {/* <BasicLayout image={bgTest2}> */}
      <Card sx={{mt: 5, }}>
        <TTBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <TTTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Plan
          </TTTypography>
        </TTBox>
        <TTBox pt={4} pb={3} px={3}>
          <TTBox component="form" role="form" onSubmit={handleSubmit}>
            <Grid container  justifyContent={"center"} spacing={2} >
              <Grid item xs={10}>
                <TextField
                    select
                    label="Target"
                    name="plan"
                    value={age}
                    onChange={handleChange}
                    helperText="Please select your target"
                    fullWidth
                    sx={{justifyContent: 'center', alignItem: 'center'}}
                  >
                    {Object.values(Level).map((item)=>(
                      <MenuItem key={item.id} value={item.id}>{item.text}</MenuItem>
                    ))}
                  </TextField>
              </Grid>
              <Grid item xs={10} lg={2}>
                <TTInput 
                  type="text" 
                  name="nameplan" 
                  label="Plan name"
                  fullWidth
                  // disabled 
                  // error
                  // success
                />
              </Grid>              
              <Grid item xs={10} lg={2}>
                <TTInput type="list" label="info" name="info" fullWidth />
              </Grid>
              <Grid item display="flex" xs={10} lg={2}>
                <TTInput type="date" label="date start" name="dateStart" mr={2} fullWidth />
                <TTInput type="date" label="date end" name="dateEnd" fullWidth />
              </Grid>
              <Grid item>
              
              </Grid>
            </Grid>
            <TTBox mt={2} mb={1}>
              <TTButton 
                variant="gradient" 
                color="info" 
                fullWidth = {true}
                type="submit"
              >
                Create Plan
              </TTButton>
            </TTBox>
          </TTBox>
        </TTBox>
      </Card>
    </CardLayout>
  );
}
const defaultValues = {
  name: "",
  age: 0,
  gender: "",
  os: "",
  favoriteNumber: 0,
};
const Form = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSliderChange = (name) => (e, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formValues);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="center" direction="column">
        <Grid item>
          <TextField
            id="name-input"
            name="name"
            label="Name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="age-input"
            name="age"
            label="Age"
            type="number"
            value={formValues.age}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={formValues.gender}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel
                key="male"
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                key="female"
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                key="other"
                value="other"
                control={<Radio size="small" />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Select
              name="os"
              value={formValues.os}
              onChange={handleInputChange}
            >
              <MenuItem key="mac" value="mac">
                Mac
              </MenuItem>
              <MenuItem key="windows" value="windows">
                Windows
              </MenuItem>
              <MenuItem key="linux " value="linux">
                Linux
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <div style={{ width: "400px" }}>
            Favorite Number
            <Slider
              value={formValues.favoriteNumber}
              onChange={handleSliderChange("favoriteNumber")}
              defaultValue={1}
              step={1}
              min={1}
              max={3}
              marks={[
                {
                  value: 1,
                  label: "1",
                },
                {
                  value: 2,
                  label: "2",
                },
                {
                  value: 3,
                  label: "3",
                },
              ]}
              valueLabelDisplay="off"
            />
          </div>
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
};

const DataItemCard = {
  title:"",
  titleDetail: "",
  icon: "",
  time: "2022年07月07日",
  timer:30,
  exp: 30,
  start: 3,
  howto:"",
  example:[],
  meaning:""
}
const useViewModel = () => {

  return DataItemCard
}
const RefireCrud = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [test, setTest] = useState(false);
  const viewModel = useViewModel()
  useEffect(()=>{
    

    //console.log("fetchTodo");
    // const test = async () => await setDoc(doc(collection(db, "plan"), "plan1"), {
    //   id: 1,
    //   title: "learn",
    //   content: "hoc nua hoc mai"
    // });
    // test()
    // .then((res)=> //console.log("sucess"))
    // .catch((err)=> //console.log("error"))
    // //console.log("test useEffect")
    
  },[]);
  // useEffect(()=>{
  //   fetch("/api/users")
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setUsers(json.users)
  //     })
  // },[])
  return(
      
        <MaterialUIControllerProvider>
        <ThemeProvider theme={themeLight}>
          
        <div>
          <nav>
            <section>
              <h1>Redux Fundamentals Example</h1>
              <button onClick={()=>setTest(!test)}>set {!test}</button>
            </section>
          </nav>
          <main>
            <section>
              <h2>Todos</h2>
              {/* <CountDown/> */}
              <div>
                <HeaderTodo />
                <TodoList />
                <Footer />
              </div>
            </section>
          </main>
          {/* <ul>
            {users.map((user) => (
                  <li key={user.id}>{user.name}:{user.age}</li>
                ))}
          </ul> */}


        </div>
        <Routes>
            <Route path="/" element={<TTButton onClick={()=>{
              //console.log("button click");
              navigate("/plan")
            }}>new plan</TTButton>}/>
            <Route path="/plan" element={<PlanUp/>}/>
            <Route path="/card" element={<CardCom/>}/>
            <Route path="/cal" element={<ExpCalculator/>}/>
            <Route path="/kanji" element={<KanjiFeature/>}/>
          </Routes>
        </ThemeProvider>

        </MaterialUIControllerProvider>

  )
}
const EXP = {

}
function ExpCalculator(){
  const TimeScore = () => {
    //10p-1score
    return(
      <div>
        <label>time start</label>
        <label>time end</label>
        <label>time learn</label>
        <label>time test</label>
      </div>
    )
  }
  return(
    <div>
      <TimeScore />
    </div>
  )
}
function TestCrud() {
  const [input, setInput] = useState("")

  //GETTINGS LISTS
  const [lists, setLists] = useState([])
    useEffect(()=> {
      const q = query(collection(db, "shopping-lists"),  orderBy("timestamp", "desc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setLists(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        setInput("")
      });
        return () => unsubscribe()
  }, [])   
//ENDS HERE

//ADDING LISTS
  const handleClick = (e) => {
    e.preventDefault()

    if(input) {
      addDoc(collection(db, "shopping-lists"), {
        name: input,
        timestamp: new Date()
      }).catch(err => console.error(err))
    }//end of If statement
  
  }//end of handleClick

  //DELETE A DOC
  async function deleteDocument(id) {
      let request = await deleteDoc(doc(db, "shopping-lists", id));
      // //console.log(request)
  } 
  //UPDATE A DOC

  async function updateDocument(id) {
    const itemRef = doc(db, "shopping-lists", id);
    let name =  prompt("What would you like to update it to?")
    setDoc(itemRef, {
      name: name,
      timestamp: new Date()
    })
  
}
  
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center flex-col">
      <h2 className="text-2xl text-gray-800 font-bold mb-6">Shopping List</h2>

      <div className="w-2/3 border shadow-md p-7">
      
        <form className="flex items-center justify-between mb-7">
            <input 
              type="text" name="item" 
              className="w-2/3 h-10 p-3 outline-none border border-gray-500"
              value={input}
              onChange={e => setInput(e.target.value)}
              />
            <button className="bg-green-400 p-3 rounded text-white" onClick={handleClick}>Save</button>
        </form>
        <div className="w-full ">
            {lists.map(list => (
              <div className="border-b w-full h-16 flex items-center justify-between" key={list.id}>
                <p>{list.name}</p>
                <div>
                  <IconButton   onClick={() => updateDocument(list.id)}>
                    <EditIcon/>
                  </IconButton>
                  
                  <IconButton onClick={() => deleteDocument(list.id)}>
                  <DeleteIcon/>
                  </IconButton>
                
                </div>
           
          </div>
            ))}        
        </div>
      </div>
    </div>
  );
}
export default RefireCrud;

//------------------------------------------------ new plan-----------------

// function CardLayout({cardHeight, cardWidth, image, children }) {

//   // //console.log("Basic layout");
//   return (
//     <TTBox
//       width={cardWidth}
//       height={cardHeight}
//       sx={{ overflowX: "hidden" }}
//     >
//       <TTBox
//         position="absolute"
//         width={cardWidth}
//         minHeight={cardHeight}
//         zIndex={-1}
//         sx={{
//           backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
//             image &&
//             `${linearGradient(
//               rgba(gradients.info.main, 0.5),
//               rgba(gradients.info.state, 0.5)
//             )}, url(${image})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       />
//       <TTBox px={1} width="100%" height="100%" mx="auto">
//         <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
//           <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
//             {children}
//           </Grid>
//         </Grid>
//       </TTBox>
//     </TTBox>
//   );
// }
// export const PlanUp = () => {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event) => {
//     setAge(event.target.value);
//   };
//   //
//   const handleSubmit = (event) => {
//       event.preventDefault();
//       //firebase
//       const { email, password } = event.target.elements;

//   }
//   return (
//     <CardLayout image={bgImage} cardWidth={550} cardHeight={550}>
//     {/* <BasicLayout image={bgTest2}> */}
//       <Card sx={{mt: 5, }}>
//         <TTBox
//           variant="gradient"
//           bgColor="info"
//           borderRadius="lg"
//           coloredShadow="info"
//           mx={2}
//           mt={-3}
//           p={2}
//           mb={1}
//           textAlign="center"
//         >
//           <TTTypography variant="h4" fontWeight="medium" color="white" mt={1}>
//             Plan
//           </TTTypography>
//           {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
//             <Grid item xs={2}>
//               <TTTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <FacebookIcon color="inherit" fontSize="small"/>
//               </TTTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <TTTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <GitHubIcon color="inherit" fontSize="small"/>
//               </TTTypography>
//             </Grid>
//             <Grid item xs={2}>
//               <TTTypography component={MuiLink} href="#" variant="body1" color="white">
//                 <GoogleIcon color="inherit" fontSize="small"/>
//               </TTTypography>
//             </Grid>
//           </Grid> */}
//         </TTBox>
//         <TTBox pt={4} pb={3} px={3}>
//           <TTBox component="form" role="form" onSubmit={handleSubmit}>
//             <Grid container justifyContent={"center"} spacing={2}>
//               <Grid item xs={10}>
//                 <TextField
//                     id="outlined-select-currency"
//                     select
//                     label="Level"
//                     value={age}
//                     onChange={handleChange}
//                     helperText="Please select your currency"
//                     fullWidth
//                   >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                   {/* {currencies.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))} */}
//                   </TextField>
//                   {/* <TextField
//                     type="select"
//                     value={age}
//                     label="Age"
//                     name='Age'
//                     onChange={handleChange}
//                   >
//                     <MenuItem value={10}>Ten</MenuItem>
//                     <MenuItem value={20}>Twenty</MenuItem>
//                     <MenuItem value={30}>Thirty</MenuItem>
//                   </TextField> */}
//               </Grid>
//               <Grid item xs={10}>
//                 <TTInput 
//                   type="combobox" 
//                   name="name plan" 
//                   label=""
//                   fullWidth
//                   // disabled 
//                   // error
//                   // success
//                 />
//               </Grid>              
//               <Grid item>
//                 <TTInput type="list" label="" name="password" fullWidth />
//               </Grid>
//               <Grid item display="flex" flexDirection={"row"}>
//                 <TTInput type="date" label="date start" name="dateStart" mr={2} fullWidth />
//                 <TTInput type="date" label="date end" name="dateEnd" fullWidth />
//               </Grid>
//               <Grid item>
              
//               </Grid>
//             </Grid>
//             {/* <TTBox mb={2}>
//             <TTInput 
//                   type="combobox" 
//                   name="name plan" 
//                   label=""
//                   fullWidth
//                   // disabled 
//                   // error
//                   // success
//                 />
//             </TTBox>
//             <TTBox mb={2}>
//               <TTInput type="text" label="" name="password" fullWidth />
//             </TTBox>
//             <TTBox mb={2} display="flex" flexDirection="row">
//             <TTInput type="date" label="date start" name="dateStart" mr={2} fullWidth />
//             <TTInput type="date" label="date end" name="dateEnd" fullWidth />
//             </TTBox> */}
//             <TTBox mt={2} mb={1}>
//               <TTButton 
//                 variant="gradient" 
//                 color="info" 
//                 fullWidth = {true}
//                 type="submit"
//                 // onClick={handleSubmit}
//               >
//                 Create Plan
//               </TTButton>
//             </TTBox>
//           </TTBox>
//         </TTBox>
//       </Card>
//     </CardLayout>
//   );
// }
//------------------------------------------------ new plan-----------------
