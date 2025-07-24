import { Pencil, Plus, Trash } from "lucide-react";
import CreateSubscription from "./CreateSubscription";
import EditSubscription from "./EditSubscription";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubscription, fetchSubscriptionsList, GetByIdSubscription } from "./SubscriptionSlice";
import type { RootState } from "../../../redux/store";
import { SuccessNotify } from "../../../components/common/Toaster";
import Pagination from "../../../components/common/Pagination";


export default function SubscriptionList() {

    const dispatch = useDispatch();
    const subscriptions = useSelector((state: RootState) => state.Subscription.subscriptions);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [type, setType] = useState("");
    const [course, setCourse] = useState("");
    const [duration, setDuration] = useState("");

    const HandleClick = () => {
        const modal = new (window as any).bootstrap.Modal(document.getElementById("createSubscriptionModal")!);
        modal.show();
    };

    useEffect(() => {
        dispatch<any>(fetchSubscriptionsList({ page, size: pageSize, type, course, duration }));
    }, [page, pageSize, type, course, duration]);

    useEffect(() => {
        setPage(1);
    }, [type, course, duration]);


    const handleEdit = (id: any) => {
        const modal = new (window as any).bootstrap.Modal(document.getElementById("EditSubscriptionModal")!);
        modal.show(id);
        dispatch<any>(GetByIdSubscription(id))
    };

    const handleDelete = async () => {
        if (!deleteId) return;
        const result = await dispatch<any>(deleteSubscription(deleteId)).unwrap();
        if (result?.status === 201 || result?.status === 204) {
            SuccessNotify(result?.message);
            const modal = document.getElementById("exampleModal");
            if (modal) {
                const instance = (window as any).bootstrap.Modal.getInstance(modal);
                instance?.hide();
            }
            dispatch<any>(fetchSubscriptionsList({ page, size: pageSize, type, course, duration }));
        }
    };


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between py-3">
                        <h2>Subscription List</h2>
                        <button className="common-btn px-3" onClick={HandleClick}> <Plus /> Create Subscription</button>
                    </div>

                    <div className="card mt-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-end py-3">
                                <div className="me-3" style={{ width: '210px' }}>
                                    <select
                                        name="subscriptionType"
                                        className="form-select"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="">Subscription Type</option>
                                        <option value="4">Institute/Organization</option>
                                        <option value="3">User</option>
                                    </select>
                                </div>

                                <div className="me-3" style={{ width: '100px' }}>
                                    <select
                                        name="courseLevel"
                                        className="form-select"
                                        value={course}
                                        onChange={(e) => setCourse(e.target.value)}
                                    >
                                        <option value="">Course</option>
                                        <option value="1">N1</option>
                                        <option value="2">N2</option>
                                        <option value="3">N3</option>
                                        <option value="4">N4</option>
                                        <option value="5">N5</option>
                                    </select>
                                </div>

                                <div style={{ width: '130px' }}>
                                    <select
                                        name="duration"
                                        className="form-select"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    >
                                        <option value="">Duration</option>
                                        <option value="1">1 Month</option>
                                        <option value="3">3 Months</option>
                                        <option value="6">6 Months</option>
                                        <option value="12">12 Months</option>
                                    </select>
                                </div>

                                <button
                                    className="btn btn-outline-secondary ms-3"
                                    onClick={() => {
                                        setType("");
                                        setCourse("");
                                        setDuration("");
                                    }}
                                >
                                    Reset
                                </button>
                            </div>

                            <table className="table table-striped table-hover">
                                <thead className="table-danger text-center">
                                    <tr>
                                        <td>S.No</td>
                                        <td>Subscription Type</td>
                                        <td>Course</td>
                                        <td>Plan Name</td>
                                        <td>User Count</td>
                                        <td>Duration (Months)</td>
                                        <td>Pricing </td>
                                        <td>Plan Description</td>
                                        <td>Status </td>
                                        <td>Action </td>
                                    </tr>
                                </thead>

                                <tbody className="text-center">
                                    {Array.isArray(subscriptions?.data?.content) && subscriptions.data.content.length > 0 ? (
                                        subscriptions.data.content.map((sub: any, index: number) => (
                                            <tr key={sub.id || index}>
                                                <th>{(subscriptions?.data?.pagination?.currentPage - 1) * pageSize + index + 1}</th>
                                                <td>{sub.role === "STUDENT" ? "User" : "Institute/Organization"}</td>
                                                <td>{sub.courseLevel}</td>
                                                <td>{sub.planName}</td>
                                                <td>{sub.userCounts === 0 ? "-" : sub.userCounts}</td>
                                                <td>{sub.planSelection}</td>
                                                <td>{sub.price}</td>
                                                <td>{sub.planDescription}</td>
                                                <td>{sub.status}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <button
                                                            type="button"
                                                            className="teacher-list-ebtn"
                                                            onClick={() => handleEdit(sub.id)}
                                                        >
                                                            <Pencil size={15} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="teacher-list-dbtn me-0 ms-2"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal"
                                                            onClick={() => setDeleteId(sub.id)}
                                                        >
                                                            <Trash size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={10} className="text-center">No Subscription Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <Pagination
                                currentPage={subscriptions?.data?.pagination?.currentPage || 1}
                                totalPage={Math.ceil(subscriptions?.data?.pagination?.totalRecords / pageSize)}
                                hasNext={subscriptions?.data?.pagination?.nextPage}
                                hasPrevious={subscriptions?.data?.pagination?.previousPage}
                                nextPage={() => setPage((prev) => prev + 1)}
                                previousPage={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disableNext={!subscriptions?.data?.pagination?.nextPage}
                                disablePrevious={!subscriptions?.data?.pagination?.previousPage}
                                setPage={(pg: number) => setPage(pg)}
                            />

                        </div>
                    </div>


                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Subscription</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Do you want to delete this Subscription?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="common-btn p-2 px-3" onClick={() => handleDelete()}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateSubscription
                        page={page}
                        pageSize={pageSize}
                        type={type}
                        course={course}
                        duration={duration}
                        setPage={setPage}
                    />

                    <EditSubscription
                        page={page}
                        pageSize={pageSize}
                        type={type}
                        course={course}
                        duration={duration}
                    />

                </div>
            </div>
        </>
    )
}
