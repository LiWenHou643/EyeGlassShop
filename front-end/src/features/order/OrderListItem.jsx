import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../../ui/Button';
import { useCancelOrder } from './useOrderActions';
const OrderListItem = ({ item }) => {
    const navigate = useNavigate();
    const { doCancel, isCanceling } = useCancelOrder();

    const handleOrder = (status) => {
        const actions = {
            pending: () => doCancel(item.id),
            confirmed: () => console.log('You can track your order.'),
            shipped: () => navigate(`/order-details/${item.id}`),
            delivered: () =>
                console.log(
                    'You can confirm receipt or request a return/exchange.'
                ),
            cancelled: () => console.log('You can reorder your items.'),
            returned: () =>
                console.log('You can request a refund or exchange.'),
        };

        actions[status]?.(); // Call the corresponding action if it exists
    };

    const buttonLabels = {
        pending: isCanceling ? 'Canceling...' : 'Cancel Order',
        confirmed: 'Track Order',
        shipped: 'Track Shipment',
        delivered: 'Confirm Receipt',
        cancelled: 'Reorder',
        returned: 'Request Refund/Exchange',
    };

    return (
        <Container className='card mb-4 shadow-sm p-3'>
            <div className='card-header bg-transparent d-flex justify-content-between align-items-center'>
                <h5 className='mb-0'>Order ID: {item.id}</h5>
                <span
                    className={`badge ${
                        item.status === 'Deliveried'
                            ? 'bg-success'
                            : item.status === 'Shipped'
                            ? 'bg-warning'
                            : 'bg-secondary'
                    }`}
                >
                    {item.status}
                </span>
            </div>
            <div className='card-body'>
                <h5 className='card-text'>
                    <strong>Total:</strong> ${item.total.toString()}
                </h5>
                <h5 className='card-text'>
                    <strong>Promo Code:</strong> {item.promoCode}
                </h5>
                <h5 className='card-text'>
                    <strong>Shipping Address:</strong> {item.shippingAddress}
                </h5>
                <h5 className='mt-3'>Order Items:</h5>
                <ul className='mb-3 ms-5'>
                    {item.orderItems.map((orderItem, index) => (
                        <li
                            key={index}
                            className='row justify-content-end h5 mb-0'
                        >
                            <p className='col-3'>
                                Product ID: {orderItem.productId}
                            </p>
                            <p className='col-3'>{orderItem.productName}</p>
                            <p className='col-3'>
                                Quantity: {orderItem.quantity}
                            </p>
                            <p className='col-3'>
                                Price: ${orderItem.price.toString()}
                            </p>
                            <hr />
                        </li>
                    ))}
                </ul>
                <div className='d-flex justify-content-between align-items-center'>
                    <Button
                        $variation='primary'
                        $size='small'
                        onClick={() => navigate(`/order-details/${item.id}`)}
                        disabled={isCanceling}
                    >
                        View Details
                    </Button>
                    <Button
                        $variation='primary'
                        $size='small'
                        onClick={handleOrder.bind(
                            null,
                            item.status.toLowerCase()
                        )}
                        disabled={isCanceling}
                    >
                        {buttonLabels[item.status.toLowerCase()]}
                    </Button>
                </div>
            </div>
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

export default OrderListItem;
