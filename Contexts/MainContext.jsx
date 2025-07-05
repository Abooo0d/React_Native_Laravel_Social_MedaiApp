import { createContext, useContext, useState } from "react";

const INITIAL_DATA = {
  errors: [],
  successMessage: "",
  setErrors: () => {},
  setSuccessMessage: () => {},
};
const Context = createContext(INITIAL_DATA);
export const MainContext = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  return (
    <Context.Provider
      value={{
        errors,
        setErrors,
        successMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useMainContext = () => useContext(Context);
