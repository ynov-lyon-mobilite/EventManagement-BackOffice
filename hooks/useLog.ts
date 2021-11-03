import { useEffect } from "react";

export function useLog(state) {
  useEffect(() => {
    console.log(state);
  }, [state]);
}
