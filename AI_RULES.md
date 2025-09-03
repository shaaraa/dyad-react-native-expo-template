# AI Rules for Dyad

## Tech stack

- React Native via **Expo** (SDK 53, managed)
- **expo-router** v5 for file‑based navigation
- Web preview via **react-native-web** (0.20.x)
- **React 19**, **React Native 0.79.x**, TypeScript
- Core peers: `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`
- Linking: `expo-linking` for external URLs

> **Version policy:** Keep versions as in `package.json`. Do **not** upgrade or add heavy deps unless asked.

---

## Architecture

- Entry handled by `"main": "expo-router/entry"` in `package.json` (no root `index.ts` required)
- Routes live under `app/` and **must** export a default component
- Root layout: `app/_layout.tsx` with `<Stack screenOptions={{ headerShown: false }} />`
- Components in `components/` (optional), assets in `assets/`
- Optional web tagging plugin: `scripts/babel-plugin-dyad-web-tags.js`

Folder snapshot:

```
app/
  _layout.tsx
  index.tsx
assets/
scripts/
  babel-plugin-dyad-web-tags.js   # optional for Select UI on web
app.json
package.json
babel.config.js
metro.config.js
tsconfig.json
```

---

## Editing guidance

- Prefer **functional components** with hooks; keep props typed
- Keep platform‑specific code in `.native.tsx` / `.web.tsx` files
- Use `StyleSheet.create` or inline styles; avoid DOM APIs
- For web builds, custom components may accept `data-dyad-id` / `data-dyad-name` (RN primitives don’t need them)
- Navigation: `import { router } from "expo-router"; router.push("/path")`

---

## Configuration rules

- **Babel:** use only `babel-preset-expo` (don’t add `expo-router/babel`)
- **TypeScript:** extend `expo/tsconfig.base` with `module: "ESNext"`, `moduleResolution: "Bundler"`
- **Expo config:** `app.json` includes `plugins: ["expo-router"]`; optional `scheme` for deep links

---

## Do / Don’t

**Do**

- Add or tweak screens under `app/`
- Make small UI changes and utility hooks/components
- Open external links with `expo-linking`

**Don’t**

- Change dependency versions or add heavy libraries without instruction
- Rewrite routing, Metro, or Babel config
- Remove existing `data-*` tags or the optional tagging plugin

---

## Commands

- Start (native/web): `npm run start` (press `w` for web)
- Web only: `npm run web`
- iOS / Android: `npm run ios` / `npm run android`
- Clean cache: `npx expo start --clear`

---

## Troubleshooting

- **Entry error:** ensure `package.json` has `"main": "expo-router/entry"`
- **Missing default export warning:** each route file under `app/` must default‑export a component
- **React UMD/JSX errors:** don’t restrict `compilerOptions.types`; or add `react`, `react-native` to it
- **Metro mismatch:** use versions from `package.json`; don’t upgrade unless asked
