import { Symptom } from '@/app/components/SymptomTracker';
import { get_summary } from '@/utils/symptom_summarizer';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { symptoms, questions, answers } = await request.json();

    if (!symptoms || !questions || !answers) {
        return NextResponse.json('Missing one of symptoms, questions, or answers.', { status: 400 });
    }

    let summary = await get_summary(symptoms, questions, answers);
    // Remove <summary> and </summary> tags
    summary = summary.replace('<summary>', '');
    summary = summary.replace('</summary>', '');
    
    console.log("summary: ", summary);

    return NextResponse.json({ summary });
}