package com.autoparts.erp.modules.inventory.repository;

import com.autoparts.erp.modules.inventory.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    // Spring generates the SQL to find stock by both IDs automatically!
    Optional<Stock> findByPartIdAndWarehouseId(Long partId, Long warehouseId);
}