🚑 Emergency Ambulance Routing System
Real-Time Traffic Aware & Priority-Based Dispatch Platform
📌 Overview

The Emergency Ambulance Routing System is a full-stack, real-time navigation platform designed to optimize ambulance routes during emergencies.
It dynamically adapts to traffic conditions, prioritizes multiple ambulances using a Priority Queue, and provides live ETA and route visualization on an interactive map.

This system also allows public users to search and view directions using place names, while emergency vehicles receive highest priority routing.

🎯 Key Features
🚨 Emergency Mode

Real-time ambulance route calculation

Priority-based dispatch using Min Heap (Priority Queue)

Live traffic simulation and ETA updates

Color-coded routes:

🟢 Low Traffic

🟡 Medium Traffic

🔴 High Traffic

Ambulance ID displayed during dispatch

🧭 Public Navigation Mode

Search routes using place names (no node IDs)

Place-to-coordinate geocoding

Route visualization on map

Does not interfere with emergency dispatch

🧠 Core Concepts Used

Dijkstra’s Algorithm for shortest path

Priority Queue (Min Heap) for ambulance prioritization

Graph-based road network

WebSockets for real-time updates

Geocoding & nearest-node mapping

Client-server validation for stability

🏗️ System Architecture
Frontend (React + Leaflet)
        ↓
WebSocket (Live Updates)
        ↓
Spring Boot Backend
        ↓
Graph + Dijkstra + Priority Queue

🛠️ Tech Stack

Frontend

React (Vite)

Leaflet.js (Maps)

Axios

WebSocket (STOMP)

Backend

Spring Boot

Java

WebSocket Messaging

REST APIs

Algorithms & Data Structures

Graph

Dijkstra’s Algorithm

Priority Queue (Min Heap)
