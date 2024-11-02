import { RingLoader } from 'react-spinners';
import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { styled } from 'styled-components';
import Loading from '../../ui/Loading';
import { useCountOrderRevenue, useTopSellers } from './useStatistics';

const Dashboard = () => {
    const { orderRevenue, isLoadingOrderRevenue } = useCountOrderRevenue();
    const { topSellers, isLoadingTopSellers } = useTopSellers();
    if (isLoadingOrderRevenue || isLoadingTopSellers) {
        return (
            <Loading>
                <RingLoader color='blue'></RingLoader>
            </Loading>
        );
    }

    const sortedLastMonthData = topSellers.lastMonth.sort(
        (a, b) => b.totalQuantity - a.totalQuantity
    );

    // Handle case for current month's empty data
    const currentMonthData =
        topSellers.currentMonth.length > 0
            ? topSellers.currentMonth
            : [{ productCode: 'No Data', totalQuantity: 0 }];
    return (
        <div>
            <h1 className='text-center m-5 text-uppercase'>Dashboard</h1>
            <div className='row p-5'>
                <div className='col-6'>
                    <Chart>
                        <h2 className='text-center'>
                            Number of orders sold each month
                        </h2>
                        <ResponsiveContainer width='100%' height={270}>
                            <LineChart data={orderRevenue}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='month' />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type='monotone'
                                    dataKey='orderCount'
                                    stroke='#8884d8'
                                    label={{
                                        position: 'top',
                                        fill: '#8884d8',
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Chart>
                </div>
                <div className='col-6'>
                    <Chart>
                        <h2 className='text-center'>Total revenue per month</h2>
                        <ResponsiveContainer width='100%' height={270}>
                            <LineChart data={orderRevenue}>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis dataKey='month' />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type='monotone'
                                    dataKey='total'
                                    stroke='#82ca9d'
                                    label={{
                                        position: 'top',
                                        fill: '#82ca9d',
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Chart>
                </div>
            </div>

            <div className='row p-5'>
                <div className='col-6'>
                    <Chart>
                        <h2 className='text-center'>
                            Top Selling Products - Last Month
                        </h2>
                        <ResponsiveContainer width='100%' height={270}>
                            <BarChart
                                data={sortedLastMonthData}
                                layout='vertical'
                            >
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis type='number' />
                                <YAxis dataKey='productCode' type='category' />
                                <Tooltip />
                                <Bar dataKey='totalQuantity' fill='#008D47E1'>
                                    <LabelList
                                        dataKey='totalQuantity'
                                        position='right'
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Chart>
                </div>
                <div className='col-6'>
                    <Chart>
                        <h2 className='text-center'>
                            Top Selling Products - Current Month
                        </h2>
                        <ResponsiveContainer width='100%' height={270}>
                            <BarChart data={currentMonthData} layout='vertical'>
                                <CartesianGrid strokeDasharray='3 3' />
                                <XAxis type='number' />
                                <YAxis dataKey='productCode' type='category' />
                                <Tooltip />
                                <Bar dataKey='totalQuantity' fill='#82ca9d'>
                                    <LabelList
                                        dataKey='totalQuantity'
                                        position='right'
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Chart>
                </div>
            </div>
        </div>
    );
};

const Chart = styled.div`
    background-color: var(--color-grey-0);
    padding: 2rem;
`;
export default Dashboard;
