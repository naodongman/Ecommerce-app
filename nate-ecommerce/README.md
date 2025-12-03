
# Yifan-ecommerce_Store
> **React Native (Expo) mobile shop · Express + MongoDB API**  
> Assignment **A3 — Mobile App**

---

## Table of contents
1. [Project overview](#project-overview)  
2. [Features](#features)  
3. [Tech stack](#tech-stack)  
4. [Folder structure](#folder-structure)  
5. [Setup & run](#setup--run)  
6. [Environment vars](#environment-vars)  
7. [NPM scripts](#npm-scripts)  
8. [Demo video](#demo-video)  
9. [Credits](#credits)

---

## Project overview
A lightweight e-commerce **mobile app** with a minimal backend.

| Side | Highlights |
| ---- | ---------- |
| **User** | Browse, search, product details, share, add to cart, checkout, order history |
| **Admin** | Manage categories; create / update / delete products |
| **Extras** | Map with nearest store, dark / light theme, JWT auth |

---

## Features
| Module | Description |
| ------ | ----------- |
| **Auth** | Register / login (JWT) — token stored with \`expo-secure-store\` |
| **Product** | List, search, details, long-press preview, share |
| **Cart** | Add / remove, quantity +/-, checkout, clear |
| **Order** | Create order, list orders, order details |
| **Admin** | Add / edit / delete product & category |
| **Map** | Live location, calculate nearest store |
| **Theme** | Follows system dark / light automatically |

---

## Tech stack
| Layer | Library / Tool |
| ----- | -------------- |
| **Mobile** | Expo SDK 50 · React Native 0.73 · React Navigation 6 |
| **State** | React Hooks (\`useState\` / \`useEffect\`) |
| **Network** | Native \`fetch\` + custom \`request()\` helper |
| **Storage** | \`expo-secure-store\` |
| **Location / Map** | \`react-native-maps\` · \`expo-location\` |
| **Backend** | Node 18 · Express 4 · Mongoose 7 |
| **Deploy** | API hosted at **https://n11553294.ifn666.com/A2** |

---

## Folder structure
```text
.
├── App.js
├── assets/                  # fonts & images
├── hooks/
│   └── useColorScheme.js
├── navigation/
│   ├── RootStack.js         # Stack = RootTabs + details
│   └── RootTabs.js          # Bottom tab navigator
│   └── RootTables.js 
├── screens/
├────────── admin/
│             ├──│AddProductScreen.js
│             ├──│EditProductScreen.js
│             ├──│ManageProductsScreen.js
├────────── auth/
│             ├──│SignUpScreen.js
│             ├──│LoginScreen.js
│   ├── HomeScreen.js
│   ├── ItemDetailScreen.js
│   ├── CartScreen.js
│   ├── OrderHistoryScreen.js
│   ├── OrderDetailScreen.js
│   ├── ProfileScreen.js
│   ├── ExploreScreen.js
│   ├── CategoryScreen.js
│   ├──NoPageScreen.js
├── services/
│   └── api.js
├── server/                  # Express + MongoDB (optional)
└── README.md                # ← this file
```
> **Note:** \`node_modules/\` is excluded. Native iOS / Android folders are handled by Expo.

---

## Setup & run

### Prerequisites
* **Node.js ≥ 18**
* **Expo CLI**

```bash
npm i -g expo-cli   # or: pnpm / yarn / bun
```

*(Optional) MongoDB 6+ if you plan to run the API locally.*

### 1 · Install dependencies
```bash
npm install         # project root
```

### 2 · Start the mobile app
```bash
npm run dev         # alias of 'expo start --tunnel'
```
Open with **Expo Go** on iOS / Android, or use a simulator.

### 3 · Start the backend (optional)
```bash
cd server
npm install
npm run dev         # http://localhost:3007/api
```
If you run the API locally, update \`BASE_URL\` in \`services/api.js\` to your machine’s IP.

---

## Environment vars
| Var | Purpose | Location |
| --- | ------- | -------- |
| \`BASE_URL\`   | API base URL      | hard‑coded in \`services/api.js\` |
| \`JWT_SECRET\` | backend secret    | `.env` in `/server` |
| \`MONGO_URI\`  | Mongo connection  | `.env` in `/server` |

---

## NPM scripts
| Script | What it does |
| ------ | ------------ |
| \`npm run dev\`            | Expo (Metro bundler) |
| \`npm run ios / android / web\` | Platform‑specific run |
| \`npm run start:server\`   | API with nodemon |
| \`npm run lint\`           | ESLint + Prettier |
| \`npm test\`               | Unit‑test placeholder |

---

## Demo video
A ≤ 7‑minute screencast is available at **docs/demo.mp4**.

**Suggested flow**

1. Sign up & log in  
2. Browse products, search, view details  
3. Add to cart, adjust quantity, checkout  
4. View order history & order details  
5. (Admin) add / edit / delete product & category  
6. Map shows current location & nearest store  
7. Toggle system theme → dark mode

---

## Credits
* Expo & React Native teams  
* React Navigation, React Native Maps  
* Lucide icons  
* Course staff & classmates for feedback  

Released under the **MIT license**.

---

```bash
npm install
npm run dev                   # mobile
# (optional) cd server && npm install && npm run dev
```
