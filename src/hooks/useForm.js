import { useCallback, useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }, []);

  const resetForm = useCallback(
    (nextValues = initialValues) => {
      setValues(nextValues);
    },
    [initialValues],
  );

  return { values, handleChange, resetForm };
}

export default useForm;
