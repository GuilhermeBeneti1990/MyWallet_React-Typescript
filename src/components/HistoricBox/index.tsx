import React from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from 'recharts'
import { Container, ChartContainer, ChartHeader, LegendContainer, Legend } from './styles'
import formatCurrency from '../../utils/formatCurrency'

interface IHistoricBoxProps {
    data: {
        month: string,
        amountInput: number,
        amountOutput: number
    }[],
    lineColorAmountInput: string,
    lineColorAmountOutput: string,
}

const HistoricBox: React.FC<IHistoricBoxProps> = ({data, lineColorAmountInput, lineColorAmountOutput}) => (
    <Container>
        <ChartHeader>
            <h2>Balance Historic</h2>
            <LegendContainer>
                <Legend color={lineColorAmountInput}>
                    <div></div>
                    <span>IN</span>
                </Legend>
                <Legend color={lineColorAmountOutput}>
                    <div></div>
                    <span>OUT</span>
                </Legend>
            </LegendContainer>
        </ChartHeader>

        <ChartContainer>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#cecece' />
                    <XAxis dataKey='month' stroke='#cecece' />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))}/>
                    <Line type='monotone' dataKey='amountInput' name='IN' stroke={lineColorAmountInput} strokeWidth={5} dot={{r: 5}} activeDot={{r: 8}} />
                    <Line type='monotone' dataKey='amountOutput' name='OUT' stroke={lineColorAmountOutput} strokeWidth={5} dot={{r: 5}} activeDot={{r: 8}} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </Container>
)

export default HistoricBox