import { AddedUser, EditedUser, User } from "../../models/userModel";
import { Post } from "../../models/postModel";
import ActionType from "./action-types";

interface GetUserRequestAction {
  type: ActionType.GET_USER_REQUEST;
}

interface GetUserSuccessAction {
  type: ActionType.GET_USER_SUCCESS;
  payload: User[]
}

interface GetUserFailAction {
  type: ActionType.GET_USER_FAIL;
  payload: string;
}

interface GetSearchUserRequestAction {
  type: ActionType.SEARCH_USER_REQUEST;
}

interface GetSearchUserSuccessAction {
  type: ActionType.SEARCH_USER_SUCCESS;
  payload: User[]
}

interface GetSearchUserFailAction {
  type: ActionType.SEARCH_USER_FAIL;
  payload: string;
}

interface AddUser {
  type: ActionType.ADD_USER;
  payload: AddedUser
}

interface EditUser {
  type: ActionType.EDIT_USER;
  payload: {
    id: number,
    values: EditedUser,
  }
}

interface DeleteUser {
  type: ActionType.DELETE_USER;
  payload: number
}

interface GetPostRequestAction {
  type: ActionType.GET_POST_REQUEST;
}

interface GetPostSuccessAction {
  type: ActionType.GET_POST_SUCCESS;
  payload: Post[];
}

interface GetPostFailAction {
  type: ActionType.GET_POST_FAIL;
  payload: string;
}

interface DeletePost {
  type: ActionType.DELETE_POST;
  payload: number;
}

interface GetSearchPostRequestAction {
  type: ActionType.SEARCH_POST_REQUEST;
}

interface GetSearchPostSuccessAction {
  type: ActionType.SEARCH_POST_SUCCESS;
  payload: Post[];
}

interface GetSearchPostFailAction {
  type: ActionType.SEARCH_POST_FAIL;
  payload: string;
}

interface GetPostPaginationRequestAction {
  type: ActionType.PAGINATION_POST_REQUEST;
}

interface GetPostPaginationSuccessAction {
  type: ActionType.PAGINATION_POST_SUCCESS;
  payload: Post[]
}

interface GetPostPaginationFailAction {
  type: ActionType.PAGINATION_POST_FAIL;
  payload: string;
}

export type Action = 
  | GetUserRequestAction 
  | GetUserSuccessAction 
  | GetUserFailAction
  | AddUser
  | EditUser
  | DeleteUser
  | GetPostRequestAction
  | GetPostSuccessAction
  | GetPostFailAction
  | DeletePost
  | GetSearchUserRequestAction
  | GetSearchUserSuccessAction
  | GetSearchUserFailAction
  | GetSearchPostRequestAction
  | GetSearchPostSuccessAction
  | GetSearchPostFailAction
  | GetPostPaginationRequestAction
  | GetPostPaginationSuccessAction
  | GetPostPaginationFailAction
