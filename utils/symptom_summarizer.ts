import { Symptom } from '@/app/components/SymptomTracker';
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
    apiKey: `${process.env.ANTHROPIC_API_KEY}`,
});

const MAX_TOKENS = 100000;

const createPrompt = (symptoms: string[], questions: string[], answers: string[]) => {
    return `${Anthropic.HUMAN_PROMPT} Here is a conversation between a patient and a Medical Assistant. The patient provided a list of symptoms they are experiencing. The assistant asked a series of follow-up questions to get more information from them based on the symptoms they listed. The patient provided answers to the follow-up questions. The conversation is in <conversation></conversation> XML tags:

    <conversation>

    Patient:

    ${symptoms.map((symptom) => {
        return "- " + symptom
    }).join('\n')}

    Provider: 

    ${questions.map((question) => {
        return "- " + question
    }).join('\n')}

    Patient:

    ${answers.map((answer) => {
        return "- " + answer
    }).join('\n')}

    </conversation>
    
    Provide a detailed summary of the full conversation that can be provided to a doctor. Also give your thoughts on what the diagnosis could be based on all the symptoms shared by the patient, including the answers to the follow-up. Enclose this summary and thoughts in <summary></summary> XML tags.

${Anthropic.AI_PROMPT}`

}

export async function get_summary(symptoms: string[], questions: string[], answers: string[]) {
    const prompt = createPrompt(symptoms, questions, answers);
    console.log("prompt: ", prompt);
    const completion = await anthropic.completions.create({
        model: 'claude-2',
        max_tokens_to_sample: MAX_TOKENS,
        prompt: prompt
    });

    console.log("Wrapped up completion call");

    return completion.completion;
}



