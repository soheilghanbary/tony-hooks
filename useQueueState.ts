import { useCallback, useState } from "react";

function useQueueState<T>(initialList: T[]): [
  T[],
  {
    enqueue: (item: T) => number;
    dequeue: () => T | undefined;
    peek: () => T | undefined;
    length: number;
  }
] {
  const [list, setList] = useState<T[]>([...initialList]);

  const enqueue = useCallback(
    (item: T) => {
      const newList = [...list, item];

      setList(newList);

      return newList.length;
    },
    [list]
  );

  const dequeue = useCallback(() => {
    if (list.length > 0) {
      const firstItem = list[0];
      setList([...list.slice(1)]);

      return firstItem;
    }

    return undefined;
  }, [list]);

  const peek = useCallback(() => {
    if (list.length > 0) {
      return list[0];
    }

    return undefined;
  }, [list]);

  const controls = {
    dequeue,
    enqueue,
    length: list.length,
    peek,
  };

  return [list, controls];
}

export { useQueueState };
