import { useContext } from 'react';
import { DataContext } from '../components/DataContext';
import { Button, Alert, Form } from 'react-bootstrap';

import Layout from "../components/Layout";

export default function Setting() {

  const { sharedData, setSharedData } = useContext(DataContext);

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

  return (
    <Layout>
      <div id="Setting" className="mt-3">
        <h1>⚙️ Setting ⚙️</h1>
        <Form.Group className="mt-3">
          <Form.Label>Enter API key</Form.Label>
          <Form.Control type="text" placeholder="Enter API_KEY" value={sharedData.api_key} onInput={SetApiKey} />
          <Form.Text>
            We'll never share your api_key with anyone else.
          </Form.Text>
        </Form.Group>
      </div>
    </Layout>
  );
};
