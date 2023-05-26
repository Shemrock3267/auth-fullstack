import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner
      animation="border"
      variant="dark"
      style={{
        width: '75px',
        height: '75px',
        margin: 'auto',
        display: 'block',
      }}
    ></Spinner>
  );
};

export default Loader;
