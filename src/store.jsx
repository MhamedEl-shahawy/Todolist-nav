import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";
import { nanoid } from 'nanoid'

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    list:[]
  },
  reducers: {
    increment: (state,action) => {
      state.count += 1;
      state.list= [{id:nanoid(),text:action?.["payload"].value},...state.list];
    },
    editItem: (state,action) => {
      let listEditIndex = state["list"].findIndex( (element) => element.id == action.payload.id);
      let newList = state.list;
      newList[listEditIndex].text = action.payload["value"];
      state.list = [...newList];
    },
    removeItem:(state,action)=>{
      state.list = state["list"].filter( (element) => element.id !== action.payload.id);
      state.count -= 1;
    },
    clear: (state) => {
      state.count = 0;
      state.list = []
    },
  },
});

const { increment, clear ,editItem,removeItem} = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export function useStore() {
  const count = useSelector((state) => state.counter.count);
  const list = useSelector((state) => state.counter.list);

  const dispatch = useDispatch();
  return {
    count,
    list,
    removeItem:(val)=>dispatch(removeItem(val)),
    editItem:(val)=>dispatch(editItem(val)),
    increment: (val) => dispatch(increment(val)),
    clear: () => dispatch(clear()),
  };
}

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
