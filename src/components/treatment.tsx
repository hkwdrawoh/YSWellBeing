import React from "react";


export default function CurrentTreatment(props: {
    setPage: Function
    patientData: Object
}) {
    return <>
        <div className="px-4">
            <div className="grid grid-cols-10 text-left py-4">
                <span className="font-bold col-span-3 py-2">Name:</span>
                <span className="col-span-7 py-2">Mr. Roger Chan</span>

                <span className="font-bold col-span-3 py-2">Last Visit:</span>
                <span className="col-span-7 py-2">2 Feb 2024</span>

                <span className="font-bold col-span-3 py-2">Symptom:</span>
                <span className="col-span-5 py-2">Blood Vacuity (血虛)</span>
                <button
                    className="col-span-2 text-center bg-primary rounded-lg border-background1 border-2"
                    // onClick={() => props.setPage("home")}
                >
                    <span className="text-text2">Details</span>
                </button>
            </div>

            <div className="grid gap-y-3 py-4">
                <span className="text-xl font-bold">Prescription</span>
                <span className="">3 Days, 3 Times / Day<br />Taken Before Meal</span>
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

            <li className="text-left col-span-6">Starwort (太子參)</li>
            <span className="col-span-2">4.0 g</span>
            <button
                className="col-span-2 text-center py-1 bg-primary rounded-lg border-background1 border-2"
                // onClick={() => props.setPage("home")}
            >
                <span className="text-text2">Info</span>
            </button>

            <li className="text-left col-span-6">Wolfberry (枸杞子)</li>
            <span className="col-span-2">1.0 g</span>
            <button
                className="col-span-2 text-center py-1 bg-primary rounded-lg border-background1 border-2"
                // onClick={() => props.setPage("home")}
            >
                <span className="text-text2">Info</span>
            </button>

            <li className="text-left col-span-6">Alpinia (山姜)</li>
            <span className="col-span-2">0.5 g</span>
            <button
                className="col-span-2 text-center py-1 bg-primary rounded-lg border-background1 border-2"
                // onClick={() => props.setPage("home")}
            >
                <span className="text-text2">Info</span>
            </button>

            <li className="text-left col-span-6">Dunn (雞血藤)</li>
            <span className="col-span-2">0.5 g</span>
            <button
                className="col-span-2 text-center py-1 bg-primary rounded-lg border-background1 border-2"
                // onClick={() => props.setPage("home")}
            >
                <span className="text-text2">Info</span>
            </button>


        </div>



    </>
}