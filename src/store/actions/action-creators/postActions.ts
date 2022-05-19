import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "..";
import { Post } from "../../../models/postModel";
import { convertPostTableData } from "../../../util/convertTableData";
import ActionType from "../action-types";

const url = "https://jsonplaceholder.typicode.com/posts"

export const getPosts = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch({
      type: ActionType.GET_POST_REQUEST
    });

    const { data } = await axios.get<Post[]>(url);

    const convertedPostData = convertPostTableData(data);

    dispatch({
      type: ActionType.GET_POST_SUCCESS,
      payload: convertedPostData,
    })
  } catch (error: any) {
    dispatch({
      type: ActionType.GET_POST_FAIL,
      payload: error.message
    })
  }
}

export const DeletePost = (id: number): Action => ({
  type: ActionType.DELETE_POST,
  payload: id
})
