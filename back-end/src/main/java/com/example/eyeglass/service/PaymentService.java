package com.example.eyeglass.service;

import com.example.eyeglass.config.Authentication.JwtGenerator;
import com.example.eyeglass.dto.response.PaymentResponse;
import com.example.eyeglass.entity.*;
import com.example.eyeglass.repository.PaymentRepository;
import com.example.eyeglass.service.product.CartService;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PRIVATE;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = PRIVATE, makeFinal = true)
public class PaymentService {
    APIContext apiContext;
    JwtGenerator jwtGenerator;
    PaymentRepository paymentRepository;
    OrderService orderService;
    CartService cartService;

    public void savePayment(Orders orders, String transactionId, PaymentMethod paymentMethod) {
        var payment = Payments.builder()
                              .orders(orders)
                              .amount(orders.getTotal())
                              .paymentMethod(paymentMethod)
                              .transactionId(transactionId)
                              .build();

        paymentRepository.save(payment);
    }

    public PaymentResponse createPayment(Orders orders) {
        Set<OrderItem> orderItems = orders.getOrderItems();
        Cart cart = orders.getPerson().getCart();
        Set<CartItem> cartItems = cart.getCartItems();
        Set<CartItem> cartItemsToDelete = new HashSet<>();

        Set<Long> orderItemIds = orderItems.stream()
                                           .map(OrderItem::getId)
                                           .collect(Collectors.toSet());

        // Iterate through cart items and add to the delete set if their ID matches an order item ID
        for (CartItem cartItem : cartItems) {
            if (orderItemIds.contains(cartItem.getId())) {
                cartItemsToDelete.add(cartItem);
            }
        }
        // Update product stock and sold quantity
        orders.getOrderItems().forEach(orderItem -> {
            orderItem.getProduct().setStockQuantity(
                    orderItem.getProduct().getStockQuantity() - orderItem.getQuantity());
            orderItem.getProduct().setSoldQuantity(
                    orderItem.getProduct().getSoldQuantity() + orderItem.getQuantity());
        });

        orderService.saveOrder(orders);
        cartService.deleteCartItems(cartItemsToDelete);

        return PaymentResponse.builder().paymentUrl("cash_on_delivery").build();
    }

    public PaymentResponse createPaypalPayment(Orders orders) {
        try {
            Person person = orders.getPerson();
            String jwt = jwtGenerator.generatePaypalToken(person);

            final String cancelUrl = "http://localhost:8080/payment/cancel";
            final String successUrl = "http://localhost:8080/payment/success?orderId=%s&accessToken=%s".formatted(
                    orders.getId(), jwt);
            Payment payment = createPaypalLink(
                    orders.getTotal(), "USD", "paypal", "sale", "Payment description",
                    cancelUrl, successUrl);

            return payment.getLinks().stream()
                          .filter(link -> "approval_url".equals(link.getRel()))
                          .findFirst()
                          .map(link -> PaymentResponse.builder().paymentUrl(link.getHref())
                                                      .build())
                          .orElse(null);
        } catch (PayPalRESTException | ClassCastException e) {
            return PaymentResponse.builder().paymentUrl("").build();
        }
    }

    public Payment createPaypalLink(BigDecimal total, String currency, String method, String intent, String description, String cancelUrl, String successUrl) throws PayPalRESTException {
        Amount amount = new Amount();
        amount.setCurrency(currency);
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setDescription(description);

        List<Transaction> transactions = List.of(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);

        Payment payment = new Payment();
        payment.setIntent(intent);
        payment.setPayer(new Payer().setPaymentMethod(method));
        payment.setTransactions(transactions);
        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    public String executePaypalPayment(String paymentId, String payerId, String orderId) throws PayPalRESTException {

        // Update order status and product stock
        Orders orders = orderService.findById(Long.parseLong(orderId));
        Payments payments = orders.getPayment();
        Set<OrderItem> orderItems = orders.getOrderItems();
        Cart cart = orders.getPerson().getCart();
        Set<CartItem> cartItems = cart.getCartItems();
        Set<CartItem> cartItemsToDelete = new HashSet<>();

        // Create a set of order item IDs for quick lookup
        Set<Long> orderItemIds = orderItems.stream()
                                           .map(OrderItem::getId)
                                           .collect(Collectors.toSet());

        // Iterate through cart items and add to the delete set if their ID matches an order item ID
        for (CartItem cartItem : cartItems) {
            if (orderItemIds.contains(cartItem.getId())) {
                cartItemsToDelete.add(cartItem);
            }
        }
        // Update product stock and sold quantity
        orders.getOrderItems().forEach(orderItem -> {
            orderItem.getProduct().setStockQuantity(
                    orderItem.getProduct().getStockQuantity() - orderItem.getQuantity());
            orderItem.getProduct().setSoldQuantity(
                    orderItem.getProduct().getSoldQuantity() + orderItem.getQuantity());
        });

        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);

        try {
            payment.execute(apiContext, paymentExecute);
        } catch (PayPalRESTException e) {
            // Log error and throw a custom exception to trigger rollback
            orders.setStatus(OrderStatus.CANCELLED);
            payments.setStatus(PaymentStatus.FAILED);
            throw new PayPalRESTException("Error executing payment", e);
        }

        if ("approved".equals(payment.getState())) {
            List<Transaction> transactions = payment.getTransactions();
            if (transactions != null && !transactions.isEmpty()) {
                Transaction transaction = transactions.getFirst(); // Get the first transaction
                List<RelatedResources> relatedResources = transaction.getRelatedResources();
                if (relatedResources != null && !relatedResources.isEmpty()) {
                    Sale sale = relatedResources.getFirst().getSale(); // Get the sale resource
                    if (sale != null) {
                        String transactionId = sale.getId(); // This is your sandbox transaction ID

                        // Update the payment with the transaction ID
                        payments.setStatus(PaymentStatus.PAID);
                        payments.setTransactionId(transactionId);
                        payments.setOrders(orders);
                        paymentRepository.save(payments);
                        cartService.deleteCartItems(cartItemsToDelete);
                        System.out.printf("Sandbox Transaction ID: %s%n", transactionId);
                    } else {
                        System.out.println("Sale not found in related resources.");
                    }
                } else {
                    System.out.println("No related resources found.");
                }
            } else {
                System.out.println("No transactions found in payment.");
            }
            return "Payment executed successfully.";
        } else {
            orders.setStatus(OrderStatus.CANCELLED);
            payments.setStatus(PaymentStatus.FAILED);
            payments.setOrders(orders);
            paymentRepository.save(payments);
            return "Payment not approved.";
        }

    }
}
