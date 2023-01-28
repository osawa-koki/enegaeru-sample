import { useContext } from 'react';
import { DataContext } from '../components/DataContext';
import Layout from "../components/Layout";

export default function Setting() {

  const sharedData = useContext(DataContext);

  return (
    <Layout>
      <div id="Setting" className="mt-3">
        <h1>⚙️ Setting ⚙️</h1>
        {sharedData.api_key}
      </div>
    </Layout>
  );
};
