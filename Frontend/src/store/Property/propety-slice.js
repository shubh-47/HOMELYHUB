// state manager
// all list of properties 
// need to count  
// to add search filters
// loading flag
//error
import { createSlice } from "@reduxjs/toolkit";
const propetySlice = createSlice({
  name : "property" ,
  initialState: {
    properties:[],
    totalProperties : 0 ,
    searchParams:{},
    error: null,
    loading : false 
  },
  reducers:{
    getRequest(state){
      state.loading = true  ;

    },
    getProperties(state , action){
      state.properties = action.payload.data ;
      state.totalProperties= action.payload.all_properties ;
      state.loading = false ; // request finished => hide the loader
    } ,
  updateSearchParams:(state , action)=>{
    state.searchParams = Object.keys(action.payload).length ===0 ? {}: 
   { ...state.searchParams,
    ...action.payload
   }

  },
  getErrors(state , action){
    state.error = action.payload
  }
  
  }

})

export const propertyAction = propetySlice.actions
export default propertyAction ;