import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Order} from '../components/types/Order.types'


const initialState: Order = {
  _id : "",
  status : "",
  items_ordered : [],
  quantity_ordered: [],
  total_price: 0
};  

const orderSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addItem(state, action) {
      let found = false
      let index = 0
      for(let i = 0;i < state.items_ordered.length;i++)
      {
        if(state.items_ordered[i] == action.payload.name)
        {
          found = true;
          index = i;
          break;
        }
      }
      if(found)
      {
        let temp = [...state.quantity_ordered]
        temp[index] = Number(temp[index]) + 1
        state.quantity_ordered = [...temp]
        console.log(state.quantity_ordered)

      }
      if(!found)
      {
        state.items_ordered = [action.payload.name,...state.items_ordered]
        console.log(state.items_ordered)
        state.quantity_ordered = [1,...state.quantity_ordered]
        console.log(state.quantity_ordered)
      }

      state.total_price += (action.payload.price);
      state.total_price = Number(state.total_price.toFixed(2))
    },
    removeItem(state,action) {
      // state
      let found = false
      let index = 0
      for(let i = 0;i < state.items_ordered.length;i++)
      {
        if(state.items_ordered[i] == action.payload.name)
        {
          found = true;
          index = i;
          break;
        }
      }
      if(found)
      {
        let temp = [...state.quantity_ordered]
        temp[index] = Number(temp[index]) - 1
        state.quantity_ordered = [...temp]
        console.log(state.quantity_ordered)
        if(temp[index] == 0)
        {
          temp = [...temp.slice(0,index),...temp.slice(index+1,temp.length + 1)]
          state.quantity_ordered = [...temp]
          state.items_ordered = [...state.items_ordered.slice(0,index),...state.items_ordered.slice(index+1,state.items_ordered.length + 1)]
        }

      }

      let new_price : any = Number(state.total_price) - action.payload.price
      if(new_price < 0)
      {
        new_price = 0
      }
      state.total_price = new_price
      state.total_price = Number(state.total_price.toFixed(2))
    },
    resetState(state)
    {
      state.items_ordered = []
      state.quantity_ordered = []
      state.total_price= 0
    }
  },
  
});

export const { addItem, removeItem, resetState} = orderSlice.actions;
export default orderSlice.reducer;