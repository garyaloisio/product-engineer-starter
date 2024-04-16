"use client";

import { useEffect, useState } from "react";
import { useDashboard } from "@/context/dashboard-context";
import classNames from "classnames";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Strings from "@/constants/strings";

export default function MedicalRecordUpload() {
    const { medicalRecord, setMedicalRecord } = useDashboard(); // Accessing medicalRecord and setMedicalRecord from context
    const [isLoading, setIsLoading] = useState(false); // State to track loading state

    useEffect(() => {
        if (isLoading) {
            const timer = setTimeout(() => {
                setIsLoading(false); // Stop loading after 3 seconds
                toast.success(Strings.MEDICAL_RECORD_UPLOAD_SUCCESS); // Show success toast
            }, 3000);

            return () => clearTimeout(timer); // Clear timeout on cleanup
        }
    }, [isLoading]);

    const handleClick = () => {
        setIsLoading(true); // Set loading state to true
        setMedicalRecord({ url: "/assets/medical-record.pdf" }); // Simulate uploading medicalRecord
    };

    return (
        <div className="w-1/2 h-64 border border-4 border-gray-200 border-dashed rounded flex flex-row items-center justify-center">
            <button
                className={classNames(
                    "text-white font-medium py-2 px-4 rounded border border-2",
                    medicalRecord === null
                        ? "bg-orange-500 border-orange-500"
                        : "border-transparent text-green-600"
                )}
                onClick={handleClick}>
                {isLoading ? (
                    <span className="flex flex-row gap-1 items-center text-black">
                        <span
                            className="animate-spin"
                            style={{ width: "20px", height: "20px", marginRight: "8px" }}>
                            <FaSpinner />
                        </span>
                        <span className="text-black">{Strings.UPLOADING}</span>
                    </span>
                ) : (
                    <>
                        <span>{Strings.MEDICAL_RECORD_UPLOAD_SIMULATE}</span>
                        {medicalRecord !== null && (
                            <span className="text-green-600 flex flex-row gap-1 items-center">
                                <FaCheck />
                                <span>{Strings.MEDICAL_RECORD_UPLOAD_SUCCESS}</span>
                            </span>
                        )}
                    </>
                )}
            </button>
        </div>
    );
}
