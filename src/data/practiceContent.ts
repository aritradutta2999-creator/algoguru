import { ContentSection } from "./recursionContent";

// ─── Easy Warmups ───
export const practiceWarmupContent: ContentSection[] = [
  {
    id: "pw-reverse-array",
    title: "Reverse an Array",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Given an array of integers, reverse it in-place.",
      "**Approach:** Use two pointers — one at the start, one at the end. Swap elements and move both pointers inward until they meet.",
      "This is the classic two-pointer technique and forms the basis of many array problems.",
    ],
    keyPoints: [
      "Two-pointer approach is optimal — O(1) space",
      "No extra array needed for in-place reversal",
      "Works for any data type, not just integers",
    ],
    code: [
      {
        title: "Reverse Array — Two Pointer",
        language: "java",
        content: `public class ReverseArray {
    public static void reverse(int[] arr) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        reverse(arr);
        System.out.println(java.util.Arrays.toString(arr));
        // Output: [5, 4, 3, 2, 1]
    }
}`,
      },
    ],
  },
  {
    id: "pw-max-min",
    title: "Find Max & Min",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Find the maximum and minimum element in an array in a single pass.",
      "**Approach:** Initialize max and min with the first element, then iterate through the array updating both.",
    ],
    keyPoints: [
      "Single pass — O(n) time",
      "Can also use tournament method for fewer comparisons (3n/2 - 2)",
    ],
    code: [
      {
        title: "Find Max & Min",
        language: "java",
        content: `public class MaxMin {
    public static void findMaxMin(int[] arr) {
        int max = arr[0], min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
            if (arr[i] < min) min = arr[i];
        }
        System.out.println("Max: " + max + ", Min: " + min);
    }

    public static void main(String[] args) {
        int[] arr = {3, 1, 9, 7, 2, 5};
        findMaxMin(arr); // Max: 9, Min: 1
    }
}`,
      },
    ],
  },
  {
    id: "pw-duplicate",
    title: "Find Duplicates",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Find all duplicate elements in an array.",
      "**Approach:** Use a HashSet to track seen elements. If an element is already in the set, it's a duplicate.",
    ],
    keyPoints: [
      "HashSet gives O(1) average lookup",
      "For arrays with values in range [1, n], can solve with O(1) space using index marking",
    ],
    code: [
      {
        title: "Find Duplicates using HashSet",
        language: "java",
        content: `import java.util.*;

public class FindDuplicates {
    public static List<Integer> findDuplicates(int[] arr) {
        Set<Integer> seen = new HashSet<>();
        List<Integer> duplicates = new ArrayList<>();
        for (int num : arr) {
            if (!seen.add(num)) {
                duplicates.add(num);
            }
        }
        return duplicates;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 2, 2, 3};
        System.out.println(findDuplicates(arr)); // [2, 3]
    }
}`,
      },
    ],
  },
  {
    id: "pw-rotate",
    title: "Rotate Array by K",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Rotate an array to the right by K positions.",
      "**Approach:** Use the reversal algorithm — reverse entire array, reverse first K, reverse rest.",
      "This elegant trick avoids using extra space.",
    ],
    keyPoints: [
      "Handle K > n by taking K % n",
      "Three reversals = one rotation",
      "In-place with O(1) extra space",
    ],
    code: [
      {
        title: "Rotate Array — Reversal Algorithm",
        language: "java",
        content: `public class RotateArray {
    static void reverse(int[] arr, int l, int r) {
        while (l < r) {
            int tmp = arr[l]; arr[l] = arr[r]; arr[r] = tmp;
            l++; r--;
        }
    }

    public static void rotate(int[] arr, int k) {
        int n = arr.length;
        k = k % n;
        reverse(arr, 0, n - 1);
        reverse(arr, 0, k - 1);
        reverse(arr, k, n - 1);
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        rotate(arr, 3);
        System.out.println(java.util.Arrays.toString(arr));
        // Output: [5, 6, 7, 1, 2, 3, 4]
    }
}`,
      },
    ],
  },
  {
    id: "pw-palindrome-string",
    title: "Palindrome Check",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Check if a given string is a palindrome.",
      "**Approach:** Use two pointers from both ends, comparing characters.",
    ],
    code: [
      {
        title: "Palindrome Check",
        language: "java",
        content: `public class PalindromeCheck {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) return false;
            l++; r--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar")); // true
        System.out.println(isPalindrome("hello"));   // false
    }
}`,
      },
    ],
  },
  {
    id: "pw-count-vowels",
    title: "Count Vowels & Consonants",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Count the number of vowels and consonants in a string.",
      "**Approach:** Iterate through each character, check if it's a vowel (a, e, i, o, u) or a consonant.",
    ],
    code: [
      {
        title: "Count Vowels & Consonants",
        language: "java",
        content: `public class VowelCount {
    public static void count(String s) {
        int vowels = 0, consonants = 0;
        for (char c : s.toLowerCase().toCharArray()) {
            if (Character.isLetter(c)) {
                if ("aeiou".indexOf(c) != -1) vowels++;
                else consonants++;
            }
        }
        System.out.println("Vowels: " + vowels + ", Consonants: " + consonants);
    }

    public static void main(String[] args) {
        count("Hello World"); // Vowels: 3, Consonants: 7
    }
}`,
      },
    ],
  },
];

// ─── Arrays & Hashing ───
export const practiceArraysContent: ContentSection[] = [
  {
    id: "pa-two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Given an array of integers and a target, return indices of two numbers that add up to the target.",
      "**Approach:** Use a HashMap to store complement (target - num) → index. For each element, check if it exists in the map.",
    ],
    keyPoints: [
      "Classic HashMap problem — appears in almost every interview",
      "Brute force is O(n²), HashMap reduces to O(n)",
    ],
    code: [
      {
        title: "Two Sum — HashMap Approach",
        language: "java",
        content: `import java.util.*;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] result = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result)); // [0, 1]
    }
}`,
      },
    ],
  },
  {
    id: "pa-subarray-sum",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Find the total number of continuous subarrays whose sum equals K.",
      "**Approach:** Use prefix sum with a HashMap. Store frequency of each prefix sum. If prefixSum - K exists in the map, those subarrays end at current index.",
    ],
    keyPoints: [
      "Prefix sum + HashMap is a powerful pattern",
      "Initialize map with {0: 1} to handle subarrays starting from index 0",
    ],
    code: [
      {
        title: "Subarray Sum Equals K",
        language: "java",
        content: `import java.util.*;

public class SubarraySum {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCount = new HashMap<>();
        prefixCount.put(0, 1);
        int sum = 0, count = 0;
        for (int num : nums) {
            sum += num;
            count += prefixCount.getOrDefault(sum - k, 0);
            prefixCount.merge(sum, 1, Integer::sum);
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println(subarraySum(new int[]{1, 1, 1}, 2)); // 2
    }
}`,
      },
    ],
  },
  {
    id: "pa-kadane",
    title: "Kadane's Algorithm",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Find the contiguous subarray with the largest sum.",
      "**Approach:** Kadane's Algorithm — maintain current sum, reset to 0 when it goes negative. Track the maximum sum seen.",
    ],
    code: [
      {
        title: "Kadane's Algorithm",
        language: "java",
        content: `public class Kadane {
    public static int maxSubArray(int[] nums) {
        int maxSum = nums[0], curSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curSum = Math.max(nums[i], curSum + nums[i]);
            maxSum = Math.max(maxSum, curSum);
        }
        return maxSum;
    }

    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // 6
    }
}`,
      },
    ],
  },
  {
    id: "pa-merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Given an array of intervals, merge all overlapping intervals.",
      "**Approach:** Sort intervals by start time. Iterate and merge if current interval overlaps with the last merged one.",
    ],
    code: [
      {
        title: "Merge Intervals",
        language: "java",
        content: `import java.util.*;

public class MergeIntervals {
    public static int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> merged = new ArrayList<>();
        for (int[] interval : intervals) {
            if (merged.isEmpty() || merged.get(merged.size()-1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size()-1)[1] = Math.max(merged.get(merged.size()-1)[1], interval[1]);
            }
        }
        return merged.toArray(new int[0][]);
    }
}`,
      },
    ],
  },
  {
    id: "pa-product-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Given an array, return an array where each element is the product of all other elements (no division).",
      "**Approach:** Two passes — left prefix product then right suffix product.",
    ],
    code: [
      {
        title: "Product Except Self",
        language: "java",
        content: `public class ProductExceptSelf {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        result[0] = 1;
        for (int i = 1; i < n; i++)
            result[i] = result[i-1] * nums[i-1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= right;
            right *= nums[i];
        }
        return result;
    }
}`,
      },
    ],
  },
  {
    id: "pa-top-k-frequent",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Given an integer array, return the K most frequent elements.",
      "**Approach:** Use bucket sort — create frequency map, then use array of lists indexed by frequency.",
    ],
    code: [
      {
        title: "Top K Frequent — Bucket Sort",
        language: "java",
        content: `import java.util.*;

public class TopKFrequent {
    public static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int n : nums) freq.merge(n, 1, Integer::sum);

        List<Integer>[] buckets = new List[nums.length + 1];
        for (int i = 0; i < buckets.length; i++) buckets[i] = new ArrayList<>();
        for (var e : freq.entrySet()) buckets[e.getValue()].add(e.getKey());

        List<Integer> result = new ArrayList<>();
        for (int i = buckets.length - 1; i >= 0 && result.size() < k; i--)
            result.addAll(buckets[i]);
        return result.stream().mapToInt(Integer::intValue).toArray();
    }
}`,
      },
    ],
  },
  {
    id: "pa-longest-consecutive",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Find the length of the longest consecutive elements sequence.",
      "**Approach:** Put all numbers in a HashSet. For each number that is the start of a sequence (n-1 not in set), count consecutive numbers.",
    ],
    code: [
      {
        title: "Longest Consecutive Sequence",
        language: "java",
        content: `import java.util.*;

public class LongestConsecutive {
    public static int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        int longest = 0;
        for (int n : set) {
            if (!set.contains(n - 1)) {
                int len = 1;
                while (set.contains(n + len)) len++;
                longest = Math.max(longest, len);
            }
        }
        return longest;
    }
}`,
      },
    ],
  },
];

// ─── Strings Practice ───
export const practiceStringsContent: ContentSection[] = [
  {
    id: "ps-longest-palindrome",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Find the longest palindromic substring in a given string.",
      "**Approach:** Expand around center — for each character (and each pair), expand outward while characters match.",
    ],
    code: [
      {
        title: "Expand Around Center",
        language: "java",
        content: `public class LongestPalindrome {
    static int start = 0, maxLen = 0;

    static void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            if (r - l + 1 > maxLen) { start = l; maxLen = r - l + 1; }
            l--; r++;
        }
    }

    public static String longestPalindrome(String s) {
        start = 0; maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);     // odd length
            expand(s, i, i + 1); // even length
        }
        return s.substring(start, start + maxLen);
    }

    public static void main(String[] args) {
        System.out.println(longestPalindrome("babad")); // "bab" or "aba"
    }
}`,
      },
    ],
  },
  {
    id: "ps-anagram-groups",
    title: "Group Anagrams",
    difficulty: "Medium",
    timeComplexity: "O(n·k log k)",
    spaceComplexity: "O(n·k)",
    theory: [
      "**Problem:** Group strings that are anagrams of each other.",
      "**Approach:** Sort each string and use it as a HashMap key. All anagrams will have the same sorted form.",
    ],
    code: [
      {
        title: "Group Anagrams",
        language: "java",
        content: `import java.util.*;

public class GroupAnagrams {
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
      },
    ],
  },
  {
    id: "ps-longest-unique",
    title: "Longest Substring Without Repeating",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, m))",
    theory: [
      "**Problem:** Find the length of the longest substring without repeating characters.",
      "**Approach:** Sliding window with a HashSet/HashMap to track characters in current window.",
    ],
    code: [
      {
        title: "Sliding Window Approach",
        language: "java",
        content: `import java.util.*;

public class LongestUnique {
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,
      },
    ],
  },
  {
    id: "ps-zigzag",
    title: "Zigzag Conversion",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Convert a string into a zigzag pattern across numRows and read line by line.",
      "**Approach:** Use an array of StringBuilders, one per row. Iterate through the string, appending to the appropriate row.",
    ],
    code: [
      {
        title: "Zigzag Conversion",
        language: "java",
        content: `public class ZigzagConversion {
    public static String convert(String s, int numRows) {
        if (numRows == 1) return s;
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) rows[i] = new StringBuilder();
        int row = 0, dir = 1;
        for (char c : s.toCharArray()) {
            rows[row].append(c);
            if (row == 0) dir = 1;
            if (row == numRows - 1) dir = -1;
            row += dir;
        }
        StringBuilder result = new StringBuilder();
        for (var r : rows) result.append(r);
        return result.toString();
    }
}`,
      },
    ],
  },
  {
    id: "ps-atoi",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Implement atoi — convert a string to a 32-bit signed integer.",
      "**Approach:** Skip whitespace, handle sign, parse digits, clamp to INT_MIN/INT_MAX on overflow.",
    ],
    code: [
      {
        title: "Custom atoi Implementation",
        language: "java",
        content: `public class MyAtoi {
    public static int myAtoi(String s) {
        int i = 0, n = s.length(), sign = 1;
        long result = 0;
        while (i < n && s.charAt(i) == ' ') i++;
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-'))
            sign = s.charAt(i++) == '-' ? -1 : 1;
        while (i < n && Character.isDigit(s.charAt(i))) {
            result = result * 10 + (s.charAt(i++) - '0');
            if (result * sign > Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if (result * sign < Integer.MIN_VALUE) return Integer.MIN_VALUE;
        }
        return (int)(result * sign);
    }
}`,
      },
    ],
  },
  {
    id: "ps-pattern-match",
    title: "Rabin-Karp Pattern Match",
    difficulty: "Medium",
    timeComplexity: "O(n + m)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Find all occurrences of a pattern in a text using rolling hash.",
      "**Approach:** Compute hash for pattern and sliding window of text. Compare hashes, verify on match.",
    ],
    code: [
      {
        title: "Rabin-Karp",
        language: "java",
        content: `public class RabinKarp {
    static final int MOD = 1_000_000_007, BASE = 31;

    public static void search(String text, String pattern) {
        int n = text.length(), m = pattern.length();
        long patHash = 0, txtHash = 0, power = 1;
        for (int i = 0; i < m; i++) {
            patHash = (patHash * BASE + pattern.charAt(i)) % MOD;
            txtHash = (txtHash * BASE + text.charAt(i)) % MOD;
            if (i > 0) power = power * BASE % MOD;
        }
        for (int i = 0; i <= n - m; i++) {
            if (patHash == txtHash && text.substring(i, i+m).equals(pattern))
                System.out.println("Found at index " + i);
            if (i < n - m) {
                txtHash = ((txtHash - text.charAt(i) * power % MOD + MOD) * BASE + text.charAt(i+m)) % MOD;
            }
        }
    }
}`,
      },
    ],
  },
];

// ─── Recursion & Backtracking Practice ───
export const practiceRecursionContent: ContentSection[] = [
  {
    id: "pr-subsets",
    title: "Generate All Subsets",
    difficulty: "Medium",
    timeComplexity: "O(2ⁿ)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Generate all possible subsets (the power set) of a given array.",
      "**Approach:** Use backtracking — at each step, choose to include or exclude the current element.",
    ],
    code: [
      {
        title: "Subsets — Backtracking",
        language: "java",
        content: `import java.util.*;

public class Subsets {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    static void backtrack(int[] nums, int start, List<Integer> current, List<List<Integer>> result) {
        result.add(new ArrayList<>(current));
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.remove(current.size() - 1);
        }
    }
}`,
      },
    ],
  },
  {
    id: "pr-permutations",
    title: "Permutations",
    difficulty: "Medium",
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Generate all permutations of a given array.",
      "**Approach:** Swap-based backtracking or use a boolean visited array.",
    ],
    code: [
      {
        title: "Permutations — Swap Approach",
        language: "java",
        content: `import java.util.*;

public class Permutations {
    public static List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, result);
        return result;
    }

    static void backtrack(int[] nums, int idx, List<List<Integer>> result) {
        if (idx == nums.length) {
            List<Integer> perm = new ArrayList<>();
            for (int n : nums) perm.add(n);
            result.add(perm);
            return;
        }
        for (int i = idx; i < nums.length; i++) {
            int tmp = nums[idx]; nums[idx] = nums[i]; nums[i] = tmp;
            backtrack(nums, idx + 1, result);
            tmp = nums[idx]; nums[idx] = nums[i]; nums[i] = tmp;
        }
    }
}`,
      },
    ],
  },
  {
    id: "pr-combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    timeComplexity: "O(2ⁿ)",
    spaceComplexity: "O(target)",
    theory: [
      "**Problem:** Find all unique combinations where candidate numbers sum to a target. Numbers can be reused.",
      "**Approach:** Backtracking with the same start index (allowing reuse).",
    ],
    code: [
      {
        title: "Combination Sum",
        language: "java",
        content: `import java.util.*;

public class CombinationSum {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    static void backtrack(int[] c, int remain, int start, List<Integer> cur, List<List<Integer>> res) {
        if (remain == 0) { res.add(new ArrayList<>(cur)); return; }
        for (int i = start; i < c.length && c[i] <= remain; i++) {
            cur.add(c[i]);
            backtrack(c, remain - c[i], i, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
      },
    ],
  },
  {
    id: "pr-nqueens",
    title: "N-Queens",
    difficulty: "Hard",
    timeComplexity: "O(n!)",
    spaceComplexity: "O(n²)",
    theory: [
      "**Problem:** Place N queens on an N×N chessboard such that no two queens attack each other.",
      "**Approach:** Place queens row by row. For each row, try all columns, checking column, diagonal, and anti-diagonal conflicts.",
    ],
    code: [
      {
        title: "N-Queens Solver",
        language: "java",
        content: `import java.util.*;

public class NQueens {
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        solve(board, 0, n, result);
        return result;
    }

    static void solve(char[][] board, int row, int n, List<List<String>> res) {
        if (row == n) {
            List<String> snapshot = new ArrayList<>();
            for (char[] r : board) snapshot.add(new String(r));
            res.add(snapshot);
            return;
        }
        for (int col = 0; col < n; col++) {
            if (isSafe(board, row, col, n)) {
                board[row][col] = 'Q';
                solve(board, row + 1, n, res);
                board[row][col] = '.';
            }
        }
    }

    static boolean isSafe(char[][] board, int row, int col, int n) {
        for (int i = 0; i < row; i++) if (board[i][col] == 'Q') return false;
        for (int i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--) if (board[i][j] == 'Q') return false;
        for (int i = row-1, j = col+1; i >= 0 && j < n; i--, j++) if (board[i][j] == 'Q') return false;
        return true;
    }
}`,
      },
    ],
  },
  {
    id: "pr-sudoku",
    title: "Sudoku Solver",
    difficulty: "Hard",
    timeComplexity: "O(9^(n²))",
    spaceComplexity: "O(n²)",
    theory: [
      "**Problem:** Fill a 9×9 Sudoku grid so every row, column, and 3×3 box contains digits 1-9.",
      "**Approach:** Backtracking — find empty cell, try digits 1-9, validate, recurse.",
    ],
    code: [
      {
        title: "Sudoku Solver",
        language: "java",
        content: `public class SudokuSolver {
    public static boolean solveSudoku(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char d = '1'; d <= '9'; d++) {
                        if (isValid(board, r, c, d)) {
                            board[r][c] = d;
                            if (solveSudoku(board)) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    static boolean isValid(char[][] board, int r, int c, char d) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == d || board[i][c] == d) return false;
            if (board[3*(r/3)+i/3][3*(c/3)+i%3] == d) return false;
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    id: "pr-word-search",
    title: "Word Search in Grid",
    difficulty: "Medium",
    timeComplexity: "O(m·n·4^L)",
    spaceComplexity: "O(L)",
    theory: [
      "**Problem:** Given an m×n grid and a word, determine if the word exists in the grid (adjacent cells, no reuse).",
      "**Approach:** DFS from each cell, marking visited cells.",
    ],
    code: [
      {
        title: "Word Search",
        language: "java",
        content: `public class WordSearch {
    public static boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[0].length; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }

    static boolean dfs(char[][] board, String word, int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length) return false;
        if (board[r][c] != word.charAt(idx)) return false;
        char temp = board[r][c];
        board[r][c] = '#';
        boolean found = dfs(board, word, r+1, c, idx+1) || dfs(board, word, r-1, c, idx+1)
                      || dfs(board, word, r, c+1, idx+1) || dfs(board, word, r, c-1, idx+1);
        board[r][c] = temp;
        return found;
    }
}`,
      },
    ],
  },
];

// ─── DP Practice ───
export const practiceDPContent: ContentSection[] = [
  {
    id: "pd-climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** You can climb 1 or 2 steps at a time. How many distinct ways to reach the top of n stairs?",
      "**Approach:** Fibonacci-like DP. dp[i] = dp[i-1] + dp[i-2].",
    ],
    code: [
      {
        title: "Climbing Stairs",
        language: "java",
        content: `public class ClimbingStairs {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b; a = b; b = c;
        }
        return b;
    }
}`,
      },
    ],
  },
  {
    id: "pd-coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    timeComplexity: "O(n·amount)",
    spaceComplexity: "O(amount)",
    theory: [
      "**Problem:** Find the fewest number of coins that make up a given amount.",
      "**Approach:** Bottom-up DP. dp[i] = min coins to make amount i.",
    ],
    code: [
      {
        title: "Coin Change",
        language: "java",
        content: `import java.util.Arrays;

public class CoinChange {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int coin : coins)
            for (int i = coin; i <= amount; i++)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      },
    ],
  },
  {
    id: "pd-lis",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Find the length of the longest strictly increasing subsequence.",
      "**Approach:** Use patience sorting (binary search on tails array) for O(n log n).",
    ],
    code: [
      {
        title: "LIS — Binary Search",
        language: "java",
        content: `import java.util.*;

public class LIS {
    public static int lengthOfLIS(int[] nums) {
        List<Integer> tails = new ArrayList<>();
        for (int num : nums) {
            int pos = Collections.binarySearch(tails, num);
            if (pos < 0) pos = -(pos + 1);
            if (pos == tails.size()) tails.add(num);
            else tails.set(pos, num);
        }
        return tails.size();
    }
}`,
      },
    ],
  },
  {
    id: "pd-lcs",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    theory: [
      "**Problem:** Find the length of the longest common subsequence of two strings.",
      "**Approach:** Classic 2D DP. If chars match, dp[i][j] = dp[i-1][j-1] + 1, else max(dp[i-1][j], dp[i][j-1]).",
    ],
    code: [
      {
        title: "LCS",
        language: "java",
        content: `public class LCS {
    public static int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = text1.charAt(i-1) == text2.charAt(j-1)
                    ? dp[i-1][j-1] + 1
                    : Math.max(dp[i-1][j], dp[i][j-1]);
        return dp[m][n];
    }
}`,
      },
    ],
  },
  {
    id: "pd-knapsack",
    title: "0/1 Knapsack",
    difficulty: "Medium",
    timeComplexity: "O(n·W)",
    spaceComplexity: "O(W)",
    theory: [
      "**Problem:** Given weights and values of n items, find the maximum value that fits in a knapsack of capacity W.",
      "**Approach:** 1D DP array, iterate items and capacities in reverse.",
    ],
    code: [
      {
        title: "0/1 Knapsack — Space Optimized",
        language: "java",
        content: `public class Knapsack {
    public static int knapsack(int[] wt, int[] val, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < wt.length; i++)
            for (int w = W; w >= wt[i]; w--)
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
        return dp[W];
    }
}`,
      },
    ],
  },
  {
    id: "pd-edit-distance",
    title: "Edit Distance",
    difficulty: "Hard",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    theory: [
      "**Problem:** Find the minimum number of operations (insert, delete, replace) to convert word1 to word2.",
      "**Approach:** 2D DP where dp[i][j] = min operations for first i chars of word1 and first j chars of word2.",
    ],
    code: [
      {
        title: "Edit Distance",
        language: "java",
        content: `public class EditDistance {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = word1.charAt(i-1) == word2.charAt(j-1)
                    ? dp[i-1][j-1]
                    : 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));
        return dp[m][n];
    }
}`,
      },
    ],
  },
  {
    id: "pd-matrix-chain",
    title: "Matrix Chain Multiplication",
    difficulty: "Hard",
    timeComplexity: "O(n³)",
    spaceComplexity: "O(n²)",
    theory: [
      "**Problem:** Find the most efficient way to multiply a chain of matrices.",
      "**Approach:** Interval DP — dp[i][j] = min cost to multiply matrices from i to j.",
    ],
    code: [
      {
        title: "Matrix Chain Multiplication",
        language: "java",
        content: `public class MatrixChain {
    public static int mcm(int[] p) {
        int n = p.length - 1;
        int[][] dp = new int[n][n];
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    dp[i][j] = Math.min(dp[i][j],
                        dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]);
                }
            }
        }
        return dp[0][n-1];
    }
}`,
      },
    ],
  },
];

// ─── Graph Problems ───
export const practiceGraphsContent: ContentSection[] = [
  {
    id: "pg-num-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    theory: [
      "**Problem:** Given a 2D grid of '1's (land) and '0's (water), count the number of islands.",
      "**Approach:** DFS/BFS from each unvisited '1', marking all connected land.",
    ],
    code: [
      {
        title: "Number of Islands — DFS",
        language: "java",
        content: `public class NumIslands {
    public static int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++)
            for (int j = 0; j < grid[0].length; j++)
                if (grid[i][j] == '1') { dfs(grid, i, j); count++; }
        return count;
    }

    static void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r+1, c); dfs(grid, r-1, c);
        dfs(grid, r, c+1); dfs(grid, r, c-1);
    }
}`,
      },
    ],
  },
  {
    id: "pg-clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    theory: [
      "**Problem:** Given a reference to a node in a connected undirected graph, return a deep copy.",
      "**Approach:** BFS/DFS with a HashMap to map original nodes to their clones.",
    ],
    code: [
      {
        title: "Clone Graph — BFS",
        language: "java",
        content: `import java.util.*;

// class Node { int val; List<Node> neighbors; }

public class CloneGraph {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        Map<Node, Node> map = new HashMap<>();
        Queue<Node> queue = new LinkedList<>();
        map.put(node, new Node(node.val));
        queue.add(node);
        while (!queue.isEmpty()) {
            Node cur = queue.poll();
            for (Node neighbor : cur.neighbors) {
                if (!map.containsKey(neighbor)) {
                    map.put(neighbor, new Node(neighbor.val));
                    queue.add(neighbor);
                }
                map.get(cur).neighbors.add(map.get(neighbor));
            }
        }
        return map.get(node);
    }
}`,
      },
    ],
  },
  {
    id: "pg-course-schedule",
    title: "Course Schedule (Topo Sort)",
    difficulty: "Medium",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    theory: [
      "**Problem:** Given numCourses and prerequisites, determine if you can finish all courses (detect cycle in DAG).",
      "**Approach:** Topological sort using Kahn's algorithm (BFS with in-degree).",
    ],
    code: [
      {
        title: "Course Schedule — Kahn's BFS",
        language: "java",
        content: `import java.util.*;

public class CourseSchedule {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); inDeg[p[0]]++; }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) if (inDeg[i] == 0) q.add(i);
        int count = 0;
        while (!q.isEmpty()) {
            int cur = q.poll(); count++;
            for (int next : adj.get(cur))
                if (--inDeg[next] == 0) q.add(next);
        }
        return count == numCourses;
    }
}`,
      },
    ],
  },
  {
    id: "pg-shortest-path",
    title: "Shortest Path in Grid",
    difficulty: "Medium",
    timeComplexity: "O(m·n)",
    spaceComplexity: "O(m·n)",
    theory: [
      "**Problem:** Find the shortest path from top-left to bottom-right in a binary grid.",
      "**Approach:** BFS — since all edges have weight 1, BFS gives shortest path.",
    ],
    code: [
      {
        title: "Shortest Path — BFS",
        language: "java",
        content: `import java.util.*;

public class ShortestPathGrid {
    public static int shortestPath(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        if (grid[0][0] == 1 || grid[m-1][n-1] == 1) return -1;
        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
        boolean[][] visited = new boolean[m][n];
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{0, 0, 1});
        visited[0][0] = true;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            if (cur[0] == m-1 && cur[1] == n-1) return cur[2];
            for (int[] d : dirs) {
                int nr = cur[0]+d[0], nc = cur[1]+d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] == 0) {
                    visited[nr][nc] = true;
                    q.add(new int[]{nr, nc, cur[2]+1});
                }
            }
        }
        return -1;
    }
}`,
      },
    ],
  },
  {
    id: "pg-word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    timeComplexity: "O(m²·n)",
    spaceComplexity: "O(m·n)",
    theory: [
      "**Problem:** Find the shortest transformation sequence from beginWord to endWord, changing one letter at a time.",
      "**Approach:** BFS where each node is a word, edges connect words differing by one letter.",
    ],
    code: [
      {
        title: "Word Ladder — BFS",
        language: "java",
        content: `import java.util.*;

public class WordLadder {
    public static int ladderLength(String begin, String end, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(end)) return 0;
        Queue<String> q = new LinkedList<>();
        q.add(begin);
        int level = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                char[] word = q.poll().toCharArray();
                for (int j = 0; j < word.length; j++) {
                    char orig = word[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        word[j] = c;
                        String next = new String(word);
                        if (next.equals(end)) return level + 1;
                        if (dict.remove(next)) q.add(next);
                    }
                    word[j] = orig;
                }
            }
            level++;
        }
        return 0;
    }
}`,
      },
    ],
  },
  {
    id: "pg-detect-cycle",
    title: "Detect Cycle in Graph",
    difficulty: "Medium",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    theory: [
      "**Problem:** Detect if a directed graph contains a cycle.",
      "**Approach:** DFS with three coloring — WHITE (unvisited), GRAY (in-stack), BLACK (done). If we visit a GRAY node, cycle exists.",
    ],
    code: [
      {
        title: "Cycle Detection — DFS Coloring",
        language: "java",
        content: `import java.util.*;

public class DetectCycle {
    public static boolean hasCycle(int n, List<List<Integer>> adj) {
        int[] color = new int[n]; // 0=white, 1=gray, 2=black
        for (int i = 0; i < n; i++)
            if (color[i] == 0 && dfs(i, adj, color)) return true;
        return false;
    }

    static boolean dfs(int u, List<List<Integer>> adj, int[] color) {
        color[u] = 1;
        for (int v : adj.get(u)) {
            if (color[v] == 1) return true;
            if (color[v] == 0 && dfs(v, adj, color)) return true;
        }
        color[u] = 2;
        return false;
    }
}`,
      },
    ],
  },
];

// ─── Trees Practice ───
export const practiceTreesContent: ContentSection[] = [
  {
    id: "pt-inorder",
    title: "Inorder Traversal (Iterative)",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    theory: [
      "**Problem:** Perform inorder traversal of a binary tree iteratively.",
      "**Approach:** Use a stack — push all left children, pop and process, then go right.",
    ],
    code: [
      {
        title: "Iterative Inorder",
        language: "java",
        content: `import java.util.*;

public class InorderIterative {
    public static List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) { stack.push(cur); cur = cur.left; }
            cur = stack.pop();
            result.add(cur.val);
            cur = cur.right;
        }
        return result;
    }
}`,
      },
    ],
  },
  {
    id: "pt-level-order",
    title: "Level Order Traversal",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Return the level order traversal of a binary tree (BFS).",
      "**Approach:** BFS using a queue, processing one level at a time.",
    ],
    code: [
      {
        title: "Level Order — BFS",
        language: "java",
        content: `import java.util.*;

public class LevelOrder {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            result.add(level);
        }
        return result;
    }
}`,
      },
    ],
  },
  {
    id: "pt-max-depth",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    theory: [
      "**Problem:** Find the maximum depth (height) of a binary tree.",
      "**Approach:** Recursive — max(left depth, right depth) + 1.",
    ],
    code: [
      {
        title: "Max Depth",
        language: "java",
        content: `public class MaxDepth {
    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      },
    ],
  },
  {
    id: "pt-validate-bst",
    title: "Validate BST",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    theory: [
      "**Problem:** Determine if a binary tree is a valid BST.",
      "**Approach:** Pass valid range (min, max) to each node. Left child must be < current, right must be > current.",
    ],
    code: [
      {
        title: "Validate BST",
        language: "java",
        content: `public class ValidateBST {
    public static boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    static boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}`,
      },
    ],
  },
  {
    id: "pt-lca",
    title: "Lowest Common Ancestor",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    theory: [
      "**Problem:** Find the LCA of two nodes in a binary tree.",
      "**Approach:** If current node is either p or q, return it. Recurse left and right. If both return non-null, current is LCA.",
    ],
    code: [
      {
        title: "LCA of Binary Tree",
        language: "java",
        content: `public class LowestCommonAncestor {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
      },
    ],
  },
  {
    id: "pt-serialize",
    title: "Serialize & Deserialize Tree",
    difficulty: "Hard",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Design an algorithm to serialize a binary tree to a string and deserialize it back.",
      "**Approach:** Preorder traversal with null markers. Use a queue for deserialization.",
    ],
    code: [
      {
        title: "Serialize / Deserialize",
        language: "java",
        content: `import java.util.*;

public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serHelper(root, sb);
        return sb.toString();
    }

    void serHelper(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.append("null,"); return; }
        sb.append(node.val).append(",");
        serHelper(node.left, sb);
        serHelper(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(",")));
        return desHelper(q);
    }

    TreeNode desHelper(Queue<String> q) {
        String val = q.poll();
        if ("null".equals(val)) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = desHelper(q);
        node.right = desHelper(q);
        return node;
    }
}`,
      },
    ],
  },
];

// ─── Greedy & Sorting ───
export const practiceGreedyContent: ContentSection[] = [
  {
    id: "pgr-activity-selection",
    title: "Activity Selection",
    difficulty: "Easy",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Given start and end times of activities, find the maximum number of non-overlapping activities.",
      "**Approach:** Sort by end time. Greedily pick the activity that finishes earliest.",
    ],
    code: [
      {
        title: "Activity Selection",
        language: "java",
        content: `import java.util.*;

public class ActivitySelection {
    public static int maxActivities(int[][] activities) {
        Arrays.sort(activities, (a, b) -> a[1] - b[1]);
        int count = 1, lastEnd = activities[0][1];
        for (int i = 1; i < activities.length; i++) {
            if (activities[i][0] >= lastEnd) {
                count++;
                lastEnd = activities[i][1];
            }
        }
        return count;
    }
}`,
      },
    ],
  },
  {
    id: "pgr-jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Given an array where each element represents the max jump length, determine if you can reach the last index.",
      "**Approach:** Greedy — track the farthest reachable index.",
    ],
    code: [
      {
        title: "Jump Game",
        language: "java",
        content: `public class JumpGame {
    public static boolean canJump(int[] nums) {
        int farthest = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > farthest) return false;
            farthest = Math.max(farthest, i + nums[i]);
        }
        return true;
    }
}`,
      },
    ],
  },
  {
    id: "pgr-meeting-rooms",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    theory: [
      "**Problem:** Find the minimum number of meeting rooms required.",
      "**Approach:** Sort start and end times separately. Use two pointers to track overlaps.",
    ],
    code: [
      {
        title: "Meeting Rooms II",
        language: "java",
        content: `import java.util.*;

public class MeetingRooms {
    public static int minMeetingRooms(int[][] intervals) {
        int[] starts = new int[intervals.length];
        int[] ends = new int[intervals.length];
        for (int i = 0; i < intervals.length; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        int rooms = 0, endPtr = 0;
        for (int s : starts) {
            if (s < ends[endPtr]) rooms++;
            else endPtr++;
        }
        return rooms;
    }
}`,
      },
    ],
  },
  {
    id: "pgr-gas-station",
    title: "Gas Station",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Find the starting gas station index for a circular route, or return -1 if impossible.",
      "**Approach:** If total gas >= total cost, solution exists. Track current tank; reset start when tank goes negative.",
    ],
    code: [
      {
        title: "Gas Station",
        language: "java",
        content: `public class GasStation {
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        int total = 0, tank = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) { start = i + 1; tank = 0; }
        }
        return total >= 0 ? start : -1;
    }
}`,
      },
    ],
  },
  {
    id: "pgr-task-scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Given tasks and a cooldown period n, find the minimum time to execute all tasks.",
      "**Approach:** The most frequent task determines the frame. Fill gaps with other tasks.",
    ],
    code: [
      {
        title: "Task Scheduler",
        language: "java",
        content: `public class TaskScheduler {
    public static int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char t : tasks) freq[t - 'A']++;
        int maxFreq = 0, maxCount = 0;
        for (int f : freq) maxFreq = Math.max(maxFreq, f);
        for (int f : freq) if (f == maxFreq) maxCount++;
        return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
    }
}`,
      },
    ],
  },
  {
    id: "pgr-sort-colors",
    title: "Sort Colors (Dutch Flag)",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "**Problem:** Sort an array of 0s, 1s, and 2s in-place (Dutch National Flag problem).",
      "**Approach:** Three pointers — low, mid, high. Swap 0s to front, 2s to back.",
    ],
    code: [
      {
        title: "Dutch National Flag",
        language: "java",
        content: `public class SortColors {
    public static void sortColors(int[] nums) {
        int lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) { swap(nums, lo++, mid++); }
            else if (nums[mid] == 1) { mid++; }
            else { swap(nums, mid, hi--); }
        }
    }

    static void swap(int[] a, int i, int j) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
    }
}`,
      },
    ],
  },
];

// ─── Content Map ───
export const practiceContentMap: Record<string, ContentSection[]> = {
  "practice-warmup": practiceWarmupContent,
  "practice-arrays": practiceArraysContent,
  "practice-strings": practiceStringsContent,
  "practice-recursion": practiceRecursionContent,
  "practice-dp": practiceDPContent,
  "practice-graphs": practiceGraphsContent,
  "practice-trees": practiceTreesContent,
  "practice-greedy": practiceGreedyContent,
};
