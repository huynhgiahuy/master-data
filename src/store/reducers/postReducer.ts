import { Post } from "../../models/postModel";
import { Action } from "../actions";
import ActionType from "../actions/action-types";

interface PostState {
    loading: boolean;
    error: string | null;
    dataPost: Post[];
}

const initialState = {
    loading: false,
    error: null,
    dataPost: [],
}

const postReducer = (state: PostState = initialState, action: Action): PostState => {
    switch (action.type) {
        case ActionType.GET_POST_REQUEST:
            return { loading: true, error: null, dataPost: [] };
        case ActionType.GET_POST_SUCCESS:
            return { loading: false, error: null, dataPost: action.payload };
        case ActionType.GET_POST_FAIL:
            return { loading: false, error: action.payload, dataPost: [] }
        case ActionType.DELETE_POST:
            return { loading: false, error: null, dataPost: deletePost(state.dataPost, action.payload) }
        default:
            return state;
    }
}

export default postReducer;

// helper functions for Typescript type matching and mocking api types and index

const deletePost = (dataPost: Post[], id: number): Post[] =>
    dataPost.filter((post) => post.id !== id);