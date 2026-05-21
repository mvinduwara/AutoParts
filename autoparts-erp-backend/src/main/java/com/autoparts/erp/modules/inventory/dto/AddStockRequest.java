package com.autoparts.erp.modules.inventory.dto;

import lombok.Data;

@Data
public class AddStockRequest {
    private Long partId;
    private Long warehouseId;
    private Integer quantity;
}