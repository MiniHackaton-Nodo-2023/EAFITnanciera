const topicsURL = "http://localhost:3000/api/topics";

export default async function getTopics(id) {
    const res = await fetch(`${topicsURL}`)
    const topics = await res.json()

    if (id) {
        return topics.find(value => value.id == id)
    }

    return topics;
}
