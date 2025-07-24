import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CourseListing } from "./CourseManagementSlice";

export default function LessonDetail() {
    const { lessonNo } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [lesson, setLesson] = useState<any>(null);

    useEffect(() => {
        const fetchLesson = async () => {
            const result = await dispatch<any>(
                CourseListing({ page: 1, size: 100, search: "" })
            ).unwrap();
            console.log(result?.data?.content);
            const lessonData = result?.data?.content?.find(
                (item: any) => item.lessonNo === Number(lessonNo)
            );
            setLesson(lessonData);
        };
        fetchLesson();
    }, [lessonNo]);

    if (!lesson) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Lesson: {lesson.lessonTitle}</h3>
                <button className="mb-3 common-btn py-2 px-3 text-white" onClick={() => navigate(-1)}>
                    Back to Lessons
                </button>
            </div>
            <div className="card p-4 mb-4 shadow-sm">
                <h5>Course Video</h5>
                <video width="100%" height="600" controls className="rounded mt-2">
                    <source src={lesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="card p-4 mb-4 shadow-sm">
                <h5 className="mb-3">Assessment Questions</h5>
                {lesson.questionsList.map((q: any, i: number) => (
                    <div key={i} className="border rounded p-3 mb-3 bg-light">
                        <p><strong>Question No:</strong> {q.questionsNo}</p>
                        <p><strong>Type:</strong> {q.questionsType}</p>
                        <p><strong>Question:</strong> {q.question}</p>
                        {q.questionsType === "MCQ" && (
                            <ul>
                                {q.optionsResponseList.map((opt: any, index: number) => (
                                    <li key={index}>{opt.option}</li>
                                ))}
                            </ul>
                        )}
                        <p><strong>Correct Answer:</strong> {q.answer}</p>
                    </div>
                ))}
            </div>

            <div className="card p-4 shadow-sm">
                <h5 className="mb-3">Pass Mark</h5>
                <input
                    type="number"
                    className="form-control w-25"
                    value={lesson.passMarks}
                    readOnly
                />
            </div>
        </div>
    );
}
