import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "..";
import { User } from "../../../models/userModel";
import { convertUserTableData } from "../../../util/convertTableData";
import ActionType from "../action-types";

const url = 'https://jsonplaceholder.typicode.com/users'

export const getUsers = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: ActionType.GET_USER_REQUEST
    });

    const { data } = await axios.get<User[]>(url);

    const convertedUserData = convertUserTableData(data);

    dispatch({
      type: ActionType.GET_USER_SUCCESS,
      payload: convertedUserData,
    })
  } catch (error: any) {
    dispatch({
      type: ActionType.GET_USER_FAIL,
      payload: error.message
    })
  }
}


export const DeleteUser = (id: number): Action => ({
  type: ActionType.DELETE_USER,
  payload: id
})

export const SearchUser = (query: string) => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: ActionType.SEARCH_USER_REQUEST
    });

    const { data } = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users?q=${query}`);

    const convertedUserData = convertUserTableData(data);

    dispatch({
      type: ActionType.GET_USER_SUCCESS,
      payload: convertedUserData,
    })
  } catch (error: any) {
    dispatch({
      type: ActionType.GET_USER_FAIL,
      payload: error.message
    })
  }
}