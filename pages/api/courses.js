
import data from './data'

// api/Courses
export default function handler(req, res) {
    const { Courses } = data;
    if (Courses) return res.status(200).json(Courses)
    return res.status(404).json({ error: "Data Not Found" })
}