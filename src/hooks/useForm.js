import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function resetForm(nextValues = initialValues) {
    setValues(nextValues);
  }

  return { values, handleChange, resetForm };
}

export default useForm;
