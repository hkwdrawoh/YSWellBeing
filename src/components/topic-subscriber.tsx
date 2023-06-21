import React, { useCallback, useState } from "react"
import useDeviceInfo from "@/hooks/useDeviceInfo"
import magicBell from "@/services/magicBell"
import subscriptionManager from "@/services/subscriptionManager"

export type Topic = {
  id: string
  name: string
}

export default function TopicSubscriber(
  props: Topic & { idle: boolean; onAfterInteract?: () => void }
) {
  const info = useDeviceInfo()
  const [subscribing, setSubscribing] = useState(false)
  const [unsubscribing, setUnsubscribing] = useState(false)
  const isSubscribed = info?.topics.includes(props.id)

  const handleUnsubscribe = useCallback(async () => {
    setUnsubscribing(true)
    await magicBell.unsubscribeFromTopic(props.id)
    setUnsubscribing(false)
    subscriptionManager.triggerListeners()
  }, [props])

  const handleSubscribe = useCallback(async () => {
    setSubscribing(true)
    await magicBell.subscribeToTopic(props.id, true)
    setSubscribing(false)
    subscriptionManager.triggerListeners()
    if (props.onAfterInteract) props.onAfterInteract()
  }, [props])

  return (
    <div className="contents" key={props.id}>
      {isSubscribed && !unsubscribing ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.62283 -2.86102e-06C3.96514 -2.86102e-06 1 2.96514 1 6.62283C1 10.2805 3.96514 13.2457 7.62283 13.2457C11.2805 13.2457 14.2456 10.2805 14.2456 6.62283C14.2456 2.96514 11.2805 -2.86102e-06 7.62283 -2.86102e-06ZM1.95 6.62283C1.95 3.48981 4.48981 0.949992 7.62283 0.949992C10.7558 0.949992 13.2956 3.48981 13.2956 6.62283C13.2956 9.75585 10.7558 12.2957 7.62283 12.2957C4.48981 12.2957 1.95 9.75585 1.95 6.62283Z"
            fill="currentColor"
          />
          <path
            d="M5.50076 7L7.00078 8.5"
            stroke="currentColor"
            strokeLinecap="round"
            className="animate-stroke"
          />
          <path
            d="M7.00076 8.5L10.0008 4.5"
            stroke="currentColor"
            strokeLinecap="round"
            className="animate-stroke"
            style={{ animationDelay: "0.4s" }}
          />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={subscribing || unsubscribing ? "animate-spin" : ""}
        >
          <path
            d={
              subscribing || unsubscribing
                ? "M12.3708 9.3655C11.5074 11.3965 9.4939 12.8207 7.14783 12.8207C4.01482 12.8207 1.475 10.2808 1.475 7.14783C1.475 4.01482 4.01482 1.475 7.14783 1.475C7.90935 1.475 8.63583 1.62505 9.2993 1.89721L9.69682 1.03331C8.91221 0.705847 8.05114 0.525 7.14783 0.525C3.49015 0.525 0.525 3.49015 0.525 7.14783C0.525 10.8055 3.49015 13.7707 7.14783 13.7707C9.87677 13.7707 12.2202 12.1201 13.2344 9.76286L12.3708 9.3655Z"
                : "M0.877075 7.49991C0.877075 3.84222 3.84222 0.877075 7.49991 0.877075C11.1576 0.877075 14.1227 3.84222 14.1227 7.49991C14.1227 11.1576 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1576 0.877075 7.49991ZM7.49991 1.82708C4.36689 1.82708 1.82708 4.36689 1.82708 7.49991C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49991C13.1727 4.36689 10.6329 1.82708 7.49991 1.82708Z"
            }
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
      <button
        disabled={isSubscribed || props.idle || subscribing}
        type="button"
        className="inline-flex items-center gap-x-2 rounded-md border-primary border-2 px-3.5 py-2.5 text-xs font-semibold text-white shadow-sm hover:enabled:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
        onClick={handleSubscribe}
      >
        {`Subscribe to ${props.name}`}
      </button>
      {unsubscribing ? (
        <div></div>
      ) : isSubscribed ? (
        <button
          className="text-muted text-xs hover:enabled:text-text"
          onClick={handleUnsubscribe}
          disabled={props.idle}
        >
          Unsubscribe
        </button>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          id="bell-slash"
          width={15}
          height={15}
          className="mx-auto"
        >
          <rect width="256" height="256" fill="none"></rect>
          <line
            x1="48"
            x2="208"
            y1="40"
            y2="216"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
          ></line>
          <path
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            d="M96 192v8a32 32 0 0 0 64 0v-8M186.18182 192H48.98365A7.99908 7.99908 0 0 1 42.103 179.95641c6.60328-11.35959 14.1-32.1426 14.1-67.95641v-8A71.80594 71.80594 0 0 1 68.9457 63.0404M99.96516 37.69664A71.42478 71.42478 0 0 1 128.5484 32.002c39.58967.29432 71.25651 33.20133 71.25651 72.90185V112a189.04639 189.04639 0 0 0 3.776 39.67466"
          ></path>
        </svg>
      )}
    </div>
  )
}