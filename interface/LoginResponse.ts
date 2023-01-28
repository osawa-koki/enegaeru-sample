
type LoginResponse = {
  uid: string | null;
  userinfo: {
    username: string;
    group_id: number;
    group_name: string;
    corporation_id: number;
    ASPplan: string;
    APIplan: string;
    contract_from: string;
    setting: null;
  };
};

export default LoginResponse;
