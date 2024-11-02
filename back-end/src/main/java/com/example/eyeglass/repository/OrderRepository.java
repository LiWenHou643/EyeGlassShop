package com.example.eyeglass.repository;

import com.example.eyeglass.dto.response.BestSellerDTO;
import com.example.eyeglass.dto.response.OrderAdminDTO;
import com.example.eyeglass.dto.response.OrderCountDTO;
import com.example.eyeglass.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
    @Query("SELECT new com.example.eyeglass.dto.response.OrderCountDTO(YEAR(o.createdAt), MONTH(o.createdAt), COUNT(o), SUM(o.total))" +
            "FROM Orders o GROUP BY YEAR(o.createdAt), MONTH(o.createdAt) ORDER BY YEAR(o.createdAt), MONTH(o.createdAt)")
    List<OrderCountDTO> findMonthlyTotalsForFinishedOrders();

    @Query("SELECT new com.example.eyeglass.dto.response.BestSellerDTO(oi.product.id, oi.product.productCode, SUM(oi.quantity)) " +
            "FROM OrderItem oi JOIN oi.orders o " +
            "WHERE o.createdAt >= :startDate AND o.createdAt < :endDate " +
            "GROUP BY oi.product.id " +
            "ORDER BY SUM(oi.quantity) DESC")
    List<BestSellerDTO> findTopSellingProducts(@Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable);

    @Query("SELECT new com.example.eyeglass.dto.response.OrderAdminDTO(o.id, o.person.id, o.createdAt, o.total, o.notes, o.status) " +
            "FROM Orders o ORDER BY o.createdAt DESC")
    Page<OrderAdminDTO> findAllOrderForAdminDTO(Pageable pageable);

}
