import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer.jsx';
import Loader from '../components/Loader.jsx';
import { useRegisterMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { $locale } from '../utils/index.js';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userInfo && navigate('/');
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>{$locale('SIGN_UP_DESC')}</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>{$locale('NAME_DESC')}</Form.Label>
          <Form.Control
            type="text"
            disabled={isLoading}
            placeholder={$locale('NAME_PLACEHOLDER')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

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

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>{$locale('CONFIRM_PASSWORD_DESC')}</Form.Label>
          <Form.Control
            type="password"
            disabled={isLoading}
            placeholder={$locale('CONFIRM_PASSWORD_DESC')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Button type="submit" variant="primary" className="mt-3">
              {$locale('SIGN_UP_DESC')}
            </Button>

            <Row className="py-3">
              <Col>
                {$locale('ALREADY_SIGNED_UP_DESC')} <Link to="/login">{$locale('LOGIN_DESC')}</Link>
              </Col>
            </Row>
          </>
        )}
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
