import data from '../data'


// api/Courses/1
export default function handler(req, res) {
    const { topicId } = req.query;
    const { Courses } = data;

    if (topicId) {
        const post = Courses.find(value => value.id == topicId)
        return res.status(200).json(post)
    }

    return res.status(404).json({ error: "Post Not Found" })

}