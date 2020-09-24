import React from 'react'
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts'
import { Container, LegendContainer, Legend, SideLeft, SideRight } from './styles'
import formatCurrency from '../../utils/formatCurrency'

interface IBChartProps {
    title: string,
    data: {
        name: string,
        amount: number,
        percent: number,
        color: string
    }[]
}

const BChart: React.FC<IBChartProps> = ({ title, data }) => {
    return (
        <Container>
            <SideLeft>
                <h2>{title}</h2>
                <LegendContainer>
                {data.map((indicator) => (
                    <Legend color={indicator.color} key={indicator.name}>
                        <div>{indicator.percent}%</div>
                        <span>{indicator.name}</span>
                    </Legend>
                ))}
            </LegendContainer>
            </SideLeft>

            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey='amount' name='Value'>
                            {data.map((indicator) => (
                                <Cell key={indicator.name} fill={indicator.color} />
                            ))}
                        </Bar>
                        <Tooltip cursor={{ fill: 'none' }} formatter={(value) => formatCurrency(Number(value))}/>
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    )
}

export default BChart