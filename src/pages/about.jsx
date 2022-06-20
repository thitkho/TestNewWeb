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

import * as _ from 'lodash'
import React, { useEffect, forwardRef } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'
import MaterialTable from 'material-table'
import { resetServerContext } from 'react-beautiful-dnd' // material-table の内部のdraggableで使用している模様

import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import {
  useViewModel,
  readCounts,
  addMemoItem,
  updateMemoItem,
  deleteMemoItem,
} from '~/store/modules/memoListModule'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import Link from '~/components/atoms/mui/Link'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { MemoListItem } from '~/store/modules/memoListModule'
import { db } from '~/lib/firebase/initFirebase'
import {
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit'
import rootReducer from './rootState'
import logger from 'redux-logger'

export const setupStore = (preloadedState) => {
  const middlewares = [logger, thunk]

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
  }

  const store = configureStore({
    reducer: rootReducer,
    middleware: middlewares,
    devTools: true,
    preloadedState,
  })

  // if (module.hot) {
  //   module.hot.accept('./rootState', () => {
  //     console.log('Replacing reducer')
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     store.replaceReducer(require('./rootState').default)
  //   })
  // }
  return store
}
const memoList = (firestore: firebase.firestore.Firestore) =>
  firestore.collection('others').doc('memolist')

const readMemoListCollection = async (
  cn: string,
  limit = 10,
) => {
  let query = memoList(db).collection(cn).orderBy('point', 'desc')
  query = query.limit(limit)
  const querySnapshot = await query.get()
  const ret: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    ret.push({
      ...data,
      id: doc.id,
    })
  })
  return ret
}

const readMemoList = async () => {
  const ref = await memoList(db).get()

  return ref.data()
}
const createMemo = async (
  cn: string,
  memo: MemoListItem,
  uid: string,
) => {
  const memos = memoList(db).collection(cn)
  const { id } = await memos.doc()
  await Promise.all([
    memos.doc(id).set({
      ...memo,
      uid,
    }),
  ])
  return id
}

const updateMemo = async (cn: string, memo: MemoListItem) =>
  await memoList(db).collection(cn).doc(memo.id).set(memo)
const deleteMemo = async (cn: string, memo: MemoListItem) =>
  await memoList(db).collection(cn).doc(memo.id).delete()

  import { createSlice, PayloadAction } from '@reduxjs/toolkit'
  import { useSelector } from 'react-redux'
  import * as store from '~/firestore/memoList'
  import { AppThunk } from '~/store/rootState'
import thunk from 'redux-thunk'
  
  interface MemoListItem {
    name: string
    tags: string[]
    memo: string
    point: number
    uid: string
    id: string
    nickname?: string
    url?: string
  }
  type CollectionName = 'systems'
  interface MemoListState {
    current: CollectionName
    counts: { [k in CollectionName]: number }
    list: { [k in CollectionName]: MemoListItem[] }
  }
  const init: MemoListState = {
    current: 'systems',
    counts: {
      systems: 0,
    },
    list: {
      systems: [],
    },
  }
  
  // actions と reducers の定義
  const memoListModule = createSlice({
    name: 'memoList',
    initialState: init,
    reducers: {
      setList: (
        state,
        action: PayloadAction<{ current: CollectionName; list: MemoListItem[] }>,
      ) => {
        state.current = action.payload.current
        state.list[action.payload.current] = action.payload.list
      },
      setCounts: (
        state,
        action: PayloadAction<{ [k in CollectionName]: number }>,
      ) => {
        state.counts = action.payload
      },
      addItem: (
        state,
        action: PayloadAction<{ current: CollectionName; item: MemoListItem }>,
      ) => {
        state.list[action.payload.current].push(action.payload.item)
      },
      setItem: (
        state,
        {
          payload: { current, item },
        }: PayloadAction<{ current: CollectionName; item: MemoListItem }>,
      ) => {
        state.list[current][
          state.list[current].findIndex((i) => i.id === item.id)
        ] = item
      },
      deleteItem: (
        state,
        {
          payload: { current, item },
        }: PayloadAction<{ current: CollectionName; item: MemoListItem }>,
      ) => {
        state.list[current] = state.list[current].filter((i) => i.id !== item.id)
      },
    },
  })
  
  const options = {
    sorting: false,
    paging: false,
    rowStyle: {
      whiteSpace: 'nowrap',
    },
    headerStyle: {
      whiteSpace: 'nowrap',
    },
  } as const
  
  const separator = ' '
  
  const useViewModel = () => {
    return useSelector(
      (state: { memoList: ReturnType<typeof memoListModule.reducer> }) => ({
        data: state.memoList.list[state.memoList.current].map((item) => ({
          ...item,
          // 配列でTableRowに渡そうとするとエラー
          tags: item.tags.join(separator),
        })),
        columns: [
          { title: '略称', field: 'nickname' },
          { title: '名前', field: 'name' },
          { title: '備考', field: 'memo' },
          { title: 'タグ', field: 'tags' },
          {
            title: '★',
            field: 'point',
            type: 'numeric',
            editable: 'never',
          } as const, // typeを指定するときはconst
        ],
        options,
      }),
    )
  }
  

  
  const {
    setList,
    setCounts,
    addItem,
    setItem,
    deleteItem,
  } = memoListModule.actions
  
  const readMemoList = (limit = 10) => async (
    dispatch,
  ) => {
    const current = 'systems'
    const list = await store.readMemoListCollection(current)
    
    dispatch(setList({ current, list }))
  }
  
  const readCounts = () => async (dispatch) => {
    const data = await store.readMemoList();
    dispatch(setCounts(data));
  }
  
  // type TableRow = Omit<Partial<MemoListItem>, 'tags'> & { tags?: string }

  // const createMemoListItem = (data: TableRow): MemoListItem => ({
const createMemoListItem = (data) => ({
    id: data.id || '',
    uid: data.uid || '',
    name: data.name || 'ななし',
    tags: (data.tags && data.tags.split(separator)) || [],
    memo: data.memo || '',
    point: data.point || 0,
    nickname: data.nickname || '',
    url: data.url || '',
  })
  
  const addMemoItem = (data, uid) => async (
    dispatch,
  ) => {
    console.log('data', data)
    const current = 'systems'
    const item = createMemoListItem(data)
    const id = await store.createMemo(current, item, uid)
    dispatch(addItem({ current, item: { ...item, uid, id } }))
  }
  
  const updateMemoItem = (data) => async (
    dispatch,
  ) => {
    const current = 'systems'
    const item = createMemoListItem(data)
    await store.updateMemo(current, item)
    dispatch(setItem({ current, item }))
  }
  
  const deleteMemoItem = (data) => async (
    dispatch,
  ) => {
    const current = 'systems'
    const item = createMemoListItem(data)
    await store.deleteMemo(current, item)
    dispatch(deleteItem({ current, item }))
  }

  
  const TableIcons = ({
      key=[]
    }) => ({
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => (<ChevronRight {...props} ref={ref} />)),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => (<ChevronLeft {...props} ref={ref} />)),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    })
  /* eslint-disable react/display-name */



// const Page: NextPage = () => {
const Page = () => {

  const dispatch = useDispatch()
  const authUser = useAuth()
  const vm = useViewModel()

  // next.jsのSSR時にリセットしないとエラー
  resetServerContext()

  useEffect(() => {
    dispatch(createAuthClientSide())
    dispatch(readMemoList())
    dispatch(readCounts())
  }, [])

  return (
    <Container>
      <Head>
        <title>TRPG関連メモ</title>
      </Head>
      <MaterialTable
        title={'システム'}
        icons={TableIcons}
        options={vm.options}
        columns={vm.columns}
        data={vm.data}
        onQueryChange={(query) => {
          dispatch(readMemoList(query.pageSize))
        }}
        editable={{
          onRowAdd: async (newData) => {
            dispatch(addMemoItem(newData, authUser.uid))
          },
          onRowUpdate: async (newData, oldData) => {
            dispatch(updateMemoItem(newData))
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve()
              }, 300)
            })
          },
          onRowDelete: (oldData) => {
            dispatch(deleteMemoItem(oldData))
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve()
              }, 300)
            })
          },
        }}
      />
      <Link href="/">戻る</Link>
    </Container>
  )
}
export default Page
// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // fake data generator
// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

// // a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

// const getListStyle = isDraggingOver => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250
// });

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: getItems(10)
//     };
//     this.onDragEnd = this.onDragEnd.bind(this);
//   }

//   onDragEnd(result) {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }

//     const items = reorder(
//       this.state.items,
//       result.source.index,
//       result.destination.index
//     );

//     this.setState({
//       items
//     });
//   }

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   }
// }

// // Put the thing into the DOM!
// ReactDOM.render(<App />, document.getElementById("root"));
