import React, { useMemo, useState, useEffect } from 'react'

import { Container, Content, Filters } from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import FinanceHistoryCard from '../../components/FinanceHistoryCard'

import gains from '../../repositories/gains'
import expenses from '../../repositories/expenses'

import formatCurrency from '../../utils/formatCurrency'
import formatDate from '../../utils/formatDate'

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

    const { type } = match.params

    const title = useMemo(() => {
        return type === 'money-in' ? 'Money-IN' : 'Money-OUT'
    }, [type])

    const lineColor = useMemo(() => {
        return type === 'money-in' ? '#F7931B' : '#E44C4E'
    }, [type])

    const listData = useMemo(() => {
        return type === 'money-in' ? gains : expenses
    }, [type])

    const months = [
        {
            value: 9, label: 'Setembro',
        },
        {
            value: 10, label: 'Outubro'
        },
        {
            value: 11, label: 'Novembro'
        }
    ]

    const years = [
        {
            value: 2020, label: 2020,
        },
        {
            value: 2021, label: 2021
        },
        {
            value: 2022, label: 2022
        }
    ]

    useEffect(() => {
        const response = listData.map(item => {
            return {
                id: String(Math.random() * data.length),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
            }
        })
        setData(response) 
    }, [])

    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months}/>
                <SelectInput options={years}/>
            </ContentHeader>

            <Filters>
                <button type='button' className='tag-filter tag-filter-recurrent'>
                    Recorrentes
                </button>
                <button type='button' className='tag-filter tag-filter-eventual'>
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