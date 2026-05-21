package com.autoparts.erp.modules.inventory.controller;

import com.autoparts.erp.modules.inventory.entity.Part;
import com.autoparts.erp.modules.inventory.service.PartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inventory/parts")
@RequiredArgsConstructor
public class PartController {

    private final PartService partService;

    @GetMapping
    public ResponseEntity<List<Part>> getAllParts() {
        return ResponseEntity.ok(partService.getAllParts());
    }

    @PostMapping
    public ResponseEntity<Part> createPart(@RequestBody Part part) {
        return ResponseEntity.ok(partService.createPart(part));
    }
}