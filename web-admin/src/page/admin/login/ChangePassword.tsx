import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Label from '../../../components/common/Lable';
import Button from '../../../components/common/Button';
import { useDispatch } from 'react-redux';
import { SuccessNotify, ErrorNotify } from '../../../components/common/Toaster';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { TeacherChangePassword } from '../../teacher/TeacherLoginSlice';


const passwordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});


export default function ChangePassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = Cookies.get("access_token")

    const handleChange = async (values: { password: string; confirmPassword: string }, { setSubmitting }: any) => {
        try {
            const payload = {
                newPassword: values.password,
                confirmPassword: values.confirmPassword,
                token: token || "",
            };
            const result = await dispatch<any>(TeacherChangePassword(payload)).unwrap();
            if (result?.status === 200) {
                Cookies.remove('access_token');
                SuccessNotify(result?.message || 'Password changed successfully');
                navigate('/');
            }

        }
        catch (error: any) {
            ErrorNotify(error || "Login failed");
        }
        finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="profile-modal-overlay">
            <div className="profile-modal-content forgot-password shadow-sm bg-white">
                <div className="profile-modal-body p-4">
                    <h4 className="text-center py-3">Change Password</h4>
                    <Formik
                        initialValues={{ password: '', confirmPassword: '' }}
                        validationSchema={passwordSchema}
                        onSubmit={handleChange}
                    >
                        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                            <Form noValidate>

                                <div className="mb-3">
                                    <Label className="form-label" label="New Password" />
                                    <input
                                        name="password"
                                        type="password"
                                        placeholder="Enter new password"
                                        className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.password && touched.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <Label className="form-label pt-2" label="Confirm Password" />
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm new password"
                                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    )}
                                </div>

                                <div className="text-center mt-4">
                                    <button
                                        type="submit"
                                        className="profile-modal-btn  w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Saving...' : 'Submit'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
