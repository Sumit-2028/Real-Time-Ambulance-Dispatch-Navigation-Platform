package com.emergency.routing.controller;

import com.emergency.routing.model.RouteRequest;
import com.emergency.routing.service.RoutingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class RouteController {

    private final RoutingService routingService;

    public RouteController(RoutingService routingService) {
        this.routingService = routingService;
    }

    @PostMapping("/start")
    public void startRouting(@RequestBody RouteRequest request) {
        routingService.setRoute(request.source, request.destination);
    }
}
