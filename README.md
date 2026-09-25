# Surplus-to-Shelter

**Real-Time Food Rescue Routing**

Surplus-to-Shelter is a full-stack web application developed by **Team
SoloStack** for **AmiHacks -- Track A (NGO / Social Impact)**.

It connects food donors with shelters that currently need meals. Donors
post surplus food, shelters report their current requirements, a
rule-based matching engine allocates meals among suitable shelters, and
volunteers can track pickup and delivery.

## Problem Statement

Restaurants, caterers, cafeterias, and other food businesses may have
edible surplus food while shelters and NGOs need meals at the same time.
Coordination through phone calls, spreadsheets, or messaging groups can
be fragmented and difficult to track, especially when food has a limited
usable time.

## Proposed Solution

**Shelter reports requirement → Donor posts surplus → Matching engine
allocates meals → Volunteer pickup/delivery → Impact dashboard**

The MVP makes food-rescue coordination more structured, transparent, and
trackable.

## Key Features

-   **Donation Intake:** Food quantity, food type, safe-until/expiry
    time, and pickup location.
-   **Shelter Requirement Management:** Current meal requirement,
    capacity, location, and food preference.
-   **Rule-Based Matching:** Matches donations using reported need and
    food preference.
-   **Split Allocation:** A donation can be divided among multiple
    suitable shelters.
-   **Volunteer Dispatch View:** Matched deliveries can be viewed for
    pickup and delivery.
-   **Status Tracking:** `matched → picked up → delivered`.
-   **Impact Dashboard:** Total donations, successful deliveries, and
    meals rescued.
-   **Cloud Persistence:** MongoDB Atlas stores application data.

## How Matching Works

The MVP uses an explainable **rule-based matching engine**, not AI.

1.  Consider shelters where `currentNeed > 0`.
2.  Check whether food preference is `any` or matches the donation food
    type.
3.  Prioritize shelters with higher current need.
4.  Allocate `min(remaining meals, shelter current need)`.
5.  Continue until the donation is allocated or no suitable shelter
    remains.

### Example

For **70 vegetarian meals**:

-   Hope Shelter needs **40**
-   Care NGO needs **30**
-   Allocation: **40 + 30 = 70 meals**

## Tech Stack

### Frontend

-   React
-   Vite
-   React Router

### Backend

-   Node.js
-   Express.js

### Database

-   MongoDB Atlas
-   Mongoose

### Deployment

-   Netlify
-   Render

## System Architecture

``` text
React + Vite Frontend (Netlify)
            |
         REST API
            |
Node.js + Express Backend (Render)
            |
         Mongoose
            |
      MongoDB Atlas
```

## Core API Endpoints

  Method   Endpoint                      Purpose
  -------- ----------------------------- -------------------------------
  POST     `/api/donations`              Create a donation
  GET      `/api/donations`              Get donations
  POST     `/api/shelters`               Register shelter requirements
  POST     `/api/match/:donationId`      Match a donation
  PUT      `/api/donations/:id/status`   Update delivery status
  GET      `/api/dashboard`              Get impact statistics

## Live Project

**Frontend:** https://surplus-to-shelter.netlify.app

**Backend:** https://surplus-to-shelter-api.onrender.com

## GitHub Repository

https://github.com/akshat-goyal-2611/SurplusToShelter

## Demo Flow

1.  Register a shelter and report its current requirement.
2.  Post a surplus-food donation.
3.  Run the matching process.
4.  View allocated shelter(s).
5.  Open the volunteer/driver view.
6.  Update the delivery to picked up and then delivered.
7.  Open the dashboard and verify the rescued-meal impact.

## Current MVP Limitations

-   Shelter demand is manually reported; it is not automatically
    detected.
-   Location is text-based; real geographic distance/routing is not
    implemented.
-   Expiry information is collected but is not currently used for
    matching priority.
-   Individual driver assignment/claiming is not implemented.
-   The driver interface is currently a shared dispatch view.
-   Role-based login/signup and authorization are not implemented.
-   Notifications are not implemented.

## Future Scope

-   Role-based authentication for donors, shelters, volunteers, and
    administrators
-   Organization verification
-   Driver claiming and automatic driver assignment
-   Real-time geolocation and distance-based matching
-   Maps and route optimization
-   Expiry-risk prioritization
-   Multi-stop delivery routes
-   SMS/email/push notifications
-   CO2e and food-weight impact metrics
-   Analytics and demand forecasting

## Team

**Team Name:** SoloStack\
**Developer:** Akshat Goyal\
**Hackathon:** AmiHacks\
**Track:** A -- NGO / Social Impact

### Contribution

This is a solo hackathon project. The work includes frontend
development, backend/API development, database integration, matching
logic, UI/UX, deployment, testing, presentation, and documentation.

------------------------------------------------------------------------

Built by **SoloStack** for AmiHacks.
