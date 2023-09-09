import { Symptom } from '@/app/components/SymptomTracker';
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
    apiKey: `${process.env.ANTHROPIC_API_KEY}`,
});

const MAX_TOKENS = 100000;

const createPrompt = (symptom_list: Symptom[]) => {
    return `${Anthropic.HUMAN_PROMPT} You will be acting as a helpful AI medical assistant for patients going into the hospital. When I write BEGIN DIALOGUE you will enter this role, and all further input from the "Human:" will be from a user seeking medical guidance. The patient will give you a list of their symptoms. Just like a doctor, you will ask follow-up questions based on their symptoms to gather more information from them to help you make an informed diagnosis. Please enclose the full list of questions in <questions></questions> XML tags. If you have no follow-up questions to ask, just say "I have no more questions." 

Here are some important rules for the interaction:

Do not give a diagnosis and do not just rephrase the symptoms into questions. 

BEGIN DIALOGUE

${symptom_list.map((symptom) => {
        return "- " + symptom.description
    }).join('\n')}

${Anthropic.AI_PROMPT}`

}

export async function get_follow_up_questions(symptom_list: Symptom[]) {
    const prompt = createPrompt(symptom_list);
    console.log("prompt: ", prompt);
    const completion = await anthropic.completions.create({
        model: 'claude-2',
        max_tokens_to_sample: MAX_TOKENS,
        prompt: createPrompt(symptom_list)
    })

    console.log("Wrapped up completion call");

    return completion.completion;
}



