import React from 'react'
import { Container } from './styles'

interface IWalletMessageBoxProps {
    title: string,
    description: string,
    footerText: string,
    icon: string
}

const WalletMessageBox: React.FC<IWalletMessageBoxProps> = ({ title, description, footerText, icon }) => {
    return (
        <Container>
            <header>
                <h1>
                    {title}
                    <img src={icon} alt={title} />
                </h1>
                <p>{description}</p>
            </header>
            <footer>
                <span>{footerText}</span>
            </footer>
        </Container>
    )
}

export default WalletMessageBox