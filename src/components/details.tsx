import Image from "next/image";
import Symptoms from "@/constants/symptoms.json"
import Herbs from "@/constants/herbs.json"

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
    const HerbsData = Herbs.data[0];

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
            </div>
        </div>
    </>
}