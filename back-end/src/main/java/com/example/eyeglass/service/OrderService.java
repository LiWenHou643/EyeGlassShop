package com.example.eyeglass.service;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.entity.*;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.OrderRepository;
import com.example.eyeglass.repository.person.PersonRepository;
import com.example.eyeglass.service.product.CodeService;
import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    CodeService codeService;
    PersonRepository personRepository;

    public Orders findById(Long id) {
        return orderRepository.findById(id)
                              .orElseThrow(() -> new AppException(ErrorCode.ORDER_NOT_FOUND));
    }

    @Transactional
    public Orders createOrder(OrderRequest req) {
        Person person = personRepository.findById(req.personId())
                                        .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Code code = codeService.checkCode(req.promoCode());
        BigDecimal percent = code.getValue();

        List<Long> reqCartItemIds = req.selectedCartItems();
        Set<OrderItem> orderItems = new HashSet<>();
//
//        // Get cart items from cart
        Cart cart = person.getCart();
        Set<CartItem> cartItems = (cart.getCartItems());
//        // Convert cart items to map for easy access
        Map<Long, CartItem> cartItemMap = cartItems.stream()
                                                   .collect(Collectors.toMap(CartItem::getId,
                                                           cartItem -> cartItem));

        Orders orders = new Orders();
        for (Long id : reqCartItemIds) {
            CartItem cartItem = cartItemMap.get(id);
            if (cartItem != null) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrders(orders);
                orderItem.setProduct(cartItem.getProduct());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setPrice(cartItem.getPrice());
                orderItem.setDiscountPercentage(cartItem.getDiscountPercentage());
                orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
                orderItem.setTotalPrice(cartItem.getTotalPrice());

                orderItems.add(orderItem);
                // Remove the item from the cart items list
                cartItemMap.remove(cartItem.getProduct().getId()); // Remove from the map as well
            }
        }

        if (orderItems.isEmpty() || cartItems.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }
//
//        // Calculate subtotal
        BigDecimal subTotal = orderItems.stream()
                                        .map(OrderItem::getTotalPrice)
                                        .reduce(BigDecimal.ZERO, BigDecimal::add);
//        // Calculate discount
        BigDecimal discount = subTotal.multiply(percent.divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP));
//
        orders.setPerson(person);
        orders.setShippingAddress(req.shippingAddress());
        orders.setPromoCode(req.promoCode());
        orders.setSubTotal(subTotal);
        orders.setDiscountPercentage(percent);
        orders.setTotal(subTotal.subtract(discount));
        orders.setOrderItems(orderItems);

        // Save the order
        return saveOrder(orders);
    }

    public Orders saveOrder(Orders orders) {
        return orderRepository.save(orders);
    }
}
