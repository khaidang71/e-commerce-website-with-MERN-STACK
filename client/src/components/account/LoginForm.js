import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
// import {  useContext } from 'react'
// import { AccContext } from '../../contexts/AccContext';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';


const LoginForm = () => {
  // // Context
  // const { loginUser } = useContext(AccContext)
  // // Router
  // const navigate = useNavigate()
  // // Local state
  // const [loginForm, setLoginForm] = useState({
  //   email: '',
  //   password: ''
  // })

  // const { email, password } = loginForm

  // const onChangeLoginForm = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

  // const login = async event => {
  //   event.preventDefault()
  //   try {
  //     const loginData = await loginUser(loginForm)
  //     console.log(loginData)
  //     if (loginData.success) {
  //       navigate('/dashboard')
  //     } else {

  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  return (
      <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
          //   onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
          //   onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}

export default LoginForm