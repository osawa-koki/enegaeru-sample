import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../components/DataContext';
import { Button, Alert, Form, Table, Spinner } from 'react-bootstrap';

import Layout from "../components/Layout";
import { LoginResponse, Userinfo, SharedData } from '../interface/interface';
import setting from '../setting';

export default function Setting() {

  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [loadingLogout, setLoadingLogout] = useState<boolean>(false);
  const [trust_device, setTrust_device] = useState<boolean>(false);
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
    SaveInStorage();
  };

  const SetUsername = (e: any) => {
    const input = e.target as HTMLInputElement;
    const data = { ...sharedData };
    data.username = input.value;
    setSharedData(data);
    SaveInStorage();
  };

  const SetPassword = (e: any) => {
    const input = e.target as HTMLInputElement;
    const data = { ...sharedData };
    data.password = input.value;
    setSharedData(data);
    SaveInStorage();
  };

  const SaveInLocalStorage = () => {
    localStorage.setItem(setting.storage_key, JSON.stringify(sharedData));
  };

  const SaveInSessionStorage = () => {
    sessionStorage.setItem(setting.storage_key, JSON.stringify(sharedData));
  };

  const SaveInStorage = () => {
    const isTrusted = trust_device;
    if (isTrusted) {
      SaveInLocalStorage();
    } else {
      SaveInSessionStorage();
    }
  };

  const DeviceTrustStateChanged = (e: any) => {
    const isTrusted = (e.target as HTMLInputElement).checked;
    setTrust_device(isTrusted);
    if (isTrusted) {
      DeleteFromSessionStorage();
      SaveInLocalStorage();
    } else {
      DeleteFromLocalStorage();
      SaveInSessionStorage();
    }
  };

  const DeleteFromStorages = () => {
    if (confirm('Are you sure to delete all storages?') === false) return;
    DeleteFromSessionStorage();
    DeleteFromLocalStorage();
  };

  const DeleteFromSessionStorage = () => {
    sessionStorage.removeItem(setting.storage_key);
  };

  const DeleteFromLocalStorage = () => {
    localStorage.removeItem(setting.storage_key);
  };

  const Login = async () => {
    setError(null);
    setLoadingLogin(true);
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
        userinfo: data.userinfo,
      });
      setLoadingLogin(false);
    });
  };

  const Logout = async () => {
    if (confirm('Are you sure to logout?') === false) return;
    setError(null);
    setLoadingLogout(true);
    await new Promise((resolve) => setTimeout(resolve, setting.delay));
    fetch(`${setting.apiPath}/v4/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': sharedData.api_key,
        'Authorization': `${sharedData.uid}`,
      },
    })
    .then((res) => res.text())
    .then((_: any) => {
      setSharedData({
        api_key: sharedData.api_key,
        username: sharedData.username,
        password: sharedData.password,
        uid: null,
        userinfo: null,
      });
      setLoadingLogout(false);
    });
  };

  const SetDefault = () => {
    if (confirm('Are you sure to set default?') === false) return;
    setSharedData({
      api_key: setting.api_key,
      username: setting.username,
      password: setting.password,
      uid: null,
      userinfo: null,
    });
  };

  useEffect(() => {
    const localData = localStorage.getItem(setting.storage_key);
    if (localData !== null) {
      setSharedData(JSON.parse(localData));
      setTrust_device(true);
      return;
    }
    const sessionData = sessionStorage.getItem(setting.storage_key);
    if (sessionData !== null) {
      setSharedData(JSON.parse(sessionData));
      setTrust_device(false);
      return;
    }
  }, []);

  return (
    <Layout>
      <div id="Setting" className="mt-3">
        <h1>🐧 Login 🐧</h1>
        <hr />
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
        <Button variant='outline-primary' onClick={Login} className='mt-3 d-block mx-auto' disabled={loadingLogin}>
          {
            loadingLogin === false ?
            <>Login 🐙</>
            :
            <><Spinner variant="info" animation="grow" size='sm' />&nbsp;Logging in...</>
          }
        </Button>
        <Button variant='outline-danger' size='sm' onClick={SetDefault} className='mt-3 d-block'>reset 🐙</Button>
        <hr />
        <h2>🍓 User Info</h2>
        {
          sharedData.userinfo !== null ?
          <>
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
                  <td>{sharedData.userinfo.username}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>group name</td>
                  <td>{sharedData.userinfo.group_name}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>corporation id</td>
                  <td>{sharedData.userinfo.corporation_id}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>ASP plan</td>
                  <td>{sharedData.userinfo.ASPplan}</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>API plan</td>
                  <td>{sharedData.userinfo.APIplan}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant='outline-warning' size='sm' onClick={Logout} className='mt-3 d-block' disabled={loadingLogout}>
              {
                loadingLogout === false ?
                <>Logout 👋</>
                :
                <><Spinner variant="warning" animation="grow" size='sm' />&nbsp;Logging out...</>
              }
            </Button>
          </>
          :
          <Alert variant='warning' className='my-3'>ログインしていません。</Alert>
        }
        <hr />
        <h2>⚙️ Setting</h2>
        <div className='mt-3'>
          <Form.Check type='checkbox' id={`trust-device`}>
            <Form.Check.Input type='checkbox' isValid checked={trust_device} onChange={DeviceTrustStateChanged} />
            <Form.Check.Label>{`Trust this device.`}</Form.Check.Label>
          </Form.Check>
          <Button variant='outline-danger' size='sm' onClick={DeleteFromStorages} className='mt-3 d-block'>delete all caches 🌲</Button>
        </div>
      </div>
    </Layout>
  );
};
