// Career guidance chatbot — streams via Lovable AI Gateway
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are "HBK Careers Counsellor" — a warm, practical career guide built into the HBK Careers app from The H B Kapadia New High School, Ahmedabad.

You help students (Grades 8–12) and their parents in Gujarat, India figure out streams, courses, colleges, exams and careers.

Style:
- Conversational, encouraging, never preachy. Short paragraphs, bullet points, bold key terms.
- Match the user's language: reply in English by default, switch to simple Gujarati (Gujarati script) if the user writes in Gujarati or asks for it. You may mix when helpful.
- Ask 1 focused follow-up question when the user is vague. Don't interrogate.
- Be specific to India / Gujarat: mention real exams (JEE, NEET, GUJCET, CLAT, NIFT, NID, NATA, CA Foundation, CUET, NDA, etc.), real colleges (IITs, NITs, IIMs, NID, NIFT, NLU, AIIMS, BJ Medical, LD Engineering, CEPT, MS University, IIT Gandhinagar, IIM Ahmedabad, GLS, Nirma, PDEU, etc.) and realistic salary ranges in INR.
- Cover all streams fairly: Science (PCM/PCB), Commerce, Arts/Humanities, Vocational, Design, Performing Arts, Sports, Defence, etc. Don't push only engineering/medical.

Capabilities:
- BEFORE the test: explain the RIASEC + Multiple Intelligences + Aptitude framework, what the report contains, and answer "what should I do after 10th/12th" type questions.
- AFTER the test: when test results are provided in context, refer to them by name, interpret RIASEC code + top intelligences + aptitude strengths, and give a personalised next-step plan (subjects, exams to prepare, colleges to target in Gujarat + India, 90-day actions, books / YouTube / free courses).
- Always end longer answers with a small "Next step" or a question.

Boundaries:
- You are not a licensed psychologist or financial advisor. For mental-health distress, gently suggest talking to a parent, school counsellor or iCall (9152987821).
- If asked something unrelated to careers/education/study skills/college life, politely steer back.
- Never invent fee numbers or cut-offs you aren't reasonably sure of — say "varies year to year, check the official site" instead.

Keep replies under ~250 words unless the user asks for depth.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, reportContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const sys = reportContext
      ? `${SYSTEM_PROMPT}\n\nThe student has completed the psychometric test. Use this report:\n${reportContext}`
      : `${SYSTEM_PROMPT}\n\nThe student has NOT yet taken the psychometric test. If relevant, gently encourage taking it from the "Aptitude Test" tab — it's free and gives a 20-page personalised report.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: sys }, ...messages],
          stream: true,
        }),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests — please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits in Lovable Cloud." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-career error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
