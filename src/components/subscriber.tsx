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
      <button
          className="text-center border-primary rounded-lg bg-option0 border-2 text-xl w-3/4 mx-auto py-1"
      >
        <span className="">Loading...</span>
      </button>
    </>
  }

  if (state.status === "error") {
    return <>
      <button
          className="text-center border-primary rounded-lg bg-option0 border-2 text-xl w-3/4 mx-auto py-1"
      >
        <span className="">Error! No Permission!</span>
      </button>
    </>
  }

  return (
    <>
      <button
          className="text-center border-primary rounded-lg bg-option0 border-2 text-xl w-3/4 mx-auto py-1"
          onClick={handleSubscribe}
      >
        <span className="">Send Test Notification!</span>
      </button>
    </>
  )
}
