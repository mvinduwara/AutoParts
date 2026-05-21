package com.autoparts.erp.modules.inventory.repository;

import com.autoparts.erp.modules.inventory.entity.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartRepository extends JpaRepository<Part, Long> {
    // Spring magically implements this query just by reading the method name!
    boolean existsBySku(String sku);
}