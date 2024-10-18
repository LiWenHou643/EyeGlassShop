import debounce from 'lodash.debounce';
import { useEffect, useRef } from 'react';
import { HiOutlineTrash } from 'react-icons/hi2';
import styled from 'styled-components';
import { useCartCtx } from '../../hooks/useCartCtx';
import Button from '../../ui/Button';
import ImageContainer from '../../ui/ImageContainer';
import NumberInput from '../../ui/NumberInput';
import { formatPrice } from '../../utils/helperFunction';
import { useAddToCart } from './useAddToCart';

const CartItem = ({ item, isChecked, onChange }) => {
    const { addToCart, isAdding } = useAddToCart();
    const {
        cart: { id },
    } = useCartCtx();

    const debouncedAddToCart = useRef(
        debounce(async (cartId, productId, newQuantity) => {
            await addToCart({
                cartId,
                productId,
                quantity: newQuantity,
            });
        }, 300)
    );

    useEffect(() => {
        const currentDebouncedFunction = debouncedAddToCart.current;

        // Cleanup function to cancel debounce on unmount
        return () => {
            currentDebouncedFunction.cancel();
        };
    }, []);

    const onQuantityChange = (newQuantity) => {
        debouncedAddToCart.current(id, item.productId, newQuantity);
    };

    return (
        <Li className='row justify-content-between align-items-center'>
            <div className='col-1'>
                <input
                    className='form-check-input'
                    type='checkbox'
                    id={`inlineCheckbox-${item.id}`}
                    value={`option-${item.id}`}
                    checked={isChecked || false}
                    onChange={() => onChange(item.id)}
                />
            </div>
            <div className='col-2'>
                <ImageContainer $fit='contain' $ratio='5/3'>
                    <img src={item.image} alt={item.name} />
                </ImageContainer>
            </div>
            <div className='col-9'>
                <div className='row align-items-center'>
                    <div className='col-4'>
                        <h3 className='m-0'>{item.title}</h3>
                    </div>
                    <div className='col-4'>
                        <NumberInput
                            initialValue={item.quantity}
                            onChange={onQuantityChange}
                            disabled={isAdding}
                        />
                    </div>
                    <div className='col-4 text-end'>
                        <Button $variation='danger'>
                            <HiOutlineTrash />
                        </Button>
                    </div>
                </div>
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                    <p className='col-4'>
                        Price: {formatPrice(item.priceAtTime)} VND
                    </p>
                    <p className='col-4 text-center'>
                        Discount: {item.discount}%
                    </p>
                    <p className='col-4 text-end'>
                        Total: {formatPrice(item.totalPrice)} VND
                    </p>
                </div>
            </div>
        </Li>
    );
};

const Li = styled.li`
    border-radius: 1rem;
    padding: 1rem;
    margin-bottom: 1rem;
    position: relative;
    overflow: hidden;
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--color-grey-100);
        opacity: 0.6;
        z-index: 1;
    }
    & > * {
        position: relative;
        z-index: 2;
    }
`;

export default CartItem;
