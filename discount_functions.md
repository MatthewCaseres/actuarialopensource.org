# Discount functions

Define a **discount function** $v(t_1, t_2)$ is interpreted as the time $t_1$ value of a payment of $1$ at time $t_2$.

* `0 <= t1, t2`
* `0 < v(t1, t2)`

```py
def v(t1: float, t2: float) -> float:
```

* If $t_1 < t_2$, then values are discounted to $t_1$ and likely $v(t_1, t_2) < 1$ 
* If $t_1 > t_2$, then values are accumulated to $t_2$ and likely $v(t_1, t_2) > 1$



For discount functions we assume that

$$
\begin{align}
v(t_1, t_2) &> 0 \\
v(t_1, t_2) \cdot v(t_2, t_3) &= v(t_1, t_3) \quad \forall t_1, t_2, t_3 \in \mathbb{R}_{\geq 0}
\end{align}
$$

## Arbitrage with forward rates

Arbitrage opportunities are when you can create profit with 0 initial investment. 

Our definition of a discount function $v(t_1, t_2) \cdot v(t_2, t_3) = v(t_1, t_3)$ avoids arbitrage opportunities.

If we had
$$
v(t_1, t_2) \cdot v(t_2, t_3) > v(t_1, t_3)
$$

We can buy a payment of $1$ at time $t_3$ for $v(t_1, t_3)$ at time 0. 

We borrow this initial payment and owe $v(t_1, t_3) \cdot v(t_2, t_1)$ at time $t_2$. To repay this at time $t_2$ we borrow again and repay $(v(t_1, t_3) \cdot v(t_2, t_1)) \cdot v(t_3, t_2)$. So our $t_1$ net cashflow is 0, $t_2$ net cashflow is 0, and our $t_3$ net cashflow is positive. This is an arbitrage opportunity.

$$
1 - (v(t_1, t_3) \cdot v(t_2, t_1)) \cdot v(t_3, t_2) = \\
1 - \frac{v(t_1, t_3)}{v(t_1, t_2) \cdot v(t_2, t_3)} > 0 \\
$$

A similar argument applies if $v(t_1, t_2) \cdot v(t_2, t_3) < v(t_1, t_3)$.

## Formulas

1.  $v(t, t) = 1$

$$
\begin{align*}
v(t, t) \cdot v(t, t) &= v(t, t) \implies \\
v(t, t) \cdot v(t, t) - v(t, t) &= 0  \implies \\
v(t, t) \cdot (v(t, t) - 1) &= 0 \implies \\
v(t, t) &= 0 \text{ or } v(t, t) = 1
\end{align*}
$$


We defined $v(t,t) > 0$, so $v(t, t) = 1$.

2.  $v(t_1, t_2) = \frac{1}{v(t_2, t_1)}$

Follows from $v(t_1, t_2)v(t_2, t_1) = v(t_1, t_1) = 1$

3. $\prod_{i=1}^n v(t_i, t_{i+1}) = v(t_1, t_{n+1})$

Follows from induction.


## Discrete and computational aspects

In practice, we may define discount rates over some discrete range ending at the last timestep $N$ in a simulation. 

* `0 <= t1, t2 <= N`
* `0 < v(t1, t2)`

```py
def v(t1: int, t2: int) -> int:
```

In this case we must consider how to specify the discount rate, and see that the vector 

```py
[v(0, t) for t in range(N)]
```

Allows for $O(1)$ lookups of the discount rate for any `t1, t2` pair

```py
# pv[i] = v(0, i)
pv = [1, 0.952, 0.924, 0.906, 0.897, 0.831]

# This function is called in O(1) time.
def v(i, j):
    return pv[j]/pv[i]

# interest_rate[i] = interest from i to i+1
interest_rate = [v(i, i+1)**-1 - 1 for i in range(len(pv)-1)]
print(f"{interest_rate = }")
```

## Present value

We can define a 1-parameter version of our discount function

$$v(t) = v(0, t)$$

This is convenient because we are often interested in the present value, the value at time 0.

## Exponential discounting

An exponential function will satisfy our discount function definition

$$
e^{-k(t_2 - t_1)}e^{-k(t_3 - t_2)} = e^{-k(t_3 - t_1)}
$$

To take the present value, $v(t) = e^{-kt}$. Note that for something like an annual interest rate of 5%, $k = \ln(1.05)$.


## Code challenge

1. For a constant interest rate of 5%, compute the array [v(0, i) for i in range(10)]

2. Implement a function that takes a list of cashflows, as well as a discount an array `pv0 = [v(0, i) for i in range(N)]` and computes `sum(cashflows[i] * v(t, i) for i in range(N))` in $O(N)$ time.

```py
def (cashflows: List[float], pv0: List[float], t: int) -> float:
    """Compute the present value of cashflows at time t."""
```


3. 

We want to know all values of a discount function $v(t_1, t_2)$ where

`0 <= t1, t2 < N`

We know some values of $v(t_1, t_2)$, we need to compute the rest of them. The known values of $v(t_1, t_2)$ come in the format `(t1, t2, v(t1, t2))`.

* Under what conditions do we violate $v(t_1, t_2) \cdot v(t_2, t_3) = v(t_1, t_3)$
* Under what conditions is it possible to compute all values of $v(t_1, t_2)$?
* If possible, construct a data structure in $O(N)$ that provides $O(1)$ lookup of $v(t_1, t_2)$ for any `t1, t2` pair.

