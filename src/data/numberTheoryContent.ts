import { ContentSection } from "./recursionContent";

export const numberTheoryContent: ContentSection[] = [
  {
    id: "nt-primes",
    title: "Prime Numbers & Primality Testing",
    difficulty: "Easy",
    theory: [
      "A **prime number** is a natural number greater than 1 that has no positive divisors other than 1 and itself.",
      "**Trial division**: check divisibility up to √n. For large n, use **Miller-Rabin** probabilistic test.",
      "Fundamental theorem of arithmetic: every integer > 1 is either prime or a unique product of primes."
    ],
    code: [
      {
        title: "Primality Check — O(√n)",
        language: "java",
        content: `static boolean isPrime(long n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}`
      },
      {
        title: "Prime Factorization — O(√n)",
        language: "java",
        content: `static List<long[]> primeFactors(long n) {
    List<long[]> factors = new ArrayList<>(); // [prime, exponent]
    for (long p = 2; p * p <= n; p++) {
        int exp = 0;
        while (n % p == 0) { n /= p; exp++; }
        if (exp > 0) factors.add(new long[]{p, exp});
    }
    if (n > 1) factors.add(new long[]{n, 1});
    return factors;
}`
      },
      {
        title: "Count Divisors from Prime Factorization",
        language: "java",
        content: `static long countDivisors(long n) {
    long count = 1;
    for (long p = 2; p * p <= n; p++) {
        int exp = 0;
        while (n % p == 0) { n /= p; exp++; }
        count *= (exp + 1); // Each prime contributes (exp+1) choices
    }
    if (n > 1) count *= 2;
    return count;
}`
      }
    ]
  },
  {
    id: "nt-sieve",
    title: "Sieve of Eratosthenes",
    difficulty: "Easy",
    theory: [
      "The **Sieve of Eratosthenes** finds all primes up to n in O(n·log(log n)) time.",
      "Optimization: start marking from p² (smaller multiples already marked). Only check odd numbers after 2.",
      "Variants: **Linear sieve** O(n), **Segmented sieve** for ranges [L, R] when R is large but R-L is small."
    ],
    code: [
      {
        title: "Basic Sieve of Eratosthenes",
        language: "java",
        content: `static boolean[] sieve(int n) {
    boolean[] isPrime = new boolean[n + 1];
    Arrays.fill(isPrime, true);
    isPrime[0] = isPrime[1] = false;
    
    for (int i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    return isPrime;
}
// Time: O(n·log(log n)), Space: O(n)`
      },
      {
        title: "Smallest Prime Factor (SPF) Sieve",
        language: "java",
        content: `static int[] spfSieve(int n) {
    int[] spf = new int[n + 1];
    for (int i = 0; i <= n; i++) spf[i] = i;
    
    for (int i = 2; i * i <= n; i++) {
        if (spf[i] == i) { // i is prime
            for (int j = i * i; j <= n; j += i) {
                if (spf[j] == j) spf[j] = i;
            }
        }
    }
    return spf;
}`
      },
      {
        title: "Fast Factorization using SPF",
        language: "java",
        content: `// After building SPF sieve, factorize any number ≤ n in O(log n)
static List<Integer> factorize(int x, int[] spf) {
    List<Integer> factors = new ArrayList<>();
    while (x > 1) {
        factors.add(spf[x]);
        x /= spf[x];
    }
    return factors;
}
// Example: factorize(60) → [2, 2, 3, 5]`
      },
      {
        title: "Segmented Sieve — Primes in [L, R]",
        language: "java",
        content: `static List<Long> segmentedSieve(long L, long R) {
    int limit = (int) Math.sqrt(R) + 1;
    boolean[] smallPrime = new boolean[limit + 1];
    Arrays.fill(smallPrime, true);
    for (int i = 2; i * i <= limit; i++)
        if (smallPrime[i])
            for (int j = i * i; j <= limit; j += i)
                smallPrime[j] = false;
    
    boolean[] isPrime = new boolean[(int)(R - L + 1)];
    Arrays.fill(isPrime, true);
    
    for (long i = 2; i <= limit; i++) {
        if (!smallPrime[(int)i]) continue;
        long start = Math.max(i * i, ((L + i - 1) / i) * i);
        for (long j = start; j <= R; j += i)
            isPrime[(int)(j - L)] = false;
    }
    
    List<Long> primes = new ArrayList<>();
    for (long i = Math.max(2, L); i <= R; i++)
        if (isPrime[(int)(i - L)]) primes.add(i);
    return primes;
}`
      }
    ]
  },
  {
    id: "nt-gcd",
    title: "GCD, LCM & Extended Euclidean",
    difficulty: "Easy",
    theory: [
      "**GCD** (Greatest Common Divisor): largest number dividing both a and b. Euclidean algorithm: gcd(a,b) = gcd(b, a%b).",
      "**LCM** = (a × b) / gcd(a, b). Always compute this way to avoid overflow.",
      "**Extended GCD** finds x, y such that a·x + b·y = gcd(a, b). Used for modular inverse and solving linear Diophantine equations."
    ],
    code: [
      {
        title: "GCD — Euclidean Algorithm",
        language: "java",
        content: `static long gcd(long a, long b) {
    while (b != 0) {
        long t = b;
        b = a % b;
        a = t;
    }
    return a;
}
// Time: O(log(min(a,b)))`
      },
      {
        title: "LCM — Safe from Overflow",
        language: "java",
        content: `static long lcm(long a, long b) {
    return a / gcd(a, b) * b; // Divide first to avoid overflow
}`
      },
      {
        title: "Extended Euclidean Algorithm",
        language: "java",
        content: `// Returns gcd, and sets x[0], y[0] such that a*x + b*y = gcd
static long extGcd(long a, long b, long[] x, long[] y) {
    if (b == 0) {
        x[0] = 1; y[0] = 0;
        return a;
    }
    long[] x1 = {0}, y1 = {0};
    long g = extGcd(b, a % b, x1, y1);
    x[0] = y1[0];
    y[0] = x1[0] - (a / b) * y1[0];
    return g;
}`
      }
    ]
  },
  {
    id: "nt-modular",
    title: "Modular Arithmetic",
    difficulty: "Medium",
    theory: [
      "In CP, results are often asked **modulo 10⁹+7** (a prime). Key rules: (a+b)%m = ((a%m)+(b%m))%m, same for multiplication.",
      "**Modular inverse**: a⁻¹ mod m exists iff gcd(a,m) = 1. If m is prime: a⁻¹ = a^(m-2) mod m (Fermat's little theorem).",
      "**Modular division**: (a/b) mod m = (a × b⁻¹) mod m."
    ],
    code: [
      {
        title: "Modular Exponentiation — Binary Exponentiation",
        language: "java",
        content: `static long power(long base, long exp, long mod) {
    long result = 1;
    base %= mod;
    while (exp > 0) {
        if ((exp & 1) == 1)
            result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}
// Time: O(log exp)`
      },
      {
        title: "Modular Inverse — Fermat's Little Theorem",
        language: "java",
        content: `static final long MOD = 1_000_000_007;

// Works only when MOD is prime
static long modInverse(long a, long mod) {
    return power(a, mod - 2, mod);
}

// Modular division
static long modDivide(long a, long b, long mod) {
    return a % mod * modInverse(b, mod) % mod;
}`
      },
      {
        title: "Modular Inverse using Extended GCD",
        language: "java",
        content: `// Works for any modulus where gcd(a, mod) = 1
static long modInverseExtGcd(long a, long mod) {
    long[] x = {0}, y = {0};
    long g = extGcd(a, mod, x, y);
    if (g != 1) return -1; // Inverse doesn't exist
    return (x[0] % mod + mod) % mod;
}`
      }
    ],
    tip: "Always use `long` in Java for modular arithmetic to avoid overflow during multiplication."
  },
  {
    id: "nt-nCr",
    title: "Combinatorics — nCr mod p",
    difficulty: "Medium",
    theory: [
      "**nCr (Binomial Coefficient)** = n! / (r! × (n-r)!). Computed modulo prime p using precomputed factorials and inverse factorials.",
      "**Pascal's Triangle**: nCr = (n-1)C(r-1) + (n-1)Cr. Good for small n.",
      "**Lucas' Theorem**: For prime p, nCr mod p can be computed digit by digit in base p."
    ],
    code: [
      {
        title: "Precompute Factorials & Inverse Factorials",
        language: "java",
        content: `static final long MOD = 1_000_000_007;
static long[] fact, invFact;

static void precompute(int n) {
    fact = new long[n + 1];
    invFact = new long[n + 1];
    fact[0] = 1;
    for (int i = 1; i <= n; i++)
        fact[i] = fact[i - 1] * i % MOD;
    invFact[n] = power(fact[n], MOD - 2, MOD);
    for (int i = n - 1; i >= 0; i--)
        invFact[i] = invFact[i + 1] * (i + 1) % MOD;
}`
      },
      {
        title: "nCr mod p — O(1) per query",
        language: "java",
        content: `static long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] % MOD * invFact[r] % MOD * invFact[n - r] % MOD;
}

// Usage:
// precompute(200000);
// long answer = nCr(10, 3); // 120`
      },
      {
        title: "nCr using Pascal's Triangle — O(n²)",
        language: "java",
        content: `static long[][] pascalTriangle(int n) {
    long[][] C = new long[n + 1][n + 1];
    for (int i = 0; i <= n; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++)
            C[i][j] = (C[i-1][j-1] + C[i-1][j]) % MOD;
    }
    return C;
}`
      }
    ]
  },
  {
    id: "nt-euler",
    title: "Euler's Totient Function",
    difficulty: "Medium",
    theory: [
      "**Euler's Totient φ(n)** counts integers from 1 to n that are coprime with n.",
      "Formula: φ(n) = n × Π(1 - 1/p) for each prime factor p of n.",
      "**Euler's Theorem**: a^φ(n) ≡ 1 (mod n) when gcd(a,n) = 1. Generalizes Fermat's little theorem."
    ],
    code: [
      {
        title: "Euler's Totient — Single Value",
        language: "java",
        content: `static long eulerTotient(long n) {
    long result = n;
    for (long p = 2; p * p <= n; p++) {
        if (n % p == 0) {
            while (n % p == 0) n /= p;
            result -= result / p;
        }
    }
    if (n > 1) result -= result / n;
    return result;
}
// Time: O(√n)`
      },
      {
        title: "Euler's Totient Sieve — All Values up to n",
        language: "java",
        content: `static int[] totientSieve(int n) {
    int[] phi = new int[n + 1];
    for (int i = 0; i <= n; i++) phi[i] = i;
    
    for (int i = 2; i <= n; i++) {
        if (phi[i] == i) { // i is prime
            for (int j = i; j <= n; j += i) {
                phi[j] -= phi[j] / i;
            }
        }
    }
    return phi;
}
// Time: O(n·log(log n))`
      }
    ]
  },
  {
    id: "nt-crt",
    title: "Chinese Remainder Theorem",
    difficulty: "Hard",
    theory: [
      "**CRT**: Given x ≡ a₁ (mod m₁), x ≡ a₂ (mod m₂), ..., if all mᵢ are pairwise coprime, there exists a unique solution modulo M = m₁ × m₂ × ... × mₖ.",
      "Used in CP for: combining results from different moduli, solving systems of congruences."
    ],
    code: [
      {
        title: "Chinese Remainder Theorem — Two Congruences",
        language: "java",
        content: `// Solve: x ≡ a1 (mod m1), x ≡ a2 (mod m2)
// Returns {x, lcm(m1,m2)} or {-1,-1} if no solution
static long[] crt(long a1, long m1, long a2, long m2) {
    long[] x = {0}, y = {0};
    long g = extGcd(m1, m2, x, y);
    
    if ((a2 - a1) % g != 0) return new long[]{-1, -1};
    
    long lcm = m1 / g * m2;
    long diff = (a2 - a1) / g;
    long sol = (a1 + m1 * (diff % (m2 / g) * (x[0] % (m2 / g)) % (m2 / g) + m2 / g)) % lcm;
    return new long[]{(sol + lcm) % lcm, lcm};
}`
      }
    ]
  },
  {
    id: "nt-matrix-exp",
    title: "Matrix Exponentiation",
    difficulty: "Hard",
    theory: [
      "**Matrix exponentiation** computes M^n in O(k³ · log n) where k = matrix dimension. Essential for linear recurrences.",
      "Any linear recurrence f(n) = c₁f(n-1) + c₂f(n-2) + ... can be solved in O(k³ · log n) using matrix exponentiation.",
      "Classic application: Fibonacci in O(log n) using 2×2 matrix."
    ],
    code: [
      {
        title: "Matrix Multiplication mod p",
        language: "java",
        content: `static long MOD = 1_000_000_007;

static long[][] matMul(long[][] A, long[][] B) {
    int n = A.length;
    long[][] C = new long[n][n];
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++)
            if (A[i][k] != 0)
                for (int j = 0; j < n; j++)
                    C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
    return C;
}`
      },
      {
        title: "Matrix Exponentiation",
        language: "java",
        content: `static long[][] matPow(long[][] M, long p) {
    int n = M.length;
    long[][] result = new long[n][n];
    for (int i = 0; i < n; i++) result[i][i] = 1; // Identity
    
    while (p > 0) {
        if ((p & 1) == 1) result = matMul(result, M);
        M = matMul(M, M);
        p >>= 1;
    }
    return result;
}`
      },
      {
        title: "Fibonacci in O(log n)",
        language: "java",
        content: `static long fibonacci(long n) {
    if (n <= 1) return n;
    long[][] M = {{1, 1}, {1, 0}};
    long[][] result = matPow(M, n - 1);
    return result[0][0];
}
// F(10^18) mod 10^9+7 in milliseconds!`
      }
    ]
  },
  {
    id: "nt-advanced",
    title: "Advanced Number Theory",
    difficulty: "Expert",
    theory: [
      "Advanced topics: **Möbius function** & **Möbius inversion**, **Discrete logarithm** (Baby-step Giant-step), **Primitive roots**, **Miller-Rabin** primality test.",
      "These appear in Div 1/2 Codeforces and ICPC regionals."
    ],
    code: [
      {
        title: "Miller-Rabin Primality Test",
        language: "java",
        content: `static boolean millerRabin(long n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 == 0) return false;
    
    long d = n - 1;
    int r = 0;
    while (d % 2 == 0) { d /= 2; r++; }
    
    // Deterministic for n < 3.3×10^24
    long[] witnesses = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37};
    
    for (long a : witnesses) {
        if (a >= n) continue;
        if (!millerTest(a, d, n, r)) return false;
    }
    return true;
}`
      },
      {
        title: "Miller-Rabin Helper — Witness Test",
        language: "java",
        content: `static boolean millerTest(long a, long d, long n, int r) {
    long x = modPow(a, d, n);
    if (x == 1 || x == n - 1) return true;
    
    for (int i = 0; i < r - 1; i++) {
        x = mulMod(x, x, n);
        if (x == n - 1) return true;
    }
    return false;
}

// Modular multiplication safe from overflow
static long mulMod(long a, long b, long mod) {
    return java.math.BigInteger.valueOf(a)
        .multiply(java.math.BigInteger.valueOf(b))
        .mod(java.math.BigInteger.valueOf(mod)).longValue();
}

static long modPow(long base, long exp, long mod) {
    long result = 1;
    base %= mod;
    while (exp > 0) {
        if ((exp & 1) == 1) result = mulMod(result, base, mod);
        base = mulMod(base, base, mod);
        exp >>= 1;
    }
    return result;
}`
      },
      {
        title: "Baby-step Giant-step — Discrete Logarithm",
        language: "java",
        content: `// Find x such that a^x ≡ b (mod m)
static long babyGiantStep(long a, long b, long m) {
    long n = (long) Math.ceil(Math.sqrt(m));
    Map<Long, Long> table = new HashMap<>();
    
    // Baby step: compute a^j for j = 0..n-1
    long val = 1;
    for (long j = 0; j < n; j++) {
        table.put(val, j);
        val = val * a % m;
    }
    
    // Giant step: compute a^(-n)
    long factor = modPow(a, m - 1 - n, m); // a^(-n) mod m
    val = b;
    
    for (long i = 0; i < n; i++) {
        if (table.containsKey(val))
            return i * n + table.get(val);
        val = val * factor % m;
    }
    return -1; // No solution
}
// Time: O(√m), Space: O(√m)`
      }
    ]
  }
];
