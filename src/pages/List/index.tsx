import React from 'react'

import { Container, Content, Filters } from './styles'
import ContentHeader from '../../components/ContentHeader'
import SelectInput from '../../components/SelectInput'
import FinanceHistoryCard from '../../components/FinanceHistoryCard'

const List: React.FC = () => {

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

    return (
        <Container>
            <ContentHeader title='Money Out' lineColor='#E44C4E'>
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
                <FinanceHistoryCard tagColor='#E44C4E' title='Conta 01' subtitle='13/09/2020/' amount='R$120,00' />
            </Content>
        </Container>
    )
}

export default List