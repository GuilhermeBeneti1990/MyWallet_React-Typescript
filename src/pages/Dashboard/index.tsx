import React, { useMemo } from 'react'
import { Container, Content } from './styles'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import WalletMessageBox from '../../components/WalletMessageBox'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'

const Dashboard: React.FC = () => {

    const options = [
        {
            value: 'Guilherme', label: 'Guilherme',
        },
        {
            value: 'Ana', label: 'Ana'
        },
        {
            value: 'Bruno', label: 'Bruno'
        }
    ]

    const totalExpenses = useMemo(() => {
        let total: number = 0

        expenses.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch(error) {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total
    }, [monthSelected, yearSelected])

    const totalGains = useMemo(() => {
        let total: number = 0

        gains.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1

            if(month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch(error) {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        })

        return total
    }, [monthSelected, yearSelected])

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses
    }, [totalGains, totalExpenses])

    const message = useMemo(() => {
        if(totalBalance < 0) {
            return {
                title: 'Que triste!',
                description: 'Neste mês, você gastou mais do que deveria!',
                footerText: 'Verifique seus gastos e tente cortar coisas desnecessárias.',
                icon: sadImg
            }
        } else if(totalBalance === 0) {
            
        }
    }, [totalBalance])

    return (
        <Container>
            <ContentHeader title='Dashboard' lineColor='#F7931B'>
                <SelectInput options={options} onChange={() => {}}/>
            </ContentHeader>
            <Content>
                <WalletBox title='Balance' amount={totalBalance} footerLabel='Atualizado com base na entrada de dados' icon='dolar' color='#4E41F0' />
                <WalletBox title='Money-IN' amount={totalGains} footerLabel='Atualizado com base na entrada de dados' icon='arrowUp' color='#F7931B' />
                <WalletBox title='Money-OUT' amount={totalExpenses} footerLabel='Atualizado com base na entrada de dados' icon='arrowDown' color='#E44C4E' />
                <WalletMessageBox title='Muito bem!' description='Sua carteira está positiva!' footerText='Continue assim! Considere fazer alguns investimentos.' icon={happyImg} />
            </Content>
        </Container>
    )
}

export default Dashboard