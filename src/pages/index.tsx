import Head from "next/head";
import React, {useEffect, useState} from "react";

import ErrorDiagnostics from "@/components/error-diagnostics";
// import Footer from "@/components/footer";
import IosInstructionalStatic from "@/components/ios-instructional-static";
import useDeviceInfo, {DeviceInfo} from "@/hooks/useDeviceInfo";
import minVersionCheck from "@/utils/minVersionCheck";
import MainMenu from "@/components/menu";
import Header from "@/components/header";
// import Footer from "@/components/footer";

const resendDelay = 10 * 1000;
const enableSuccessMessage = false;

export type State =
    | { status: "idle" | "busy" | "success" }
    | { status: "error"; error: string }
    | { status: "unsupported" };

export default function Home() {
    // const [footerOpen, setFooterOpen] = useState(false);
    // const [canResendNotification, setCanResendNotification] = useState(false);
    const [state, setState] = useState<State>({status: "idle"});
    const [backPage, setBackPage] = useState('home');
    const [page, setPage] = useState('home');
    const info = useDeviceInfo();

    useEffect(() => {

        const noSelectElements =
            document.querySelectorAll(".no-select");
        noSelectElements.forEach((element) => {
            // @ts-ignore
            element.style.webkitUserSelect = "none";
            // @ts-ignore
            element.style.mozUserSelect = "none";
            // @ts-ignore
            element.style.msUserSelect = "none";
            // @ts-ignore
            element.style.userSelect = "none";
        });

        const queryParameters = new URLSearchParams(window.location.search)
        const searchParams = queryParameters.get("page")
        if (searchParams === "reminder") {
            goToPage("reminder", 'home');
        }
    }, []);

    function goToPage(destination, source) {
        setBackPage(source);
        setPage(destination);
    }

    function checkPWAInstalled(info: DeviceInfo) {
        // if (!info.standalone && info.osName === "Mac OS") return <IosInstructionalStatic />;
        if (info.osName === "iOS") {
            if (minVersionCheck(info.osVersion.toString(), 16, 5)) {
                if (!info.standalone) return <IosInstructionalStatic/>;
            } else {
                return (
                    <p className="text-center text-red-400 my-6">
                        This web push notifications demo requires iOS 16.5 or later. Please
                        run a software update to continue.
                    </p>
                );
            }
        }
        if (info.isPrivate) {
            return (
                <p className="text-center text-red-400 my-6">
                    This web app requires a non-private browser
                    window, since the{" "}
                    <a
                        href="https://developer.mozilla.org/en-US/docs/Web/API/Notification"
                        target="_blank"
                        className="underline"
                    >
                        Notification API
                    </a>{" "}
                    is set to &quot;denied&quot; by default.
                </p>
            );
        }
        return null;
    }

    function actions(state: State) {
        if (!info) {
            return null;
        }

        if (checkPWAInstalled(info)) {
            return checkPWAInstalled(info);
        }

        if (state.status === "success" || info.subscriptionState === "subscribed" || true) {
            return <>
                <MainMenu page={page} backPage={backPage} goToPage={goToPage} state={state} setState={setState}/>
            </>;
        }

    }

    function result(state: State) {
        if (state.status === "idle" || state.status === "busy") {
            return;
        }
        if (state.status === "error") {
            return <div className="p-2">
                <ErrorDiagnostics error={state.error}></ErrorDiagnostics>
            </div>;
        }
        if (state.status === "success" && enableSuccessMessage) {
            return (
                <>
                    <section className="text-center text-muted text-sm mx-2 my-4">
                        <p className="my-2">
                            You should soon receive a notification on your device.
                        </p>
                        <p className="my-2">
                            If not, first try checking your browser notification settings at
                            the operating system level (it is possible that notifications are
                            muted for your current browser).
                        </p>
                    </section>
                </>
            );
        }
    }

    useEffect(() => {
        if (state.status === "error") {
            // setFooterOpen(true);
        }
    }, [state.status]);

    useEffect(() => {
        if (state.status === "success") {
            setTimeout(() => {
                // setCanResendNotification(true);
            }, resendDelay);
        } else if (info?.subscriptionState === "subscribed") {
            // setCanResendNotification(true);
        }
    }, [state.status, info?.subscriptionState]);

    return (
        <>
            <header className="no-select h-[3.5em] fixed top-0 w-full">
                <Header page={page} goToPage={goToPage} backPage={backPage} />
            </header>

            <Head>
                <title>YS Well-Being</title>
                <meta
                    name="description"
                    content="A personalized web app for viewing individual health information and giving feedback on the medicine effectiveness."
                    key="desc"
                />
                <meta
                    property="og:title"
                    content="YS Well-Being"
                />
                <meta
                    property="og:description"
                    content="A personalized web app from Youseidou."
                />
                <meta property="og:image" content="/sharing-image.png"/>
                <meta property="og:image:width" content="432"/>
                <meta property="og:image:width" content="226"/>
                <meta property="og:url" content="https://yswellbeing.howardwkh.pp.ua"/>
                <meta property="og:type" content="Website"/>
            </Head>
            <main className={"w-full text-text1 no-select overflow-x-hidden pt-[3.5em]"}>
                {!info ? (
                    <div>Fetching Info</div>
                ) : (
                    <>
                        <div className="h-full max-w-screen-lg mx-auto pb-20">
                            <section className="text-center text-text">
                                {actions(state)}
                            </section>
                            {page === "reminder" ? result(state) : null}
                        </div>
                    </>
                )}
            </main>
            {/*<Footer open={footerOpen} setOpen={setFooterOpen}/>*/}
        </>
    );
}
