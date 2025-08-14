
import { CIcon } from "@coreui/icons-react";
import { cilPlaylistAdd } from '@coreui/icons';
import Link from 'next/link';
import FormModal from "./FormModal";
import { useState, useEffect } from "react";

interface DataBoxProps {
    name?: string;
    faName: string;
    data?: number;
    message: string;
}

export default function DataBox({ name, faName, data, message }: DataBoxProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const modalElement = document.getElementById("addModal");
        if (modalElement) {
            modalElement.addEventListener("hidden.bs.modal", () => setIsModalOpen(false));
        }
    }, []);


    return (
        <div className="col-md-4 ">
            <FormModal isOpen={isModalOpen} name={faName ?? ''} model={name ?? ''} />

            <div className="card">
                <div className="card-body justify-content-center">
                    <h5 className="card-title d-inline ">مدیریت {faName}</h5>
                    <button className="d-inline" onClick={() => setIsModalOpen(true)}>
                        <CIcon className="" icon={cilPlaylistAdd} width={25} />
                    </button>
                    {data ? (
                        <>
                            <p className="card-text">تعداد کل {faName}:
                                <span className='badge text-bg-info'>{data.toString()}</span>
                            </p>
                            <Link href={`/manager/${name}`} className="btn btn-primary">مشاهده</Link>
                        </>
                    ) : (
                        <p className="card-text">{message}</p>
                    )
                    }
                </div>
            </div>
        </div>
    )
}