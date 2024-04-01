import React from "react";
import {formatDate, formatName} from "@/components/functions"


export default function CurrentTreatment(props: {
    goToPage: Function
    patientData: Object
}) {
    // @ts-ignore
    const personal_info = props.patientData.PersonalInfo;
    // @ts-ignore
    const current_treatment = props.patientData.CurrentTreatment;


    return <>
        <div className="px-4">
            <div className="grid grid-cols-10 text-left py-4">
                <span className="font-bold col-span-3 py-2">Name:</span>
                <span className="col-span-7 py-2">{formatName(personal_info)}</span>

                <span className="font-bold col-span-3 py-2">Last Visit:</span>
                <span className="col-span-7 py-2">{formatDate(current_treatment.LastVisit)}</span>

                <span className="font-bold col-span-3 py-2">Symptom:</span>
                <span className="col-span-5 py-2">{current_treatment.SymptomEN} ({current_treatment.SymptomTC})</span>
                <button
                    className="col-span-2 text-center bg-primary rounded-lg border-background1 border-2"
                    // onClick={() => props.setPage("home")}
                >
                    <span className="text-text2">Details</span>
                </button>
            </div>

            <div className="grid gap-y-3 py-4">
                <span className="text-xl font-bold">Prescription</span>
                <span className="">{current_treatment.TreatmentDay} Days, {current_treatment.TreatmentFreq} Times / Day
                    <br />
                    {current_treatment.BeforeMeal ? "Taken Before Meal" : "Taken After Meal"}
                </span>
                <button
                    className="text-center py-2 mx-auto bg-primary rounded-lg border-background1 border-2 w-2/3"
                    // onClick={() => props.setPage("home")}
                >
                    <span className="text-text2">Intake Instruction</span>
                </button>
            </div>
        </div>

        <div className="bg-background1 border-primary border-y-2 grid grid-cols-10 gap-y-2 mt-4 px-4 pt-4 pb-6 items-center">
            <span className="font-bold text-xl text-left col-span-10 pb-4">Ingredients (Per Pack)</span>

            {current_treatment.Ingredients.map((herb) => <>
                <li className="text-left col-span-6">{herb.HerbEN} ({herb.HerbTC})</li>
                <span className="col-span-2">{herb.Weight} g</span>
                <button
                    className="col-span-2 text-center py-1 bg-primary rounded-lg border-background1 border-2"
                    // onClick={() => props.setPage("home")}
                >
                    <span className="text-text2">Info</span>
                </button>
            </>)}

        </div>



    </>
}