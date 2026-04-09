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

## 📚 Learning Journey

This project was built progressively through structured lessons, covering both core Vue fundamentals and real-world engineering practices.

---

### 🟢 Foundation (Lessons 1–10)

1. Vue basics (templates, reactivity)
2. `ref` vs `reactive`
3. Event handling (`@click`)
4. Conditional rendering (`v-if`)
5. List rendering (`v-for`)
6. Form binding (`v-model`)
7. Computed properties
8. Methods vs computed
9. Basic component structure
10. Props & emits

---

### 🟡 Component Architecture (Lessons 11–15)

11. Parent → child communication
12. Emitting events from child to parent
13. Form component (`CreatePlayerForm`)
14. Separation of concerns (logic vs UI)
15. Structuring reusable components

---

### 🔵 TypeScript Integration (Lessons 16–18)

16. Adding TypeScript to Vue project
17. Defining interfaces (`Player`, `Item`, etc.)
18. Strong typing for props and stores

---

### 🟣 State Management with Pinia (Lessons 19–23)

19. Introduction to Pinia
20. Creating the player store (`usePlayerStore`)
21. Derived state (`computed`: totalDamage, criticalChance)
22. Store actions (damage, heal, etc.)
23. Cross-store interaction

---

### 🟠 Shop System (Lessons 24–26)

24. Shop store implementation
25. Buying items and handling gold
26. User feedback (success/error states)

---

### 🟤 Inventory System (Lessons 27–29)

27. Inventory store design
28. Equip / unequip system
29. Consumables (HP/MP usage logic)

---

### 🔴 Quest System (Lesson 30)

30. Fetching quests from API and rewarding player

---

## 🚀 Advanced & Real-World Extensions

---

### ⚙️ Architecture & Data Design (Lesson 31–33)

31. Centralized item catalog (`ITEM_CATALOG`)
32. Eliminating duplication across shop, inventory, and quests
33. Consistent data modeling across systems

---

### 🧩 UI Componentization (Lessons 34–35)

34. Base UI components (`BasePanel`, `ResourceBar`, `StatusMessage`)
35. Slots and reusable layout patterns

---

### 💾 Persistence & State Lifecycle (Lesson 36)

36. LocalStorage integration
- State hydration (load on init)
- Automatic saving via watchers
- Reset architecture without page reload

---

### 🎨 UI System Design (Lesson 37)

37. Reusable UI controls
- `BaseButton`
- `StatRow`
- Consistent UI patterns across views

---

### 🧪 Testing (Lesson 38)

38. Unit testing with Vitest
- Setting up testing environment (jsdom)
- Testing Pinia stores
- Validating business logic:
  - consumables
  - stat calculations
  - quest rewards

---

### 🚀 Production Readiness (Lesson 39)

39. Deployment & portfolio polish
- README optimization
- Project presentation for resume
- Preparing for real-world showcase

---

## 📄 License

This project is for learning and portfolio purposes.
