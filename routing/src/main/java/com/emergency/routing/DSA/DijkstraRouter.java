package com.emergency.routing.DSA;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

public class DijkstraRouter {

    public List<Integer> shortestPath(Graph g, int src, int dest) {

        int[] dist = new int[g.V];
        int[] parent = new int[g.V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        Arrays.fill(parent, -1);

        PriorityQueue<int[]> pq =
                new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));

        dist[src] = 0;
        pq.add(new int[]{src, 0});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];

            for (Edge e : g.adj.get(u)) {
                int v = e.to;
                int newDist = dist[u] + e.weight;

                if (newDist < dist[v]) {
                    dist[v] = newDist;
                    parent[v] = u;
                    pq.add(new int[]{v, newDist});
                }
            }
        }

        // reconstruct path
        List<Integer> path = new ArrayList<>();
        for (int v = dest; v != -1; v = parent[v]) {
            path.add(v);
        }
        Collections.reverse(path);
        return path;
    }

    public int calculateETA(Graph g, List<Integer> path) {
        int total = 0;

        for (int i = 0; i < path.size() - 1; i++) {
            int u = path.get(i);
            int v = path.get(i + 1);

            for (Edge e : g.adj.get(u)) {
                if (e.to == v) {
                    total += e.weight;
                    break;
                }
            }
        }
        return total;
    }

}
