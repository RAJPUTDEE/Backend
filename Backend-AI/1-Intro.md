# Introduction to Foundational AI

---

## History of AI

The term "Artificial Intelligence" has existed since 1950. Its evolution can be broadly divided into four phases:

---

### 1. Heuristics (1950–1990)

Heuristics are rules of thumb that estimate the most viable solution without guaranteeing a perfect one. They work by balancing:

- **Exploration** — searching new possibilities
- **Exploitation** — refining known solutions

Their key advantage is navigating large search spaces efficiently by prioritizing the most promising paths, making problems that would otherwise be computationally expensive much more manageable.

---

### 2. Classical Machine Learning (1990–2010)

Classical ML algorithms are statistical and probabilistic techniques that learn patterns from structured data. Key characteristics:

- Best suited for tabular, structured datasets
- Works well when data or compute is limited
- Can predict continuous values from labeled historical data

#### Linear Regression

The simplest mental model in ML. If study hours go up, marks may go up — you fit a line to estimate future values.

```
y = wx + b
```

- `w` = weight (how much each input matters)
- `b` = bias (baseline offset)

The model starts with random values for `w` and `b`, predicts outputs, compares them with actual values, and keeps adjusting to reduce error. This process is called **Ordinary Least Squares (OLS)**. Think of **Gradient Descent** as slowly walking downhill on the error surface until you reach a better-fitting line.

When there are multiple features (e.g., study hours *and* home atmosphere), the equation extends to:

```
y = w1x1 + w2x2 + b
```

> **Limitation:** When data has curves or complex patterns, a single straight line is not enough. This pushed the field toward Neural Networks.

#### Other Classical ML Algorithms

Not all ML algorithms are regression-based. For example:

- **Random Forest** — uses decision-tree logic (branching rules), not slopes or gradients
- **Logistic Regression** — uses a linear score passed through a sigmoid function for classification (not a decision tree, not pure regression)

> A decision tree uses branching logic. Slope and gradient belong to regression-style learning, not tree splits.

---

### 3. Neural Networks & Deep Learning (2010s onwards)

Deep learning is not a totally different idea from regression — it is a much larger network of repeated weighted transformations. Instead of one line, you stack many nodes across many layers, each performing a weighted calculation and passing its output forward.

A neural network consists of nodes (neurons) organized in layers. Each connection has a **weight**, and each node has a **bias**. The number of parameters (weights + biases) comes from the connections between nodes, not just the count of nodes.

#### From Regression to Neural Networks

| Model | Core idea |
|---|---|
| Linear Regression | One straight-line fit |
| Logistic Regression | Linear score + sigmoid, for classification |
| Neural Network / Deep Learning | Many weighted layers with activations (sigmoid, tanh, etc.) |
| Random Forest | Decision-tree branching, no gradients |

A neuron is closer in spirit to regression + activation than to a decision tree.

#### How a Neural Network Learns

Training happens in two passes:

1. **Forward Pass** — the network computes an output from the input
2. **Backpropagation** — the error is sent backward through the network, and all weights that contributed to the wrong prediction are adjusted

This is driven by **Gradient Descent** — iteratively nudging weights in the direction that reduces error, like walking downhill toward the lowest point.

> The model does not start with the ideal line. It starts randomly and improves gradually by reducing error.

> Key insight: Deep learning generalizes regression by chaining many calculations instead of relying on one straight-line fit.

#### Scaling Up to LLMs

A small toy network might have around 14 weights. A modern LLM has **billions**. When you see model sizes like 7B, 128B, or 170B — the "B" stands for **billion parameters**, not nodes or powers. GenAI is deep learning at a much larger scale: more data, more layers, and vastly more parameters.

> Large language models are not a new kind of magic — they are very large deep learning systems.

---

### 4. Transformer Architecture (2017–present)

The Transformer was introduced in the paper **"Attention is All You Need"** by Vaswani et al. (Google Brain) in 2017, and it revolutionized AI — particularly Natural Language Processing (NLP).

It replaced recurrence-based models (like RNNs/LSTMs) entirely, enabling far better parallelization and understanding of long-range context in language.

Key components:

- **Encoder** — Takes input text, converts it to tokens, then to **embeddings** (numerical vectors the model can work with), and captures contextual relationships
- **Decoder** — Takes those embeddings and generates the output token by token

#### LLM Internals: Tokenization → Embeddings → Output

The internal pipeline of an LLM looks like this:

```
Text → Tokenization → Token IDs → Embeddings → Model Processing → Output Tokens → Text
```

- **Tokenization** — text is broken into smaller units (tokens) and mapped to numeric IDs. These IDs are just labels; they don't carry meaning yet.
- **Embeddings** — each token ID is converted into a rich numerical vector that encodes meaning and context. The same word can have different embeddings depending on context (e.g., "apple" as fruit vs. "Apple" as a company).
- The model computes on embeddings, not raw text or bare token IDs.

> Tokenization identifies pieces of text. Embeddings encode meaning. They are not the same thing.

#### Attention

Attention is the mechanism inside Transformers that lets the model decide which parts of the input to focus on when generating each output token. It is what gives Transformers their ability to understand context across long sequences. This concept becomes especially important when studying **RAG (Retrieval-Augmented Generation)** later.

---

## Generative AI

Once the deep learning and Transformer foundation was in place, **Generative AI (GenAI)** emerged as the application layer built on top of these systems. The main leap from traditional ML/DL to GenAI is scale and breadth — GenAI turned AI into something many more people can use directly, not just ML specialists.

### What GenAI Covers

GenAI is broadly grouped into five areas:

| Area | Examples |
|---|---|
| Text | ChatGPT, Claude, Gemini |
| Image | DALL·E 3 |
| Audio | ElevenLabs, Suno |
| Video | Runway |
| Code | GitHub Copilot, Cursor |

- **Text** is the most mature and reliable area
- **Image and audio** are improving rapidly
- **Video** is powerful but still uneven — consistency across frames is particularly hard
- **Code generation** is technically text generation but treated as its own practical category

### Classical ML vs. GenAI — When to Use Which

The choice depends on the problem shape, not hype:

- Use **classical ML** when you have structured/tabular data and a well-defined prediction task
- Use **GenAI** when the task involves language, generation, reasoning, or unstructured data

Understanding both the internal mechanics of LLMs and the boundary between traditional prediction systems and generative systems is what makes a well-rounded AI engineer.

---

## Agentic Architecture

Modern enterprise AI is rarely just "send a prompt, get a response." Real systems involve **agentic architecture** — agents that decide what to do next, route requests, fetch information from external sources, and then respond. This is the core theme of real-world AI engineering.

### Key Concepts

- **Agent** — an AI component that can take actions, not just generate text
- **Multi-agent systems** — multiple agents working together, each handling a specific task
- **Orchestration** — controlling the flow and decision logic across agents and tools

### Tools & Frameworks

| Tool | Best For |
|---|---|
| **LangChain** | Sequential agent pipelines |
| **LangGraph** | Controlled, enterprise-grade agentic architecture |
| **AutoGen / CrewAI** | Code-based multi-agent frameworks |
| **n8n** | Low-code/no-code prototyping, indie builders, micro-SaaS |

> Low-code tools like n8n are great for moving fast, but enterprise systems lean toward LangGraph-style orchestration for more control.

A typical enterprise agentic workflow: receive user input → route to the right system → retrieve relevant data → assemble and return a response.

> Modern AI work is often orchestration work — routing, retrieval, and decision logic *around* the model, not just prompting it.

---

## High-Level LLM Lifecycle

The end-to-end story of how an LLM is built and used:

1. **Data Collection** — massive amounts of text from the internet, books, etc.
2. **Tokenization** — text broken into tokens and mapped to IDs
3. **Transformer Architecture** — encoder-decoder structure processes the tokens
4. **Training** — billions of sequences used to train the model to predict the next token
5. **Generation** — at inference time, the model predicts one token at a time (autoregressive)

> If you understand attention and embeddings, the rest of the LLM pipeline becomes much easier to reason about. These concepts are also the foundation for RAG systems covered later.
