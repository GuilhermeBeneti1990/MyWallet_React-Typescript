import React, { useState } from 'react'
import { Container, Logo, Form, FormTitle } from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'

import { useAuth } from '../../hooks/auth'

const Signin: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { signIn } = useAuth()

    return (
        <Container>
            <Logo>
                <img src={logo} alt="My_WalletAPP"/>
                <h2>My Wallet</h2>
            </Logo>
            <Form onSubmit={() => signIn(email, password)}>
                <FormTitle>
                    Login
                </FormTitle>
                <Input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} required/>
                <Input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} required/>
                <Button type='submit'>Enter</Button>
            </Form>
        </Container>
    )
}

export default Signin