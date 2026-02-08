package com.emergency.routing.service;

import java.util.List;
import java.util.PriorityQueue;
import java.util.Random;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.emergency.routing.DSA.DijkstraRouter;
import com.emergency.routing.DSA.Edge;
import com.emergency.routing.DSA.Graph;
import com.emergency.routing.model.Ambulance;
import com.emergency.routing.model.RouteUpdate;

@Service
public class RoutingService {

    private final Graph graph;
    private final DijkstraRouter router;
    private final SimpMessagingTemplate messagingTemplate;
    private final Random random = new Random();
    private PriorityQueue<Ambulance> ambulanceQueue =
    new PriorityQueue<>((a, b) -> a.eta - b.eta);

    private int ambulanceCounter = 1;


    private String getTrafficLevel(int eta) {
        if (eta <= 10)
            return "LOW";
        if (eta <= 20)
            return "MEDIUM";
        return "HIGH";
    }

    public RoutingService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.router = new DijkstraRouter();

        graph = new Graph(6);
        graph.addEdge(0, 1, 4);
        graph.addEdge(0, 2, 2);
        graph.addEdge(1, 2, 1);
        graph.addEdge(1, 3, 5);
        graph.addEdge(2, 3, 8);
        graph.addEdge(3, 5, 6);
        graph.addEdge(2, 4, 10);
        graph.addEdge(4, 5, 3);
    }

    // 🔁 Simulate traffic every 5 seconds
    @Scheduled(fixedRate = 2000)
    public void updateTrafficAndRoute() {

        if (ambulanceQueue.isEmpty())
            return;

        // simulate traffic change
        for (List<Edge> edges : graph.adj) {
            for (Edge e : edges) {
                e.weight = 1 + random.nextInt(10);
            }
        }

        // get highest-priority ambulance
        Ambulance amb = ambulanceQueue.poll();

        List<Integer> route = router.shortestPath(graph, amb.source, amb.destination);
        int eta = router.calculateETA(graph, route);

        amb.eta = eta;
        ambulanceQueue.add(amb);

        String traffic = getTrafficLevel(eta);

        RouteUpdate update = new RouteUpdate(route, eta, traffic);

        messagingTemplate.convertAndSend("/topic/route", update);

        System.out.println(
                "🚑 Dispatching ambulance " + amb.id +
                        " | ETA=" + eta +
                        " | Traffic=" + traffic);
    }

    private int source = 0;
    private int destination = 5;

    public void setRoute(int src, int dest) {

        List<Integer> path = router.shortestPath(graph, src, dest);
        int eta = router.calculateETA(graph, path);

        Ambulance amb = new Ambulance(
                ambulanceCounter++, src, dest, eta);

        ambulanceQueue.add(amb);

        System.out.println(
                "🚑 Ambulance added | ID=" + amb.id + " ETA=" + amb.eta);
    }

    public List<Integer> getPublicRoute(int src, int dest) {
        return router.shortestPath(graph, src, dest);
    }

}
