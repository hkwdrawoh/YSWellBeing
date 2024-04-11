import { clientSettings } from "@magicbell/react-headless"

type TopicSubscription = {
  topic: string
  categories: Array<{
    reason: string
    slug: string
    status: "subscribed" | "unsubscribed"
  }>
}

export type NotificationType =
  | "welcome"
  | "hn_top_story"
  | "hn_top_new"
  | "hn_random"

class MagicBell {
  constructor() {}

  private getUserId() {
    return clientSettings.getState().userExternalId as string
  }

  /**
   * Send post request to endpoint, with userId in body
   */
  public async sendNotification(type: NotificationType) {
    const userId = this.getUserId()
    if (!userId) {
      return
    }
    const response = await fetch("https://api.magicbell.com/broadcasts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-MAGICBELL-API-KEY": process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
        "X-MAGICBELL-API-SECRET": "0ErH7YZfkIeI9sRNN7bkSNjzF2MS4ZtuIzXIsmc3",
      },
      body: JSON.stringify({
        "broadcast": {
          "title": "Time to take your medicine!",
          "content": "Stay on track and nurture your well-being!",
          "action_url": "https://yswellbeing.howardwkh.pp.ua?page=reminder",
          "recipients": [
            {
              "external_id": userId,
            }
          ],
        }
      })
    })
    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Failed to send ${type} notification. ${text}`)
    }
  }

  /**
   * Get the topics that the user is subscribed to
   */
  public getTopics() {
    const userId = this.getUserId()
    if (!userId) {
      return
    }
    return fetch("https://api.magicbell.com/subscriptions", {
      headers: {
        "X-MAGICBELL-API-KEY": process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
        "X-MAGICBELL-USER-EXTERNAL-ID": userId,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        return (
          data.subscriptions
            ?.filter((subscription: TopicSubscription) =>
              subscription.categories.some((c) => c.status === "subscribed")
            )
            .map((subscription: TopicSubscription) => subscription.topic) || []
        )
      })
  }

}

const magicBell = new MagicBell()

export default magicBell
