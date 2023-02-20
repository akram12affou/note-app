import { v1 as uuidv1 } from 'uuid';

const initialState = {
    notes : []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case 'addTodo': 
    return { ...state, notes :[...state.notes,{
        notename :payload,
        id:uuidv1()
    }] }
    case 'deleteTodo':
        return { ...state,notes : state.notes.filter(e => e.id !== payload) }
  default:
    return state
  }
}
