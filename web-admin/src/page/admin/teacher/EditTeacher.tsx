import { Formik } from "formik";
import * as Yup from "yup";
import Label from "../../../components/common/Lable";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { TeachersEdit, TeachersList } from "./TeacherSlice";
import { useEffect } from "react";
import { SuccessNotify } from "../../../components/common/Toaster";


export default function EditTeacher() {

    const teacher = useSelector((state: RootState) => state.teacherList.TeachersGetByIdPayload);

    const dispatch = useDispatch();

    interface FormValues {
        fullName: string;
        email: string;
        mobileNumber: string;
        qualification: string;
        designation: string;
        lessonPermission: boolean;
        active: boolean;
        language: string;
    };

    const initialValues = {
        fullName: teacher?.data?.name || "",
        email: teacher?.data?.email || "",
        mobileNumber: teacher?.data?.phoneNo || "",
        qualification: teacher?.data?.qualification || "",
        designation: teacher?.data?.designation || "",
        lessonPermission: teacher?.data?.lessonPermission || false,
        active: teacher?.data?.active || false,
        language: teacher?.data?.language || "",
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        mobileNumber: Yup.string()
            .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits")
            .required("Mobile Number is required"),
        qualification: Yup.string().required("Qualification is required"),
        designation: Yup.string().required("Designation is required"),
        lessonPermission: Yup.boolean().required("Course permission is required"),
        active: Yup.boolean().required("Active status is required"),
        language: Yup.string().required("Language is required"),
    });

    useEffect(() => {
        window.history.replaceState(null, "", window.location.pathname);
    }, []);
    const TeacherId = teacher?.data?.id;


    const HandleSubmit = async (values: typeof initialValues) => {
        const payload = {
            id: teacher?.data?.id,
            name: values.fullName,
            email: values.email,
            phoneNo: values.mobileNumber,
            qualification: values.qualification,
            designation: values.designation,
            language: values.language,
        };

        const result = await dispatch<any>(
            TeachersEdit({ id: TeacherId!, data: payload })
        ).unwrap();

        if (result?.status === 201) {
            SuccessNotify(result?.message);

            const modalEl = document.getElementById("editmodal");
            if (modalEl) {
                const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
                modalInstance?.hide();
            }
            dispatch<any>(TeachersList());
        }
    };



    return (
        <div
            className="modal fade"
            id="editmodal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Edit Teacher
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <Formik<FormValues>
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={HandleSubmit}>

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
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <Label className="" htmlFor="fullName">Full Name</Label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            className={`form-control ${touched.fullName && errors.fullName ? "is-invalid" : ""}`}
                                            placeholder="Enter your full name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.fullName}
                                        />
                                        {errors.fullName && touched.fullName && (
                                            <div className="invalid-feedback">{errors.fullName}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <Label className="" htmlFor="email">Email</Label>
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                                            placeholder="Enter your email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        {errors.email && touched.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <Label className="" htmlFor="mobileNumber">Mobile Number</Label>
                                        <input
                                            type="text"
                                            name="mobileNumber"
                                            className={`form-control ${touched.mobileNumber && errors.mobileNumber ? "is-invalid" : ""
                                                }`}
                                            placeholder="Enter your mobile number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.mobileNumber}
                                        />
                                        {errors.mobileNumber && touched.mobileNumber && (
                                            <div className="invalid-feedback">{errors.mobileNumber}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <Label className="" htmlFor="qualification">Qualification</Label>
                                        <input
                                            type="text"
                                            name="qualification"
                                            className={`form-control ${touched.qualification && errors.qualification ? "is-invalid" : ""
                                                }`}
                                            placeholder="Enter your qualification"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.qualification}
                                        />
                                        {errors.qualification && touched.qualification && (
                                            <div className="invalid-feedback">{errors.qualification}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <Label className="" htmlFor="designation">Designation</Label>
                                        <input
                                            type="text"
                                            name="designation"
                                            className={`form-control ${touched.designation && errors.designation ? "is-invalid" : ""
                                                }`}
                                            placeholder="Enter your designation"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.designation} />

                                        {errors.designation && touched.designation && (
                                            <div className="invalid-feedback">{errors.designation}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <Label className="" htmlFor="language">Language</Label>
                                        <input
                                            type="text"
                                            name="language"
                                            className={`form-control ${touched.language && errors.language ? "is-invalid" : ""}`}
                                            placeholder="Enter your designation"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.language}
                                            disabled={values.language} />
                                        {errors.language && touched.language && (
                                            <div className="invalid-feedback">{errors.language}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="without-bg-btn px-3 py-1"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="submit"
                                        className="common-btn px-3 py-1"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Update"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}
