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
                OrderItem orderItem = OrderItem.builder()
                                               .order(order) // Order will be set later
                                               .product(cartItem.getProduct())
                                               .quantity(cartItem.getQuantity())
                                               .price(cartItem.getPrice())
                                               .discountPercentage(cartItem.getDiscountPercentage())
                                               .discountedPrice(cartItem.getDiscountedPrice())
                                               .totalPrice(cartItem.getTotalPrice())
                                               .build();

                log.info("Order Item: {} : {}", orderItem.getPrice(), orderItem.getTotalPrice());
                orderItems.add(orderItem);
                cartItemsToOrder.add(cartItem);
                // Remove the item from the cart items list
                cartItemMap.remove(cartItem.getProduct().getId()); // Remove from the map as well
            }
        }

        if (orderItems.isEmpty() || cartItems.isEmpty()) {
            throw new AppException(ErrorCode.CART_ITEM_NOT_FOUND);
        }

        order.setSubTotal(orderItems.stream()
                                    .map(OrderItem::getTotalPrice)
                                    .reduce(BigDecimal.ZERO, BigDecimal::add));
        order.setDiscountPercentage(percent);

        order.setOrderItems(orderItems);
        Order savedOrder = saveOrder(order); // Save the order

        cartService.deleteCartItems(cartItemsToOrder); // Delete the cart items
        OrderResponse orderResponse = ORDER_MAPPER.toOrderResponse(savedOrder);
        orderResponse.setOrderItems(orderItems.stream()
                                              .map(ORDER_MAPPER::toOrderItemResponse)
                                              .collect(Collectors.toList()));
        return orderResponse; // Return the saved order
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}
