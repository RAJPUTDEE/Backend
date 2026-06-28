# Introduction to Foundational AI

---

## History of AI

The term "Artificial Intelligence" has existed since 1950. Its evolution can be broadly divided into three phases:

---

### 1. Heuristics (1950–1990)

Heuristics refer to a set of criteria or rules of thumb that provide an estimate of the most viable solution. By balancing:

- **Exploration** — searching new possibilities
- **Exploitation** — refining known solutions

Heuristic algorithms efficiently solve complex problems that would otherwise be computationally expensive. Their key advantage is the ability to navigate large search spaces by prioritizing the most promising paths, significantly reducing the number of possibilities to explore.

---

### 2. Classical Machine Learning (1990–2010)

Classical ML algorithms are statistical and probabilistic techniques that learn patterns from structured data without relying on deep neural networks. Key characteristics:

- Primary choice for tabular, structured datasets
- Suitable when computational resources or training data are limited
- Can predict continuous numerical values from labeled historical data

#### Linear Regression

Finds the best-fitting straight line (or hyperplane) to model the relationship between independent features and a continuous target variable.

It uses the equation:

```
y = wx + b
```

Where:
- `w` = weight (parameters)
- `b` = bias

The model starts with a random value and iteratively finds the best-fitting line using a strategy called **Ordinary Least Squares (OLS)**.

> **Limitation:** When multiple features produce curves instead of a straight line, Linear Regression does not yield the best results. This limitation led to the development of Neural Networks.

---

### 3. Neural Networks & Deep Learning (2010s onwards)

Neural Networks (NN) are inspired by the human brain and consist of multiple nodes (neurons) organized in layers. Each node processes inputs using:

- **Bias** — associated with each node
- **Weights** — associated with inter-connections between nodes

Neural Networks use **logistic regression** (not linear regression) for classification tasks. It applies a sigmoid activation function:

```
y = σ(wx + b)
```

Where `σ` (sigma) is the sigmoid function that squashes the output between 0 and 1.

This concept of Neural Networks forms the foundation of modern **Deep Learning (DL)** algorithms, which use many other techniques beyond logistic regression.

#### Training Strategies

To achieve the best-fit model, Neural Networks rely on two key strategies:

1. **Gradient Descent** — Iteratively adjusts weights and biases in the direction that minimizes the error (loss), moving closer to the optimal solution.
2. **Backpropagation** — Propagates the error signal backward through the network, computing gradients layer by layer to update weights and biases accordingly.

---

### 4. Transformer Architecture (2017–present)

The Transformer architecture was introduced in the paper **"Attention is All You Need"** by Vaswani et al. in 2017, revolutionizing AI — particularly in Natural Language Processing (NLP).

Key components:

- **Encoder** — Processes the input data and captures contextual relationships between elements
- **Decoder** — Generates the output based on the encoded information

Transformers replaced the need for recurrence (like RNNs) entirely, enabling far more parallelization and better handling of long-range dependencies in data.
