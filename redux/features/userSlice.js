const { createSlice } = require("@reduxjs/toolkit");
const { userList } = require("../../pages/Data");
//-----------------------------Slice for card-----------------
const userSlice=createSlice({
    name:'users',
    initialState:userList,
    reducers:{
        addUser:(state,action)=>{
            state.push(action.payload)
        },
        updateUser:(state,action)=>{
            const {id, name, paragraph}=action.payload;
            const uu=state.find(user=>user.id==id);
            if(uu){
                uu.name=name;
                uu.paragraph=paragraph;
            }
        },
        deleteUser:(state, action)=>{
            const {id}=action.payload;
            const uu=state.find(user=>user.id==id);
            if(uu){
                return state.filter(f=>f.id !== id);
            }
        }
    }
})
export const{addUser, updateUser, deleteUser}=userSlice.actions;
export default userSlice.reducer;