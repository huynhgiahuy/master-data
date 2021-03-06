import { User } from "../../models/userModel";
import { Action } from "../actions";
import ActionType from "../actions/action-types";

interface UserState {
  loading: boolean;
  error: string | null;
  data: User[];
}

const initialState = {
  loading: false,
  error: null,
  data: [],
}

const userReducer = (state: UserState = initialState, action: Action): UserState => {
  switch (action.type) {
    case ActionType.GET_USER_REQUEST:
      return { loading: true, error: null, data: [] };
    case ActionType.GET_USER_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.GET_USER_FAIL:
      return { loading: false, error: action.payload, data: [] }

    case ActionType.DELETE_USER:
      return { loading: false, error: null, data: deleteUser(state.data, action.payload) }
    default:
      return state;
  }
}

export default userReducer;

// helper functions for Typescript type matching and mocking api types and index

const deleteUser = (data: User[], id: number): User[] =>
  data.filter((user) => user.id !== id);
