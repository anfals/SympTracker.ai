import { Symptom } from '@/app/components/SymptomTracker';
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
    apiKey: `${process.env.ANTHROPIC_API_KEY}`,
});

const MAX_TOKENS = 100000;

const createPrompt = (symptom: string) => {
    return `${Anthropic.HUMAN_PROMPT} You are a medical assistant that is classifying symptoms by type." 
    Symptom:
    <symptom>
    ${symptom}
    </symptom>

    Categories are:
    - General/Constitutional
    - Neurological symptoms
    - Cardiovascular
    - Gastrointestinal
    - Musculoskeletal
    - Skin
    - Psychiatric
    - Respiratory
    
    Enclose the classification in <class></class> XML tags. If you do not know which category the symptom should fall into, use "Unknown". Do not respond with any other category other than the ones listed above.
    
    ${Anthropic.AI_PROMPT}`
}

export async function get_classification(symptom: string) {
    const prompt = createPrompt(symptom);
    console.log("prompt: ", prompt);
    const completion = await anthropic.completions.create({
        model: 'claude-2',
        max_tokens_to_sample: MAX_TOKENS,
        prompt: prompt
    })

    console.log("Wrapped up completion call");

    return completion.completion;
}



