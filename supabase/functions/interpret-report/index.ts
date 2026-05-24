// AI counsellor — turns deterministic psychometric scores into a structured,
// grounded interpretation. Uses Lovable AI Gateway with the strongest available
// reasoning model and tool-calling for structured output (no free-form JSON).
//
// CRITICAL accuracy rules baked into the system prompt:
//  - The AI only INTERPRETS the numbers we pass in. It does NOT re-score.
//  - Recommended streams MUST be from our 5-stream slug list.
//  - If responseQuality is "low", the AI must say so and avoid confident claims.
//  - Output is strict JSON via tool_choice (no markdown, no preamble).

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VALID_STREAMS = [
  "science-pcm",
  "science-pcb",
  "commerce",
  "humanities",
  "vocational",
] as const;

const SYSTEM_PROMPT = `You are the senior psychometric counsellor for HBK Careers (H B Kapadia New High School, Ahmedabad). You review the deterministic test scores of one Indian student (Grades 6–12, mostly Gujarat) and produce a careful, evidence-based interpretation in English.

Hard rules — violating any of these makes the report wrong:
1. The numbers you are given (RIASEC %, Multiple Intelligences %, aptitude % per category, overall aptitude %) are the source of truth. Do NOT invent or revise numbers. Refer to them by name and percentage where useful.
2. Recommended streams MUST come from this fixed list ONLY: science-pcm, science-pcb, commerce, humanities, vocational. Never invent slugs.
3. If responseQuality is "low", your consistencyVerdict MUST be "low" and every narrative section must open with a clear caveat that the student should retake the test for trustworthy results. Do not produce confident career predictions in this case.
4. If responseQuality is "medium", flag the specific concerns (from qualityFlags) and soften your recommendations.
5. Stay India / Gujarat-specific: real exams (JEE, NEET, GUJCET, ACPC, CLAT, CUET, CA Foundation, NID, NIFT, NATA, NDA), real institutions (IITs, NITs, IIMs, AIIMS, BJ Medical, LD Engineering, Nirma, PDEU, MS University, GLS, CEPT, IIT Gandhinagar), realistic INR salary bands. Never push only engineering/medical — weigh all five streams fairly against the actual scores.
6. Tie every recommendation back to the SPECIFIC scores you were given (e.g. "Your Investigative score of 78% paired with Logical-Mathematical 82% and 71% on numerical aptitude points strongly to…").
7. Be honest about ties, weak signals, and ambiguity. If the top two RIASEC types are within 5 points, say both deserve exploration.
8. No emoji. No markdown headings inside string fields. Plain prose only. Keep each narrative to 2 short paragraphs.

You will respond by calling the function "submit_interpretation" with a single argument matching the schema. Do not produce any text outside the tool call.`;

const tool = {
  type: "function",
  function: {
    name: "submit_interpretation",
    description: "Submit the final structured interpretation of the student's psychometric report.",
    parameters: {
      type: "object",
      properties: {
        consistencyVerdict: { type: "string", enum: ["high", "medium", "low"] },
        consistencyExplanation: { type: "string" },
        riasecNarrative: { type: "string" },
        miNarrative: { type: "string" },
        aptitudeNarrative: { type: "string" },
        recommendedStreams: {
          type: "array",
          minItems: 1,
          maxItems: 3,
          items: {
            type: "object",
            properties: {
              slug: { type: "string", enum: [...VALID_STREAMS] },
              fitRationale: { type: "string" },
            },
            required: ["slug", "fitRationale"],
            additionalProperties: false,
          },
        },
        recommendedCareers: {
          type: "array",
          minItems: 3,
          maxItems: 8,
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              fitRationale: { type: "string" },
              watchOuts: { type: "string" },
            },
            required: ["name", "fitRationale", "watchOuts"],
            additionalProperties: false,
          },
        },
        developmentSuggestions: {
          type: "array",
          minItems: 3,
          maxItems: 6,
          items: { type: "string" },
        },
        parentTalkingPoints: {
          type: "array",
          minItems: 3,
          maxItems: 5,
          items: { type: "string" },
        },
        redFlags: { type: "array", items: { type: "string" } },
      },
      required: [
        "consistencyVerdict",
        "consistencyExplanation",
        "riasecNarrative",
        "miNarrative",
        "aptitudeNarrative",
        "recommendedStreams",
        "recommendedCareers",
        "developmentSuggestions",
        "parentTalkingPoints",
        "redFlags",
      ],
      additionalProperties: false,
    },
  },
};

interface Body {
  student: { name: string; grade: string; age?: string; gradeBand?: string };
  report: unknown; // ScoreReport
  quality: unknown; // QualityReport
  deterministicStreams?: string[]; // from recommendStreamsAccurate, for cross-check
}

async function callModel(model: string, payload: Record<string, unknown>, apiKey: string) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, ...payload }),
  });
  return res;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = (await req.json()) as Body;
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const userContent = JSON.stringify(
      {
        student: body.student,
        scores: body.report,
        responseQuality: (body.quality as { quality?: string })?.quality ?? "unknown",
        qualityFlags: (body.quality as { flags?: string[] })?.flags ?? [],
        qualityMetrics: (body.quality as { metrics?: unknown })?.metrics ?? {},
        deterministicTopStreams: body.deterministicStreams ?? [],
        validStreamSlugs: VALID_STREAMS,
      },
      null,
      2,
    );

    const payload = {
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Here is the student's deterministic test data. Produce the interpretation by calling submit_interpretation.\n\n${userContent}`,
        },
      ],
      tools: [tool],
      tool_choice: { type: "function", function: { name: "submit_interpretation" } },
      reasoning: { effort: "high" },
    };

    // Primary: GPT-5 with high reasoning. Fallback: Gemini 2.5 Pro.
    let resp = await callModel("openai/gpt-5", payload, apiKey);

    if (resp.status === 429 || resp.status === 402 || (!resp.ok && resp.status >= 500)) {
      console.warn("Primary model failed, falling back to Gemini 2.5 Pro:", resp.status);
      // Gemini does not use the reasoning param.
      const { reasoning: _r, ...fallbackPayload } = payload;
      resp = await callModel("google/gemini-2.5-pro", fallbackPayload, apiKey);
    }

    if (!resp.ok) {
      const text = await resp.text();
      console.error("AI gateway error:", resp.status, text);
      if (resp.status === 429) {
        return new Response(
          JSON.stringify({ error: "AI is busy — please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (resp.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsRaw = toolCall?.function?.arguments;
    if (!argsRaw) {
      console.error("No tool call in AI response:", JSON.stringify(data).slice(0, 800));
      return new Response(JSON.stringify({ error: "AI did not return structured output" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = typeof argsRaw === "string" ? JSON.parse(argsRaw) : argsRaw;
    } catch (e) {
      console.error("Failed to parse tool args:", e, argsRaw);
      return new Response(JSON.stringify({ error: "AI returned malformed JSON" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Defensive: drop any stream slugs the model invented despite the enum.
    if (Array.isArray(parsed.recommendedStreams)) {
      parsed.recommendedStreams = (parsed.recommendedStreams as { slug: string }[]).filter((s) =>
        (VALID_STREAMS as readonly string[]).includes(s.slug),
      );
    }

    return new Response(
      JSON.stringify({
        interpretation: parsed,
        model: toolCall?.function?.name ? (data?.model ?? "unknown") : "unknown",
        generatedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("interpret-report error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
