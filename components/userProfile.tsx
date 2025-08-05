'use client'

import { CIcon } from "@coreui/icons-react";
import { cilUser } from '@coreui/icons';
import Styles from '@/app/page.module.css'
import LogoutButtun from "@/components/logout"



export default function UserProfile() {

    return (
        <div className={ Styles.profile + " dropdown text-end" }>
            <a href="" className="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="false">
                <CIcon icon={cilUser} className={ Styles.icon + " rounded-circle"} />
                <span className="d-none d-sm-inline">پروفایل</span>
            </a>
            <ul className="dropdown-menu text-small" data-popper-placement="bottom-start">
                <li>
                    <LogoutButtun />
                </li>
            </ul>
        </div>
    )
}