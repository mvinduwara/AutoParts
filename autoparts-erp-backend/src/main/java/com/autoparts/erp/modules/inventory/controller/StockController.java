package com.autoparts.erp.modules.inventory.controller;

import com.autoparts.erp.modules.inventory.dto.AddStockRequest;
import com.autoparts.erp.modules.inventory.entity.Stock;
import com.autoparts.erp.modules.inventory.service.StockMovementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/inventory/stock")
@RequiredArgsConstructor
public class StockController {

    private final StockMovementService stockMovementService;

    @PostMapping("/add")
    public ResponseEntity<Stock> addStock(@RequestBody AddStockRequest request) {
        return ResponseEntity.ok(stockMovementService.addStock(request));
    }
}