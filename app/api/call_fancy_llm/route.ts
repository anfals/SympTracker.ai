import { Symptom } from '@/app/components/SymptomTracker';
import { get_follow_up_questions } from '@/utils/symptom_analyzer';
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
    const { symptom_list} = await request.json();
  
    if (!symptom_list) {
      return NextResponse.json('Missing symptom_list', { status: 400 });
    }

    const questions = await get_follow_up_questions(symptom_list);
    
    return NextResponse.json({questions});
  }