import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req) =>{
    const param = req.nextUrl.searchParams
    const query = param.get('q')
    try {
        await connectToDB()
     const regexQuery = new RegExp(query, 'i');

const result = await Prompt.find({
    $or: [
        { prompt: { $regex: regexQuery }}, 
        { tag: { $regex: regexQuery }},
        { username: { $regex: regexQuery }}
    ]
}).populate('creator');
        return new Response(JSON.stringify(result),{
            status:200
        })
    } catch (error) {
        return new Response('failed fetch all prompt',{
            status:500
        })
    }
}
