import React from 'react'
import { Container, Header, LogoImage, Title, MenuContainer, MenuItemLink, MenuItemButton} from './styles'
import logoImg from '../../assets/logo.svg'
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp } from 'react-icons/md'

import { useAuth } from '../../hooks/auth'

const Aside: React.FC = () => {
    const { singOut } = useAuth()

    return (
        <Container>
            <Header>
                <LogoImage src={logoImg} alt='Logo My Wallet' />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href='/'><MdDashboard />Dashboard</MenuItemLink>
                <MenuItemLink href='/list/money-in'><MdArrowDownward />Money In</MenuItemLink>
                <MenuItemLink href='/list/money-out'><MdArrowUpward />Money Out</MenuItemLink>
                <MenuItemButton onClick={singOut}><MdExitToApp />LogOff</MenuItemButton>
            </MenuContainer>
        </Container>
    )
}

export default Aside