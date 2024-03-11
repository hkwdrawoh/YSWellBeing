import React from "react"
import Button from "./button"
import magicBell from "@/services/magicBell"

/**
 * This component shows once the user has successfully subscribed to Webpush.
 * Here they have the option to send more test notifications, or subscribe to granular topics.
 */

interface IProps {
  interactive: boolean
  onAfterInteract: () => void
  onError: (message: string) => void
}

export default function PostSubscribeActions(props: IProps) {
  const handleReminder = async () => {
    try {
      await magicBell.sendNotification("welcome")
    } catch (error: any) {
      props.onError(error.message)
    }
    props.onAfterInteract()
  }

  return (
    <>
      {props.interactive ? (
        <Button
          onClick={handleReminder}
          text="Send me a reminder!!!"
          classname="bg-primary"
          disabled={false}
        />
      ) : (
        <Button
          text="Reminder sending..."
          classname="bg-green-500"
          disabled={true}
          loading
        />
      )}
    </>
  )
}
