package com.example.eyeglass.service;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.dto.response.OrderResponse;
import com.example.eyeglass.entity.*;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.OrderRepository;
import com.example.eyeglass.repository.person.PersonRepository;
import com.example.eyeglass.service.product.CartService;
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

import static com.example.eyeglass.mapper.OrderMapper.ORDER_MAPPER;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    PersonRepository personRepository;
    CartService cartService;
    OrderRepository orderRepository;
    CodeService codeService;

    @Transactional
    public OrderResponse createOrder(OrderRequest req, String userName) {
        Person person = personRepository.findByEmail(userName)
                                        .orElseThrow(() -> new RuntimeException("Person not found"));

        Code code = codeService.checkCode(req.promoCode());
        BigDecimal percent = code.getValue();

        List<Long> reqCartItemIds = req.selectedCartItems();
        Set<OrderItem> orderItems = new HashSet<>();
        Set<CartItem> cartItemsToOrder = new HashSet<>();

        // Get cart items from cart
        Cart cart = person.getCart();
        Set<CartItem> cartItems = (cart.getCartItems());
        // Convert cart items to map for easy access
        Map<Long, CartItem> cartItemMap = cartItems.stream()
                                                   .collect(Collectors.toMap(CartItem::getId,
                                                           cartItem -> cartItem));

        Order order = ORDER_MAPPER.toOrder(req);

        for (Long id : reqCartItemIds) {
            CartItem cartItem = cartItemMap.get(id);
            if (cartItem != null) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(order);
                orderItem.setProduct(cartItem.getProduct());
                orderItem.setQuantity(cartItem.getQuantity());
                orderItem.setPrice(cartItem.getPrice());
                orderItem.setDiscountPercentage(cartItem.getDiscountPercentage());
                orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
                orderItem.setTotalPrice(cartItem.getTotalPrice());

                orderItems.add(orderItem);
                cartItemsToOrder.add(cartItem);
                // Remove the item from the cart items list
                cartItemMap.remove(cartItem.getProduct().getId()); // Remove from the map as well
            }
        }

        if (orderItems.isEmpty() || cartItems.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }

        // Calculate subtotal
        BigDecimal subTotal = orderItems.stream()
                                        .map(OrderItem::getTotalPrice)
                                        .reduce(BigDecimal.ZERO, BigDecimal::add);
        // Calculate discount
        BigDecimal discount = subTotal.multiply(percent.divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP));

        order.setSubTotal(subTotal);
        order.setDiscountPercentage(percent);
        order.setTotal(subTotal.subtract(discount));
        order.setOrderItems(orderItems);

        Order savedOrder = saveOrder(order); // Save the order

//        cartService.deleteCartItems(cartItemsToOrder); // Delete the cart items after order is created
        OrderResponse orderResponse = ORDER_MAPPER.toOrderResponse(savedOrder);
        orderResponse = orderResponse.toBuilder().orderItems(orderItems.stream()
                                                                       .map(ORDER_MAPPER::toOrderItemResponse)
                                                                       .collect(Collectors.toList())).build();
        return orderResponse; // Return the saved order
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}
