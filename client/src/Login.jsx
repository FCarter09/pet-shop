
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from './utils/mutations';
import { Link } from 'react-router-dom';
import Auth from './utils/auth';
import './index.css'

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // clear form values
    setFormState({
      email: '',
      password: '',
    });

    try {
      const { data } = await login({
        variables: { ...formState }
      });
  
      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Login/<Link to="/signup">Create Account</Link></h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <div className='email-login'>
              <input
                className='login-email d-block w-100'
                placeholder= ' Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              </div>
              <div className='passowrd-login'>
              <input
                className='login-password d-block w-100'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              </div>
              
              <button className='button d-block w-100' type='submit'>
               Submit
              </button>
           
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;









