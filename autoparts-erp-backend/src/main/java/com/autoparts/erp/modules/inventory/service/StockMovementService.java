package com.autoparts.erp.modules.inventory.service;

import com.autoparts.erp.modules.inventory.dto.AddStockRequest;
import com.autoparts.erp.modules.inventory.entity.Part;
import com.autoparts.erp.modules.inventory.entity.Stock;
import com.autoparts.erp.modules.inventory.entity.Warehouse;
import com.autoparts.erp.modules.inventory.repository.PartRepository;
import com.autoparts.erp.modules.inventory.repository.StockRepository;
import com.autoparts.erp.modules.inventory.repository.WarehouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StockMovementService {

    private final StockRepository stockRepository;
    private final PartRepository partRepository;
    private final WarehouseRepository warehouseRepository;

    @Transactional
    public Stock addStock(AddStockRequest request) {
        Part part = partRepository.findById(request.getPartId())
                .orElseThrow(() -> new RuntimeException("Part not found"));

        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        Stock stock = stockRepository.findByPartIdAndWarehouseId(part.getId(), warehouse.getId())
                .orElse(new Stock());

        if (stock.getId() == null) {
            stock.setPart(part);
            stock.setWarehouse(warehouse);
            stock.setQuantity(request.getQuantity());
        } else {
            stock.setQuantity(stock.getQuantity() + request.getQuantity());
        }

        return stockRepository.save(stock);
    }
}