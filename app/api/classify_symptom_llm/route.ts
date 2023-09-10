import { NextRequest, NextResponse } from 'next/server'
import {get_classification} from "@/utils/symptom_classifier";

export async function POST(request: NextRequest) {
    const { symptom } = await request.json();

    if (!symptom) {
        return NextResponse.json('Symptom is missing.', { status: 400 });
    }

    let classification = await get_classification(symptom);
    // extract the class
    const regex = /<class>(.*?)<\/class>/g;
    const matches = classification.match(regex);


    if (!matches) {
        classification = "Unknown";
    } else {
        classification = matches[0];
        classification = classification.replace(/<\/?class>/g, '');
    }

    console.log("summary: ", classification);

    return NextResponse.json({ classification });
}