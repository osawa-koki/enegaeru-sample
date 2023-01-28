import Userinfo from "./Userinfo";

type SharedData = {
  api_key: string;
  username: string;
  password: string;
  uid: string | null;
  userinfo: Userinfo | null;
};

export default SharedData;
