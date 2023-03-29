
import data from './data'

// api/Quotes
export default function handler(req, res) {
    const { Quotes } = data;
    if (Quotes) return res.status(200).json(Quotes)
    return res.status(404).json({ error: "Data Not Found" })
}