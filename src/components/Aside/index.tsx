import React from 'react'
import { Container, Header, LogoImage, Title, MenuContainer, MenuItemLink } from './styles'
import logoImg from '../../assets/logo.svg'
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp } from 'react-icons/md'

const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogoImage src={logoImg} alt='Logo My Wallet' />
                <Title>My Wallet</Title>
            </Header>

            <MenuContainer>
                <MenuItemLink href='/dashboard'><MdDashboard />Dashboard</MenuItemLink>
                <MenuItemLink href='/list/money-in'><MdArrowDownward />Money In</MenuItemLink>
                <MenuItemLink href='/list/money-out'><MdArrowUpward />Money Out</MenuItemLink>
                <MenuItemLink href='#'><MdExitToApp />LogOff</MenuItemLink>
            </MenuContainer>
        </Container>
    )
}

export default Aside