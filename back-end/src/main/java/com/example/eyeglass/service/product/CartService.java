package com.example.eyeglass.service.product;

import com.example.eyeglass.dto.response.CartItemResponse;
import com.example.eyeglass.dto.response.CartResponse;
import com.example.eyeglass.entity.Cart;
import com.example.eyeglass.entity.CartItem;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.entity.Product;
import com.example.eyeglass.repository.person.PersonRepository;
import com.example.eyeglass.repository.product.CartItemRepository;
import com.example.eyeglass.repository.product.CartRepository;
import com.example.eyeglass.repository.product.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.eyeglass.mapper.CartMapper.CART_MAPPER;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class CartService {

    CartRepository cartRepository;
    CartItemRepository cartItemRepository;
    ProductRepository productRepository;
    PersonRepository personRepository;

    public CartResponse getCartItems(String userName) {
        Person person = personRepository.findByEmail(userName)
                                        .orElseThrow(() -> new RuntimeException("Person not found"));
        Long personId = person.getId();

        Optional<Cart> cart = cartRepository.findByPersonId(personId);

        if (cart.isPresent()) {
            List<CartItem> cartItems = new ArrayList<>(cart.get().getCartItems());

            cartItems.sort(Comparator.comparing(CartItem::getCreatedAt));

            List<CartItemResponse> cartItemResponses = cartItems.stream()
                                                                .map(CART_MAPPER::toCartItemResponse)
                                                                .collect(Collectors.toList());

            return new CartResponse(cart.get().getId(), personId, cartItemResponses);
        }

        return null;
    }

    public Long getCartId(String userName) {
        Person person = personRepository.findByEmail(userName)
                                        .orElseThrow(() -> new RuntimeException("Person not found"));
        Long personId = person.getId();

        Optional<Cart> cart = cartRepository.findByPersonId(personId);

        return cart.map(Cart::getId).orElse(null);

    }

    public void addItemToCart(Long cartId, Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                                           .orElseThrow(() -> new RuntimeException("Product not found"));
        int price = product.getPrice();
        int discount = product.getDiscount();

        Cart cart = cartRepository.findById(cartId)
                                  .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Check if the cart already has the product
        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndProductId(cartId, productId);

        if (existingItem.isPresent()) {
            // Update quantity and total price if item already exists
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
            existingItem.get().setTotalPrice((long) existingItem.get().getQuantity() * price * discount / 100);
            cartItemRepository.save(existingItem.get());
        } else {
            // Add new item to cart
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setPriceAtTime(price * discount / 100);
            cartItem.setTotalPrice((long) quantity * price * discount / 100);
            cartItemRepository.save(cartItem);
        }
    }

    public void removeItemFromCart(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                                  .orElseThrow(() -> new RuntimeException("Cart not found"));

        // Check if the cart already has the product
        Optional<CartItem> existingItem = cartItemRepository.findByCartIdAndProductId(cartId, productId);

        existingItem.ifPresent(cartItemRepository::delete);
    }

    public void updateItemInCart(Long cartItemId, int quantity) {
        Optional<CartItem> existingItem = cartItemRepository.findById(cartItemId);

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(quantity);
            cartItemRepository.save(existingItem.get());
        }
    }
}
