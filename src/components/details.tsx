import Image from "next/image";
import Symptoms from "@/constants/symptoms.json"
import Herbs from "@/constants/herbs.json"
import React from "react";

export function SymptomDetails(props: {
    patientData: Object
}) {
    // @ts-ignore
    const current_treatment = props.patientData.CurrentTreatment;
    const SymptomsData = Symptoms.data.filter((a) => a.Symptom === current_treatment.SymptomEN)[0];

    return <>
        <div className="grid gap-y-4 p-4">
            <span className="text-xl font-bold">{current_treatment.SymptomEN} ({current_treatment.SymptomTC})</span>

            <div className="mx-auto">
                <Image src={SymptomsData.Image} width={300} height={5} alt={SymptomsData.Symptom}></Image>
            </div>

            <div className="grid text-left">
                <span className="text-lg font-bold">Description:</span>
                <span className="text-lg">{SymptomsData.Description}</span>
            </div>
        </div>
    </>
}

export function HerbDetails(props: {
    patientData: Object
    herbIndex: number
}) {
    // @ts-ignore
    const current_treatment = props.patientData.CurrentTreatment;
    const HerbsData = Herbs.data.filter((a) => a.Herb === current_treatment.Ingredients[props.herbIndex].HerbEN)[0];

    return <>
        <div className="grid gap-y-4 p-4">
            <span className="text-xl font-bold">{current_treatment.Ingredients[props.herbIndex].HerbEN} ({current_treatment.Ingredients[props.herbIndex].HerbTC})</span>

            <div className="mx-auto">
                <Image src={HerbsData.Image} width={300} height={5} alt={HerbsData.Herb}></Image>
            </div>

            <div className="grid text-left">
                <span className="text-lg font-bold">Flavors:</span>
                <span className="text-lg">{HerbsData.Flavors}</span>
                <br />
                <span className="text-lg font-bold">Actions:</span>
                <span className="text-lg">{HerbsData.Actions}</span>
                <br />
                <span className="text-lg font-bold">Indications:</span>
                <span className="text-lg">{HerbsData.Indications}</span>
                <br />
                <span className="text-lg">(Source: PolyU)</span>
            </div>
        </div>
    </>
}

export function IntakeDetails(props: {
    patientData: Object
    goToPage: Function
    intake: boolean
    setIntakeComplete: Function
}) {
    // @ts-ignore
    const current_treatment = props.patientData.CurrentTreatment;

    function completeIntake() {
        props.setIntakeComplete(true);
        props.goToPage("reminder", "home");
    }

    return <>
        <div className="grid gap-y-3 p-4">
            <span className="text-xl font-bold">Prescription</span>
            <span className="">{current_treatment.TreatmentDay} Days, {current_treatment.TreatmentFreq} Times / Day
                    <br />
                {current_treatment.BeforeMeal ? "Taken Before Meal" : "Taken After Meal"}
                </span>
        </div>

        <div className="min-w-full relative py-12 mt-2">
            <span></span>
            <Image src={`./prescription.jpeg`} fill={true} alt="image" style={{objectFit: "cover"}}/>
        </div>

        <div className="grid grid-cols-5 text-left p-4 gap-y-2">
            <span className="text-lg font-bold col-span-5">Directions:</span>
            {current_treatment.Instruction.map((step, index) => <>
                <span className="text-lg">Step {index + 1}:</span>
                <span className="text-lg col-span-4">{step}</span>
            </>)}


        </div>
        {!props.intake ? null :
            <div className="p-4">
                <button
                    className="text-center border-primary rounded-lg bg-option4 border-2 text-xl w-3/4 mx-auto py-2"
                    onClick={() => completeIntake()}
                >
                    <span className="">Intake Complete</span>
                </button>
            </div>
        }
    </>
}