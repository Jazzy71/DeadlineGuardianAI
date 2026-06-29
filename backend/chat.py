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


def chat_with_ai(message):

    prompt = f"""
You are Deadline Guardian AI.

You help students manage deadlines.

Reply professionally.

User:

{message}
"""

    try:

        response = model.generate_content(prompt)

        return response.text

    except:

        return "AI quota exceeded. Try again later."