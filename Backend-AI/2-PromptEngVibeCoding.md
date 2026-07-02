# Prompt Engineering & Vibe Coding

---

## Quick Recap — From Last Session

### RNN & LSTM

Before Transformers, the dominant architecture was **RNN (Recurrent Neural Network)**. The best version of RNN was:

- **LSTM (Long Short-Term Memory)** — state-of-the-art RNN architecture at the time
- LSTM was good at tasks like sentiment classification, sentence classification, etc.
- **Failure point:** Language translation — LSTM could do word-by-word translation correctly but never understood the *context* or the *concept of language itself*. The word order in translated output was wrong.

> Example: English → Hindi translation using LSTM gave correct individual words but in the wrong sequence.

This limitation gave birth to the **Transformer Architecture**.

---

## Transformer Architecture (2017)

- Paper: **"Attention is All You Need"** — by Google Brain (Vaswani et al.)
  - First published: 12th June 2017
  - Last revised: 2023
- Introduced the **Encoder-Decoder architecture**

### How it works

```
Input (English)
    ↓
Tokenization  →  Tokens
    ↓
Encoder       →  Embeddings (matrix / machine-understandable format)
    ↓
Decoder       →  Predicted Tokens  →  Mapped back to Language (Output)
```

- **Encoder** — Takes input text, converts it into tokens, then into **embeddings** (numerical matrix representation that the machine understands)
- **Decoder** — Takes those embeddings and generates the output (translation, answer, classification, etc.)

> Note: The output is not directly the language — the decoder predicts tokens, and those tokens are then mapped back to words in the target language.

---

## Encoder Models — Era of BERT (2017–2022)

- **BERT** = Bidirectional Encoder Representations from Transformers
- Created by **Google**
- It was a **Language Model (LM)**, not yet an LLM (trained on smaller data compared to modern LLMs)
- Trained on:
  - 2,500 million words from Wikipedia
  - 800 million words from unpublished books
- BERT's goal: **Understand language** — create high-quality embeddings
- BERT was not commercially popular (normal users had no use for raw embeddings), but was a **breakthrough for ML/AI engineers**
- Still widely used today for **embeddings in RAG systems** (cost-effective alternative to OpenAI embeddings)

> BERT embeddings vs OpenAI embeddings: BERT is preferred in enterprise for cost reasons. OpenAI embeddings cost more. Choice depends on company preference, budget, and tech stack (e.g., GCP-heavy companies prefer Google embeddings).

---

## Decoder Models — Era of GPT (2022 onwards)

- GPT-1 → GPT-2 → GPT-3 → **GPT-3.5 (2022)** — this is where the rise of decoder models began
- GPTs are **decoder models** — specialized in generation (decoding)
- All modern LLMs (GPT, Gemini, Claude, etc.) are decoder models

> Important clarification: All LLMs still have an encoder component (to understand input), but the encoder architecture has already reached its peak (2017–2022). The major improvements since then have been in the **decoder** — hence they are called decoder models.

> Analogy: Encoder is like the safety system in cars — it became a standard baseline. The decoder is what keeps improving (like engine performance).

---

## How LLMs Work — Autoregressive Model

LLMs are **autoregressive models** — they predict the next token based on all previous tokens.

### Step-by-step process

1. You give input: `"I live in Paris"`
2. Input is converted to **tokens** → then to **embeddings**
3. Decoder looks at all tokens so far and predicts the **probability of the next token**
4. Example probability distribution:

   | Word  | Probability |
   |-------|-------------|
   | got   | 0.70        |
   | so    | 0.20        |
   | but   | 0.18        |
   | ...   | 0.0001      |

5. The highest probability word is selected (influenced by **temperature**)
6. That word is appended to the input, and the process repeats — this is **autoregression**

> "Auto" = repeatedly, "Regressive" = looking back. The model looks back at everything said so far and predicts the next word.

If a wrong word gets predicted early, subsequent words go off-track — the entire response can become incoherent.

---

## Temperature

Temperature is a parameter that controls the **creativity / randomness** of the LLM's output.

| Range     | Behavior                                                  |
|-----------|-----------------------------------------------------------|
| 0 – 0.5   | Very deterministic — picks highest probability words      |
| 0.5 – 1.0 | Balanced — industry accepted range                        |
| 1.0 – 1.5 | More creative — picks lower probability words too         |
| 1.5 – 2.0 | Too random — output becomes incoherent / rubbish          |

- Temperature is set **programmatically** when calling the LLM API (e.g., `temperature=0.1`)
- Tools like ChatGPT set their own default temperature — users don't control it directly
- Use **low temperature** for: factual answers, code generation, structured outputs
- Use **higher temperature** for: creative writing, image captions, marketing copy, varied outputs

> If temperature is too high and a few rubbish words get generated, the rest of the response will also become rubbish because of autoregression.

---

## Limitations of LLMs

1. **Training cutoff** — LLMs can only answer from data they were trained on (e.g., GPT's cutoff is August 2025). They have no knowledge of events after that date.
2. **No memory by default** — A vanilla LLM has no memory of past conversations. Every call is stateless.
3. **No internet access by default** — The underlying LLM cannot browse the internet. Tools like ChatGPT add this capability on top via agentic architecture.

### How ChatGPT handles these limitations

- ChatGPT is an **application built on top of LLMs** with extra features:
  - Internet search (via agentic architecture — an if-else that triggers a search component)
  - User persona/memory stored in a database (not trained into the model — stored separately and passed as context)
  - Ability to switch between models (e.g., GPT-5.1, GPT-5.2) based on query type
- The LLM itself does none of this — it is ChatGPT's application layer that handles it

> ChatGPT creates a "persona" about you from past chats and stores it in their database. This is passed as context in every new chat — the LLM is not retrained on your data.

> Data privacy: You can turn off chat history usage for training in ChatGPT settings. Companies with GDPR/HIPAA compliance often restrict ChatGPT usage entirely.

---

## Context Window

- The **context window** is the maximum size of input (in tokens) that a model can process at once
- As models improve, context window sizes are increasing
- Larger context window = more tokens used = higher cost
- In ChatGPT, all previous messages in a chat are passed as history until the context limit is reached, after which it starts summarizing older messages

---

## Ollama

- **Ollama is NOT a model** — it is a **platform/sandbox** that lets you run open-source LLMs locally on your machine
- You can use Ollama to host models like DeepSeek, Mistral, LLaMA on your local system
- Useful for tools like Cursor or Claude Code — instead of using a paid API, you can point them to a locally hosted Ollama model

---

## Prompt Engineering

> "Prompt design is simply the art of asking the right question in the right way to get the best answers."

Just like you write code to get the best out of a computer, you write prompts to get the best out of AI.

### Why Prompt Engineering Matters

- Vague prompts → unpredictable, inconsistent outputs
- Structured prompts → consistent, reliable, cost-efficient outputs
- Well-designed prompts can **improve accuracy by 50–80%**
- In enterprise applications, every token costs money — good prompts reduce cost, improve speed, and ensure consistency

---

## Prompting Techniques

### 1. Zero-Shot Prompting

Asking the LLM directly without any examples — purely relying on its trained knowledge.

```
Translate this English sentence to French:
"The weather is beautiful today."
```

Most common technique used by everyone casually. Output can be unpredictable.

---

### 2. One-Shot Prompting

Giving **one example** to show the LLM the pattern/style you want.

```
Convert product features to benefit format.
Example: "Waterproof design" → "Use confidently in any weather"

Now convert: "10-hour battery life"
```

---

### 3. Few-Shot Prompting

Giving **multiple examples** (2–3+) to establish a consistent pattern. More reliable than one-shot.

```
Create product descriptions in this format:
- Wireless earbuds → "Experience freedom with crystal clear sound and all-day comfort"
- Smartwatch → "Stay connected and track your fitness goals with style and precision"

Now create for: Laptop
```

Use cases:
- Enforcing brand tone/style
- Structured medical chatbot responses (e.g., always output: Symptom → Probable Disease → Medication)
- Any scenario where you need consistent formatting

---

### 4. Iterative Prompting

Refining the output through **continuous back-and-forth** conversation.

```
Make it shorter.
Now use bullet points.
Make the tone more intense.
```

- Most commonly used technique in the industry (along with zero-shot)
- Effective for code generation — share error logs, ask it to recheck and regenerate
- Token cost increases with each iteration

---

### 5. RACE Framework

The most widely accepted and standardized prompting framework in the industry.

| Component   | Meaning                                      |
|-------------|----------------------------------------------|
| **R**ole    | Assign a persona/role to the AI              |
| **A**ction  | What you want it to do                       |
| **C**ontext | Background information / constraints         |
| **E**xpectation | Desired format, length, style of output |

**Example — Vague prompt:**
```
Write a marketing plan for our new app.
```

**Example — RACE prompt:**
```
Act as a senior marketing strategist with 10 years of experience in SaaS companies.
Create a content marketing plan for a new project management tool targeting small businesses, launching in Q2 2024.
Provide a 4-week plan with specific content types and posting frequency.
```

> You don't arrive at the ideal prompt on day one. Prompts are versioned and iterated — v1, v2, v3 — until you reach the most effective version.

---

### 6. Chain of Thought (CoT) Prompting

Instead of asking for a direct answer, you instruct the model to **think step by step** before arriving at a conclusion.

```
Should our startup hire a marketing manager or outsource marketing?
Walk me through the key factors step by step: budget, expertise needed, time commitment, and long-term strategy.
```

- Produces a full analysis before the final recommendation (not a black-box answer)
- Especially useful for complex decisions, summarization tasks, log analysis
- Modern "thinking models" (Claude, GPT-5+) use chain of thought internally — this is why they use more tokens

> Real example from instructor: A summarization tool for software logs worked significantly better with CoT + few-shot combined, compared to few-shot alone.

---

### 7. Persona-Based Prompting

Similar to the Role component in RACE, but more detailed — you give the AI a full backstory and history.

```
You are Sara, a senior conversion rate optimization specialist with 8 years of experience at e-commerce companies like Amazon and Shopify. You have increased conversion rates by 40% across 50+ websites.
```

The AI tries to "prove" its persona by responding with the expertise and experience you've described.

---

### 8. Meta Prompting

Asking the AI to **generate a prompt for you**. Useful when you have a creativity block.

```
I want to use AI to create a full 30-day social media content calendar for a new D2C coffee brand launch in India (Instagram, Twitter, LinkedIn).
Your task is to write me the best possible prompt I should use to generate this calendar. The prompt must include role assignment, context, and expected output format.
```

- Saves time when you're stuck
- The generated prompt still needs to be tested and iterated
- Human creativity is sometimes better — use meta prompting as a starting point, not a final answer

---

### 9. Markdown Prompting

Structuring your prompt using **Markdown formatting** (headings, bullet points, bold, tables) to make it easier for the LLM to parse and understand.

- Use `#` for headings, `**bold**` for emphasis, `-` for bullet points, `|` for tables
- Especially useful in enterprise-level prompt design
- Helps the LLM hold onto structure — particularly useful when passing large tables or structured data
- You can also instruct the LLM to respond in Markdown format

```markdown
## Role
You are a senior data analyst...

## Task
Analyze the following sales data...

## Few-Shot Examples
- Example 1: ...
- Example 2: ...

## Expected Output Format
| Month | Revenue | Growth % |
```

---

### 10. Tree of Thought (ToT)

An extension of Chain of Thought — instead of going down **one reasoning path**, the model explores **multiple paths/channels** before arriving at an answer.

```
I am launching an iPhone in a tier-3 city.
Analyze all possible launch strategies: online, offline, hybrid, through distributors, through retailers.
Give a step-by-step analysis for each channel before recommending the best approach.
```

- More thorough than CoT
- Covered more in advanced sessions

---

## Managing Context Across Chat Sessions

**Problem:** Token limits get exhausted in long chats, and starting a new chat loses all context.

**Solutions:**

1. **Session Handoff** (tip from Xavier in class)
   - When a chat gets too long, ask the AI: *"This chat is getting long, please create a session handoff — a markdown summary with all relevant information from this chat."*
   - Paste that summary as the first message in a new chat
   - Especially useful in Claude (which consumes tokens faster)

2. **Summarization approach**
   - Periodically ask the AI to summarize the most important information from the chat
   - Store that summary and pass it as context in the next session

3. **Structured user profile (for applications)**
   - When building your own app, extract key user info from conversations into a structured format (e.g., JSON)
   - Store in a database and pass as context on every new request
   - This is how ChatGPT's "memory" feature works — it's not retraining, it's a stored persona

---

## Vibe Coding

Vibe coding = using AI-powered coding tools to build applications **without writing most of the code manually**.

### Popular Vibe Coding Tools

| Tool          | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| **Lovable**   | Full-stack app builder (frontend-heavy). Good for MVPs. No frontend knowledge needed. |
| **Antigravity** | VS Code-like IDE with AI chat on the right. Choose models per task.       |
| **Cursor**    | AI-powered code editor. Free tier available. Can use Ollama for local models. |
| **Claude Code** | Coding agent by Anthropic. Has access to full repository context.        |
| **Amazon Q**  | Used by the instructor for client work.                                     |
| **OpenCode**  | Open-source alternative to Claude Code. Generous free tier.                |

### Model Selection Strategy (in Antigravity / similar tools)

| Task                        | Recommended Model          |
|-----------------------------|----------------------------|
| Simple HTML/CSS pages       | Gemini Pro / Flash         |
| Basic queries               | Gemini Flash               |
| Complex backend logic       | Claude Sonnet / Opus       |

> This is not a fixed rule — it changes as new models are released.

### What Vibe Coding is Good For

- Generating boilerplate code quickly
- Building MVPs (the instructor's startup Imavi.ai was built using Lovable + Antigravity + Cursor + Claude Code)
- Saving time on repetitive or standard code patterns
- People with no frontend knowledge can still build full-stack apps

### What Vibe Coding is NOT

- A replacement for programming fundamentals
- A guaranteed way to produce production-ready code without review
- Something that removes the need for Python/backend knowledge entirely

> Instructor's stance: "I'm not a huge supporter of creating the entire thing through vibe coding. Your basic Python fundamentals are still important. These tools help save time — especially for boilerplate and basic structure."

---

## Key Takeaways

- LLMs are **autoregressive transformer models** — they predict the next token, one at a time, looking back at all previous tokens
- **Temperature** controls creativity — low = deterministic, high = creative (but risky)
- **Prompt engineering** is the skill of communicating effectively with AI — better prompts = better output, lower cost, higher consistency
- The most used techniques in industry: **Zero-shot**, **Iterative prompting**, **RACE framework**, **Few-shot**, **Chain of Thought**
- **Vibe coding** is a productivity tool — not a replacement for fundamentals
- For AI/GenAI jobs: knowing how to **build agents, use LangGraph, build agentic RAG** is what matters — not knowing the internal workings of coding agents
