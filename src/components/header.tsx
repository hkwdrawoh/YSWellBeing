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

        case "treatment":
            header_text = "Current Treatment";
            goPage = "home";
            break;

        default:
            header_text = "YS WELL-BEING";
            goPage = "home";
    }

    return <>
        <div className="grid grid-cols-5 bg-primary text-text2 py-4 text-center text-xl font-bold">
            <button onClick={() => props.setPage(goPage)} disabled={props.page === "home"}>{props.page === "home" ? "" : "〈"}</button>
            <span className="col-span-3">{header_text}</span>
        </div>
    </>
}