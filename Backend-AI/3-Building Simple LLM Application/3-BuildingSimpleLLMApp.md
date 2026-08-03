# Building a Simple LLM Application

---

## Session Overview

This session moved from theory into hands-on LLM application building. The focus was on how LLMs are actually used inside real applications — not just how they work conceptually. The progression across the session was:

1. Basic LLM API call
2. JSON mode response
3. Structured output using a Pydantic schema
4. Tool calling with a live weather API

> The goal is not just to write code — it is to understand how to architect the solution. Coding agents can generate a lot of code, but you still need to understand how the pieces fit together.

---

## Google Colab

Colab is a cloud-hosted Jupyter Notebook environment by Google. Runs entirely in the browser — no local Python setup, no dependency conflicts. Notebook files use the `.ipynb` extension, which also works locally in VS Code via the Jupyter extension.

Used in this course because the instructor shares a notebook link with viewer-only access. To get your own editable copy:

1. Open the shared notebook link
2. Go to **File → Save a copy in Drive**
3. Open the copied notebook from your Drive and edit that copy

**Free tier limitations:**
- Runtime disconnects when the session ends — all in-memory variables are lost
- Re-run all cells every time you reconnect
- GPU capped at T4

> Colab is a prototyping and exploration tool. In production, code moves to `.py` files on a server. The notebook-first approach is standard even in enterprise AI teams — build and validate in a notebook, then modularize into a backend service.

---

## The LLM Ecosystem

### Creators vs. Service Providers

**LLM Creators** — companies that build and train the models:
- OpenAI (GPT series)
- Anthropic (Claude)
- Google (Gemini)

**Service Providers** — platforms that expose access to multiple models, often from different creators:
- Azure, AWS, GCP
- OpenRouter
- Groq

With creators, you access their own models directly. With service providers, you can pick from multiple LLMs in one place using a single API key.

### Closed-Source vs. Open-Source Models

| Type | What it means |
|---|---|
| Closed-source | Commercial models (GPT, Claude). Internal training details are not public. Accessed via API/subscription — you cannot host them yourself. |
| Open-source | Weights and/or code are publicly available (e.g., Hugging Face, GitHub). Can be self-hosted, fine-tuned, and deployed on your own infrastructure. |

Tools like **Ollama** let you run open-source models locally — useful when you want to avoid API costs or need offline access.

#### BLOOM — A Historical Milestone

**BLOOM** (2022) was one of the first major open-source LLMs:
- 176 billion parameters
- Trained on 46 languages and 13 programming languages

BLOOM proved that large-scale open-source LLM development was viable, and helped catalyze later models like Llama and Mistral.

---

## API Keys — Handling and Storage

Every LLM provider issues an API key to identify and authenticate requests. Never hard-code an API key in your code — if pushed to GitHub, it is exposed.

In this session, keys are loaded at runtime using `getpass` — prompts for input without displaying it on screen, and stores it as an environment variable for the session:

```python
import os, getpass

if not os.environ.get("OPENROUTER_API_KEY"):
    os.environ["OPENROUTER_API_KEY"] = getpass.getpass("Enter your OpenRouter API key: ")
```

**Colab Secrets** (key icon in the left sidebar) stores named key-value pairs that persist in Google Drive across sessions — avoids re-entering the key every time.

**In production:**
- `.env` file loaded via `python-dotenv` — never committed to git
- Cloud secrets managers: AWS Secrets Manager, Azure Key Vault, GCP Secret Manager

> OpenRouter API keys are shown only once at creation — copy immediately. You cannot retrieve it again. A `401` error is almost always a copy/paste issue — re-paste the key carefully and watch for trailing spaces.

---

## OpenRouter

OpenRouter (`openrouter.ai`) is a unified API gateway in front of hundreds of LLMs — open-source (Mistral, LLaMA, Gemma) and commercial (GPT-4o, Claude). Chosen for this course because it offers many models for free under rate limits, removing the need for paid API accounts.

**Most important thing:** OpenRouter is fully OpenAI-compatible. The API format, SDK, and request structure are identical to calling OpenAI directly — only the `base_url` changes. Everything learned here transfers directly to OpenAI, Azure OpenAI, or any OpenAI-compatible provider.

**Model used in class:** `openai/gpt-4o-mini`

**Fallback free models** (search "free" on the OpenRouter models page):
- `mistralai/mistral-7b-instruct`
- `meta-llama/llama-3.1-8b-instruct`
- `google/gemma-7b-it`

> Free models can be removed at any time. For production, use a paid tier or go directly to the model provider.

## Groq (Backup Provider)

Groq (`console.groq.com`) is a hardware company that built custom LPU (Language Processing Unit) chips for fast LLM inference. Offers free API access to a few open-source models. Used as a backup provider in this session.

**Install:** `pip install groq` | **Model used:** `llama-3.1-8b-instant`

---

## Making a Basic LLM API Call

The OpenAI Python SDK is used, pointed at OpenRouter's base URL. The client is initialized once with connection config. The model is specified per call — not at client init — allowing different models for different tasks from the same client.

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ["OPENROUTER_API_KEY"],
)

response = client.chat.completions.create(
    model="openai/gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful AI instructor. Explain concepts simply."},
        {"role": "user", "content": "Explain what an API is in two sentences."},
    ],
    temperature=0.2,
    top_p=0.9,
    max_tokens=300
)

print(response.choices[0].message.content)
```

Response text is at `response.choices[0].message.content`. The `choices` list exists because some configurations return multiple candidate responses — `[0]` is the primary one.

### Message Roles

`messages` is a list of dicts, each with `role` and `content`. This is the full conversation context sent to the LLM on every call.

| Role | Written by | Purpose |
|---|---|---|
| `system` | Developer | Global instruction — defines LLM behavior, persona, and constraints for the entire session |
| `user` | End user | Dynamic input — changes with every request |
| `assistant` | LLM | Previous LLM responses — included to maintain conversation history in multi-turn chats |
| `tool` | Application code | Result returned from an external tool call |

The system prompt is the developer's primary control mechanism. It stays fixed for the application's lifetime and is invisible to the end user. Every custom AI product you've used has a carefully crafted system prompt behind it.

> Don't put the user's task into the system prompt. The system prompt defines the role and behavior — the user prompt is what changes per request.

---

## Generation Parameters

### Temperature

Controls creativity and randomness by scaling the probability distribution over next tokens before sampling.

| Range | Behavior | Use case |
|---|---|---|
| 0 – 0.3 | Deterministic — highest probability tokens always picked | Structured output, code generation, factual Q&A |
| 0.3 – 0.9 | Balanced | Conversational AI, general purpose |
| 0.9 – 1.2 | Creative — lower probability tokens considered | Marketing copy, brainstorming, creative writing |
| > 1.2 | Incoherent — hallucination risk | Avoid in production |

### Top-P (Nucleus Sampling)

Filters which tokens are eligible for sampling by setting a **cumulative probability threshold** — keeps only the tokens whose cumulative probability sum reaches the threshold, discards the rest.

Example with `top_p=0.9`:

| Token | Probability | Cumulative |
|---|---|---|
| "got" | 0.50 | 0.50 |
| "so" | 0.25 | 0.75 |
| "but" | 0.15 | 0.90 ← cutoff |
| "what" | 0.08 | 0.98 — excluded |

- `top_p=1` (default) — all tokens eligible, no filtering
- Lower value → more focused, predictable output

**Why Top-P over Top-K:** Top-P is adaptive — when the model is very confident (one token at 0.95), it keeps just that one. When uncertain, it keeps more. Top-K always keeps a fixed count regardless of the probability landscape.

### Top-K

Keeps only the top K highest-probability tokens. `top_k=3` means only 3 candidates are considered for the next token. Less commonly used than Top-P.

### max_tokens

Maximum output tokens. ~300 tokens ≈ ~200 words. In some providers, `max_tokens` covers input + output combined — check the SDK docs.

> No universally correct values for any of these parameters. They are application-specific and determined through testing and iteration.

---

## Structured Output

LLM responses are plain text strings by default. In real applications, LLM output feeds into something else — a frontend, a database, another API, a downstream pipeline. Plain text is unreliable for this. Structured output solves it.

### JSON Mode

Simplest form. Instruct the LLM via system prompt to return valid JSON and set `response_format={"type": "json_object"}`.

```python
response = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[
        {"role": "system", "content": "Return only a valid JSON object. Include the keys topic, explanation, and examples."},
        {"role": "user", "content": "Explain cosine similarity with two simple examples."},
    ],
    response_format={"type": "json_object"},
    temperature=0,
)

data = json.loads(response.choices[0].message.content)
```

**Limitation:** Guarantees valid JSON syntax only — does not enforce specific field names, types, or constraints. The LLM may add extra fields or name them differently.

---

## Pydantic — Schema Enforcement for LLM Output

Pydantic is a Python data validation library. You define a class describing the exact data structure — field names, types, allowed values, numeric bounds, list constraints. Pydantic validates that received data matches this definition.

In LLM applications, Pydantic does two things:
1. **Generates a JSON Schema** from the class — sent to the LLM as a strict instruction for output format
2. **Validates the response** on the Python side — confirms the LLM actually followed the schema

```python
from pydantic import BaseModel, Field, ConfigDict
from typing import Literal

class ConceptExplanation(BaseModel):
    model_config = ConfigDict(extra="forbid")
    topic: str = Field(description="Name of the concept being explained")
    summary: str = Field(description="A concise explanation in beginner-friendly language")
    difficulty: Literal["beginner", "intermediate", "advanced"]
    key_points: list[str] = Field(min_length=2, description="At least 2 key ideas")
    example: str = Field(description="One practical example")
    confidence: float = Field(ge=0, le=1, description="Confidence score between 0 and 1")
```

Using it in an API call with strict schema enforcement:

```python
response = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[
        {"role": "system", "content": "You are an AI instructor. Follow the supplied JSON schema exactly."},
        {"role": "user", "content": "Explain LoRA scaling in simple language."},
    ],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "concept_explanation",
            "strict": True,
            "schema": ConceptExplanation.model_json_schema(),
        },
    },
    temperature=0,
)

concept = ConceptExplanation.model_validate_json(response.choices[0].message.content)
print(concept.topic)
print(concept.difficulty)  # Guaranteed: "beginner" | "intermediate" | "advanced"
```

**Key constraints and what they enforce:**

| Constraint | Effect |
|---|---|
| `extra="forbid"` | LLM cannot return fields not defined in the schema |
| `Literal[...]` | Field value restricted to listed options only |
| `Field(ge=0, le=1)` | Numeric field enforced within range |
| `Field(min_length=2)` | List must have at least 2 elements |
| `strict=True` | LLM must follow schema exactly, no deviations |

**Two-layer validation — why both matter:**

| Layer | Responsibility |
|---|---|
| `response_format` with `json_schema` | Instructs the LLM to follow the schema at generation time |
| `model_validate_json()` | Verifies in Python that the response actually matches the schema |

> JSON mode guarantees valid JSON syntax. Pydantic with `json_schema` enforces the exact structure. Use both together for reliable structured output.

> Pydantic schema is sent to the LLM as part of the prompt — it consumes tokens.

---

## Tool Calling

LLMs are frozen at their training cutoff — they cannot access live data, query databases, call internal APIs, or interact with external systems. Tool calling is the mechanism that enables this.

You define tools (Python functions), describe them to the LLM, and let the LLM decide when to use them. The LLM does not execute the function — it returns a structured decision: "call this tool with these arguments." Your code executes the function, sends the result back, and the LLM uses that result to formulate the final answer.

**Always involves two LLM calls:**

```
Call 1: User question + tool descriptions
        → LLM decides: "call get_current_weather with location=Kolkata"
        ↓
Your code executes get_current_weather("Kolkata") → real weather data
        ↓
Call 2: Original conversation + tool result
        → LLM formulates final natural-language answer
```

### Step 1 — The Tool (regular Python function)

```python
def get_current_weather(location: str):
    response = requests.get(
        "https://api.openweathermap.org/data/2.5/weather",
        params={"q": location, "appid": os.environ["OPENWEATHER_API_KEY"], "units": "metric"},
        timeout=20
    )
    response.raise_for_status()
    data = response.json()
    return {
        "location": data["name"],
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "condition": data["weather"][0]["description"]
    }
```

### Step 2 — Describe the Tool to the LLM

The LLM never sees your Python code. It only sees the tool name, description, and argument schema. Pydantic is used here for the **input** schema — defines what arguments the tool expects.

```python
class WeatherToolInput(BaseModel):
    location: str = Field(description="Name of the city, for example Kolkata or Paris")

weather_tool_definition = {
    "type": "function",
    "function": {
        "name": "get_current_weather",
        "description": "Get the current temperature, humidity, wind speed, and weather condition for a city using OpenWeather.",
        "parameters": WeatherToolInput.model_json_schema(),
    },
}
```

### Step 3 — Tool Router

Maps the LLM's tool choice to the actual Python function. In a real application, `AVAILABLE_TOOLS` holds all registered tools.

```python
AVAILABLE_TOOLS = {"get_current_weather": get_current_weather}

def execute_tool(tool_name: str, raw_arguments: str):
    if tool_name not in AVAILABLE_TOOLS:
        raise ValueError(f"Unknown tool requested: {tool_name}")
    validated_args = WeatherToolInput.model_validate_json(raw_arguments)
    return AVAILABLE_TOOLS[tool_name](**validated_args.model_dump())
```

> Always validate the tool name before execution. If the model asks for a tool that doesn't exist, raise an error rather than trying to run it.

### Step 4 — Complete Two-Call Workflow

```python
def ask_with_weather_tool(question: str):
    messages = [
        {"role": "system", "content": "Use the weather tool for current weather questions."},
        {"role": "user", "content": question}
    ]

    # First LLM call — tool selection
    response = client.chat.completions.create(
        model=MODEL_NAME, messages=messages,
        tools=[weather_tool_definition], tool_choice="auto", temperature=0
    )
    assistant_message = response.choices[0].message

    if not assistant_message.tool_calls:
        return assistant_message.content  # No tool needed — direct answer

    tool_call = assistant_message.tool_calls[0]
    arguments = json.loads(tool_call.function.arguments)  # {"location": "Kolkata"}
    weather_result = get_current_weather(arguments["location"])

    messages.append(assistant_message)
    messages.append({
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": json.dumps(weather_result)
    })

    # Second LLM call — formulate final answer using tool result
    final_response = client.chat.completions.create(
        model=MODEL_NAME, messages=messages, temperature=0
    )
    return final_response.choices[0].message.content
```

### tool_choice Options

| Value | Behavior |
|---|---|
| `"auto"` | LLM decides whether to use a tool or answer directly |
| `"required"` | LLM is forced to always call a tool |

> In a real enterprise application, `AVAILABLE_TOOLS` holds many tools — database query, ticket creator, SAP lookup, Google Search, company knowledge base retriever. The LLM picks the right one based on the user's question. This is the foundation of how AI agents work.

---

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| `401 Unauthorized` on OpenRouter | Free model not available to your account (lottery system) | Switch to another free model or use Groq |
| `401 Unauthorized` on OpenWeather | New API key not yet activated, or trailing whitespace | Wait for activation (~10 min), re-copy key carefully |
| `NameError: client is not defined` | Cells not run in order | Run all cells from the top sequentially |
| Pydantic `ValidationError` | `extra="forbid"` missing or schema not passed in `response_format` | Add `ConfigDict(extra="forbid")` and verify schema is passed correctly |
| Colab pip install warning | Version conflict with pre-installed packages | Warning only — safe to ignore |

---

## Notebooks in This Session

| Notebook | What it covers |
|---|---|
| `OpenRouter_LLM_Access_Testing.ipynb` | OpenRouter client setup, API key loading, basic LLM call, fallback model list |
| `LLM_GROQ_TestBed.ipynb` | Groq client setup, basic LLM call using `llama-3.1-8b-instant` |
| `SImple_LLM_Application_openrouter_weather_workflow.ipynb` | JSON mode → Pydantic structured output → Tool calling with OpenWeather — full workflow |

---

## What's Next

- **RAG (Retrieval Augmented Generation)** — giving the LLM access to your own documents and knowledge base
- **LangChain** — abstracts the manual message management, tool routing, and schema handling done manually in this session
- **LangGraph / AutoGen** — multi-step agentic workflows where multiple LLM calls chain together
- **Streaming** — word-by-word output rendering (like ChatGPT) — shown when building a UI-facing application
- **More tools** — Google Search API, Wikipedia, enterprise tools (SAP, ServiceNow)
