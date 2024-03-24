import React, {useState} from "react";
import Image from 'next/image'
import {credential, salt} from "@/constants/credentials";
import sha256 from 'crypto-js/sha256'


export default function Login(props: {
    setPatientID: Function
    setPage: Function
}) {
    const [err_msg, setErrMsg] = useState("")
    const [patientID, setPatientID] = useState("")
    const handleChangeID = (e) => {
        setPatientID(e.target.value)
        setErrMsg("")
    }
    const [password, setPassword] = useState("")
    const handleChangePW = (e) => {
        setPassword(e.target.value)
        setErrMsg("")
    }

    function tryLogin() {
        if (patientID === "") {
            setErrMsg("Please fill in your Patient ID.");
            return
        }
        if (password === "") {
            setErrMsg("Please fill in your password.");
            return
        }
        let patientObject = credential.find((obj) => obj.PID === patientID)
        if (patientObject === undefined) {
            setErrMsg("Patient ID does not exist. Your patient ID should be a 7-digit number written on your medical card.");
            return
        }
        if (sha256(password + salt).toString() !== patientObject.PW_hash) {
            setErrMsg("The password is incorrect.");
            return
        }
        setErrMsg("")
        props.setPatientID(patientID)
        props.setPage("home")
    }

    return <>
        <div className="bg-gradient-to-b from-primary to-background0 grid gap-y-4">
            <Image height={0} width={150} src="/icon.png" alt="App Icon" className="mx-auto"></Image>
            <span className="text-4xl">YS WELL-BEING</span>
            <span className="text-lg">WE CARE FOR YOUR HEALTH</span>
        </div>

        <div className="grid py-6 gap-y-4 px-4">
            <div className="grid">
                <span className="text-left text-lg p-1">Patient ID</span>
                <input value={patientID} onChange={handleChangeID} type="tel" className="border-black border-2 rounded-lg p-2"/>
            </div>

            <div className="grid">
                <span className="text-left text-lg p-1">Password</span>
                <input value={password} onChange={handleChangePW} type="password" className="border-black border-2 rounded-lg p-2"/>
            </div>

            <div className="grid gap-y-4 py-4">
                <button
                    className="mx-auto py-1 bg-primary rounded-lg border-background1 border-opacity-50 border-2 w-3/5"
                    onClick={tryLogin}
                >
                    <span className="text-text2 text-lg">Login</span>
                </button>
                <button
                    className="mx-auto py-1 bg-background1 rounded-lg border-primary border-opacity-50 border-2 w-3/5"
                    onClick={() => setErrMsg('Your password consists of your surname in lower case, followed by your telephone number. E.g. "chan91234567". ')}
                >
                    <span className="text-text1 text-lg">Forget Password?</span>
                </button>
                <span className="text-section2">{err_msg}</span>
            </div>

        </div>

    </>
}