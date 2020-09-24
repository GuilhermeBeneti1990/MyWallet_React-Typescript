import React, { useState, useMemo, useCallback } from 'react'
import { Container, Content } from './styles'

import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import WalletBox from '../../components/WalletBox'
import WalletMessageBox from '../../components/WalletMessageBox'
import PChart from '../../components/PChart'
import HistoricBox from '../../components/HistoricBox'
import BChart from '../../components/BChart'

import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import grinningImg from '../../assets/grinning.svg'
import opsImg from '../../assets/ops.svg'

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
        } else if(totalBalance === 0 && totalExpenses === 0) {
            return {
                title: 'Ops!',
                description: 'Neste mês, não há registros de entradas ou saídas!',
                footerText: 'Parece que você não fez nenhum registro no ano ou mês selecionado.',
                icon: opsImg
            }
        } else if(totalBalance === 0) {
                return {
                    title: 'Ufa!',
                    description: 'Neste mês, você gastou exatamente o que ganhou!',
                    footerText: 'Tome cuidado, economizar um pouco é sempre bom!.',
                    icon: grinningImg
                }
        } else {
            return {
                title: 'Muito bem!',
                description: 'Sua carteira está positiva!',
                footerText: 'Continue assim, considere realizar alguns investimentos!.',
                icon: happyImg
            }
        }
    }, [totalBalance, totalGains, totalExpenses])

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses

        const gainsPercent = Number(((totalGains / total) * 100).toFixed(1))
        const expensesPercent = Number(((totalExpenses / total) * 100).toFixed(1))

        const data = [
            {
                name: 'IN',
                value: totalGains,
                percent: gainsPercent ? gainsPercent : 0,
                color: '#E44C4E'
            },
            {
                name: 'OUT',
                value: totalExpenses,
                percent: expensesPercent ? expensesPercent : 0,
                color: '#F7931B'
            }
        ]

        return data

    }, [totalGains, totalExpenses])

    const historicData = useMemo(() => {
        return monthsList.map((_, month) => {

            let amountInput = 0
            gains.forEach(gain => {
                const date = new Date(gain.date)
                const gainMonth = date.getMonth()
                const gainYear = date.getFullYear()

                if(gainMonth === month && gainYear === yearSelected) {
                    try {
                        amountInput += Number(gain.amount)
                    } catch(error) {
                        throw new Error('Amount Input is invalid, amount input must be a valid number!')
                    }
                }
            })

            let amountOutput = 0
            expenses.forEach(expense => {
                const date = new Date(expense.date)
                const expenseMonth = date.getMonth()
                const expenseYear = date.getFullYear()

                if(expenseMonth === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount)
                    } catch(error) {
                        throw new Error('Amount Output is invalid, amount output must be a valid number!')
                    }
                }
            })

            return {
                numberOfMoth: month,
                month: monthsList[month].substr(0, 3),
                amountInput,
                amountOutput
            }
        }).filter(item => {
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()

            return (yearSelected === currentYear && item.numberOfMoth <= currentMonth) || (yearSelected < currentYear)
        })
    }, [yearSelected])

    const relationExpensesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0
        let amountEventual = 0

        expenses.filter((expense) => {
            const date = new Date(expense.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1

            return month === monthSelected && year === yearSelected
        }).forEach((expense) => {
            if(expense.frequency === 'recorrente') {
                return amountRecurrent += Number(expense.amount)
            }
            if(expense.frequency === 'eventual') {
                return amountEventual += Number(expense.amount)
            }
        })

        const total = amountRecurrent + amountEventual

        const percentRecurrent = Number(((amountRecurrent/total) * 100).toFixed(1))
        const percentEventual = Number(((amountEventual/total) * 100).toFixed(1))

        return [
            {
                name: 'Recurrents',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color:'#F7931B'
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color:'#E44C4E'
            }
        ]
    }, [yearSelected, monthSelected])

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0
        let amountEventual = 0

        gains.filter((gain) => {
            const date = new Date(gain.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1

            return month === monthSelected && year === yearSelected
        }).forEach((gain) => {
            if(gain.frequency === 'recorrente') {
                return amountRecurrent += Number(gain.amount)
            }
            if(gain.frequency === 'eventual') {
                return amountEventual += Number(gain.amount)
            }
        })

        const total = amountRecurrent + amountEventual

        const percentRecurrent = Number(((amountRecurrent/total) * 100).toFixed(1))
        const percentEventual = Number(((amountEventual/total) * 100).toFixed(1))

        return [
            {
                name: 'Recurrents',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color:'#F7931B'
            },
            {
                name: 'Eventual',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color:'#E44C4E'
            }
        ]
    }, [yearSelected, monthSelected])

    const handleMonthSelected = useCallback((month: string) => {
        try {
            const parsedMonth = Number(month)
            setMonthSelected(parsedMonth)
        } catch(error) {
            throw new Error('Invalid month value!')
        }
    }, [])

    const handleYearSelected = useCallback((year: string) => {
        try {
            const parsedYear = Number(year)
            setYearSelected(parsedYear)
        } catch(error) {
            throw new Error('Invalid year value!')
        }
    }, [])

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
                <WalletMessageBox title={message.title} description={message.description} footerText={message.footerText} icon={message.icon} />
                <PChart data={relationExpensesVersusGains}/>
                <HistoricBox data={historicData} lineColorAmountInput='#F7931B' lineColorAmountOutput='#E44C4E' />
                <BChart title='OUT' data={relationExpensesRecurrentVersusEventual} />
                <BChart title='IN' data={relationGainsRecurrentVersusEventual} />
            </Content>
        </Container>
    )
}

export default Dashboard