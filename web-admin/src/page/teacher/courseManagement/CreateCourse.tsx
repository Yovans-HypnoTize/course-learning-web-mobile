import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import { useDispatch } from "react-redux";
import { CourseUpload, GetLessons } from "./CourseManagementSlice";
import { ErrorNotify, SuccessNotify } from "../../../components/common/Toaster";
import { TriangleAlert } from "lucide-react";


export default function CreateCourseStepper() {

    const [step, setStep] = useState(1);
    const dispatch = useDispatch();
    const [lessonTitle, setLessonTitle] = useState("");
    const [passMark, setPassMark] = useState("");
    const [video, setVideo] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [questionsList, setQuestionsList] = useState<any[]>([]);
    const [lessonNo, setLessonNo] = useState(0);
    const [gettheCourse, setGettheCourse] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const questionsPerPage = 10;

    const [tempQuestionData, setTempQuestionData] = useState({
        questionType: "Choose",
        questionText: "",
        options: ["", "", "", ""],
        answer: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getLessons = await dispatch<any>(GetLessons()).unwrap();
                if (getLessons?.status === 200) {
                    const totalCourseCount = getLessons?.data?.lessionList;
                    setLessonNo(totalCourseCount.length + 1);
                    setGettheCourse(getLessons?.data?.courseLevel);
                }
            } catch (error) {
                ErrorNotify("Error fetching lessons:");
            }
        };
        const currentQuestion = questionsList[currentQuestionIndex];
        if (currentQuestion) {
            setTempQuestionData({
                questionType:
                    currentQuestion.questionsType === "TRUE_FALSE"
                        ? "True/False"
                        : currentQuestion.questionsType === "fill in the blanks"
                            ? "Fill in the Blanks"
                            : "Choose",
                questionText: currentQuestion.questions,
                options: currentQuestion.options?.map((o: any) => o.option) || ["", "", "", ""],
                answer: currentQuestion.answer || "",
            });
        } else {
            setTempQuestionData({
                questionType: "Choose",
                questionText: "",
                options: ["", "", "", ""],
                answer: "",
            });
        }
        fetchData();
    }, [currentQuestionIndex]);



    const handleAddQuestion = (e: any) => {
        e.preventDefault();
        const { questionType, questionText, options, answer } = tempQuestionData;
        let formattedOptions: any[] = [];
        if (questionType === "True/False") {
            formattedOptions = [
                { optionsId: "1", option: true },
                { optionsId: "2", option: false },
            ];
        } else if (questionType === "Choose") {
            formattedOptions = options.map((opt, i) => ({
                optionsId: (i + 1).toString(),
                option: opt.trim(),
            }));
        } else if (questionType === "Fill in the Blanks") {
            formattedOptions = [{ optionsId: "1", option: answer.trim() }];
        }
        const newQuestion = {
            questionNo: (currentQuestionIndex + 1).toString(),
            questions: questionText,
            questionsType:
                questionType === "True/False"
                    ? "TRUE_FALSE"
                    : questionType === "Fill in the Blanks"
                        ? "fill in the blanks"
                        : "MCQ",
            options: formattedOptions,
            answer,
        };
        const updatedList = [...questionsList];
        if (questionsList[currentQuestionIndex]) {
            updatedList[currentQuestionIndex] = newQuestion;
        } else {
            updatedList.push(newQuestion);
        }
        setQuestionsList(updatedList);
        setCurrentQuestionIndex((prev) => prev + 1);
    };


    const handleSubmit = async () => {
        const formData = new FormData();
        const courseData = {
            lessonTitle,
            description,
            lessonNo,
            passMark,
            questionsList,
        };
        formData.append("courseData", JSON.stringify(courseData));
        if (video) formData.append("file", video);
        try {
            const result = await dispatch<any>(CourseUpload(formData)).unwrap();
            if (result.status === 200) {
                navigate("/course-management");
                SuccessNotify(result.message);
            }
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    const handleNext = () => {
        if (step === 1 && (!lessonTitle || !video)) {
            ErrorNotify("Please enter lesson title and upload a video");
            return;
        }
        if (step === 2 && questionsList.length < 1) {
            ErrorNotify("Please add at least one question");
            return;
        }
        if (step < 3) setStep(step + 1);
    };

    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("video/")) {
            setVideo(file);
        } else {
            ErrorNotify("Please upload a valid video file.");
            e.target.value = null;
            setVideo(null);
        }
    };

    const HandleChangeMark = (e: any) => {
        const value = e.target.value;
        if (value >= 0 && value <= 10) {
            setPassMark(value);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h3>Add New Course Lesson</h3>
                <Button className="common-btn px-3" type="button">
                    <Link to="/course-management" className="text-white">Back</Link>
                </Button>
            </div>

            <div className="stepper position-relative mb-4">
                <div className="progress-line" style={{ width: step === 1 ? "0%" : step === 2 ? "32%" : "63%" }}></div>
                {["Upload Video", "Assignment", "Preview"].map((label, i) => (
                    <div
                        key={i}
                        className={`step ${step >= i + 1 ? "active" : ""}`}
                        onClick={() => step > i + 1 && setStep(i + 1)}
                        style={{ cursor: step > i + 1 ? "pointer" : "default" }}
                    >
                        <div className="step-circle">{i + 1}</div>
                        <div className="step-label">{label}</div>
                    </div>
                ))}
            </div>

            {step === 1 && (
                <div className="card p-4 shadow-sm">
                    <h5 className="mb-3">Step 1: Upload Course Video</h5>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleNext();
                    }}>
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <label className="form-label">Course Level</label>
                                <input type="text" className="form-control" autoComplete="off" value={gettheCourse} readOnly />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Lesson No</label>
                                <input type="text" className="form-control" value={lessonNo} readOnly />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Lesson Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter lesson title"
                                    value={lessonTitle}
                                    autoComplete="off"
                                    onChange={(e) => setLessonTitle(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3 d-flex">
                            <div className="col-6">
                                <label className="form-label">Upload Video</label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    className="form-control"
                                    onChange={(e) => handleFileChange(e)}
                                />
                                {video && (
                                    <div className="mt-2">
                                        <strong>Selected File:</strong> {video.name}
                                    </div>
                                )}
                            </div>

                            <div className="col-6">
                                <label className="form-label">Pass Mark</label>
                                <input
                                    type="number"
                                    className="form-control "
                                    placeholder="Enter pass mark/10"
                                    value={passMark}
                                    // onChange={(e) => setPassMark((e.target.value))}
                                    onChange={(e) => HandleChangeMark(e)}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter lesson title"
                                    value={description}
                                    autoComplete="off"
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="text-end">
                            <button type="submit" className="common-btn py-2 px-3" >Next</button>
                        </div>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div className="card p-4 shadow-sm">
                    <div className="d-flex justify-content-between">
                        <h5 className="mb-3">Step 2: Add Assessment Questions</h5>
                        <h5 className="mb-3">
                            {questionsList[currentQuestionIndex] ? `Editing Question ${currentQuestionIndex + 1}` : `Creating Question ${currentQuestionIndex + 1}`}
                        </h5>
                    </div>

                    <form onSubmit={handleAddQuestion}>
                        <div className="border rounded p-3 mb-3 bg-light">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Type</label>
                                    <select
                                        className="form-select"
                                        value={tempQuestionData.questionType}
                                        onChange={(e) => {
                                            const selectedType = e.target.value;
                                            setTempQuestionData((prev) => ({
                                                ...prev,
                                                questionType: selectedType,
                                                options:
                                                    selectedType === "Choose"
                                                        ? ["", "", "", ""]
                                                        : selectedType === "True/False"
                                                            ? ["True", "False"]
                                                            : [],
                                                answer: "",
                                            }));
                                        }}
                                        required
                                    >
                                        <option value="" disabled>Select the type</option>
                                        <option value="True/False">True/False</option>
                                        <option value="Fill in the Blanks">Fill Up</option>
                                        <option value="Choose">Choose</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Question</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter question"
                                        autoComplete="off"
                                        value={tempQuestionData.questionText}
                                        onChange={(e) =>
                                            setTempQuestionData((prev) => ({
                                                ...prev,
                                                questionText: e.target.value,
                                            }))
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            {tempQuestionData.questionType === "Choose" && (
                                <div className="row mb-3">
                                    {tempQuestionData.options.map((opt, i) => (
                                        <div className="col-md-3" key={`opt-${i}`}>
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                autoComplete="off"
                                                placeholder={`Option ${i + 1}`}
                                                value={opt}
                                                onChange={(e) => {
                                                    const updated = [...tempQuestionData.options];
                                                    updated[i] = e.target.value;
                                                    setTempQuestionData((prev) => ({
                                                        ...prev,
                                                        options: updated,
                                                    }));
                                                }}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {tempQuestionData.questionType === "True/False" && (
                                <div className="mb-3">
                                    <label className="form-label">Select the correct answer</label>
                                    <div className="d-flex">
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="trueFalseAnswer"
                                                id="trueOption"
                                                value="True"
                                                checked={tempQuestionData.answer === "True"}
                                                onChange={(e) =>
                                                    setTempQuestionData((prev) => ({
                                                        ...prev,
                                                        answer: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="trueOption">
                                                True
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="trueFalseAnswer"
                                                id="falseOption"
                                                value="False"
                                                checked={tempQuestionData.answer === "False"}
                                                onChange={(e) =>
                                                    setTempQuestionData((prev) => ({
                                                        ...prev,
                                                        answer: e.target.value,
                                                    }))
                                                }
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="falseOption">
                                                False
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mb-2">
                                <label className="form-label">Correct Answer</label>
                                <input
                                    type={tempQuestionData.questionType === "Choose" ? "number" : "text"}
                                    className="form-control"
                                    placeholder={
                                        tempQuestionData.questionType === "Fill in the Blanks"
                                            ? "Enter correct answer"
                                            : "Enter correct option number (e.g., 1)"
                                    }
                                    value={tempQuestionData.answer}
                                    onChange={(e) =>
                                        setTempQuestionData((prev) => ({
                                            ...prev,
                                            answer: e.target.value,
                                        }))
                                    }
                                    required
                                    readOnly={tempQuestionData.questionType === "True/False"}
                                />
                            </div>

                            <h5 className="mt-4">
                                <TriangleAlert size={30} /> Upload exactly 50 questions at once.
                            </h5>

                            <div className="d-flex justify-content-end mt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-3"
                                    disabled={currentQuestionIndex === 0}
                                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                                >
                                    Back
                                </button>
                                <button type="submit" className="btn common-btn text-white">
                                    {questionsList[currentQuestionIndex] ? "Update & Next" : "Add & Next"}
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="d-flex justify-content-between">
                        <button className="btn btn-secondary" onClick={handlePrev}>
                            Back
                        </button>
                        <button className="common-btn py-1 px-3" onClick={handleNext}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="card p-4 shadow-sm">
                    <h5 className="mb-4">Step 3: Preview & Submit</h5>

                    <div className="mb-4">
                        <h6>Lesson Title: {lessonTitle}</h6>
                        {video && (
                            <video width="100%" height="500" controls className="rounded mt-2 mb-3">
                                <source src={URL.createObjectURL(video)} type="video/mp4" />
                            </video>
                        )}
                    </div>

                    <h6 className="mb-3"> Assessment Questions</h6>
                    {questionsList
                        .slice((currentPage - 1) * questionsPerPage, currentPage * questionsPerPage)
                        .map((q, i) => (
                            <div className="border rounded p-3 mb-2 bg-light" key={i}>
                                <p><strong>Q{q.questionNo}:</strong> {q.questions}</p>

                                {q.questionsType === "MCQ" && Array.isArray(q.options) && (
                                    <ul>
                                        {q.options.map((opt: any, idx: number) => (
                                            <li key={idx}>{opt.option || opt}</li>
                                        ))}
                                    </ul>
                                )}
                                <p><strong>Correct Answer:</strong> {q.answer?.toString() || "Not provided"}</p>
                            </div>
                        ))}

                    <div className="d-flex justify-content-center pt-4">
                        <nav aria-label="Pagination">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>&laquo;</button>
                                </li>
                                {Array.from({ length: Math.ceil(questionsList.length / questionsPerPage) }, (_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === Math.ceil(questionsList.length / questionsPerPage) ? "disabled" : ""}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                        <button className="btn btn-secondary" onClick={handlePrev}>Back</button>
                        <button className="btn btn-success px-4" onClick={handleSubmit}>Submit Course Lesson</button>
                    </div>
                </div>
            )}
        </div >
    );
}
