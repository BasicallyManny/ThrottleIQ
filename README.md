
# ThrottleIQ

A full-stack web application for browsing motorcycle specifications. Users can search and filter for make, year, model, then view detailed spread sheets (engine, horsepower,torque, weight, and more) in a clean dashboard.

## Features
#### Browsing and Search
- Searchable, filterable list of motorcycles
- Dashboard view showing key stats at a glance per bike
- Clean stat-block layout for quick scanning
#### Data Layer
- Backend sync job that pulls motorcycle data from CarAPI and caches it in PostgreSQL
- Own REST API (FastAPI) serving cached data to the frontend
- JSONB field for raw/extra specs not worth normalizing into columns



## Roadmap

- Compare motorcycles specifications
- Integrate authentication. Allowing users to like motorcycles.
- More user profile features to come


## Tech Stack

**Frontend:** React, TailwindCSS

**Server:** FastAPI, PostgresSQL

**DevOps:** Docker, Railway, Vercel



