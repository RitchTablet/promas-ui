import { TextField } from "@mui/material";
import { useFormikContext } from "formik";

const MyTextField = ({ field, form, ...props }) => {
    const { errors, touched } = useFormikContext();
    const errorText = touched[field.name] && errors[field.name];
  
    return (
      <TextField
        {...field}
        {...props}
        error={Boolean(errorText)}
        helperText={errorText}
      />
    );
};

export default MyTextField;