import CreateTeacher from "./CreateTeacher";
import { Pencil, Plus, Search, Trash } from "lucide-react";
import EditTeacher from "./EditTeacher";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TeachersDelete, TeachersGetById, TeachersList } from "./TeacherSlice";
import type { RootState } from "../../../redux/store";
import { ErrorNotify, SuccessNotify } from "../../../components/common/Toaster";


export default function TeacherList() {

    const dispatch = useDispatch();
    const teachersPayloadList = useSelector((state: RootState) => state.teacherList.TeacherListPayload);

    useEffect(() => {
        dispatch<any>(TeachersList());
    }, []);

    const handleEdit = async (id: number) => {
        await dispatch<any>(TeachersGetById(id));
        const modal = new (window as any).bootstrap.Modal(document.getElementById("editmodal")!);
        modal.show();
    };

    const handleDelete = async (id: any) => {
        try {
            const result = await dispatch<any>(TeachersDelete(id)).unwrap();
            if (result?.status === 200) {
                SuccessNotify(result?.message || "Deleted successfully");
                const modalEl = document.getElementById('exampleModal');
                const modalInstance = (window as any).bootstrap.Modal.getInstance(modalEl!);
                modalInstance?.hide();
                dispatch<any>(TeachersList());
            } else {
                ErrorNotify(result?.message || "Failed to delete");
            }
        } catch (error: any) {
            ErrorNotify(error?.message || "Something went wrong");
        }
    };


    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="my-4 d-flex justify-content-between">
                        <h3 >Teacher List </h3>
                        <button
                            type="button"
                            className="common-btn px-3 py-2"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                        >
                            <Plus /> Create Teacher
                        </button>
                    </div>

                    <div className="col mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-5">
                                    <p></p>
                                    {/* <div className="d-flex align-items-center">
                                        <div className="input-group me-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search the result..."
                                            />
                                            <span className="input-group-text">
                                                <Search size={16} />
                                            </span>
                                        </div>
                                    </div> */}
                                </div>

                                <div className="mt-4 teacher-list">
                                    <table className="table table-striped">
                                        <thead className="table-danger">
                                            <tr>
                                                <td>ID</td>
                                                <td>Full Name</td>
                                                <td>Email</td>
                                                <td>Mobile</td>
                                                <td>Qualification</td>
                                                <td>Designation</td>
                                                <td>Course</td>
                                                {/* <td>Created</td> */}
                                                <td>Action</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teachersPayloadList?.data?.map((teacher: any, index: number) => (
                                                <tr key={teacher?.id || index}>
                                                    <td>{index + 1}</td>
                                                    <td>{teacher?.name}</td>
                                                    <td>{teacher?.email}</td>
                                                    <td>{teacher?.phoneNo}</td>
                                                    <td>{teacher?.qualification}</td>
                                                    <td>{teacher?.designation}</td>
                                                    <td>{teacher?.language}</td>
                                                    {/* <td>{new Date(teacher?.createdDate).toLocaleDateString()}</td> */}
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <button
                                                                type="button"
                                                                className="teacher-list-ebtn me-3"
                                                                onClick={() => handleEdit(teacher?.id)}
                                                            >
                                                                <Pencil size={15} />
                                                            </button>

                                                            {/* <div>
                                                                <button
                                                                    type="button"
                                                                    className="teacher-list-dbtn"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal"

                                                                >
                                                                    <Trash size={15} />
                                                                </button>
                                                            </div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            {teachersPayloadList?.data?.length === 0 && (
                                                <tr>
                                                    <td colSpan={9} className="text-center">No teachers found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Teacher</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Do you want to delete this Teacher?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" className="common-btn p-2" onClick={() => handleDelete(teachersPayloadList?.data[0]?.id)}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <CreateTeacher />
                    <EditTeacher />
                </div>
            </div>
        </section>
    );
}
