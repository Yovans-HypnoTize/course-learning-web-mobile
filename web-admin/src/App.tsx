import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import Header from './header/header/Header';
import Login from './page/admin/login/Login';
import CreateTeacher from './page/admin/teacher/CreateTeacher';
import TeacherList from './page/admin/teacher/TeacherList';
import Toaster from './components/common/Toaster';
import ChangePassword from './page/admin/login/ChangePassword';
import Cookies from "js-cookie";
import Dashboard from './page/admin/teacher/Dashboard';
import TeacherForgotPassword from './page/teacher/TeacherForgotPassword';
import TeacherDashboard from './page/teacher/dashboard/TeacherDashboard';
import CourseListingScreen from './page/teacher/courseManagement/CourseListingScreen';
import CreateCourse from './page/teacher/courseManagement/CreateCourse';
import SubscriptionList from './page/admin/subscription/SubscriptionList';
import CreateSubscription from './page/admin/subscription/CreateSubscription';
import LessonManagement from './page/teacher/courseManagement/CourseListingScreen';
import LessonDetail from './page/teacher/courseManagement/LessonDetail';
import UserListing from './page/admin/user/UserListing';
import UserPaymentDetails from './page/admin/user/UserPaymentDetails';


function App() {

  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [showHeader, setShowHeader] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState<string>();

  const NotFound = () => <h2 className='d-flex justify-content-center '>404 - Page Not Found</h2>;

  useEffect(() => {
    const roleCheck = Cookies.get("role");
    setRole(roleCheck);
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAdmin = role === "ADMIN";

  useEffect(() => {
    const token = Cookies.get("access_token");
    const roleCheck = Cookies.get("role");
    setRole(roleCheck);

    const isAdmin = roleCheck?.toUpperCase() === "ADMIN";
    const publicRoutes = ["/", "/forgot-password"];

    if (!token) {
      setShowHeader(false);
      if (!publicRoutes.includes(location.pathname)) {
        navigate("/");
      }
    } else {
      setShowHeader(true);
      if (location.pathname === "/") {
        isAdmin ? navigate("/teacher-list") : navigate("/teacher/dashboard");
      }
    }
  }, [location.pathname, navigate]);


  return (
    <>
      <Toaster />
      {showHeader ? (
        <>
          <Header sideNavOpen={sideNavOpen} setSideNavOpen={setSideNavOpen} />
          <div
            className={`main-content ${isMobileView && sideNavOpen ? 'overlay-mode' : ''}`}
            style={{ marginLeft: !isMobileView && sideNavOpen ? '220px' : '60px', backgroundColor: "#F2F4F9" }}>
            <Routes>
              {isAdmin ? (<>
                <Route path="/teacher-list" element={<TeacherList />} />
                <Route path="/create-teacher" element={<CreateTeacher />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/subscription-list" element={<SubscriptionList />} />
                <Route path="/create-subscription" element={<CreateSubscription />} />
                <Route path="/user-list" element={<UserListing />} />
                <Route path="/user-payment-details" element={<UserPaymentDetails />} />

              </>) : (<>
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/course-management" element={<CourseListingScreen />} />
                <Route path="/course-management" element={<LessonManagement />} />
                <Route path="/course-management/lesson/:lessonNo" element={<LessonDetail />} />

                <Route path="/create-course" element={<CreateCourse />} />
              </>)}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
          <Route path="/forgot-password" element={<TeacherForgotPassword />} />
        </Routes>
      )}
    </>
  );
}

export default App;
