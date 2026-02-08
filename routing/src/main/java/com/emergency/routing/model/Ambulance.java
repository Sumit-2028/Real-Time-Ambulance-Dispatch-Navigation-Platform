package com.emergency.routing.model;

public class Ambulance {
    public int id;
    public int source;
    public int destination;
    public int eta;

    public Ambulance(int id, int source, int destination, int eta) {
        this.id = id;
        this.source = source;
        this.destination = destination;
        this.eta = eta;
    }
}