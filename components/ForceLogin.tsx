import { Alert } from 'react-bootstrap';
import Link from 'next/link';
import Setting from '../setting';

export default function ForceLogin() {
  return (
    <>
      <Alert variant='warning'>
        <Alert.Heading>🔐 Login Required</Alert.Heading>
        <p>
          You need to login to access this page.<br />Please go to{' '}
          <Link href={`${Setting.basePath}/login/`}>
            Login page
          </Link>.
        </p>
      </Alert>
    </>
  );
};
