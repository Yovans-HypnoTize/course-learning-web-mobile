import { Field, Form, Formik, type FormikProps } from "formik";
import * as Yup from "yup";
import Label from "../../../components/common/Lable";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { createSubscription,fetchSubscriptionsList } from "./SubscriptionSlice";
import { SuccessNotify } from "../../../components/common/Toaster";

interface SubscriptionFormValues {
    role: string;
    courseLevel: string;
    planName: string;
    userCount: number | string;
    planSelection: number | string;
    price: number | string;
    planDescription: string;
    status: boolean;
}
interface CreateSubscriptionProps {
    page: number;
    pageSize: number;
    type: string;
    course: string;
    duration: string;
    setPage: (pg: number) => void;
}

const CreateSubscription: React.FC<CreateSubscriptionProps> = ({ page, pageSize, type, course, duration, setPage }) => {
    const dispatch = useDispatch();
    const SignupSchema = Yup.object().shape({
        role: Yup.string()
            .required("Subscription Type is required"),

        courseLevel: Yup.string()
            .required("Course Level is required"),

        planName: Yup.string()
            .trim()
            .min(3, "Plan Name must be at least 3 characters")
            .required("Plan Name is required"),

        userCount: Yup.number()
            .when("role", {
                is: (role: string) => role !== "3",
                then: (schema) =>
                    schema
                        .typeError("User Count must be a number")
                        .required("User Count is required")
                        .min(1, "User Count must be at least 1"),
                otherwise: (schema) => schema.notRequired(),
            }),

        planSelection: Yup.number()
            .typeError("Duration must be a number")
            .required("Duration is required")
            .min(1, "Duration must be at least 1 month"),

        price: Yup.number()
            .typeError("Price must be a number")
            .required("Price is required")
            .min(0, "Price cannot be negative"),

        planDescription: Yup.string()
            .trim()
            .min(5, "Description must be at least 5 characters")
            .required("Description is required"),

        status: Yup.boolean().required(),
    });

    const formikRef = useRef<FormikProps<SubscriptionFormValues>>(null);

    useEffect(() => {
        const modalEl = document.getElementById("createSubscriptionModal");
        const handleHidden = () => {
            if (formikRef.current) {
                formikRef.current.resetForm();
            }
        };
        if (modalEl) {
            modalEl.addEventListener("hidden.bs.modal", handleHidden);
        }
        return () => {
            if (modalEl) {
                modalEl.removeEventListener("hidden.bs.modal", handleHidden);
            }
        };
    }, []);


    const HandleSubmit = async (values: any) => {
        const result = await dispatch<any>(createSubscription(values)).unwrap();
        if (result?.status === 201) {
            SuccessNotify(result?.message);

            const modalEl = document.getElementById("createSubscriptionModal");
            if (modalEl) {
                const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
                if (modalInstance) {
                    modalInstance.hide();
                    setPage(1);
                    dispatch<any>(fetchSubscriptionsList({
                        page,
                        size: pageSize,
                        type,
                        course,
                        duration
                    }));
                }
            }
        }
    };


    return (
        <>
            <div
                className="modal fade"
                id="createSubscriptionModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog ">
                    <div className="modal-content create-teacher px-3">
                        <div className="modal-header ">
                            <h5 className="modal-title" id="exampleModalLabel">Create Subscription</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                innerRef={formikRef}
                                initialValues={{
                                    role: '',
                                    courseLevel: '',
                                    planName: '',
                                    userCount: '' || 0,
                                    planSelection: '',
                                    price: '',
                                    planDescription: '',
                                    status: false,
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={HandleSubmit}
                                validateOnChange={true}
                                validateOnBlur={true}
                            >
                                {({ values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                }) => (
                                    <Form>
                                        <div className="row">
                                            <div className="col-6">
                                                <Label className="form-label">Subscription Type</Label>
                                                <Field as="select" name="role" className={`form-select ${touched.role && errors.role ? "is-invalid" : ""}`}>
                                                    <option value="">Select</option>
                                                    <option value="4">Institute/Organization</option>
                                                    <option value="3">User</option>
                                                </Field>
                                                {errors.role && touched.role && (
                                                    <div className="text-danger">{errors.role}</div>
                                                )}
                                            </div>

                                            <div className="col-6">
                                                <Label className="form-label">Course</Label>
                                                <Field as="select" name="courseLevel"
                                                    className={`form-select ${touched.courseLevel && errors.courseLevel ? "is-invalid" : ""}`} >
                                                    <option value="">Select</option>
                                                    <option value="1">N1</option>
                                                    <option value="2">N2</option>
                                                    <option value="3">N3</option>
                                                    <option value="4">N4</option>
                                                    <option value="5">N5</option>
                                                </Field>
                                                {errors.courseLevel && touched.courseLevel && (
                                                    <div className="text-danger">{errors.courseLevel}</div>
                                                )}
                                            </div>

                                            <div className="col-6">
                                                <Label className="form-label">Plan Name</Label>
                                                <input name="planName" className={`form-control ${touched.planName && errors.planName ? "is-invalid" : ""}`}
                                                    autoComplete="off"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.planName} />
                                                {errors.planName && touched.planName && (
                                                    <div className="invalid-feedback">{errors.planName}</div>
                                                )}
                                            </div>

                                            {values.role !== "3" && (
                                                <div className="col-6">
                                                    <Label className="form-label">Max User Count</Label>
                                                    <Field
                                                        name="userCount"
                                                        type="number"
                                                        className={`form-control ${touched.userCount && errors.userCount ? "is-invalid" : ""}`}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                            )}

                                            <div className="col-6">
                                                <Label className="form-label">Duration (months)</Label>
                                                <Field as="select" name="planSelection"
                                                    className={`form-select ${touched.planSelection && errors.planSelection ? "is-invalid" : ""}`} >
                                                    <option value="">Select</option>
                                                    <option value="1">1 Month</option>
                                                    <option value="3">3 Months</option>
                                                    <option value="6">6 Months</option>
                                                    <option value="12">12 Months</option>
                                                </Field>
                                                {errors.planSelection && touched.planSelection && (
                                                    <div className="text-danger">{errors.planSelection}</div>
                                                )}
                                            </div>

                                            <div className="col-6">
                                                <Label className="form-label">Pricing</Label>
                                                <Field name="price" type="number"
                                                    className={`form-control ${touched.price && errors.price ? "is-invalid" : ""}`}
                                                    autoComplete="off" />
                                                {errors.price && touched.price && (
                                                    <div className="text-danger">{errors.price}</div>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <Label className="form-label">Description</Label>
                                                <Field as="textarea" name="planDescription" className={`form-control ${touched.planDescription && errors.planDescription ? "is-invalid" : ""}`} autoComplete="off" />
                                                {errors.planDescription && touched.planDescription && (
                                                    <div className="text-danger">{errors.planDescription}</div>
                                                )}
                                            </div>

                                            <div className="col-6 d-flex align-items-center my-3">
                                                <Field type="checkbox" name="status" className="form-check-input me-2" />
                                                <Label className="form-label m-0">Is Active</Label>
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="common-btn py-2 px-3">Submit</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
export default CreateSubscription;