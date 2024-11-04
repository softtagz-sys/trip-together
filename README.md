# TripTogether

TripTogether is an app designed to simplify group commuting. Users can create rooms for a specific event or commute, share a link or code with participants, and form or join groups based on destination, transport type, and capacity. The app is designed with a minimalistic approach, minimizing the need for user accounts while maintaining essential functionality.

## Features

- **Room Creation**: Users can create a room with a title and date, generating a shareable link or code.
- **Join Room**: Participants can join a room using a shared link or by entering a room code.
- **Group Creation**: Once in a room, users can create a group by adding a destination, selecting a transport type (train, car, bus, bike, etc.), and setting a max number of participants (if applicable).
- **Join Group**: Users can join a group by entering their name. A user can only be part of one group at a time.
- **View Group Participants**: Users can see a list of participants in their group via the "My group" tab.

## Technology Stack

### Backend:
- **Java** with Spring Boot
- **PostgreSQL** for data storage

### Frontend:
- **Next.js** with TypeScript
- **Shadcn/ui**

## Installation

### Prerequisites

- Java 17+
- node.js
- PostgreSQL
- Maven

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/TripTogether.git
   cd TripTogether/tt-backend
   ```

3. Run the Spring Boot application:

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend will run on `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd TripTogether/tt-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   next dev
   ```

   The frontend will run on `http://localhost:3000`.

### Database Setup

1. Run Infrastructure Docker

## Usage

1. Open your browser and navigate to the frontend at `http://localhost:3000`.
2. Create a room by entering a title and a date. Share the link or code with participants.
3. Participants can join the room using the link or by entering the room code.
4. In the room, users can create or join a group by selecting a destination, transport type, and specifying a maximum number of participants (if applicable).
5. Participants can view the list of group members in the "My group" section.
