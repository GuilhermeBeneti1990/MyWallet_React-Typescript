import React, { useState, useMemo } from 'react'
import { Container, Content } from './styles'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import WalletMessageBox from '../../components/WalletMessageBox'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'

import expenses from '../../repositories/expenses'
import gains from '../../repositories/gains'
import monthsList from '../../utils/months'

const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())

    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear()

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
           }
        })

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        })
    },[])

    const months = useMemo(() => {
        return monthsList.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    }, [])

    const handleMonthSelected = (month: string) => {
        try {
            const parsedMonth = Number(month)
            setMonthSelected(parsedMonth)
        } catch(error) {
            throw new Error('Invalid month value!')
        }
    }

    const handleYearSelected = (year: string) => {
        try {
            const parsedYear = Number(year)
            setYearSelected(parsedYear)
        } catch(error) {
            throw new Error('Invalid year value!')
        }
    }

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
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
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