import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import astroLogo from "../../../assets/images/astro-logo.png";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from './LoginSlice';
import { ErrorNotify, SuccessNotify } from '../../../components/common/Toaster';
import Cookies from "js-cookie";


interface FormValues {
    email: string;
    password: string;
}

const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});


const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            const result = await dispatch<any>(adminLogin(values)).unwrap();
            const access_token = result?.accessToken;
            const role = result?.role;
            if (access_token && role) {
                Cookies.set('access_token', access_token, { expires: 1 });
                Cookies.set('role', role, { expires: 1 });
                SuccessNotify(result?.message);
                const roleCheck = result?.role === "ADMIN";
                if (roleCheck) {
                    navigate("/admin/dashboard");
                } else {
                    navigate('/teacher/dashboard');
                }
            } else {
                ErrorNotify('Access token not found in the response.');
            }
        }
        catch (error: any) {
            ErrorNotify(error || "Login failed");
        }
        finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="login-section d-flex justify-content-center align-items-center">
            <div className="container my-auto">
                <div className="row shadow-lg rounded overflow-hidden login-card">
                    <div className="col-md-6 d-none d-md-block login-right login-overlay"></div>
                    <div className="col-md-6 bg-white p-md-5 p-3">
                        <div className="card-body p-md-5 p-sm-3">
                            <div className="text-center mb-3">
                                <img src={astroLogo} alt="Logo" style={{ width: 100 }} />
                            </div>
                            <h2 className="text-center mb-4">Welcome Back</h2>
                            <Formik<FormValues>
                                initialValues={{ email: '', password: '' }}
                                validationSchema={loginSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <form onSubmit={handleSubmit} noValidate>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                                placeholder="Enter your email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            {errors.email && touched.email && (
                                                <div className="invalid-feedback">{errors.email}</div>
                                            )}
                                        </div>

                                        <div className="mb-3 position-relative">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                className={`form-control pe-5 ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                                placeholder="Enter your password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />

                                            {values.password.length > 0 && (
                                                <div
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="position-absolute"
                                                    style={{
                                                        right: "10px",
                                                        top: "38px",
                                                        cursor: "pointer",
                                                        zIndex: 10
                                                    }}
                                                >
                                                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                                                </div>
                                            )}

                                            {errors.password && touched.password && (
                                                <div className="invalid-feedback">{errors.password}</div>
                                            )}
                                        </div>

                                        <div className='text-end py-2 pt-0'>
                                            <Link to="/forgot-password">forget Password</Link>
                                        </div>

                                        <div className="d-grid">
                                            <button
                                                type="submit"
                                                className="login-btn py-2"
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Logging in...' : 'Login'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Login;
