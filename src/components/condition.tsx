import React, {useEffect, useState} from "react";
import {conditionScore, formatDate} from "@/components/functions";


export default function TodayCondition(props: {
    patientData: Object
    setPData: Function
}) {
    const [Q1a, setQ1a] = useState("");
    const [Q1b, setQ1b] = useState("");
    const [Q1c, setQ1c] = useState("");
    const [Q2, setQ2] = useState(0);
    const [Q3, setQ3] = useState(0);
    const [Q4, setQ4] = useState(0);
    const [Comment, setComment] = useState("");
    const [currQ, setCurrQ] = useState(1);
    const [err_msg, setErrMsg] = useState("");

    const handleQ1a = (e) => {setQ1a(e.target.value)};
    const handleQ1b = (e) => {setQ1b(e.target.value)};
    const handleQ1c = (e) => {setQ1c(e.target.value)};

    const Q2_options = ["Very Good 😆", "Good 🙂", "Average 😐", "Bad 🙁", "Very Bad 😵‍💫"];
    const Q3_options = ["Much Better 😆", "A Bit Better 🙂", "Similar 😐", "A Bit Worse 🙁", "Much Worse 😵‍💫"];
    const Q4_options = ["Much Less Severe 😆", "Less Severe 🙂", "Similar 😐", "More Severe 🙁", "Much More Severe 😵‍💫"];
    const Q5_options = ["Much Improved", "Improved", "Similar", "Worsened", "Much Worsened", "No Input"];
    const today_date = new Date();

    let question_section;

    useEffect(() => {
        setErrMsg("")
    }, [currQ])

    useEffect(() => {
        // @ts-ignore
        let body_conditions = props.patientData.BodyConditions;
        let today_condition = body_conditions.filter((a) => a.RecordDate === formatDate(today_date));
        if (today_condition[0]) {
            setQ1a(today_condition[0].Q1a);
            setQ1b(today_condition[0].Q1b);
            setQ1c(today_condition[0].Q1c);
            setQ2(today_condition[0].Q2);
            setQ3(today_condition[0].Q3);
            setQ4(today_condition[0].Q4);
            setComment(today_condition[0].Comment);
            setCurrQ(5);
        }
    }, [])


    function nextQuestion() {
        // @ts-ignore
        if (currQ === 1 && isNaN(Q1a) && Q1a !== "") {
            setErrMsg("Weight is invalid.");
            return
        }
        // @ts-ignore
        if (currQ === 1 && Q1a !== "" && (Q1a <= 0 || Q1a >= 400)) {
            setErrMsg("Weight is invalid.");
            return
        }
        // @ts-ignore
        if (currQ === 1 && isNaN(Q1b) && Q1b !== "") {
            setErrMsg("Blood pressure is invalid.");
            return
        }
        // @ts-ignore
        if (currQ === 1 && isNaN(Q1c) && Q1c !== "") {
            setErrMsg("Blood pressure is invalid.");
            return
        }
        // @ts-ignore
        if (currQ === 1 && Q1b !== "" && Q1c !== "" && ((Q1b - Q1c < 0) || Q1b < 50 || Q1c < 30)) {
            setErrMsg("Blood pressure is invalid.");
            return
        }
        if (currQ === 4) {saveRecord()}
        setCurrQ(currQ % 5 + 1);
    }

    function resetQuestion() {
        if (currQ === 1) {
            setQ1a("");
            setQ1b("");
            setQ1c("");
        }
        if (currQ === 2) {setQ2(0)}
        if (currQ === 3) {setQ3(0)}
        if (currQ === 4) {setQ4(0)}
    }

    function saveRecord() {
        // @ts-ignore
        let not_today = props.patientData.BodyConditions.filter((a) => a.RecordDate !== formatDate(today_date))
        let new_record = {
            "RecordDate": formatDate(today_date),
            "Q1a": Q1a,
            "Q1b": Q1b,
            "Q1c": Q1c,
            "Q2": Q2,
            "Q3": Q3,
            "Q4": Q4,
            "Comment": ""
        }
        not_today.push(new_record);
        let new_PData = {...props.patientData, "BodyConditions": not_today}
        props.setPData(new_PData);
        // @ts-ignore
        localStorage.setItem("YSWB:ID=" + props.patientData.PatientID, JSON.stringify(new_PData))
    }

    switch (currQ) {
        case 1:
            question_section = <>
                <div className="grid text-left p-4 gap-y-4">
                    <span className="font-bold text-xl">Question 1 of 4</span>
                    <span className="text-lg">Record your weight and blood pressure.</span>
                </div>
                <div className="grid grid-cols-6 text-left p-4 my-2 gap-y-4 bg-background2 items-center">
                    <span className="font-bold text-lg col-span-3">WEIGHT</span>
                    <input value={Q1a} onChange={handleQ1a} className="border-black border-2 rounded-lg p-2 col-span-2 text-right" />
                    <span className="text-lg text-center">kg</span>
                </div>
                <div className="grid grid-cols-6 text-left p-4 my-2 gap-y-4 bg-background2 items-center">
                    <span className="font-bold text-lg col-span-3">BLOOD PRESSURE</span>
                    <div className="col-span-3 grid grid-cols-7 items-center">
                        <input value={Q1b} onChange={handleQ1b} type="number" step="1" className="col-span-3 border-black border-2 rounded-lg p-2 col-span-2 w-full text-center" />
                        <span className="text-lg text-center">/</span>
                        <input value={Q1c} onChange={handleQ1c} type="number" step="1" className="col-span-3 border-black border-2 rounded-lg p-2 col-span-2 w-full text-center" />
                    </div>
                </div>

            </>
            break;

        case 2:
            question_section = <>
                <div className="grid text-left p-4 gap-y-4">
                    <span className="font-bold text-xl">Question 2 of 4</span>
                    <span className="text-lg">How are you feeling today?</span>
                </div>
                <div className="grid p-4 my-2 gap-y-4 bg-background2 items-center">
                    {Q2_options.map((option, index) => <>
                        <button
                            className={`mx-auto py-1 ${Q2 === 5 - index ? "bg-option" + String(5 - index) : "bg-background2"} rounded-lg border-primary border-2 w-full`}
                            onClick={() => setQ2(5 - index)}
                        >
                            <span className="text-text1 text-lg">{option}</span>
                        </button>
                    </>)}
                </div>
            </>
            break;

        case 3:
            question_section = <>
                <div className="grid text-left p-4 gap-y-4">
                    <span className="font-bold text-xl">Question 3 of 4</span>
                    <span className="text-lg">Compare to yesterday, you are feeling...</span>
                </div>
                <div className="grid p-4 my-2 gap-y-4 bg-background2 items-center">
                    {Q3_options.map((option, index) => <>
                        <button
                            className={`mx-auto py-1 ${Q3 === 5 - index ? "bg-option" + String(5 - index) : "bg-background2"} rounded-lg border-primary border-2 w-full`}
                            onClick={() => setQ3(5 - index)}
                        >
                            <span className="text-text1 text-lg">{option}</span>
                        </button>
                    </>)}
                </div>
            </>
            break;

        case 4:
            question_section = <>
                <div className="grid text-left p-4 gap-y-4">
                    <span className="font-bold text-xl">Question 4 of 4</span>
                    <span className="text-lg">Compare to yesterday, your symptoms are...</span>
                </div>
                <div className="grid p-4 my-2 gap-y-4 bg-background2 items-center">
                    {Q4_options.map((option, index) => <>
                        <button
                            className={`mx-auto py-1 ${Q4 === 5 - index ? "bg-option" + String(5 - index) : "bg-background2"} rounded-lg border-primary border-2 w-full`}
                            onClick={() => setQ4(5 - index)}
                        >
                            <span className="text-text1 text-lg">{option}</span>
                        </button>
                    </>)}
                </div>
            </>
            break;

        case 6:
            question_section = <>
                <div className="grid text-left p-4 gap-y-4">

                    <div className="grid grid-cols-3">
                        <span className="text-xl font-bold col-span-2">{formatDate(today_date)}</span>
                        <button
                            className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-3/5"
                            onClick={() => setCurrQ(5)}
                        >
                            <span className="text-text1 text-lg">Back</span>
                        </button>
                    </div>
                    <br />
                    <span className="text-lg font-bold">Dr CHAN Hiu Ming:</span>
                    <span className="bg-white border-black border-2 rounded-lg p-2">{Comment === "" ? "No comment yet..." : Comment}</span>
                </div>
            </>
            break;

        default:
            question_section = <>
                <div className="grid text-left p-4 gap-y-4">
                    <div>
                        <span className="text-xl font-bold">{formatDate(today_date)}</span>
                        <span className="text-lg px-4">Condition recorded!</span>
                    </div>

                    <div className="grid grid-cols-3">
                        <span className={`text-xl font-bold col-span-2 px-4 py-1 ${("bg-option" + String(conditionScore(Q2, Q3, Q4)))} mr-auto rounded-3xl`}>{Q5_options[5 - conditionScore(Q2, Q3, Q4)]}</span>
                        <button
                            className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-3/5"
                            onClick={() => setCurrQ(1)}
                        >
                            <span className="text-text1 text-lg">Edit</span>
                        </button>
                    </div>

                    <div className="grid gap-y-3 py-4">
                        <span className="text-xl font-bold">Your Record:</span>
                        <div className="grid grid-cols-2 text-center items-center gap-x-4">
                            <div className="grid grid-cols-3 pl-2 py-2 items-center bg-background2 rounded-xl">
                                <span className="row-span-2">Weight</span>
                                <div className="col-span-2 grid grid-cols-7 items-center w-2/3 mx-auto">
                                    <span className="text-option0 text-xs">|</span><span className="text-sm">|</span><span className="text-base">|</span><span className="text-lg text-section2">|</span><span className="text-base">|</span><span className="text-sm">|</span><span className="text-xs text-option0">|</span>
                                </div>
                                <span className="col-span-2">{Q1a === "" ? "--" : Q1a} kg</span>
                            </div>
                            <div className="grid grid-cols-3 pl-2 py-2 items-center bg-background2 rounded-xl">
                                <span className="row-span-2">Blood Pressure</span>
                                <div className="col-span-2 grid grid-cols-7 items-center w-2/3 mx-auto">
                                    <span className="text-option0 text-xs">|</span><span className="text-sm">|</span><span className="text-base">|</span><span className="text-lg text-section2">|</span><span className="text-base">|</span><span className="text-sm">|</span><span className="text-xs text-option0">|</span>
                                </div>
                                <span className="col-span-2">{Q1b === "" ? "--" : Q1b} / {Q1c === "" ? "--" : Q1c}</span>
                            </div>
                        </div>

                        <span className="text-lg">How are you feeling today?</span>
                        <span className={`mx-auto py-1 ${"bg-option" + String(Q2)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{Q2 === 0 ? "Not Answered" : Q2_options[5 - Q2]}</span>

                        <span className="text-lg">Compare to yesterday, you are feeling...</span>
                        <span className={`mx-auto py-1 ${"bg-option" + String(Q3)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{Q3 === 0 ? "Not Answered" : Q3_options[5 - Q3]}</span>

                        <span className="text-lg">Compare to yesterday, your symptoms are...</span>
                        <span className={`mx-auto py-1 ${"bg-option" + String(Q4)} rounded-lg border-primary border-2 w-full text-text1 text-center text-lg`}>{Q4 === 0 ? "Not Answered" : Q4_options[5 - Q4]}</span>

                    </div>

                    <div className="grid">
                        <button
                            className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-3/4"
                            onClick={() => setCurrQ(6)}
                        >
                            <span className="text-text1 text-lg">View Doctor's Comment</span>
                        </button>
                    </div>

                </div>
            </>
            break;
    }


    return <>
        {question_section}

        {currQ >= 5 ? null : <>
            <div className="grid grid-cols-3 p-4 gap-x-4">
                {currQ === 1 ? <span>&emsp;</span> : <button
                    className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-full"
                    onClick={() => setCurrQ(currQ - 1)}
                >
                    <span className="text-text2 text-lg">Back</span>
                </button>}

                <button
                    className="mx-auto py-1 bg-background1 rounded-lg border-primary border-2 w-full"
                    onClick={resetQuestion}
                >
                    <span className="text-text1 text-lg">Reset</span>
                </button>

                <button
                    className="mx-auto py-1 bg-primary rounded-lg border-background1 border-2 w-full"
                    onClick={nextQuestion}
                >
                    <span className="text-text2 text-lg">{currQ === 4 ? "Submit" : "Next"}</span>
                </button>

                <span className="col-span-3 py-4 text-section2">{err_msg}</span>
            </div>
        </>}
    </>
}