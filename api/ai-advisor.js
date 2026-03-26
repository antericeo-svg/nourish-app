export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const { message, history = [] } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are a nutrition advisor for Nourish, a meal planning app. The user describes dietary goals, preferences, restrictions, or cravings.

Respond ONLY with valid JSON (no markdown, no backticks, no preamble):
{
  "message": "Brief friendly 1-2 sentence response",
  "meals": [
    {
      "name": "Meal Name",
      "mealType": "Breakfast|Lunch|Dinner|Snack",
      "ingredients": ["ingredient1", "ingredient2"],
      "calories": 400,
      "protein": 30,
      "carbs": 40,
      "fat": 15,
      "tags": ["high-protein", "quick"]
    }
  ]
}

Suggest 2-4 meals with realistic nutrition. Available tags: high-protein, vegan, vegetarian, low-carb, quick, meal-prep, budget, balanced, comfort, omega-3, energy, whole-food.`,
        messages: [...history, { role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || "API error" });
    }

    const text = data.content?.map(i => i.text || "").filter(Boolean).join("\n") || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("AI Advisor error:", err);
    return res.status(500).json({ error: "Failed to get meal suggestions" });
  }
}
