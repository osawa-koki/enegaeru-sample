import { useContext } from 'react';
import { DataContext } from '../components/DataContext';
import { Button, Alert, Form } from 'react-bootstrap';

import Layout from "../components/Layout";
import { SharedData } from '../interface/interface';
import setting from '../setting';

export default function Setting() {

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

  const Login = () => {
    fetch(`${setting.apiPath}/v4/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': sharedData.api_key,
      },
      body: JSON.stringify({
        username: sharedData.username,
        password: sharedData.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
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
        <h1>⚙️ Setting ⚙️</h1>
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
