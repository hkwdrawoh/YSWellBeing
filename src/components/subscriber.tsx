import React, { useEffect, useMemo, useState } from "react"
import { useConfig, clientSettings } from "@magicbell/react-headless"
import { prefetchConfig, registerServiceWorker } from "@magicbell/webpush"

import subscriptionManager from "@/services/subscriptionManager"
import Button from "@/components/button"
import { State } from "@/pages"
import Image from "next/image";

export default function Subscriber({
  state,
  setState,
}: {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
}) {
  const config = useConfig()

  const subscribeOptions = useMemo(() => {
    const host = "https://api.magicbell.com"
    try {
      const url = new URL(config.channels?.webPush.config.subscribeUrl || "")
      return {
        token: url.searchParams.get("access_token") || "",
        project: url.searchParams.get("project") || "",
        host,
      }
    } catch (e) {
      return { token: "", project: "", host }
    }
  }, [config])

  useEffect(() => {
    if (!subscribeOptions.token) {
      return
    }
    registerServiceWorker()
    prefetchConfig(subscribeOptions)
  }, [subscribeOptions])

  const handleSubscribe = async () => {
    try {
      setState({ status: "busy" })
      await subscriptionManager.subscribe(
        clientSettings.getState().userExternalId as string, // TODO: fix typing here
        subscribeOptions
      )
      setState({ status: "success" })
    } catch (error: any) {
      setState({ status: "error", error: error.message })
    }
  }

  const isLoading = !subscribeOptions.token || state.status === "busy"

  if (isLoading) {
    return <>
      <Image src="/notification.png" className={"inline-block my-6"} alt="bell" width={60} height={60} />
      <Button text="Loading" classname="bg-gray-500" disabled={true} />
      <p className="text-xs mt-6 mb-16">
        Please allow the app to send notifications to remind taking prescription on time.
      </p>
    </>
  }

  if (state.status === "error") {
    return <>
      <Image src="/notification.png" className={"inline-block my-6"} alt="bell" width={60} height={60} />
      <Button text="Error" classname="bg-red-400" disabled={true} />
    </>
  }

  return (
    <>
      <Image src="/notification.png" className={"inline-block my-6"} alt="bell" width={60} height={60} />
      <Button onClick={handleSubscribe} text="Allow Notification" classname="bg-primary" disabled={false} />
      <p className="text-xs mt-6 mb-16">
        Please allow the app to send notifications to remind taking prescription on time.
      </p>
    </>
  )
}
