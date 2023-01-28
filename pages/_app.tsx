import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/styles.scss';
import '../styles/menu.scss';

import '../styles/index.scss';

import Head from 'next/head';

import setting from '../setting';

import React, { useState } from 'react';
import { DataContext } from '../components/DataContext';

type SharedData = {
  api_key: string;
  username: string;
  password: string;
};

export default function MyApp({ Component, pageProps }) {

  const initialValue: SharedData = {
    api_key: setting.api_key,
    username: setting.username,
    password: setting.password,
  };
  const [sharedData, setSharedData] = useState(initialValue);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{setting.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href={`${setting.basePath}/favicon.ico`} />
      </Head>
      <DataContext.Provider value={{ sharedData, setSharedData }}>
        <Component {...pageProps} />
      </DataContext.Provider>
    </>
  );
};
