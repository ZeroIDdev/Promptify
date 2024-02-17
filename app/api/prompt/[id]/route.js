import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req,{params}) =>{
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt) return new Response("Prompt not found",{
            status:404
        })
        return new Response(JSON.stringify(prompt),{
            status:200
        })
    } catch (error) {
        return new Response('failed fetch all prompt',{
            status:500
        })
    }
}

export const PATCH = async(req,{params})=>{
    const {prompt,tag} = await req.json()   
    try {
        await connectToDB()

        const existPrompt = await Prompt.findById(params.id)
        if (!existPrompt) return new Response('Prompt not found',{
            status:404
        })

        existPrompt.prompt = prompt
        existPrompt.tag = tag

        await existPrompt.save()

        return new Response(JSON.stringify(existPrompt),{
            status:200
        })
    } catch (error) {
        return new Response('Something went Error',{
            status:500
        })
    }
}

export const DELETE = async(req,{params})=>{
    try {
        await connectToDB()

        const existPrompt = await Prompt.findByIdAndDelete(params.id)

        return new Response('prompt delete successfully',{
            status:200
        })
    } catch (error) {
        return new Response('Failed to delete prompt',{
            status:500
        })
    }
}