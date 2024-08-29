import { useState } from "react";

export default function useTextInput() {
  const [value, setValue] = useState<string>("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const reset = () => {
    setValue("");
  };

  const onValidationCheck = (): boolean => {
    return value !== "";
  };

  return {
    value,
    onChangeText,
    reset,
    onValidationCheck,
  };
}
