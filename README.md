# 🧙 RPG Simulation Dashboard

A modular RPG simulation dashboard built with **Vue 3 (Composition API)**, **TypeScript**, and **Pinia**, featuring inventory management, quest rewards, and a turn-based battle system.

---

## ✨ Features

- Player creation and stat system
- Equipment system (weapon & armor bonuses)
- Inventory with filtering and consumables
- Shop system with gold economy
- Quest system with API integration and rewards
- Turn-based battle system with state-driven flow
- Persistent state using localStorage
- Reset system without page reload
- Reusable UI component system
- Unit testing with Vitest

---

## 🧱 Architecture Highlights

- **Modular state management** using Pinia stores
- **Centralized item catalog** to prevent data duplication across systems
- **Reactive derived state** for stats (damage, defense, critical chance)
- **Separation of concerns** between UI components and business logic
- **State-driven battle engine** with clear transitions (Player → Enemy → End)

---

## 🧠 Key Engineering Concepts

- Composition API (`ref`, `reactive`, `computed`)
- Cross-store interaction (player, inventory, shop, quests, battle)
- Data modeling with TypeScript interfaces
- Persistence with localStorage (hydration + reset patterns)
- Reusable UI components (`BaseButton`, `BasePanel`, `StatRow`, `ResourceBar`)
- Unit testing with Vitest for core logic validation

---

## 🛠 Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia
- Vite
- Vitest

---

## 🧪 Testing

Unit tests are implemented for core business logic:

- Inventory consumable usage
- Equipment stat calculations
- Quest reward distribution

Run tests:

```bash
npm run test
```

---

## 📦 Run Locally

```bash
npm install
npm run dev
```

---

## 💼 Key Highlights
 - Built a modular RPG simulation using Vue 3 + TypeScript with Pinia-based state management
 - Designed interconnected systems (inventory, quests, shop, battle) with shared data models
 - Implemented equipment and consumable mechanics with real-time stat updates
 - Developed a turn-based battle engine with state-driven transitions and reward handling
 - Introduced centralized item catalog to eliminate cross-module data duplication
 - Added localStorage persistence with clean reset architecture (no page reloads)
 - Wrote unit tests using Vitest to validate core game logic and prevent regressions

---

## 🔮 Future Improvements
 - Skill system and ability cooldowns
 - Enemy AI and difficulty scaling
 - Equipment rarity and progression system
 - Save slots / multiple characters
 - UI animations and polish

---

## 📄 License

This project is for learning and portfolio purposes.
