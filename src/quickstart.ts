import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // reads from env var by default
});

async function main() {
  console.log("🤖 Connecting to Claude...\n");

  const msg = await client.messages.create({
    model: "claude-opus-4-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content:
          "What should I search for to find the latest developments in renewable energy?",
      },
    ],
  });

  console.log("✅ Response received!\n");
  console.log("─".repeat(60));

  // Extract and print the text content cleanly
  for (const block of msg.content) {
    if (block.type === "text") {
      console.log(block.text);
    }
  }

  console.log("─".repeat(60));
  console.log(`\n📊 Usage: ${msg.usage.input_tokens} input tokens, ${msg.usage.output_tokens} output tokens`);
  console.log(`🛑 Stop reason: ${msg.stop_reason}`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
