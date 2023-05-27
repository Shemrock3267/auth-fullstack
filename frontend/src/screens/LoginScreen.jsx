import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer.jsx';
import Loader from '../components/Loader.jsx';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { $locale } from '../utils/index.js';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo && navigate('/');
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>{$locale('SIGN_IN_DESC')}</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>{$locale('EMAIL_DESC')}</Form.Label>
          <Form.Control
            type="email"
            disabled={isLoading}
            placeholder={$locale('EMAIL_PLACEHOLDER')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>{$locale('PASSWORD_DESC')}</Form.Label>
          <Form.Control
            type="password"
            disabled={isLoading}
            placeholder={$locale('PASSWORD_PLACEHOLDER')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Button type="submit" variant="primary" className="mt-3">
              {$locale('SIGN_IN_DESC')}
            </Button>
            <Row className="py-3">
              <Col>
                {$locale('REGISTER_USER_DESC')} <Link to="/register">{$locale('BUTTON_REGISTER_DESC')}</Link>
              </Col>
            </Row>
          </>
        )}
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
