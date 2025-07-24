import React from "react";
import { Link } from "react-router-dom";

export interface LessonListProps {
    lessons: any[];
    onViewLesson: (lessonNo: number) => void;
    loading: boolean;
}


const LessonList: React.FC<LessonListProps> = ({ lessons, onViewLesson, loading }) => {
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <h3>{lessons.length > 0 ? `${lessons[0].level} Lesson list` : "Lesson List"}</h3>
                <button className="common-btn px-3">
                    <Link to={"/create-course"} className="text-white">+ Create</Link>
                </button>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-danger">
                                <tr>
                                    <th>Lesson No</th>
                                    <th>Lesson Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={3} className="text-center">Loading...</td>
                                    </tr>
                                ) : lessons.length > 0 ? (
                                    lessons.map((lesson: any) => (
                                        <tr key={lesson.id}>
                                            <td>Lesson {lesson.lessonNo}</td>
                                            <td>{lesson.lessonTitle}</td>
                                            <td>
                                                <button
                                                    className="py-1 px-2 common-btn"
                                                    onClick={() => onViewLesson(lesson.lessonNo)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="text-center">No lessons available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};


export default LessonList;
