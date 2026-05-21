package com.autoparts.erp.modules.inventory.service;

import com.autoparts.erp.modules.inventory.entity.Part;
import com.autoparts.erp.modules.inventory.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartService {

    private final PartRepository partRepository;

    public List<Part> getAllParts() {
        return partRepository.findAll(); // Fetches all parts from the DB
    }

    public Part createPart(Part part) {
        // Business Logic: Prevent duplicate SKUs
        if (partRepository.existsBySku(part.getSku())) {
            throw new RuntimeException("A part with SKU " + part.getSku() + " already exists!");
        }
        return partRepository.save(part); // Saves to the DB
    }
}