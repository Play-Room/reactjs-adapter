# @play-room/reactjs-adapter

React adapter for `@play-room/core`.

It provides a lightweight React-friendly wrapper around PlayRoom APIs, including a factory function and a hook.

## Install

```bash
npm install react react-dom @play-room/core @play-room/reactjs-adapter
```

## Usage

### Create API instance

```ts
import { createPlayRoom } from "@play-room/reactjs-adapter";

const room = createPlayRoom({
  browserStartMode: "inline",
  launcher: { mode: "inline" }
});

room.registerDefaultGames({
  config: {
    quizz: { limit: 10 }
  }
});
```

### Hook usage

```tsx
import { useEffect } from "react";
import { usePlayRoom } from "@play-room/reactjs-adapter";

export function PlayRoomView() {
  const room = usePlayRoom({
    browserStartMode: "inline",
    launcher: { mode: "inline" },
    persistence: { enabled: false }
  });

  useEffect(() => {
    room.registerDefaultGames();
    const container = document.getElementById("playroom-browser");
    if (container) {
      room.renderGamePicker(container);
    }
  }, [room]);

  return <div id="playroom-browser" />;
}
```

## Exposed API

The adapter instance includes:

- `getLocale()`
- `setLocale(locale)`
- `subscribeLocale(listener)`
- `getTheme()`
- `setTheme(theme)`
- `subscribeTheme(listener)`
- `listGames()`
- `queryGames(query)`
- `registerGame(registration)`
- `registerGames(registrations)`
- `registerDefaultGames(options)`
- `renderGamePicker(container)`
- `launchGame(gameId, options)`
- `room` (raw `PlayRoom` instance)

## CDN Example

A complete inline (non-floating) CDN example is included at:

- `examples/inline-cdn.html`

Build before opening the example:

```bash
npm run build
```

## Notes

- The CDN example import map includes both `@play-room/core` and `@play-room/quizz` so default game registration works in browser.
- For fully custom games, skip `registerDefaultGames(...)` and use `registerGame(...)` directly.
