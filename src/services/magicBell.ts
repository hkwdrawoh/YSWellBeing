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
      body: JSON.stringify({
        "broadcast": {
          "title": "It's time to take your medicine!",
          "content": "Remember to take the medicine on time.",
          "topic": "welcome",
          "recipients": [{ "external_id": userId}]
        },
      }),
      headers: {
        "X-MAGICBELL-API-KEY": process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
        "X-MAGICBELL-API-SECRET": "0ErH7YZfkIeI9sRNN7bkSNjzF2MS4ZtuIzXIsmc3",
      },
    })
    if (!response) {
      // throw new Error(`Failed to send ${type} notification`)
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

  /**
   * Subscribe a user to a topic
   * @param topic The topic to subscribe to
   * @param notify Whether to send a notification to the user on subscription
   */
  public async subscribeToTopic(topic: string, notify: boolean = false) {
    const userId = this.getUserId()
    if (!userId) {
      return
    }
    await fetch(`https://api.magicbell.com/subscriptions`, {
      method: "POST",
      headers: {
        "X-MAGICBELL-API-KEY": process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
        "X-MAGICBELL-USER-EXTERNAL-ID": userId,
      },
      body: JSON.stringify({
        subscription: {
          categories: [
            {
              slug: "default",
              status: "subscribed",
              reason: "user",
            },
          ],
          topic,
        },
      }),
    }).then((response) => response.json())
  }

  /**
   * Unsubscribe the user from a topic
   */
  public unsubscribeFromTopic(topic: string) {
    const userId = this.getUserId()
    if (!userId) {
      return
    }
    return fetch(
      `https://api.magicbell.com/subscriptions/${topic}/unsubscribe`,
      {
        method: "POST",
        headers: {
          "X-MAGICBELL-API-KEY": process.env.NEXT_PUBLIC_MAGICBELL_API_KEY,
          "X-MAGICBELL-USER-EXTERNAL-ID": userId,
        },
        body: JSON.stringify({
          subscription: {
            categories: [
              {
                slug: "default",
                status: "unsubscribed",
                reason: "user",
              },
            ],
          },
        }),
      }
    ).then((response) => response.json())
  }

}

const magicBell = new MagicBell()

export default magicBell
