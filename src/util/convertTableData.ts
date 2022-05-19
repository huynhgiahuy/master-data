import { User } from "../models/userModel";
import { Post } from "../models/postModel";

export const convertUserTableData = (data: User[]) => {
  for (let i = 0; i < data.length; i++) {
    let key = data[i].id;

    data[i].key = key;
  }
  return data;
};

export const convertPostTableData = (dataPost: Post[]) => {
  for (let i = 0; i < dataPost.length; i++) {
    let key = dataPost[i].id;

    dataPost[i].key = key;
  }
  return dataPost;
}