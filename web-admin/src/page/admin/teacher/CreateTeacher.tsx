import { Formik, type FormikState } from "formik";
import * as Yup from "yup";
import Label from "../../../components/common/Lable";
import { useDispatch } from "react-redux";
import { CreateTeachers, TeachersList } from "./TeacherSlice";
import { SuccessNotify } from "../../../components/common/Toaster";
import { useEffect, useRef, useState } from "react";
import type { FormikProps } from "formik";
import { Eye, EyeOff } from "lucide-react";

export default function CreateTeacher() {

  const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

  interface FormValues {
    name: string;
    email: string;
    phoneNo: string;
    qualification: string;
    designation: string;
    language: string;
    password: string;
  }
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile Number must be 10 digits")
      .required("Mobile Number is required"),
    qualification: Yup.string().required("Qualification is required"),
    designation: Yup.string().required("Designation is required"),
    language: Yup.string().required("Language selection is required"),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: (nextState?: Partial<FormikState<FormValues>>) => void;
    }
  ) => {
    try {
      const result = await dispatch<any>(CreateTeachers(values)).unwrap();

      if (result?.status === 201) {
        const modalEl = document.getElementById('staticBackdrop');
        const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl!);
        modalInstance?.hide();
        SuccessNotify(result?.message);
        dispatch<any>(TeachersList());
        setSubmitting(false);
        resetForm();
      }
    }
    catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    const modalEl = document.getElementById('staticBackdrop');
    if (!modalEl) return;

    const handleClose = () => {
      formikRef.current?.resetForm();
    };

    modalEl.addEventListener('hidden.bs.modal', handleClose);

    return () => {
      modalEl.removeEventListener('hidden.bs.modal', handleClose);
    };
  }, []);


  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true">
      <div className="modal-dialog ">
        <div className="modal-content create-teacher">
          <div className="modal-header px-5">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Create Teacher
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>

          <Formik<FormValues>
            innerRef={formikRef}
            initialValues={{
              name: "",
              password: "",
              email: "",
              phoneNo: "",
              qualification: "",
              designation: "",
              language: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} >
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
                <div className="modal-body p-5">
                  <div className="row">
                    <div className="col-6">
                      <div className="mb-3">
                        <Label htmlFor="name" className="form-label">
                          Full Name
                        </Label>
                        <input
                          type="text"
                          name="name"
                          className={`form-control ${touched.name && errors.name ? "is-invalid" : ""
                            }`}
                          placeholder="Enter your full name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          autoComplete="off"
                        />
                        {errors.name && touched.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="email" className="form-label">
                          Email Address
                        </Label>
                        <input
                          type="email"
                          name="email"
                          className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''
                            }`}
                          placeholder="Enter your email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          autoComplete="off"

                        />
                        {errors.email && touched.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                        )}
                      </div>

                      {/* <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          className={`form-control pe-5 ${touched.password && errors.password ? 'is-invalid' : ''}`}
                          placeholder="Enter your password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          autoComplete="off"
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
                      </div> */}

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


                      <div className="mb-3">
                        <Label htmlFor="phoneNo" className="form-label">
                          Mobile Number
                        </Label>
                        <input
                          type="text"
                          name="phoneNo"
                          className={`form-control ${touched.phoneNo && errors.phoneNo
                            ? "is-invalid"
                            : ""
                            }`}
                          placeholder="Enter your mobile number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNo}
                          autoComplete="off"

                        />
                        {errors.phoneNo && touched.phoneNo && (
                          <div className="invalid-feedback">
                            {errors.phoneNo}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="mb-3">
                        <Label htmlFor="qualification" className="form-label">
                          Qualification
                        </Label>
                        <input
                          type="text"
                          name="qualification"
                          className={`form-control ${touched.qualification && errors.qualification
                            ? "is-invalid"
                            : ""
                            }`}
                          placeholder="Enter your qualification"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.qualification}
                          autoComplete="off"

                        />
                        {errors.qualification && touched.qualification && (
                          <div className="invalid-feedback">
                            {errors.qualification}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="designation" className="form-label">
                          Designation
                        </Label>
                        <input
                          type="text"
                          name="designation"
                          className={`form-control ${touched.designation && errors.designation
                            ? "is-invalid"
                            : ""
                            }`}
                          placeholder="Enter your designation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.designation}
                          autoComplete="off"

                        />
                        {errors.designation && touched.designation && (
                          <div className="invalid-feedback">
                            {errors.designation}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="language" className="form-label">
                          Course
                        </Label>
                        <select
                          name="language"
                          className={`form-select ${touched.language && errors.language ? "is-invalid" : ""
                            }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.language}
                        >
                          <option value="">Select a language</option>
                          <option value="N1">N1</option>
                          <option value="N2">N2</option>
                          <option value="N3">N3</option>
                          <option value="N4">N4</option>
                          <option value="N5">N5</option>
                        </select>
                        {errors.language && touched.language && (
                          <div className="invalid-feedback">{errors.language}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer px-4">
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
                    {isSubmitting ? "Submitting..." : "Submit"}
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
