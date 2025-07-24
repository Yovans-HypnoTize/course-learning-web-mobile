import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CourseListing } from "./CourseManagementSlice";
import LessonList from "./LessonList";
import { useNavigate } from "react-router-dom";

export default function LessonManagement() {
    const [lessons, setLessons] = useState<any[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleViewLesson = (lessonNo: number) => {
        console.log(lessonNo);
        navigate(`/course-management/lesson/${lessonNo}`);
    };
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            setLoading(true); 
            try {
                const result = await dispatch<any>(
                    CourseListing({ page, size: pageSize, search })
                ).unwrap();
                const data = result?.data?.content;
                setLessons(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching lessons", error);
                setLessons([]);
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, [page, pageSize, search]);


    return (
        <div className="container mt-4">
            <LessonList lessons={lessons} onViewLesson={handleViewLesson} loading={loading} />
        </div>
    );
}
