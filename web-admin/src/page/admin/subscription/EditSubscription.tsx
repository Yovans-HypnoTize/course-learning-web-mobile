import Label from '../../../components/common/Lable';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import type { RootState } from '../../../redux/store';
import { fetchSubscriptionsList, updateSubscription } from './SubscriptionSlice';
import { SuccessNotify } from '../../../components/common/Toaster';

interface EditSubscriptionProps {
    page: number;
    pageSize: number;
    type: string;
    course: string;
    duration: string;
}

const EditSubscription: React.FC<EditSubscriptionProps> = ({ page, pageSize, type, course, duration }) => {
    const dispatch = useDispatch();

    const selectedSubscription = useSelector((state: RootState) => state.Subscription.selectedSubscription);

    const SignupSchema = Yup.object().shape({
        pricing: Yup.number()
            .typeError('Pricing must be a valid number')
            .positive('Pricing must be greater than 0')
            .required('Pricing is required'),

        description: Yup.string()
            .min(5, 'Description must be at least 10 characters long')
            .required('Description is required'),
    });

    const initialValues = {
        subscriptionType: selectedSubscription?.data?.role === "STUDENT" ? "User" : "Institute/Organization" || '',
        languageLevel: selectedSubscription?.data?.courseLevel || '',
        planName: selectedSubscription?.data?.planName || '',
        maxUserCount: selectedSubscription?.data?.userCounts || '',
        duration: selectedSubscription?.data?.planSelection || '',
        pricing: selectedSubscription?.data?.price || '',
        description: selectedSubscription?.data?.planDescription || '',
        isActive: selectedSubscription?.data?.status === 'ACTIVE',
    };

    const subscriptionId = selectedSubscription?.data?.id;

    const HandleSubmit = async (values: typeof initialValues) => {
        const payload = {
            price: values.pricing,
            planDescription: values.description,
            status: values.isActive
        };
        const result = await dispatch<any>(
            updateSubscription({ id: subscriptionId!, data: payload })
        ).unwrap();

        if (result?.status === 201) {
            SuccessNotify(result?.message);

            const modalEl = document.getElementById("EditSubscriptionModal");
            if (modalEl) {
                const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl);
                modalInstance?.hide();
            }
            dispatch<any>(fetchSubscriptionsList({
                page,
                size: pageSize,
                type,
                course,
                duration
            }));

        }
    };


    return (
        <>
            <div
                className="modal fade"
                id="EditSubscriptionModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content p-3">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Subscription</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <Formik
                                initialValues={initialValues}
                                enableReinitialize={true}
                                validationSchema={SignupSchema}
                                onSubmit={HandleSubmit}>

                                {({ errors, touched }) => (
                                    <Form>
                                        <div className="row">

                                            <div className="col-6">
                                                <Label className="form-label">Subscription Type</Label>
                                                <Field name="subscriptionType" className="form-control" readOnly />
                                            </div>

                                            <div className="col-6">
                                                <Label className="form-label">Course</Label>
                                                <Field name="languageLevel" className="form-control" readOnly />
                                            </div>

                                            <div className="col-6">
                                                <Label className="form-label">Plan Name</Label>
                                                <Field name="planName" className="form-control" readOnly />
                                            </div>

                                            {selectedSubscription?.data?.role === "INSTITUTION" ? (
                                                <div className="col-6">
                                                    <Label className="form-label">Max User Count</Label>
                                                    <Field name="maxUserCount" className="form-control" readOnly />
                                                </div>) : ""}

                                            <div className="col-6">
                                                <Label className="form-label">Duration (months)</Label>
                                                <Field name="duration" className="form-control" readOnly />
                                            </div>

                                            <div className="col-6">
                                                <Label className="form-label">Pricing</Label>
                                                <Field name="pricing" type="number" className="form-control" />
                                                {errors.pricing && touched.pricing && (
                                                    <div className="text-danger">{errors.pricing}</div>
                                                )}
                                            </div>

                                            <div className="col-12">
                                                <Label className="form-label">Description</Label>
                                                <Field as="textarea" name="description" className="form-control" />
                                                {errors.description && touched.description && (
                                                    <div className="text-danger">{errors.description}</div>
                                                )}
                                            </div>

                                            <div className="col-6 d-flex align-items-center my-3">
                                                <Field type="checkbox" name="isActive" className="form-check-input me-2" />
                                                <Label className="form-label mb-0">Is Active</Label>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Submit</button>
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

export default EditSubscription;