import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from './utils/mutations';
import { Link } from 'react-router-dom';
import Auth from './utils/auth';
import './index.css'

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });

  const [addUser, { error }] = useMutation(ADD_USER);

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

  // use try/catch instead of promises to handle errors
  try {
    // execute addUser mutation and pass in variable data from form
    const { data } = await addUser({
      variables: { ...formState }
    });
    console.log(data);
    Auth.login(data.addUser.token);
  } catch (e) {
    console.error(e);
      }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Create Account/<Link to="/login">Login</Link></h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <div className='signup-username'>
                <input
                  className='form-input d-block w-100'
                  placeholder='Your username'
                  name='username'
                  type='username'
                  id='username'
                  value={formState.username}
                  onChange={handleChange}
                />
              </div>
              <div className='signup-email'>
                <input
                  className='form-input d-block w-100'
                  placeholder='Your email'
                  name='email'
                  type='email'
                  id='email'
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className ='signup-email'>
                <input
                  className='form-input d-block w-100'
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
              {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;