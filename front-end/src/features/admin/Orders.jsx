import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { styled } from 'styled-components';
import Button from '../../ui/Button';
import Loading from '../../ui/Loading';
import Pagination from '../../ui/Pagination';
import { formatDateTime } from '../../utils/helperFunction';
import { useConfirmOrder, useShipOrder } from './useOrderActions';
import { useOrders } from './useOrders';

const Orders = () => {
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const size = searchParams.get('size') || 10;

    const { orders, isLoading, totalPage } = useOrders({ page, size });
    const { confirmOrder, isConfirming } = useConfirmOrder();
    const { shipOrder, isShipping } = useShipOrder();
    const [clickedOrder, setClickedOrder] = useState(null);

    if (isLoading) {
        return (
            <Loading>
                <RingLoader color='blue'></RingLoader>
            </Loading>
        );
    }
    const handleConfirm = (id) => {
        setClickedOrder(id);
        confirmOrder(id);
    };
    const handleShip = (id) => {
        setClickedOrder(id);
        shipOrder(id);
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
                                    <Button
                                        onClick={() => handleConfirm(order.id)}
                                        disabled={
                                            isConfirming &&
                                            clickedOrder === order.id
                                        }
                                    >
                                        {isConfirming &&
                                        clickedOrder === order.id
                                            ? 'Confirming'
                                            : 'Confirm'}
                                    </Button>
                                )}
                                {order.status === 'CONFIRMED' && (
                                    <Button
                                        onClick={() => handleShip(order.id)}
                                        disabled={
                                            isShipping &&
                                            clickedOrder === order.id
                                        }
                                    >
                                        {isShipping && clickedOrder === order.id
                                            ? 'Shipping'
                                            : 'Ship'}
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </OrderTable>

            <div className='p-5 d-flex justify-content-center'>
                <Pagination totalPages={totalPage}></Pagination>
            </div>
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
