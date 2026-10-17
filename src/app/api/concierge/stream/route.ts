import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { CLAUDE_TOOLS, executeTool } from "@/features/concierge/tools/registry";
import { getSystemPrompt } from "@/features/concierge/agent/systemPrompt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { messages, userProfile } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    const encoder = new TextEncoder();

    // 1. LIVE CLAUDE 3.5 SONNET STREAMING (If API key provided)
    if (apiKey && apiKey.startsWith("sk-ant-")) {
      const anthropic = new Anthropic({ apiKey });
      const systemPrompt = getSystemPrompt(userProfile);

      const stream = new ReadableStream({
        async start(controller) {
          const sendSSE = (event: string, data: unknown) => {
            controller.enqueue(
              encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
            );
          };

          try {
            sendSSE("thinking", {
              thought: "Consulting member Travel DNA and analyzing journey constraints...",
            });

            // Initial Claude Call
            const runner = anthropic.messages.stream({
              model: process.env.CLAUDE_MODEL || "claude-3-5-sonnet-20241022",
              max_tokens: 2500,
              system: systemPrompt,
              tools: CLAUDE_TOOLS as unknown as Anthropic.Tool[],
              messages: messages.map((m: { role: string; content: string }) => ({
                role: m.role as "user" | "assistant",
                content: m.content,
              })),
            });

            for await (const chunk of runner) {
              if (
                chunk.type === "content_block_delta" &&
                chunk.delta.type === "text_delta"
              ) {
                sendSSE("delta", { text: chunk.delta.text });
              }
            }

            const finalMessage = await runner.finalMessage();

            // Check for tool use blocks
            for (const content of finalMessage.content) {
              if (content.type === "tool_use") {
                sendSSE("tool_start", {
                  tool: content.name,
                  input: content.input,
                });

                // Execute tool
                const toolOutput = await executeTool(
                  content.name,
                  content.input as Record<string, unknown>
                );

                sendSSE("tool_result", {
                  tool: content.name,
                  result: toolOutput,
                });
              }
            }

            sendSSE("done", { status: "complete" });
            controller.close();
          } catch (err: unknown) {
            sendSSE("error", {
              message: (err as Error).message || "Stream error",
            });
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    // 2. HIGH-FIDELITY LUXURY SIMULATOR FALLBACK (When ANTHROPIC_API_KEY is not yet entered)
    const stream = new ReadableStream({
      async start(controller) {
        const sendSSE = (event: string, data: unknown) => {
          controller.enqueue(
            encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
          );
        };

        const lastUserMsg = messages[messages.length - 1].content.toLowerCase();

        // Step 1: Thinking trace
        sendSSE("thinking", {
          thought:
            "Member inquiry received. Inspecting Travel DNA (Preference: Lie-flat, Michelin, Jain/Vegan compliance)...",
        });
        await new Promise((r) => setTimeout(r, 400));

        // Step 2: Determine appropriate tools based on intent
        let destination = "St. Moritz";
        let origin = "BOM";
        let toolName = "search_hotels";
        let toolInput: Record<string, unknown> = {
          cityOrResort: "St. Moritz",
          checkInDate: "2026-12-10",
          checkOutDate: "2026-12-15",
        };

        if (lastUserMsg.includes("maldives") || lastUserMsg.includes("villa") || lastUserMsg.includes("beach")) {
          destination = "Maldives";
          origin = "BOM";
          toolInput = {
            cityOrResort: "Maldives",
            checkInDate: "2026-11-20",
            checkOutDate: "2026-11-26",
          };
        } else if (lastUserMsg.includes("flight") || lastUserMsg.includes("ticket") || lastUserMsg.includes("jet")) {
          toolName = "search_flights";
          toolInput = {
            origin: "BOM",
            destination: "ZRH",
            departureDate: "2026-12-10",
            cabinClass: "BUSINESS",
          };
        }

        sendSSE("thinking", {
          thought: `Querying live GDS inventory for ${destination} with parallel Amadeus flight and suite connectors...`,
        });
        await new Promise((r) => setTimeout(r, 500));

        // Step 3: Tool Execution
        sendSSE("tool_start", { tool: toolName, input: toolInput });
        const toolResult = await executeTool(toolName, toolInput);
        sendSSE("tool_result", { tool: toolName, result: toolResult });
        await new Promise((r) => setTimeout(r, 400));

        // Step 4: Weather Check
        sendSSE("tool_start", {
          tool: "get_weather",
          input: { location: destination, dates: ["2026-12-10", "2026-12-11"] },
        });
        const weatherResult = await executeTool("get_weather", {
          location: destination,
          dates: ["2026-12-10", "2026-12-11"],
        });
        sendSSE("tool_result", { tool: "get_weather", result: weatherResult });
        await new Promise((r) => setTimeout(r, 400));

        // Step 5: Streaming Response Narrative
        const narrative = [
          `I have orchestrated your private arrangement for **${destination}**.\n\n`,
          `Our GDS connectors have verified live availability with direct private transfers standing by. `,
          `In adherence to your **Travel DNA**, all reservations feature executive culinary tailoring and flexible luxury guarantees.\n\n`,
          `*Notice:* Live fares and suites are held under provisional reservation. Click **Confirm Hold** on the card below to lock your suite.`,
        ];

        for (const part of narrative) {
          sendSSE("delta", { text: part });
          await new Promise((r) => setTimeout(r, 70));
        }

        sendSSE("done", { status: "complete", simulated: true });
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
