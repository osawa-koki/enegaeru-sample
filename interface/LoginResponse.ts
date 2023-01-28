
import Userinfo from "./Userinfo";

type LoginResponse = {
  uid: string | null;
  userinfo: Userinfo;
};

export default LoginResponse;
