import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Label from '../../components/common/Lable';
import { useDispatch } from 'react-redux';
import { ErrorNotify, SuccessNotify } from '../../components/common/Toaster';
import { TeacherForgotPW } from './TeacherLoginSlice';
import { useNavigate } from 'react-router-dom';


const emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const passwordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});


export default function TeacherForgotPassword() {

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const HandleSubmitemail = async (values: any,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            const result = await dispatch<any>(TeacherForgotPW(values)).unwrap();
            console.log(result?.message);
            console.log(result?.status);
            if (result?.status === 200) {
                SuccessNotify(result?.message || "Email send successfully");
                setShowModal(true);
            }
        }
        catch (error: any) {
            ErrorNotify(error || "Login failed");
        }
        finally {
            setSubmitting(false);
        }
    }

    const handleClose = () => {
        setShowModal(false);
        navigate("/");
    }

    return (
        <div className="profile-modal-overlay">
            <div className="profile-modal-content forgot-password shadow-sm bg-white">
                <div className="profile-modal-body p-4">
                    <h4 className="text-center py-3">Forgot Password</h4>
                    {!showPasswordForm ? (
                        <Formik
                            initialValues={{ email: '' }}
                            validationSchema={emailSchema}
                            onSubmit={HandleSubmitemail}>
                            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                                <Form noValidate>
                                    <Label className="form-label pb-2" label="Enter your email to reset password" />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="form-control"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.email && touched.email && (
                                        <div className="text-danger small mt-1">{errors.email}</div>
                                    )}
                                    <div className="text-center mt-4">
                                        <button
                                            type="submit"
                                            className="profile-modal-btn w-100">
                                            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <Formik
                            initialValues={{ password: '', confirmPassword: '' }}
                            validationSchema={passwordSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true);
                            }}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                                <Form noValidate>
                                    <Label className="form-label" label="New Password" />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter new password"
                                        className="form-control"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password && (
                                        <div className="text-danger small mt-1">{errors.password}</div>
                                    )}
                                    <Label className="form-label pt-3" label="Confirm Password" />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm new password"
                                        className="form-control"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="text-danger small mt-1">{errors.confirmPassword}</div>
                                    )}
                                    <div className="text-center mt-4">
                                        <button
                                            type="submit"
                                            className="profile-modal-btn w-100">
                                            {isSubmitting ? 'Saving...' : 'Submit'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    )}
                </div>
            </div>

            {showModal && (
                <div
                    className="modal fade show"
                    tabIndex={-1}
                    aria-hidden={!showModal}
                    style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered ">
                        <div className="modal-content p-4">
                            <div className="modal-body text-center">
                                <p>Reset link sent! Please check your email.</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button
                                    type="button"
                                    className=" login-btn w-50 py-2"
                                    onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}
