import os
from dotenv import load_dotenv  # 1. Import load_dotenv
from groq import Groq

# 2. Load the variables from your .env file
load_dotenv()

# Now os.getenv will successfully read GROQ_API_KEY
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

response = client.chat.completions.create(
    model="llama-3.3-70b-versatile",
    messages=[{"role": "user", "content": "What is quantum computing? Answer in one sentence."}],
)

print(response.choices[0].message.content)