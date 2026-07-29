from dotenv import load_dotenv
from anthropic import Anthropic
import os

load_dotenv()

client = Anthropic()
model = "claude-sonnet-5"



message = client.messages.create(
    model=model,
    max_tokens=1000,
    messages=[
        {
            "role": "user",
            "content": "what is quantum computing? Anwer in one sentence" 
        }
    ]
)


message.content[0].text