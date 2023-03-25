import React from 'react'
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const RegisterForm = () => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Control type='email' placeholder='email' name='email' required />
        </Form.Group>
        <Form.Group>
          <Form.Control className='mt-2' type='password' placeholder='Password' name='passrword' required />
        </Form.Group>
        <Form.Group>
          <Form.Control className='mt-2' type='password' placeholder='Comfirm Password' name='comfirmPassrword' required />
        </Form.Group>
        <Button variant='success' className='mt-2' type='submit'>Register</Button>
      </Form>
      <p> Already have account?
        <Link to='/login'>
          <Button variant='info' size='sm' className='ml-2'>Login</Button>
        </Link>
      </p>
    </>
  )
}

export default RegisterForm