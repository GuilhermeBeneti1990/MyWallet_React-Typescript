import React, { useMemo, useState, useEffect } from 'react'

import { Container, Content, Filters } from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import FinanceHistoryCard from '../../components/FinanceHistoryCard'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'
import monthsList from '../../utils/months'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'
import { v4 as uuidv4 } from 'uuid'


interface IRouteParams {
    match: {
        params: {
            type: string
        }
    }
}

interface IData {
    id: string,
    description: string,
    amountFormatted: string,
    frequency: string,
    dateFormatted: string,
    tagColor: string
}

const List: React.FC<IRouteParams> = ({ match }) => {

    const [data, setData] = useState<IData[]>([])

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())

    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual'])

    const { type } = match.params

    // const title = useMemo(() => {
    //     return type === 'money-in' ? 'Money-IN' : 'Money-OUT'
    // }, [type])

    // const lineColor = useMemo(() => {
    //     return type === 'money-in' ? '#F7931B' : '#E44C4E'
    // }, [type])

    // const listData = useMemo(() => {
    //     return type === 'money-in' ? gains : expenses
    // }, [type])

    const pageData = useMemo(() => {
        if(type === 'money-in') {
            return {
                title: 'Money-IN',
                lineColor: '#4E41F0',
                data: gains
            }
        } else {
            return {
                title: 'Money-OUT',
                lineColor: '#E44C4E',
                data: expenses
            }
        }
    }, [type])

    const months = useMemo(() => {
        return monthsList.map((month, index) => {
            return {
                value: index + 1,
                label: month
            }
        })
    }, [])

    const years = useMemo(() => {
        let uniqueYears: number[] = []

        pageData.data.forEach(item => {
            const date = new Date(item.date)
            const year = date.getFullYear()

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year)
            }
        })

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })
    }, [pageData.data])

    const handleFrequency = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency)

        if(alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => (
                item !== frequency
            ))
            setSelectedFrequency(filtered)
        } else {

            setSelectedFrequency((prev) => [
                ...prev,
                frequency
            ])
        }
    }

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

    useEffect(() => {
        const filteredDate = pageData.data.filter(item => {

            const date = new Date(item.date)
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency)
        })

        const formatedDate = filteredDate.map(item => {
            return {
                id: uuidv4(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        })
        setData(formatedDate) 
    }, [pageData.data, monthSelected, yearSelected, selectedFrequency])

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button type='button' className={`tag-filter tag-filter-recurrent ${selectedFrequency.includes('recorrente') && 'tag-active'}`} onClick={() => handleFrequency('recorrente')}>
                    Recorrentes
                </button>
                <button type='button' className={`tag-filter tag-filter-eventual ${selectedFrequency.includes('eventual') && 'tag-active'}`} onClick={() => handleFrequency('eventual')}>
                    Eventuais
                </button>
            </Filters>

            <Content>
                {data.map(item => (
                    <FinanceHistoryCard key={item.id} tagColor={item.tagColor} title={item.description} subtitle={item.dateFormatted} amount={item.amountFormatted} />
                ))}
            </Content>
        </Container>
    )
}

export default List