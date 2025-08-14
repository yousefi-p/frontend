'use client'

import { useEffect, useRef, useState } from "react";
import API from "@/lib/api";

interface FormModalProps {
    isOpen: boolean;
    name: string;
    model: string;
}

interface FormField {
    label: string;
    type: string;
    // Add other properties if needed
}

type FormData = {
    [key: string]: FormField;
};

export default function FormModal({ isOpen, name, model }: FormModalProps) {
    const modalDiv = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState<FormData>({});
    const modelHeaders = () => {
        API.get(`${model}-table-info/`).then(res => {
            console.log(res.data);
            setFormData(res.data);
        })
        .catch(err => {
            console.error(err);
        });
    }

    useEffect(() => {
        if (!modalDiv.current) return;
        // @ts-ignore
        const bootstrap = window.bootstrap || (window as any).bootstrap;
        if (!bootstrap) return;

        // Create or get the modal instance
        // @ts-ignore
        let modal = bootstrap.Modal.getOrCreateInstance(modalDiv.current);

        if (isOpen) {
            modelHeaders();

            modal.show();
        } else {
            modal.hide();
        }
    }, [isOpen, formData]);

    if(!formData) return null;

    return (
        <div
            className="modal fade"
            id="addModal"
            tabIndex={-1}
            aria-labelledby="addModalLabel"
            aria-hidden="true"
            ref={modalDiv}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title fs-5" id="addModalLabel">
                            افزودن {name}
                        </h2>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {formData && Object.keys(formData).map(key => (
                                <div className="mb-3" key={key}>
                                    <label htmlFor={key} className="form-label">
                                        {formData[key].label}
                                    </label>
                                    <input
                                        type={formData[key].type}
                                        className="form-control"
                                        id={key}
                                        required
                                    />
                                </div>
                            ))}

                            <button type="button" className="btn btn-primary">
                                افزودن
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}