import { RingLoader } from 'react-spinners';
import { styled } from 'styled-components';
import Button from '../../ui/Button';
import Loading from '../../ui/Loading';
import { formatDateTime } from '../../utils/helperFunction';
import { useOrders } from '../order/useOrders';
const Orders = () => {
    const { orders, isLoading } = useOrders();

    if (isLoading) {
        return (
            <Loading>
                <RingLoader color='blue'></RingLoader>
            </Loading>
        );
    }
    const handleConfirm = () => {
        console.log('confirm');
    };
    const handleShip = () => {
        console.log('ship');
    };

    return (
        <div className='h-100 px-3'>
            <h1 className='text-center py-4'>Orders</h1>
            <OrderTable>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Order Date</th>
                        <th>Order Total</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.personId}</td>
                            <td>{formatDateTime(order.createdAt)}</td>
                            <td>{order.total}</td>
                            <td>{order.notes}</td>
                            <td>{order.status}</td>
                            <td>
                                {order.status === 'PENDING' && (
                                    <Button onClick={handleConfirm}>
                                        Confirm
                                    </Button>
                                )}
                                {order.status === 'CONFIRMED' && (
                                    <Button onClick={handleShip}>Ship</Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </OrderTable>
        </div>
    );
};

const OrderTable = styled.table`
    max-width: 1100px;
    width: 100%;
    margin: auto;
    border-collapse: collapse;
    th,
    td {
        border: 1px solid var(--color-grey-400);
        padding: 10px;
        height: 40px;
    }
    th {
        background-color: var(--color-grey-200);
    }
`;
export default Orders;
