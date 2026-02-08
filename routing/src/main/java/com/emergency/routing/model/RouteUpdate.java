package com.emergency.routing.model;

import java.util.List;

public class RouteUpdate {
    public List<Integer> path;
    public int eta;
    public String traffic;
     

    public RouteUpdate(List<Integer> path, int eta, String traffic) {
        this.path = path;
        this.eta = eta;
        this.traffic = traffic;
       
    }
}
