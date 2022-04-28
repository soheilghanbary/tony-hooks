import { useState, useEffect } from "react";

/**
 *
 * @returns {boolean} Is navigator online
 */
function getIsOnline(): boolean | null {
  if (typeof window === "undefined") {
    return null;
  }

  return navigator.onLine;
}

/**
 * useOnline hook
 *
 * Returns true if navigator is online, false if not.
 *
 * @returns {boolean} The value of navigator.onLine
 */
function useOnline(): boolean | null {
  const [online, changeOnline] = useState<boolean | null>(() => getIsOnline());

  function setOffline() {
    changeOnline(false);
  }

  function setOnline() {
    changeOnline(true);
  }

  // we only needs this to be set on mount
  // hence []
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);

      return () => {
        window.removeEventListener("online", setOnline);
        window.removeEventListener("offline", setOffline);
      };
    } else {
      console.warn("useOnline: window is undefined.");
    }
  }, []);

  return online;
}

export { useOnline };
