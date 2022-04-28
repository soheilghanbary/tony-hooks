import { useState } from "react";

const useField = (initial: string) => {
  const [value, setValue] = useState(initial);
  const handleChange = (e: any) => setValue(e.target.value);
  const handleReset = () => setValue(initial);
  return { value, rest: handleReset, bind: { onChange: handleChange } };
};

// export const useInput = (initial: string) => {
//   const [value, setValue] = useState(initial);
//   const handleChange = (e: any) => setValue(e.target.value);
//   const handleReset = () => setValue(initial);
//   return { value, rest: handleReset , onChange: handleChange };
// };

export default useField;
