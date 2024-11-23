import React from 'react';
import { HiArrowSmallLeft } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { styled } from 'styled-components';
import { useOrder } from '../features/order/useOrder';
import {
    useCancelOrder,
    useConfirmReceipt,
    useTrackOrder,
} from '../features/order/useOrderActions';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import { CURRENCY } from '../utils/constant';
const OrderDetails = () => {
    const { id } = useParams();
    const { trackOrder, isTracking } = useTrackOrder(id);
    const { order, isFetching } = useOrder(id);
    const { doCancel, isCanceling } = useCancelOrder();
    const { doConfirmReceipt, isConfirming } = useConfirmReceipt();

    if (isTracking || isFetching) {
        return (
            <Loading>
                <RingLoader color='blue' loading={isTracking || isFetching} />
            </Loading>
        );
    }

    const handleOrder = (status) => {
        const actions = {
            pending: () => doCancel(order.id),
            delivered: () => doConfirmReceipt(order.id),
            finished: () => console.log('Order is finished.'),
        };

        actions[status]?.(); // Call the corresponding action if it exists
    };

    const buttonLabels = {
        pending: isCanceling ? 'Canceling...' : 'Cancel Order',
        delivered: isConfirming ? 'Confirming' : 'Confirm Receipt',
        finished: 'Reorder',
    };

    let fixedStatus = [
        { id: 1, status: 'PENDING', date: '', notes: '' },
        { id: 2, status: 'CONFIRMED', date: '', notes: '' },
        { id: 3, status: 'SHIPPED', date: '', notes: '' },
        { id: 4, status: 'DELIVERED', date: '', notes: '' },
        { id: 5, status: 'FINISHED', date: '', notes: '' },
    ];

    trackOrder?.forEach((order) => {
        const [, , status, date] = order; // Correctly destructuring values
        const fixedItem = fixedStatus.find((s) => s.status === status);

        // Only set the date and notes if fixedItem is found
        if (fixedItem) {
            fixedItem.date = date;
        }
    });

    return (
        <Container className='card mb-4 shadow-sm p-5'>
            <Link
                to={`/orders?status=${order.status.toLowerCase()}`}
                className='d-block'
            >
                <HiArrowSmallLeft />
                Back
            </Link>
            <h1 className='text-center'>Order Details</h1>
            <h4>Order ID: {id}</h4>
            <h4>
                Order Status:{' '}
                <span
                    className={`badge ${
                        order.status === 'DELIVERED' ||
                        order.status === 'SHIPPED' ||
                        order.status === 'FINISHED' ||
                        order.status === 'CONFIRMED'
                            ? 'bg-success'
                            : order.status === 'PENDING'
                            ? 'bg-warning'
                            : order.status === 'CANCELLED'
                            ? 'bg-danger'
                            : 'bg-secondary'
                    }`}
                >
                    {order.status}
                </span>
            </h4>
            <h4>Order Notes: {order?.notes}</h4>
            <h4>Shipping Address: {order?.shippingAddress}</h4>
            <h4>Order Items:</h4>
            <hr />
            <ul className='ms-5'>
                {order?.orderItems.map((orderItem, index) => (
                    <li key={index} className='row justify-content-end h5 mb-0'>
                        <p className='col-3'>
                            Product ID: {orderItem.productId}
                        </p>
                        <p className='col-3'>{orderItem.productName}</p>
                        <p className='col-3'>Quantity: {orderItem.quantity}</p>
                        <p className='col-3'>
                            Price: {orderItem.price + CURRENCY}
                        </p>
                    </li>
                ))}
            </ul>
            <hr />
            <h4>Order Total: {order?.total + CURRENCY}</h4>
            <h4>
                Payment Status:{' '}
                <span
                    className={`badge ${
                        order?.payment?.status === 'PAID'
                            ? 'bg-success'
                            : order?.payment?.status === 'UNPAID'
                            ? 'bg-danger'
                            : 'bg-secondary'
                    }`}
                >
                    {order?.payment?.status}
                </span>
            </h4>
            {order.status !== 'CANCELLED' && (
                <>
                    <ul id='progressbar' className='pt-5'>
                        {fixedStatus.map((statusItem) => (
                            <li
                                key={statusItem.id}
                                className={`text-center ${
                                    statusItem.date ? 'active' : ''
                                }`}
                                id={`step${statusItem.id}`}
                            >
                                {statusItem.status}
                                <span className='trackDate'>
                                    {statusItem.date}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-5 d-flex justify-content-end align-items-center'>
                        <Button
                            $variation='primary'
                            $size='small'
                            onClick={handleOrder.bind(
                                null,
                                order.status.toLowerCase()
                            )}
                            disabled={isCanceling}
                        >
                            {buttonLabels[order.status.toLowerCase()]}
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};
const Container = styled.div`
    background-color: transparent; /* Your defined color */
    border-radius: var(--border-radius-md);
    box-shadow: var(--box-shadow-sm);
    padding: 1rem;
    color: var(--color-grey-800);

    /* Using a pseudo-element to create a background layer */
    position: relative;
    max-width: 1200px;
    margin: 0 auto;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--color-grey-0); /* Your defined color */
        opacity: 0.7; /* Adjust this value for transparency */
        z-index: -1; /* Send it behind the content */
        border-radius: inherit; /* Match the parent border radius */
    }
`;
export default OrderDetails;
