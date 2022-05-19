import {
  UserOutlined,
  FileOutlined
  

} from "@ant-design/icons";

import { MenuItem } from "../types/route/MenuItem";

import {
  PATH_POST,
  PATH_USER,


} from "./routes.paths";

export const menuItems: MenuItem[] = [
  {
    name: "User",
    to: PATH_USER,
    icon: <UserOutlined />
  },
  {
    name: "Post",
    to: PATH_POST,
    icon: <FileOutlined />
  },
];
