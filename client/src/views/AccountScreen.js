import React from 'react'

import LoginForm from '../components/account/LoginForm'
import RegisterForm from '../components/account/RegisterForm'

import { AccContext } from '../contexts/AccContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const AccountScreen = ({ accRoute }) => {
    const { accState: { accLoading, isAccenticated } } = useContext(AccContext)
    let body

    if (accLoading)
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    else if (isAccenticated) return <Navigate to='/dashboard' />
    else
        body = (
            <>
                {
                    accRoute === 'login' && <LoginForm />
                }
                {
                    accRoute === 'register' && <RegisterForm />
                }
            </>
        )

    return (
            <div className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1>
                            ACCOUNT
                        </h1>
                        {body}
                    </div>
                </div>

            </div>
    )
}


export default AccountScreen
