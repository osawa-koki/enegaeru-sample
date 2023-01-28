import { useContext, useState } from 'react';
import { DataContext } from '../components/DataContext';
import { Button, Alert, Form, Table } from 'react-bootstrap';

import Layout from "../components/Layout";
import { LoginResponse, Userinfo, SharedData } from '../interface/interface';
import setting from '../setting';

export default function Setting() {

  const [userinfo, setUserinfo] = useState<Userinfo>(null);
  const [error, setError] = useState<string | null>(null);

  const { sharedData, setSharedData } = useContext<
    {
      sharedData: SharedData;
      setSharedData: React.Dispatch<React.SetStateAction<SharedData>>;
    }
  >(DataContext);

  const SetApiKey = (e: any) => {
    const input = e.target as HTMLInputElement;
    const data = { ...sharedData };
    data.api_key = input.value;
    setSharedData(data);
  };

  const SetUsername = (e: any) => {
    const input = e.target as HTMLInputElement;
    const data = { ...sharedData };
    data.username = input.value;
    setSharedData(data);
  };

  const SetPassword = (e: any) => {
    const input = e.target as HTMLInputElement;
    const data = { ...sharedData };
    data.password = input.value;
    setSharedData(data);
  };

  const Login = async () => {
    setError(null);
    await new Promise((resolve) => setTimeout(resolve, setting.delay));
    fetch(`${setting.apiPath}/v4/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': sharedData.api_key,
      },
      body: JSON.stringify({
        id: sharedData.username,
        password: sharedData.password,
        forcelogin: true,
      }),
    })
    .then((res) => res.json())
    .then((data: LoginResponse) => {
      setSharedData({
        api_key: sharedData.api_key,
        username: sharedData.username,
        password: sharedData.password,
        uid: data.uid,
      });
      setUserinfo(data.userinfo);
    });
  };

  const SetDefault = () => {
    if (confirm('Are you sure to set default?') === false) return;
    setSharedData({
      api_key: setting.api_key,
      username: setting.username,
      password: setting.password,
      uid: sharedData.uid,
    });
  };

  return (
    <Layout>
      <div id="Setting" className="mt-3">
        <h1>🐧 Login 🐧</h1>
        <h2>🌸 API Info</h2>
        <Form.Group className="mt-3">
          <Form.Label>Enter API key</Form.Label>
          <Form.Control type="text" placeholder="Enter API_KEY" value={sharedData.api_key} onInput={SetApiKey} />
        </Form.Group>
        <hr />
        <Form.Group className="mt-3">
          <Form.Label>Enter Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" value={sharedData.username} onInput={SetUsername} />
        </Form.Group>
        <hr />
        <Form.Group className="mt-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" value={sharedData.password} onInput={SetPassword} />
        </Form.Group>
        <Button variant='outline-primary' onClick={Login} className='mt-3 d-block mx-auto'>Login 🐙</Button>
        <h2>🍓 User Info</h2>
        {
          userinfo !== null ?
          <Table className='my-5'>
            <thead>
              <tr>
                <th>#</th>
                <th>キー</th>
                <th>バリュー</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>username</td>
                <td>{userinfo.username}</td>
              </tr>
              <tr>
                <td>2</td>
                <td>group name</td>
                <td>{userinfo.group_name}</td>
              </tr>
              <tr>
                <td>3</td>
                <td>corporation id</td>
                <td>{userinfo.corporation_id}</td>
              </tr>
              <tr>
                <td>4</td>
                <td>ASP plan</td>
                <td>{userinfo.ASPplan}</td>
              </tr>
              <tr>
                <td>5</td>
                <td>API plan</td>
                <td>{userinfo.APIplan}</td>
              </tr>
            </tbody>
          </Table>
          :
          <Alert variant='warning' className='my-3'>ログインしていません。</Alert>
        }
        <hr />
        <div className='mt-3'>
        <Form.Check type='checkbox' id={`trust-device`}>
          <Form.Check.Input type='checkbox' isValid />
          <Form.Check.Label>{`Trust this device.`}</Form.Check.Label>
        </Form.Check>
        </div>
      </div>
    </Layout>
  );
};
