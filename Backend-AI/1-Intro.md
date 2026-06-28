### History of AI
The term AI exists from 1950. Between 1950-1990 there was a term called Heuristics.
- Heuristics(1950-1990):
    It refer to a set of criteria or rules of thumb that provide an estimate of the most viable solution. By balancing exploration (searching new possibilities) and exploitation (refining known solutions), heuristic algorithms efficiently solve complex problems that would otherwise be computationally expensive.
    The advantage of heuristic search techniques in AI is their ability to efficiently navigate large search spaces. By prioritizing the most promising paths, heuristics significantly reduce the number of possibilities that need to be explored. This not only accelerates the search process but also enables AI systems to solve complex problems that would be impractical for exact algorithms.
- Classical ML(1990-2010):
    1. These algorithms are statistical and probabilistic techniques that learn patterns from structured data without relying on deep neural networks.
    2. They remain the primary choice for tabular, structured datasets where computational resources or training data are limited.
    3. These algorithms predict continuous numerical values based on labeled historical data.
    ## Linear Regression: Finds the best-fitting straight line (hyperplane) to model the relationship between independent features and a continuous target/dependent/class.
- Linear Regression uses a random value to come to the best fitting line. For this analysis it makes use of an equation

## y = wx + b
 where w is the weight/parameters and b is the bias. and uses the strategy called Ordinary Least Square

# Problem with linear regression:
- If we have multiple features for which we do not have a straight line and instead we get curves in that case we do not get the best results.
- This gave birth to Neural Networks.

## Neural Networks:
- It also uses an enhanced version of linear regression called logistic linear regression.
- Formula for it is similar to Linear Regression but it uses a sigmoid
    y = sigma(wx + b)
- It has multiple nodes, each node processes linear regressions based on Bias(Nodes) and Weights(inter-connection between multiple nodes).
- This concept of NN is nothing but the modern Deep Learning(DL) algorithms.
- There are multiple algorithms other than logistic regression used by multiple DL models.
- In neural networks to achieve the best fit line it uses two strategies
1. Gradient Descent: Adjusting errors to achieve the ideal line(best fit line).
2. Back Propagation: Retraining data with weight and bias adjustments and reaching correct approx result.

- Tranformer Architecture(2017):
- The Transformer architecture, introduced in the paper "Attention is All You Need" by Vaswani et al. in 2017, revolutionized the field of AI, particularly in natural language processing (NLP).
- These transformers uses encoders and decoders.
