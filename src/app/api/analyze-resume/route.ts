import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Reusable model instance
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

export async function POST(req: NextRequest) {
  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const { resumeText } = await req.json();

  if (!resumeText) {
    return NextResponse.json({ error: "Only PDF resumes are supported" }, { status: 400 });
  }

  try {
    // Use Gemini API to analyze the resume
    const prompt = `Analyze the following resume content and provide feedback in JSON format. Include sections for 'issues' (array of objects with 'type', 'description', and 'suggestion'), 'strengths' (array of strings), and 'overallScore' (number between 0 and 100). Here's the resume content:

    ${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let analysisResult;
    try {
      console.log("Analysis result:", text);
      analysisResult = JSON.parse(text);
    } catch (parseError) {
      console.error("Error parsing Gemini API response:", parseError);
      return NextResponse.json({ error: "Invalid response from AI model", aiResponse: text }, { status: 500 });
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json({ error: "Failed to analyze resume", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}