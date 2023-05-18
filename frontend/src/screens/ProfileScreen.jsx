import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer.jsx';
import Loader from '../components/Loader.jsx';
import { setCredentials } from '../slices/authSlice.js';
import { useUpdateUserMutation } from '../slices/usersApiSlice.js';
import { $locale } from '../utils/index.js';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error($locale('TOAST_PASSWORD_MATCH_ERR_DESC'));
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        setPassword('');
        setConfirmPassword('');
        toast.success($locale('TOAST_PROFILE_UPDATE_DESC'));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>{$locale('UPDATE_PROFILE_DESC')}</h1>

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
          <Button type="submit" variant="primary" className="mt-3">
            {$locale('BUTTON_UPDATE_DESC')}
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
