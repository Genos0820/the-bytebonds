"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a media query.
 *
 * Built on `useSyncExternalStore` rather than `useState` + `useEffect`: a media
 * query list IS an external store, and this is the API React provides for
 * subscribing to one. It also gives a correct SSR story for free — React uses
 * `getServerSnapshot` for the server render and for hydration, then switches to
 * the live value, so there is no hydration mismatch and no cascading render.
 *
 * The server snapshot is `false`, so anything gated on this must be safe to
 * render as "not matching" initially. That is exactly what we want for the 3D
 * canvas: it mounts after hydration, never during it.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True once we know the viewport is desktop-width. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

/** True when the visitor has a fine pointer — excludes touch devices. */
export const useHasFinePointer = () => useMediaQuery("(pointer: fine)");
