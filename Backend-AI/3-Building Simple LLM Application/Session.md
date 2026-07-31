# Session 3 — Building Simple LLM Applications

---

## Google Colab

Colab is a cloud-hosted Jupyter Notebook environment by Google. Runs entirely in the browser — no local Python setup, no dependency conflicts, free GPU access (T4 by default). Notebook files use the `.ipynb` (IPython Notebook) extension — same format works in VS Code locally via the Jupyter extension.

Used in this course because the instructor shares a notebook link with viewer-only access. Students do **File → Save a copy in Drive** to get their own editable copy. Everyone runs the same code without any setup friction.

**Free tier limitations:**
- Runtime disconnects when the session ends — all in-memory variables are lost
- GPU capped at T4 (no A100 or better)
- No persistent runtime across sessions — re-run all cells every time

**Colab Pro / Pro Plus** unlocks longer sessions, better GPUs, more RAM. Not needed for this course.

> Colab is a prototyping and exploration tool. In production, code moves to `.py` files on a server. The notebook-first approach is standard even in enterprise AI teams — build and validate in a notebook, then modularize into a backend service.

---

## LLM Providers

### OpenRouter

OpenRouter (`openrouter.ai`) is a unified API gateway in front of hundreds of LLMs — open-source (Mistral, LLaMA, Gemma) and commercial (GPT-4o, Claude). Chosen for this course because it offers many models for free under rate limits, removing the need for paid API accounts.

**Most important thing to understand:** OpenRouter is fully OpenAI-compatible. The API format, SDK, and request structure are identical to calling OpenAI directly. Only the `base_url` changes. Everything learned here transfers directly to OpenAI, Azure OpenAI, or any OpenAI-compatible provider.

**Model used:** `openai/gpt-4o-mini` — a commercial OpenAI model served via OpenRouter. Available to ~90% of free-tier users.

**Free tier behavior:** OpenRouter uses an internal lottery system for free model access — not every user gets the same free model. This is why some users hit 401 errors even with a valid key.

**Fallback free models** (search "free" on OpenRouter models page):

| Model | Notes |
|---|---|
| `poolside/laguna-xs.2:free` | Being removed — check availability |
| `mistralai/mistral-7b-instruct` | Reliable fallback |
| `meta-llama/llama-3.1-8b-instruct` | Reliable fallback |
| `google/gemma-7b-it` | Reliable fallback |
| `nvidia/nemotron-3-ultra` | Search "free" to confirm availability |

**Free tier limitations:** Rate limits apply. Free models can be removed at any time. For production, use a paid tier or go directly to the model provider.

> To find the correct `base_url` for any model: go to the model's page on OpenRouter → Playground → Code. The base URL shown there is what you use in your client.

### Groq

Groq (`console.groq.com`) is a hardware company that built custom LPU (Language Processing Unit) chips for fast LLM inference. Offers free API access to a few open-source models. Used as a backup provider in this session.

**Why backup and not primary:** Not all SDKs and frameworks natively support Groq's format. OpenRouter's OpenAI-compatible format works universally.

**Model used:** `llama-3.1-8b-instant` | **Install:** `pip install groq`

---

## API Keys — Handling and Storage

Every LLM provider issues an API key to identify and authenticate requests. Universal rule: **never hard-code an API key in your code.** If pushed to GitHub, it is exposed.

In this session, keys are loaded at runtime using `getpass` — prompts for input without displaying it on screen, stores it as an environment variable for the session:

```python
import os, getpass

if not os.environ.get("OPENROUTER_API_KEY"):
    os.environ["OPENROUTER_API_KEY"] = getpass.getpass("Enter your OpenRouter API key: ")
```

**Colab Secrets** (key icon in the left sidebar) stores named key-value pairs that persist in Google Drive across sessions — avoids re-entering the key every time.

**In production:**
- `.env` file loaded via `python-dotenv` — never committed to git
- Cloud secrets managers: AWS Secrets Manager, Azure Key Vault, HashiCorp Vault, GCP Secret Manager

> OpenRouter API keys are shown only once at creation — copy immediately. You cannot retrieve it again.

---

## Making an LLM API Call

The OpenAI Python SDK is used pointed at OpenRouter's base URL. Client is initialized once with connection config. Model is specified per call — not at client init — allowing different models for different tasks from the same client.

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

---

## Roles in the Messages List

`messages` is a list of dicts, each with `role` and `content`. This is the full conversation context sent to the LLM on every call.

| Role | Written by | Purpose |
|---|---|---|
| `system` | Developer | Global instruction — defines LLM behavior, persona, and constraints for the entire application |
| `user` | End user | Dynamic input — changes with every request |
| `assistant` | LLM | Previous LLM responses — included to maintain conversation history in multi-turn chats |
| `tool` | Application code | Result returned from an external tool call |

**System prompt** is the developer's primary control mechanism. Fixed for the application's lifetime, invisible to the end user. In enterprise applications — a support bot, HR assistant, internal knowledge tool — the system prompt defines what the LLM is allowed to do and how it responds. Every custom GPT or AI product you've used has a carefully crafted system prompt behind it.

> Some frameworks (LangChain etc.) use `human` / `AI` instead of `user` / `assistant` — same concept, different naming.

> System prompt cannot be personalized per user (e.g., "You are talking to Shubhada") — it is a global instruction for all users of that application.

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

> Temperature is an inference-time parameter only. Has nothing to do with fine-tuning.

### Top-P (Nucleus Sampling)

LLMs generate a probability distribution over all possible next tokens. Top-P filters which tokens are eligible for sampling by setting a **cumulative probability threshold** — keeps only the tokens whose cumulative probability sum reaches the threshold, discards the rest.

**Example — `top_p=0.9`:**

| Token | Probability | Cumulative |
|---|---|---|
| "got" | 0.50 | 0.50 |
| "so" | 0.25 | 0.75 |
| "but" | 0.15 | 0.90 ← cutoff |
| "what" | 0.08 | 0.98 — excluded |
| "..." | 0.0001 | — excluded |

- `top_p=1` (default) — all tokens eligible, no filtering
- Lower value → more focused, predictable output

**Why Top-P over Top-K:** Top-P is adaptive — tokens kept changes based on model confidence. When model is very confident (one token at 0.95), Top-P keeps just that one. When uncertain, it keeps more. Top-K always keeps a fixed count regardless of the probability landscape — less adaptive.

### Top-K

Keeps only the top K highest-probability tokens. `top_k=3` means only 3 candidates considered for the next token. Default is null (all tokens). Less commonly used than Top-P.

### max_tokens

Maximum output tokens. ~300 tokens ≈ ~200 words. Some SDKs call this `max_output_tokens`. In some providers (e.g., Vox), `max_tokens` covers input + output combined — check the SDK docs.

> No universally correct values for any of these parameters. Application-specific, determined through testing and iteration. Set a value, test with real inputs, get feedback, adjust — standard practice in production.

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
# data["topic"], data["explanation"] directly accessible
```

**Limitation:** Guarantees valid JSON syntax only — does not enforce specific field names, types, or constraints. LLM may add extra fields or name them differently.

---

## Pydantic — Schema Enforcement for LLM Output

Pydantic is a Python data validation library. Define a class describing the exact data structure — field names, types, allowed values, numeric bounds, list constraints. Pydantic validates that received data matches this definition.

In LLM applications, Pydantic does two things:
1. **Generates a JSON Schema** from the class — sent to the LLM as a strict instruction for output format
2. **Validates the response** on the Python side — confirms the LLM followed the schema

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

Using it in an API call:

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

**Constraints and what they enforce:**

| Constraint | Effect |
|---|---|
| `extra="forbid"` | LLM cannot return fields not defined in the schema |
| `Literal[...]` | Field value restricted to listed options only |
| `Field(ge=0, le=1)` | Numeric field enforced within range |
| `Field(min_length=2)` | List must have at least 2 elements |
| `strict=True` | LLM must follow schema exactly, no deviations |

**Two-layer validation:**

| Layer | Responsibility |
|---|---|
| `response_format` with `json_schema` | Instructs LLM to follow schema at generation time |
| `model_validate_json()` | Verifies in Python that response actually matches schema |

> Pydantic schema is sent to the LLM as part of the prompt — it consumes tokens.

> Pydantic works for both **output** (LLM response structure) and **input** (tool call arguments). Both use cases appear in this session.

---

## Tool Calling

LLMs are frozen at their training cutoff — cannot access live data, query databases, call internal APIs, or interact with external systems. Tool calling is the mechanism that enables this.

You define tools (Python functions), describe them to the LLM, and let the LLM decide when to use them. The LLM does not execute the function — it returns a structured decision: "call this tool with these arguments." Your code executes the function, sends the result back. The LLM uses that result to formulate the final answer.

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

### Step 1 — The tool (regular Python function)

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
        "condition": data["weather"][0]["description"]
    }
```

### Step 2 — Describe the tool to the LLM

Pydantic used here for **input** schema — defines what arguments the tool expects. LLM uses this to know what to pass when it decides to call the tool.

```python
class WeatherToolInput(BaseModel):
    location: str = Field(description="Name of the city, for example Kolkata or Paris")

weather_tool_definition = {
    "type": "function",
    "function": {
        "name": "get_current_weather",
        "description": "Get the current temperature, humidity, and weather condition for a city using OpenWeather.",
        "parameters": WeatherToolInput.model_json_schema(),
    },
}
```

### Step 3 — Tool router

Maps the LLM's tool choice to the actual Python function. In a real application, `AVAILABLE_TOOLS` holds all registered tools.

```python
AVAILABLE_TOOLS = {"get_current_weather": get_current_weather}

def execute_tool(tool_name: str, raw_arguments: str):
    if tool_name not in AVAILABLE_TOOLS:
        raise ValueError(f"Unknown tool requested: {tool_name}")
    validated_args = WeatherToolInput.model_validate_json(raw_arguments)
    return AVAILABLE_TOOLS[tool_name](**validated_args.model_dump())
```

### Step 4 — Complete two-call workflow

```python
def ask_with_weather_tool(question: str):
    messages = [
        {"role": "system", "content": "Use the weather tool for current weather questions."},
        {"role": "user", "content": question}
    ]

    # First LLM call
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

> The LLM never sees your Python code. It only sees the tool name, description, and argument schema. Your code is responsible for executing the function and returning the result.

> In a real enterprise application, `AVAILABLE_TOOLS` holds many tools — database query, ServiceNow ticket creator, SAP lookup, Google Search, company knowledge base retriever. The LLM picks the right one based on the user's question. This is the foundation of how AI agents work.

---

## Notebooks in This Session

| Notebook | What it covers |
|---|---|
| `OpenRouter_LLM_Access_Testing.ipynb` | OpenRouter client setup, API key loading, basic LLM call, fallback model list |
| `LLM_GROQ_TestBed.ipynb` | Groq client setup, basic LLM call using `llama-3.1-8b-instant` |
| `SImple_LLM_Application_openrouter_weather_workflow.ipynb` | JSON mode → Pydantic structured output → Tool calling with OpenWeather — full workflow |

---

## Common Errors in This Session

| Error | Cause | Fix |
|---|---|---|
| `401 Unauthorized` on OpenRouter | Free model not available to your account (lottery system) | Switch to another free model or use Groq |
| `401 Unauthorized` on OpenWeather | New API key not yet activated, or trailing whitespace when copying | Wait for activation, re-copy key carefully |
| `NameError: client is not defined` | Cells not run in order | Run all cells from the top sequentially |
| Pydantic validation error | `extra="forbid"` missing or `model_json_schema()` not passed in `response_format` | Add `ConfigDict(extra="forbid")` and verify schema is passed correctly |
| Colab pip install warning | Version conflict between Colab pre-installed packages and newly installed ones | Not an error — warning only, safe to ignore |

---

## What's Next

- **RAG (Retrieval Augmented Generation)** — giving the LLM access to your own documents and knowledge base
- **LangChain** — enters alongside RAG; abstracts the manual message management, tool routing, and schema handling done manually in this session
- **LangGraph / Autogen** — multi-step agentic workflows where multiple LLM calls chain together
- **Streaming** — word-by-word output rendering (like ChatGPT) — shown when building a UI-facing application
- **More tools** — Google Search API, Wikipedia, enterprise tools (SAP, ServiceNow)
- **Cohere** — additional free LLM provider, shown in a future session
