import {formatDate} from "@/components/functions";
import React from "react";


export default function AdminPage(props: {
    loginPressed: Function
    goToPage: Function
}) {

    return <>
        <div className="px-4 pt-4">
            <div className="grid grid-cols-4">
                <div className="col-span-3 text-left">
                    <span className="text-xl">Hello, Administrator</span>
                    <br />
                    <span className="text-md">Date: {formatDate(new Date())}</span>
                </div>
                <button
                    className="text-center my-auto grid items-center justify-center gap-x-4 gap-y-8 bg-primary rounded-lg border-section1 border-opacity-50 border-2 w-full h-3/4"
                    onClick={() => props.loginPressed()}
                >
                    <span className="text-text2">{"Logout"}</span>
                </button>
            </div>

            <button
                className="text-center my-5 grid gap-x-4 gap-y-4 bg-section1 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                onClick={() => props.goToPage("reply-patient", "admin")}
            >
                <span className="text-text2 text-xl text-left underline">Reply to Patients</span>
                <span className="text-text2 text-lg">&emsp;</span>
            </button>

            <button
                className="text-center my-5 grid gap-x-4 gap-y-4 bg-section2 p-4 rounded-lg border-primary border-opacity-50 border-2 w-full"
                onClick={() => props.goToPage("patient-info", "admin")}
            >
                <span className="text-text2 text-xl text-left underline">Patient Information</span>
                <span className="text-text2 text-lg">&emsp;</span>
            </button>

        </div>
    </>
}