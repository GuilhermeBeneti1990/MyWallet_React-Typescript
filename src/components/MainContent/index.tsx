import React from 'react'
import { Container } from './styles'

const MainContent: React.FC = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default MainContent