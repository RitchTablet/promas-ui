import { AuthService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/Iuser";


import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

import MyTextField from "../../components/forms/Mytextfield";
import { IRegister } from "../../interfaces/IRegister";

const RegisterForm = () => {
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('El nombre completo es requerido'),
        username: Yup.string()
            .matches(/^\S*$/, 'No se permiten espacios en blanco')
            .required('El username es requerido'),
        email: Yup.string()
            .email('Ingresa un correo válido')
            .required('El correo es requerido'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('La contraseña es requerida'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required('Confirma tu contraseña'),
    });

    const navigate = useNavigate();

    const authService = new AuthService();

    const handleSubmit = async (register: IRegister,{ setSubmitting }) => {
        setSubmitting(false);

        const {fullName, username,email, password} = register;
        const user: IUser = {fullName, username,email, password};
        const isLoggin = await authService.register(user);
        if(isLoggin)
            navigate('../../home');
    };

    return (
        <div className="bg-white p-16 flex flex-col items-center gap-5 rounded-lg shadow-lg w-1/3">
            <h1 className="text-4xl font-semibold text-blue-400">Crea una cuenta</h1>
            <Formik
                initialValues={{
                    fullName: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form className="flex flex-col items-center gap-6 w-full">
                        <Field
                            name="fullName"
                            label="Nombre Completo"
                            variant="outlined"
                            fullWidth
                            component={MyTextField}
                            InputProps={{
                                startAdornment: (
                                    <UserIcon className="w-6 h-6" />
                                ),
                                error: Boolean(errors?.fullName && touched?.fullName),
                                helperText: errors?.fullName && touched?.fullName ? errors?.fullName : '',
                            }}
                        />
                        <Field
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            component={MyTextField}
                            InputProps={{
                                startAdornment: (
                                    <UserIcon className="w-6 h-6" />
                                ),
                                error: Boolean(errors?.username && touched?.username),
                                helperText: errors?.username && touched?.username ? errors?.username : '',
                            }}
                        />
                        <Field
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            component={MyTextField}
                            InputProps={{
                                startAdornment: (
                                    <EnvelopeIcon className="w-6 h-6" />
                                ),
                                error: Boolean(errors?.email && touched?.email),
                                helperText: errors?.email && touched?.email ? errors?.email : '',
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
                                startAdornment: (
                                    <LockClosedIcon className="w-6 h-6" />
                                ),
                                error: Boolean(errors?.password && touched?.password),
                                helperText: errors?.password && touched?.password ? errors?.password : '',
                            }}
                        />
                        <Field
                            name="confirmPassword"
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            component={MyTextField}
                            InputProps={{
                                startAdornment: (
                                    <LockClosedIcon className="w-6 h-6" />
                                ),
                                error: Boolean(errors?.confirmPassword && touched?.confirmPassword),
                                helperText: errors?.confirmPassword && touched?.confirmPassword ? errors?.confirmPassword : '',
                            }}
                        />
                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                className="bg-[#4C7FD0] px-8 py-2 w-48 rounded-2xl text-white shadow-xl"
                                disabled={isSubmitting}
                            >
                                Crear
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;