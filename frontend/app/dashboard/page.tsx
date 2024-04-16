"use client";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import GuidelinesUpload from "@/components/guidelines-upload";
import MedicalRecordUpload from "@/components/medical-record-upload";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/context/dashboard-context";
import * as Strings from "@/constants/strings";

export const revalidate = 0;

export default function DashboardRoot() {
    const router = useRouter();
    const { medicalRecord, guidelinesFile } = useDashboard(); // Added useDashboard to access medicalRecord and guidelinesFile from context

    const CASE_ID = "case_891a_6fbl_87d1_4326";

    const handleContinue = () => {
        router.push(`/dashboard/case/${CASE_ID}`);
    };

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <ToastContainer />
            <div className="w-full flex flex-row gap-2 items-center">
                <MedicalRecordUpload />
                <GuidelinesUpload />
            </div>
            {medicalRecord &&
                guidelinesFile && ( // Added condition to render Continue button if both medicalRecord and guidelinesFile are truthy
                    <div className="w-full py-4 flex flex-row justify-center">
                        <button
                            className="bg-green-600 font-medium text-white py-2 px-4 rounded"
                            onClick={handleContinue}>
                            {Strings.CONTINUE_BUTTON_TEXT}
                        </button>
                    </div>
                )}
        </div>
    );
}
