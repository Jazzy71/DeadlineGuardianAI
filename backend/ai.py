import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_plan(tasks):

    prompt = f"""
You are Deadline Guardian AI.

Analyze the following tasks.

Tasks:

{tasks}

Return the response EXACTLY in this format.

🎯 Priority Tasks
• task 1
• task 2

📅 Suggested Schedule
• suggestion 1
• suggestion 2

🚀 Completion Strategy
• strategy 1
• strategy 2

💡 Productivity Advice
• advice 1
• advice 2

Rules:

- No markdown
- No numbering
- No **
- Maximum 4 bullet points per section
- Keep it concise
- Keep it visually clean
"""

    try:

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        if "429" in str(e):

            return """

⚠ Gemini Free Tier Limit Reached

The free Gemini quota has been exhausted.

Please wait a minute and try again.

💡 Tip

Free accounts have request limits.

For demo purposes you can:

• Reuse the previous AI plan
• Upgrade Gemini
• Add a fallback local planner

"""

        return f"""

⚠ AI Service Error

{str(e)}

Please try again later.

"""