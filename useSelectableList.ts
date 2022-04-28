/* eslint-disable no-negated-condition */
import { useCallback, useState } from "react";
import type { OptionalIndexValue } from "../types/index-value";

function warnIfBothValueAndIndexAreProvided(functionName, object) {
  if (Object.values(object).every((v) => typeof v !== "undefined")) {
    console.warn(
      `${functionName}. Expected either ${Object.keys(object).join(
        " or "
      )} to be provided. However all were provided`
    );
  } else if (Object.values(object).every((v) => typeof v === "undefined")) {
    console.warn(
      `${functionName}. ${Object.keys(object).join(" , ")} are all undefined.`
    );
  }
}

type UseSelectableListReturnType<T> = [
  Array<T | number>,
  {
    updateSelection: (parameters: OptionalIndexValue<T>) => () => void;
    toggleSelection: (parameters: OptionalIndexValue<T>) => () => void;
    matchSelection: (parameters: OptionalIndexValue<T>) => boolean;
  }
];

/**
 * useSelectableList
 * Easily select a single value from a list of values. very useful for radio buttons, select inputs  etc.
 *
 * @param list
 * @param initialIndex
 * @param allowUnselected
 */
function useSelectableList<T>(
  list: T[] = [],
  initialIndex: number = 0,
  allowUnselected = false
): UseSelectableListReturnType<T> {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentValue = list[currentIndex];
  const selection = [currentIndex, currentValue];

  const updateSelection = useCallback(
    ({ index, value }: OptionalIndexValue<T>) => {
      return () => {
        warnIfBothValueAndIndexAreProvided("updateSelection", { index, value });
        if (typeof index !== "undefined") {
          setCurrentIndex(index);
        } else if (typeof value !== "undefined") {
          const valueIndex = list.indexOf(value);
          if (valueIndex > -1) {
            setCurrentIndex(valueIndex);
          } else {
            console.warn(
              `updateSelection failed. Does the value ${value} exist in the list?`
            );
          }
        }
      };
    },
    [list]
  );

  const toggleSelection = useCallback(
    ({ index, value }: OptionalIndexValue<T>) => {
      return () => {
        warnIfBothValueAndIndexAreProvided("toggleSelection", { index, value });
        if (typeof index !== "undefined") {
          if (currentIndex === index) {
            if (allowUnselected) {
              setCurrentIndex(-1);
            } else {
              console.warn("allowUnselected is false. Cannot unselect item");
            }
          } else {
            setCurrentIndex(index);
          }
        } else if (typeof value !== "undefined") {
          const valueIndex = list.indexOf(value);

          if (valueIndex > -1) {
            if (currentIndex === valueIndex) {
              if (allowUnselected) {
                setCurrentIndex(-1);
              } else {
                console.warn("allowUnselected is false. Cannot unselect item");
              }
            } else {
              setCurrentIndex(valueIndex);
            }
          } else {
            console.log("as");

            console.warn(
              `toggleSelection failed. Does the value ${value} exist in the list?`
            );
          }
        }
      };
    },
    [allowUnselected, currentIndex, list]
  );

  const matchSelection = useCallback(
    ({ index, value }: OptionalIndexValue<T>): boolean => {
      warnIfBothValueAndIndexAreProvided("matchSelection", { index, value });
      if (typeof index !== "undefined") {
        return index === currentIndex;
      } else {
        return value === currentValue;
      }
    },
    [currentIndex, currentValue]
  );

  const controls = {
    matchSelection,
    toggleSelection,
    updateSelection,
  };

  return [selection, controls];
}

export { useSelectableList };
