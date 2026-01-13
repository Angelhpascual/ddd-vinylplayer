# 🎵 Deezer Spatial Vinyl Player

A next-generation music player combining a 2D discovery interface with an immersive 3D experience. Built following **Domain-Driven Design (DDD)** and **Hexagonal Architecture** principles.

![Project Status](https://img.shields.io/badge/status-active-brightgreen)
![Tech Stack](https://img.shields.io/badge/stack-React--Three--Vitest-blue)

## 🪐 The Experience

This project is more than just a player; it's a spatial interaction. Users can search for tracks via the Deezer API and drag & drop them directly onto a 3D turntable to initiate playback.

### Key Features:

- **🔍 Dynamic Search**: Real-time integration with the Deezer API.
- **✨ 3D Drag & Drop**: Drag tracks from the DOM directly into a WebGL scene.
- **💿 Technical Realism**: The vinyl rotates dynamically with the album cover (and yes, it rotates clockwise! 🕒).
- **🛡️ Technical Shield**: Comprehensive test coverage across all layers.

## 🏗️ Architecture (DDD)

The application follows a strict architecture to ensure scalability and maintainability:

- **`domain`**: The heart of the business. Contains Entities (`Track`, `Artist`) and Value Objects (`TrackTitle`, `TrackDuration`, etc.) with intrinsic validations.
- **`application`**: Use cases such as `TrackSearcher`, orchestrating the business logic.
- **`infrastructure`**: Technical implementations like `DeezerApiTrackRepository` and data mappers.
- **`ui`**: React components and 3D scenes using **React Three Fiber**.

## 🛠️ Tech Stack

- **Core**: React 19 + TypeScript + Vite.
- **3D**: Three.js + React Three Fiber + Drei.
- **State**: Zustand (bridging the 2D and 3D worlds).
- **Styling**: Tailwind CSS 4.
- **Testing**: Vitest + Testing Library + Happy DOM.
- **Package Manager**: Bun.

## 🚀 Installation and Usage

```bash
# Install dependencies
bun install

# Run in development mode
bun dev

# Run the test suite
bun test
```

## 🧪 Testing Strategy

The project features a robust testing pyramid:

- **Unit Tests**: Validation of business rules in Value Objects.
- **Integration Tests**: Full flows from search to state updates in the Store.
- **Mocking**: Total isolation from the Deezer API for fast and deterministic tests.

---

_Built with ❤️ by Angelhpascual as an advanced architecture exercise._
