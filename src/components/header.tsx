export default function Header(props: {
    page: string
    goToPage: Function
    backPage: string
}) {
    let header_text;
    switch (props.page) {
        case "login":
            header_text = "";
            break;

        case "reminder":
            header_text = "Next Intake Reminder";
            break;

        case "treatment":
            header_text = "Current Treatment";
            break;

        case "symptom":
            header_text = "Symptom Details";
            break;

        case "herb":
            header_text = "Herb Details";
            break;

        case "intake":
            header_text = "Intake Instruction";
            break;

        case "condition":
            header_text = "Today's Body Condition";
            break;

        case "progress":
            header_text = "My Recovery Progress";
            break;

        case "admin":
            header_text = "YS WELL-BEING ADMIN";
            break;

        case "reply-patient":
            header_text = "Reply to Patients";
            break;

        case "patient-info":
            header_text = "Patient's information";
            break;

        default:
            header_text = "YS WELL-BEING";
    }

    return <>
        <div className="grid grid-cols-6 bg-primary text-text2 py-4 text-center text-xl font-bold">
            <button onClick={() => props.goToPage(props.backPage, 'home')} disabled={props.page === "home" || props.page === "admin"}>
                {props.page === "home" || props.page === "admin" ? "" : "〈"}
            </button>
            <span className="col-span-4">{header_text}</span>
        </div>
    </>
}