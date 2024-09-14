import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

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
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Analyze the following resume content and extract information for each section in JSON format. Include the following sections:

    {
      "contactInformation": {
        "fullName": string,
        "phoneNumber": string,
        "email": string,
        "location": string
      },
      "professionalSummary": string,
      "workExperience": [
        {
          "jobTitle": string,
          "companyName": string,
          "location": string,
          "dates": string,
          "responsibilities": string[]
        }
      ],
      "education": [
        {
          "degree": string,
          "institution": string,
          "graduationDate": string
        }
      ],
      "skills": string[],
      "certifications": string[],
      "projects": [
        {
          "name": string,
          "description": string
        }
      ],
      "volunteerExperience": [
        {
          "organization": string,
          "role": string,
          "description": string
        }
      ],
      "professionalAssociations": string[],
      "additionalSections": {
        "languages": string[],
        "publications": string[],
        "awards": string[]
      }
    }

    If a section is not found or empty, set it to null or an empty array as appropriate. Here's the resume content:

    ${resumeText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let analysisResult;
    try {
      console.log("ATS Analysis result:", text);
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