import { Symptom } from '@/app/components/SymptomTracker';
import { get_follow_up_questions } from '@/utils/symptom_analyzer';
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
    const { symptom_list} = await request.json();
  
    if (!symptom_list) {
      return NextResponse.json('Missing symptom_list', { status: 400 });
    }

    const questions = await get_follow_up_questions(symptom_list);
    console.log("questions: ", questions);
    // Delimit questions by newline
    const parsed_questions = questions.split('\n');

    const filtered_questions = parsed_questions.filter((question) => {
        return !question.includes('<questions>') && !question.includes('</questions>') && question.length > 0 && question != 'I have no more questions.';
    })
    
    return NextResponse.json({filtered_questions});
  }