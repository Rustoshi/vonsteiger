import { useState, useEffect } from "react";

/**
 * Returns true once the component has hydrated on the client.
 * Use this to prevent Framer Motion initial={opacity:0} from
 * causing a blank page on SSR first paint.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
