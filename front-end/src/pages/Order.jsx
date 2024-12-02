import { useSearchParams } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import { styled } from 'styled-components';
import OrderListItem from '../features/order/OrderListItem';
import { useFindOrderByUserId } from '../features/order/useOrder';
import FilterBar from '../ui/FilterBar';
import Loading from '../ui/Loading';

const Order = () => {
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status') || 'all';
    const { orders, isLoading } = useFindOrderByUserId();

    if (isLoading) {
        return (
            <Loading>
                <RingLoader color='blue' loading={isLoading} />
            </Loading>
        );
    }

    const filteredOrders =
        status === 'all'
            ? orders
            : orders?.filter(
                  (order) => order.status.toLowerCase() === status
              ) || [];
    return (
        <div>
            <h1 className='text-center mb-5'>Order</h1>
            <FilterBar
                className='justify-content-center'
                filterField='status'
                options={[
                    { label: 'all', value: 'all' },
                    { label: 'pending', value: 'pending' },
                    { label: 'confirmed', value: 'confirmed' },
                    { label: 'shipped', value: 'shipped' },
                    { label: 'delivered', value: 'delivered' },
                    { label: 'cancelled', value: 'cancelled' },
                    { label: 'returned', value: 'returned' },
                    { label: 'finished', value: 'finished' },
                ]}
            />
            <div className='d-flex justify-content-center mt-5'>
                <OrderList>
                    {filteredOrders?.map((item) => (
                        <OrderListItem
                            key={item.id}
                            item={item}
                        ></OrderListItem>
                    ))}
                </OrderList>
            </div>
        </div>
    );
};

const OrderList = styled.ul`
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
`;

export default Order;
