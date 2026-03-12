import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const NVIDIA_API_KEY = Deno.env.get("NVIDIA_API_KEY");
    if (!NVIDIA_API_KEY) {
      throw new Error("NVIDIA_API_KEY is not configured");
    }

    const response = await fetch(
      "https://integrate.api.nvidia.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b",
          messages: [
            {
              role: "system",
              content:
                "You are Guru, an expert AI tutor for Data Structures, Algorithms, and Competitive Programming on AlgoGuru. You help students understand concepts, debug code, optimize solutions, and prepare for coding interviews. Be concise, use examples, and format code in Java when relevant. Use markdown formatting.",
            },
            ...messages,
          ],
          temperature: 0.7,
          top_p: 0.95,
          max_tokens: 4096,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("NVIDIA API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: `NVIDIA API error: ${response.status}` }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("guru-chat error:", e);
    return new Response(
      JSON.stringify({
        error: e instanceof Error ? e.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
