import { useEffect, useState } from 'react';
import astroLogo from "../../assets/images/astro-logo.png";
import { Bell, UserPen } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faBuildingColumns,
    faChalkboardUser,
    faDollarSign,
    faGauge,
    faTicket,
    faUsers,
    faXmark
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AdminLogout } from '../../page/admin/login/LoginSlice';
import { ErrorNotify, SuccessNotify } from '../../components/common/Toaster';
import Cookies from "js-cookie";


type HeaderProps = {
    sideNavOpen: boolean;
    setSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ sideNavOpen, setSideNavOpen }: HeaderProps) {
    const toggleSideNav = () => setSideNavOpen(prev => !prev);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [roleCheck, setRoleCheck] = useState<any>();

    useEffect(() => {
        const roleCheck = Cookies.get("role");
        const isAdmin = roleCheck === "ADMIN";
        setRoleCheck(isAdmin);

        const handleResize = () => {
            setSideNavOpen(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            const result = await dispatch<any>(AdminLogout()).unwrap();
            if (result?.status === 200) {
                Cookies.remove('access_token');
                navigate('/');
                SuccessNotify(result?.message);
            }
        } catch (error: any) {
            ErrorNotify(error);
        }
    };


    return (
        <div className="d-flex">
            <div className={`sidenav ${!sideNavOpen ? 'closed' : ''}`}>
                <div className='main-logo px-3'>
                    <a href="#">
                        <img src={astroLogo} alt="Logo" className='img-fluid sidebar-logo' />
                    </a>
                </div>
                {roleCheck ? (<>
                    <div className='mt-4 d-flex flex-column gap-3'>
                        <Link to="/admin/dashboard" className="d-flex align-items-center gap-2 text-decoration-none ">
                            <FontAwesomeIcon icon={faGauge} className="p-0 m-0" />
                            <span className='sidebar-icons ps-2'>Dashboard</span>
                        </Link>
                        <Link to="/teacher-list" className="d-flex align-items-center gap-2 text-decoration-none ">
                            <FontAwesomeIcon icon={faChalkboardUser} className="p-0 m-0" />
                            <span className='sidebar-icons'>Teacher</span>
                        </Link>
                        <Link to="/subscription-list" className="d-flex align-items-center gap-2 text-decoration-none">
                            <FontAwesomeIcon icon={faDollarSign} className="p-0 m-0" />
                            <span className='sidebar-icons ps-2'>Subscription</span>
                        </Link>
                        <Link to="/user-list" className="d-flex align-items-center gap-2 text-decoration-none">
                            <FontAwesomeIcon icon={faUsers} className="p-0 m-0" />
                            <span className='sidebar-icons ps-1'>User</span>
                        </Link>
                        <Link to="#" className="d-flex align-items-center gap-2 text-decoration-none">
                            <FontAwesomeIcon icon={faBuildingColumns} className="p-0 m-0" />
                            <span className='sidebar-icons px-2'>Institute</span>
                        </Link>
                    </div>
                </>) : (<>
                    <div className='mt-4 d-flex flex-column gap-3'>
                        <Link to="/teacher/dashboard" className="d-flex align-items-center gap-2 text-decoration-none ">
                            <FontAwesomeIcon icon={faGauge} className="p-0 m-0" />
                            <span className='sidebar-icons ps-2'>Dashboard</span>
                        </Link>
                        <Link to="/course-management" className="d-flex align-items-center gap-2 text-decoration-none ">
                            <FontAwesomeIcon icon={faChalkboardUser} className="p-0 m-0" />
                            <span className='sidebar-icons'>Course</span>
                        </Link>
                        
                        <Link to="#" className="d-flex align-items-center gap-2 text-decoration-none">

                            <FontAwesomeIcon icon={faTicket} className="p-0 m-0" />
                            <span className='sidebar-icons ps-1'>Tickets</span>
                        </Link>
                        {/* <Link to="#" className="d-flex align-items-center gap-2 text-decoration-none">
                            <FontAwesomeIcon icon={faUsers} className="p-0 m-0" />
                            <span className='sidebar-icons ps-1'>User</span>
                        </Link>
                        <Link to="#" className="d-flex align-items-center gap-2 text-decoration-none">
                            <FontAwesomeIcon icon={faBuildingColumns} className="p-0 m-0" />
                            <span className='sidebar-icons px-2'>Institute</span>
                        </Link> */}
                    </div>
                </>)}

            </div>

            <button className={`toggle-sidebar-btn ${sideNavOpen ? 'open' : 'closed'}`}
                onClick={toggleSideNav}>
                <FontAwesomeIcon icon={sideNavOpen ? faXmark : faBars} />
            </button>

            <nav className="header-nav navbar flex-grow-1 pe-5 d-flex justify-content-end align-items-center">
                <a href="#" className="me-3 text-dark"><Bell /></a>
                <div className="btn-group">
                    <button type="button" className="btn" data-bs-toggle="dropdown" aria-expanded="false">
                        <UserPen />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="/">My Profile</a></li>
                        <li><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
