export default function Header(props: {
    page: string
    setPage: Function
}) {
    let header_text, goPage;
    switch (props.page) {
        case "login":
            header_text = "";
            goPage = "home";
            break;

        case "reminder":
            header_text = "Next Intake Reminder";
            goPage = "home";
            break;

        case "treatment":
            header_text = "Current Treatment";
            goPage = "home";
            break;

        case "condition":
            header_text = "Today's Body Condition";
            goPage = "home";
            break;

        case "progress":
            header_text = "My Recovery Progress";
            goPage = "home";
            break;

        case "admin":
            header_text = "YS WELL-BEING ADMIN";
            goPage = "home";
            break;

        default:
            header_text = "YS WELL-BEING";
            goPage = "home";
    }

    return <>
        <div className="grid grid-cols-6 bg-primary text-text2 py-4 text-center text-xl font-bold">
            <button onClick={() => props.setPage(goPage)} disabled={props.page === "home" || props.page === "admin"}>
                {props.page === "home" || props.page === "admin" ? "" : "〈"}
            </button>
            <span className="col-span-4">{header_text}</span>
        </div>
    </>
}