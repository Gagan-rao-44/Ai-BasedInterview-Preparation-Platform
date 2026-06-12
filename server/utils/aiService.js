import axios from "axios";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-3.5-turbo";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
  };
}

function parseJsonFromAI(text) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(cleaned);
}

export async function callAI(prompt) {
  const response = await axios.post(
    OPENROUTER_URL,
    {
      model: MODEL,
      messages: [{ role: "user", content: prompt }],
    },
    { headers: getHeaders() }
  );

  return response.data.choices[0].message.content;
}

export async function generateMCQQuestions(category) {
  const aiText = await callAI(
    `Generate exactly 20 professional MCQ interview questions for ${category} in JSON format.

Example:
[
  {
    "question": "What is React?",
    "options": ["Library", "Database", "Compiler", "Operating System"],
    "answer": "Library"
  }
]

Return ONLY a valid JSON array with exactly 20 questions. No markdown, no explanations.`
  );

  return parseJsonFromAI(aiText);
}

export async function generateHRQuestions() {
  const aiText = await callAI(
    `Generate 5 professional HR behavioral interview questions for a voice-based mock interview.

Focus on: communication skills, teamwork, leadership, conflict resolution, career goals, strengths/weaknesses, situational questions.

Example:
[
  { "question": "Tell me about yourself and why you are interested in this role." },
  { "question": "Describe a time you faced a conflict at work. How did you handle it?" }
]

Return ONLY valid JSON array with exactly 5 questions. No markdown, no explanations.`
  );

  return parseJsonFromAI(aiText);
}

export async function evaluateHRAnswers(questions, answers) {
  const qaPairs = questions.map((q, i) => ({
    questionIndex: i,
    question: q.question,
    answer: answers[i] || "(No answer provided)",
  }));

  const aiText = await callAI(
    `You are an expert HR interview evaluator. Evaluate each candidate answer below.

${JSON.stringify(qaPairs, null, 2)}

Score each answer 0-100 based on: clarity, relevance, structure (STAR method where applicable), professionalism, and depth.

Return ONLY valid JSON in this exact format:
{
  "evaluations": [
    {
      "questionIndex": 0,
      "score": 75,
      "feedback": "Brief specific feedback for this answer"
    }
  ],
  "overallFeedback": "2-3 sentence overall performance summary",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"]
}

No markdown.`
  );

  return parseJsonFromAI(aiText);
}
