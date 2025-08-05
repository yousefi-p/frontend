'use client';

import { CIcon } from "@coreui/icons-react";
import { cilTennisBall } from '@coreui/icons';
import UserProfile from "./userProfile";
import { useAuth } from "@/context/AuthContext";


export default function Header() {

    const { user, loading } = useAuth();
    return (
        <header>
            <nav className="navbar navbar-expand-lg " dir="rtl">
                <div className="container-fluid header-content">
                    <a href="/" className="navbar-brand"><CIcon className="icon" icon={cilTennisBall} /><span className="logo"> ام کلاب </span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse nav-links" id="navbarSupportedContent">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/">خانه</a>
                            </li>
                            {loading ? (
                                <li className="nav-item">
                                    <span className="nav-link">Loading...</span>
                                </li>
                            ) : user ? (
                                <li className="nav-item">
                                    <UserProfile />
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">ورود</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
