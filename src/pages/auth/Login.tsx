import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

import MyTextField from "../../components/forms/Mytextfield";
import { ILogin } from "../../interfaces/ILogin";

const LoginForm = () => {
    const validationSchema = Yup.object().shape({
      username: Yup.string()
        .matches(/^\S*$/, 'No se permiten espacios en blanco')
        .required('El username es requerido'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es requerida'),
    });

    const navigate = useNavigate();

    const authService = new AuthService();

    const handleSubmit = async (ilogin:ILogin, { setSubmitting }) => {
        setSubmitting(false);

        const {username, password} = ilogin;
        const isLoggin = await authService.login(username, password);
            if(isLoggin)
                navigate('/home');
    };

    const onGotoRegister = ()=> {
        navigate('/auth/register');
    }

    return (
      <div className="bg-white p-16 flex flex-col items-center gap-5 rounded-lg shadow-lg w-1/3">
        <h1 className="text-4xl font-semibold text-[#4C7FD0]">Ingresa a Promas Blog</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="flex flex-col items-center gap-6 w-full">
                <Field
                    name="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    component={MyTextField}
                    InputProps={{
                        startAdornment: (<UserIcon className="w-6 h-6" />),
                        error: Boolean(errors?.username && touched?.username),
                        helperText: errors?.username && touched?.username ? errors?.username : '',
                    }}
                />
  
                <Field
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    component={MyTextField}
                    InputProps={{
                        startAdornment: (<LockClosedIcon className="w-6 h-6"/>),
                        error: Boolean(errors?.password && touched?.password),
                        helperText: errors?.password && touched?.password ? errors?.password : '',
                    }}
                />
  
              <div className="flex flex-col gap-3 items-center justify-center">
                <div className="cursor-pointer text-gray-400 font-medium border-b pb-1" onClick={onGotoRegister}>Registrate!</div>
                <button
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                  className="bg-[#4C7FD0] px-8 py-2 w-48 rounded-2xl text-white shadow-xl"
                >
                  Ingresar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
};

export default LoginForm;
