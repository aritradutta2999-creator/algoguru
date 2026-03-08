import { ContentSection } from "./recursionContent";

// ═══════════════════════════════════════════════════════
// ARRAYS & HASHING
// ═══════════════════════════════════════════════════════

export const arraysEasy: ContentSection[] = [
  {
    id: "arrays-easy-1",
    title: "Two Sum",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`.",
      "You may assume each input has exactly one solution, and you may not use the same element twice.",
      "**Example:** `Input: nums = [2, 7, 11, 15], target = 9` → `Output: [0, 1]` — because `nums[0] + nums[1] = 2 + 7 = 9`.",
      "**Approach:** Use a HashMap to store each number's index. For every element, check if `target - nums[i]` already exists in the map. If yes, return both indices. This gives O(n) time instead of brute-force O(n^2).",
    ],
    keyPoints: [
      "HashMap lookup is O(1) average — the key insight for this problem",
      "Always check if the complement exists BEFORE inserting current element to avoid using the same index twice",
      "This pattern (complement search via HashMap) appears in dozens of interview problems",
    ],
    code: [
      {
        title: "Two Sum — HashMap",
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
        return new int[]{}; // no solution
    }

    public static void main(String[] args) {
        int[] result = twoSum(new int[]{2, 7, 11, 15}, 9);
        System.out.println(Arrays.toString(result)); // [0, 1]

        result = twoSum(new int[]{3, 2, 4}, 6);
        System.out.println(Arrays.toString(result)); // [1, 2]
    }
}`,
      },
    ],
  },
  {
    id: "arrays-easy-2",
    title: "Find All Duplicates in an Array",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "Given an integer array `nums` of length `n` where all integers are in the range `[1, n]`, return all integers that appear twice.",
      "**Example:** `Input: nums = [4, 3, 2, 7, 8, 2, 3, 1]` → `Output: [2, 3]`.",
      "**Approach:** Use index-marking trick. For each value `v`, negate `nums[v-1]`. If it's already negative, `v` is a duplicate. This gives O(n) time and O(1) extra space.",
    ],
    keyPoints: [
      "Index-marking (negation trick) is a powerful O(1) space technique when values are in range [1, n]",
      "Always use `Math.abs(nums[i])` since values may already be negated",
    ],
    code: [
      {
        title: "Find Duplicates — Index Marking",
        language: "java",
        content: `import java.util.*;

public class FindDuplicates {
    public static List<Integer> findDuplicates(int[] nums) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            int idx = Math.abs(nums[i]) - 1;
            if (nums[idx] < 0) {
                result.add(idx + 1);
            } else {
                nums[idx] = -nums[idx];
            }
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(findDuplicates(new int[]{4,3,2,7,8,2,3,1}));
        // Output: [2, 3]
    }
}`,
      },
    ],
  },
  {
    id: "arrays-easy-3",
    title: "Rotate Array by K Positions",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "Given an integer array `nums`, rotate the array to the right by `k` steps in-place with O(1) extra space.",
      "**Example:** `Input: nums = [1, 2, 3, 4, 5, 6, 7], k = 3` → `Output: [5, 6, 7, 1, 2, 3, 4]`.",
      "**Approach:** Three reversals: reverse the entire array, then reverse first `k` elements, then reverse the rest. Three reversals = one rotation.",
    ],
    keyPoints: [
      "Handle `k > n` by taking `k = k % n`",
      "The three-reversal trick is an elegant O(1) space solution",
    ],
    code: [
      {
        title: "Rotate Array — Three Reversals",
        language: "java",
        content: `import java.util.*;

public class RotateArray {
    static void reverse(int[] arr, int l, int r) {
        while (l < r) {
            int tmp = arr[l]; arr[l] = arr[r]; arr[r] = tmp;
            l++; r--;
        }
    }

    public static void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        rotate(arr, 3);
        System.out.println(Arrays.toString(arr));
        // Output: [5, 6, 7, 1, 2, 3, 4]
    }
}`,
      },
    ],
  },
];

export const arraysMedium: ContentSection[] = [
  {
    id: "arrays-medium-1",
    title: "Subarray Sum Equals K",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "Given an integer array `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.",
      "**Example:** `Input: nums = [1, 1, 1], k = 2` → `Output: 2` — Subarrays `[1,1]` starting at index 0 and `[1,1]` starting at index 1 both sum to 2.",
      "**Approach:** Use prefix sum with a HashMap. For each index, compute running prefix sum. If `prefixSum - k` has been seen before, those subarrays end at the current index. Initialize map with `{0: 1}` to handle subarrays starting from index 0.",
    ],
    keyPoints: [
      "Prefix sum + HashMap is one of the most powerful array patterns",
      "Initialize map with `{0: 1}` — this handles subarrays that start from index 0",
    ],
    code: [
      {
        title: "Subarray Sum Equals K — Prefix Sum + HashMap",
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
        System.out.println(subarraySum(new int[]{1,1,1}, 2));    // 2
        System.out.println(subarraySum(new int[]{1,2,3}, 3));    // 2
    }
}`,
      },
    ],
  },
  {
    id: "arrays-medium-2",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1) extra",
    theory: [
      "Given an integer array `nums`, return an array `answer` such that `answer[i]` is the product of all elements except `nums[i]`. You must solve it in O(n) time without using division.",
      "**Example:** `Input: nums = [1, 2, 3, 4]` → `Output: [24, 12, 8, 6]` — `answer[0] = 2*3*4 = 24`, `answer[1] = 1*3*4 = 12`, etc.",
      "**Approach:** Two-pass approach. First pass: build left prefix products. Second pass: multiply by right suffix products. This avoids division and runs in O(n) with O(1) extra space (output array doesn't count).",
    ],
    keyPoints: [
      "Two-pass (left product → right product) avoids needing division",
      "Output array doesn't count as extra space per the problem definition",
    ],
    code: [
      {
        title: "Product Except Self — Two Pass",
        language: "java",
        content: `public class ProductExceptSelf {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        result[0] = 1;
        for (int i = 1; i < n; i++)
            result[i] = result[i - 1] * nums[i - 1];

        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= right;
            right *= nums[i];
        }
        return result;
    }

    public static void main(String[] args) {
        int[] res = productExceptSelf(new int[]{1, 2, 3, 4});
        System.out.println(java.util.Arrays.toString(res));
        // Output: [24, 12, 8, 6]
    }
}`,
      },
    ],
  },
  {
    id: "arrays-medium-3",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Must run in O(n) time.",
      "**Example:** `Input: nums = [100, 4, 200, 1, 3, 2]` → `Output: 4` — The longest consecutive sequence is `[1, 2, 3, 4]`, length = 4.",
      "**Approach:** Put all numbers in a HashSet. For each number that is the START of a sequence (i.e., `num - 1` is NOT in the set), count how many consecutive numbers follow. Track the maximum length.",
    ],
    keyPoints: [
      "HashSet for O(1) lookups transforms O(n^2) brute force into O(n)",
      "Only start counting from sequence beginnings (`num - 1` not in set) to avoid redundant work",
    ],
    code: [
      {
        title: "Longest Consecutive Sequence — HashSet",
        language: "java",
        content: `import java.util.*;

public class LongestConsecutive {
    public static int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);

        int longest = 0;
        for (int num : set) {
            if (!set.contains(num - 1)) {
                int len = 1;
                while (set.contains(num + len)) len++;
                longest = Math.max(longest, len);
            }
        }
        return longest;
    }

    public static void main(String[] args) {
        System.out.println(longestConsecutive(new int[]{100,4,200,1,3,2})); // 4
    }
}`,
      },
    ],
  },
];

export const arraysHard: ContentSection[] = [
  {
    id: "arrays-hard-1",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      "**Example:** `Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]` → `Output: 6` — The elevation map traps 6 units of rain water.",
      "**Approach:** Two-pointer technique. Maintain `leftMax` and `rightMax`. Water at each position = `min(leftMax, rightMax) - height[i]`. Move the pointer with the smaller max inward.",
    ],
    keyPoints: [
      "Two-pointer avoids the O(n) space of prefix arrays",
      "Water at position i = `min(leftMax, rightMax) - height[i]`",
    ],
    code: [
      {
        title: "Trapping Rain Water — Two Pointers",
        language: "java",
        content: `public class TrappingRainWater {
    public static int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                leftMax = Math.max(leftMax, height[left]);
                water += leftMax - height[left];
                left++;
            } else {
                rightMax = Math.max(rightMax, height[right]);
                water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }

    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // 6
    }
}`,
      },
    ],
  },
  {
    id: "arrays-hard-2",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    timeComplexity: "O(log(min(m,n)))",
    spaceComplexity: "O(1)",
    theory: [
      "Given two sorted arrays `nums1` and `nums2`, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
      "**Example:** `Input: nums1 = [1, 3], nums2 = [2]` → `Output: 2.0` — merged = `[1, 2, 3]`, median = 2.0.",
      "**Approach:** Binary search on the shorter array. Partition both arrays such that all elements on the left ≤ all elements on the right. The partition point gives the median.",
    ],
    keyPoints: [
      "Binary search on the shorter array ensures O(log(min(m,n)))",
      "Use Integer.MIN_VALUE and Integer.MAX_VALUE as sentinels for edge partitions",
    ],
    code: [
      {
        title: "Median of Two Sorted Arrays — Binary Search",
        language: "java",
        content: `public class MedianSortedArrays {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length)
            return findMedianSortedArrays(nums2, nums1);

        int m = nums1.length, n = nums2.length;
        int lo = 0, hi = m;

        while (lo <= hi) {
            int i = (lo + hi) / 2;
            int j = (m + n + 1) / 2 - i;

            int maxLeft1  = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2  = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];

            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 0)
                    return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
                else
                    return Math.max(maxLeft1, maxLeft2);
            } else if (maxLeft1 > minRight2) {
                hi = i - 1;
            } else {
                lo = i + 1;
            }
        }
        throw new IllegalArgumentException();
    }

    public static void main(String[] args) {
        System.out.println(findMedianSortedArrays(new int[]{1, 3}, new int[]{2})); // 2.0
    }
}`,
      },
    ],
  },
  {
    id: "arrays-hard-3",
    title: "First Missing Positive",
    difficulty: "Hard",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "Given an unsorted integer array `nums`, return the smallest missing positive integer. Must run in O(n) time and O(1) auxiliary space.",
      "**Example:** `Input: nums = [3, 4, -1, 1]` → `Output: 2` — 1 is present, 2 is missing → answer is 2.",
      "**Approach:** Place each number in its correct index (`nums[i]` should be at index `nums[i]-1`). Then scan for the first index where `nums[i] != i+1`. That `i+1` is the answer.",
    ],
    keyPoints: [
      "Cyclic sort / index-marking is the key to O(1) space for missing positive",
      "Only place values in range `[1, n]` — ignore negatives and values > n",
    ],
    code: [
      {
        title: "First Missing Positive — Cyclic Sort",
        language: "java",
        content: `public class FirstMissingPositive {
    public static int firstMissingPositive(int[] nums) {
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int tmp = nums[nums[i] - 1];
                nums[nums[i] - 1] = nums[i];
                nums[i] = tmp;
            }
        }

        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }

    public static void main(String[] args) {
        System.out.println(firstMissingPositive(new int[]{3,4,-1,1})); // 2
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// STRINGS
// ═══════════════════════════════════════════════════════

export const stringsEasy: ContentSection[] = [
  {
    id: "strings-easy-1",
    title: "Valid Palindrome",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "Given a string `s`, determine if it is a palindrome considering only alphanumeric characters and ignoring cases.",
      "**Example:** `Input: s = \"A man, a plan, a canal: Panama\"` → `Output: true` — After cleaning: `\"amanaplanacanalpanama\"` is a palindrome.",
      "**Approach:** Two pointers from both ends. Skip non-alphanumeric characters. Compare lowercase versions.",
    ],
    keyPoints: ["Two-pointer is the standard approach for palindrome checking", "Use `Character.isLetterOrDigit()` and `Character.toLowerCase()` for clean comparison"],
    code: [{ title: "Valid Palindrome — Two Pointers", language: "java", content: `public class ValidPalindrome {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r)))
                return false;
            l++; r--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true
        System.out.println(isPalindrome("race a car")); // false
    }
}` }],
  },
  {
    id: "strings-easy-2",
    title: "Valid Anagram",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    theory: [
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`.",
      "**Example:** `Input: s = \"anagram\", t = \"nagaram\"` → `Output: true`.",
      "**Approach:** Use a frequency array of size 26. Increment for `s`, decrement for `t`. If all zeros at the end, they're anagrams.",
    ],
    keyPoints: ["Frequency array (size 26) is faster than HashMap for lowercase letters"],
    code: [{ title: "Valid Anagram — Frequency Count", language: "java", content: `public class ValidAnagram {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        for (int f : freq) if (f != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram")); // true
        System.out.println(isAnagram("rat", "car"));         // false
    }
}` }],
  },
  {
    id: "strings-easy-3",
    title: "Reverse Words in a String",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    theory: [
      "Given a string `s`, reverse the order of words. Words are separated by spaces.",
      "**Example:** `Input: s = \"  hello world  \"` → `Output: \"world hello\"`.",
      "**Approach:** Split by spaces, filter empty strings, reverse the list, join with single space.",
    ],
    keyPoints: ["`String.trim()` and `String.split(\"\\\\s+\")` handle multiple spaces cleanly"],
    code: [{ title: "Reverse Words", language: "java", content: `public class ReverseWords {
    public static String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(" ");
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(reverseWords("  hello world  ")); // "world hello"
    }
}` }],
  },
];

export const stringsMedium: ContentSection[] = [
  {
    id: "strings-medium-1",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n, charset))",
    theory: [
      "Given a string `s`, find the length of the longest substring without repeating characters.",
      "**Example:** `Input: s = \"abcabcbb\"` → `Output: 3` — The longest substring is `\"abc\"`.",
      "**Approach:** Sliding window. Maintain a HashMap of char→last_index. When a repeat is found, shrink the window from the left past the previous occurrence.",
    ],
    keyPoints: ["Sliding window + HashMap is the O(n) pattern for substring problems"],
    code: [{ title: "Longest Substring — Sliding Window", language: "java", content: `import java.util.*;

public class LongestSubstring {
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (map.containsKey(c))
                left = Math.max(left, map.get(c) + 1);
            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
    }
}` }],
  },
  {
    id: "strings-medium-2",
    title: "Group Anagrams",
    difficulty: "Medium",
    timeComplexity: "O(n * k log k)",
    spaceComplexity: "O(n * k)",
    theory: [
      "Given an array of strings, group the anagrams together.",
      "**Example:** `Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]` → `Output: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]`.",
      "**Approach:** Sort each string to get a canonical form. Use it as HashMap key. All anagrams share the same sorted form.",
    ],
    keyPoints: ["Sorted string as HashMap key is elegant for anagram grouping"],
    code: [{ title: "Group Anagrams — Sorted Key", language: "java", content: `import java.util.*;

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

    public static void main(String[] args) {
        String[] strs = {"eat","tea","tan","ate","nat","bat"};
        System.out.println(groupAnagrams(strs));
    }
}` }],
  },
  {
    id: "strings-medium-3",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    theory: [
      "Find the longest palindromic substring in a given string.",
      "**Example:** `Input: s = \"babad\"` → `Output: \"bab\"` (or `\"aba\"`).",
      "**Approach:** Expand Around Center. For each character (and each pair), expand outward while characters match. Track the longest found.",
    ],
    keyPoints: ["Expand-around-center handles both odd and even length palindromes"],
    code: [{ title: "Longest Palindromic Substring — Expand Around Center", language: "java", content: `public class LongestPalindrome {
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
            expand(s, i, i);
            expand(s, i, i + 1);
        }
        return s.substring(start, start + maxLen);
    }

    public static void main(String[] args) {
        System.out.println(longestPalindrome("babad")); // "bab" or "aba"
    }
}` }],
  },
];

export const stringsHard: ContentSection[] = [
  {
    id: "strings-hard-1",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    timeComplexity: "O(|s| + |t|)",
    spaceComplexity: "O(|s| + |t|)",
    theory: [
      "Given strings `s` and `t`, return the minimum window substring of `s` that contains every character of `t` (including duplicates).",
      "**Example:** `Input: s = \"ADOBECODEBANC\", t = \"ABC\"` → `Output: \"BANC\"`.",
      "**Approach:** Sliding window with two pointers. Expand right to include characters, shrink left when all t's characters are covered. Track the minimum window.",
    ],
    keyPoints: ["Minimum Window Substring is the hardest sliding window problem — mastering it means you can solve any sliding window"],
    code: [{ title: "Minimum Window Substring — Sliding Window", language: "java", content: `import java.util.*;

public class MinWindowSubstring {
    public static String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
        int required = need.size(), formed = 0;
        Map<Character, Integer> window = new HashMap<>();
        int left = 0, minLen = Integer.MAX_VALUE, minStart = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.merge(c, 1, Integer::sum);
            if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue())
                formed++;
            while (formed == required) {
                if (right - left + 1 < minLen) { minLen = right - left + 1; minStart = left; }
                char lc = s.charAt(left);
                window.merge(lc, -1, Integer::sum);
                if (need.containsKey(lc) && window.get(lc) < need.get(lc)) formed--;
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }

    public static void main(String[] args) {
        System.out.println(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
    }
}` }],
  },
  {
    id: "strings-hard-2",
    title: "Edit Distance",
    difficulty: "Hard",
    timeComplexity: "O(m * n)",
    spaceComplexity: "O(m * n)",
    theory: [
      "Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) required to convert `word1` to `word2`.",
      "**Example:** `Input: word1 = \"horse\", word2 = \"ros\"` → `Output: 3` — horse → rorse → rose → ros.",
      "**Approach:** 2D DP. `dp[i][j]` = min operations for first i chars of word1 and first j chars of word2. If chars match, `dp[i][j] = dp[i-1][j-1]`. Otherwise, min of insert, delete, replace + 1.",
    ],
    keyPoints: ["Edit Distance is a classic 2D DP problem that appears in spell checkers and diff algorithms"],
    code: [{ title: "Edit Distance — 2D DP", language: "java", content: `public class EditDistance {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i-1) == word2.charAt(j-1))
                    dp[i][j] = dp[i-1][j-1];
                else
                    dp[i][j] = 1 + Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]));
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        System.out.println(minDistance("horse", "ros")); // 3
    }
}` }],
  },
];

// ═══════════════════════════════════════════════════════
// RECURSION & BACKTRACKING
// ═══════════════════════════════════════════════════════

export const recursionPracticeEasy: ContentSection[] = [
  { id: "recursion-easy-1", title: "Power of Two", difficulty: "Easy", timeComplexity: "O(log n)", spaceComplexity: "O(log n)",
    theory: ["Given an integer `n`, return `true` if it is a power of two.", "**Example:** `Input: n = 16` → `Output: true` (2^4 = 16).", "**Approach:** Recursively divide by 2. Base case: `n == 1` → true, `n <= 0` or `n` is odd → false."],
    keyPoints: ["Bit trick alternative: `n > 0 && (n & (n-1)) == 0`"],
    code: [{ title: "Power of Two — Recursive", language: "java", content: `public class PowerOfTwo {
    public static boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 2 != 0) return false;
        return isPowerOfTwo(n / 2);
    }
    public static void main(String[] args) {
        System.out.println(isPowerOfTwo(16)); // true
        System.out.println(isPowerOfTwo(6));  // false
    }
}` }],
  },
  { id: "recursion-easy-2", title: "Generate All Subsets", difficulty: "Easy", timeComplexity: "O(n * 2^n)", spaceComplexity: "O(n)",
    theory: ["Given an integer array `nums` of unique elements, return all possible subsets (the power set).", "**Example:** `Input: nums = [1, 2, 3]` → `Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`.", "**Approach:** Backtracking. At each index, choose to include or exclude the current element. When index reaches end, add current subset to result."],
    keyPoints: ["Backtracking with include/exclude at each position generates all 2^n subsets"],
    code: [{ title: "Generate All Subsets — Backtracking", language: "java", content: `import java.util.*;

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
    public static void main(String[] args) {
        System.out.println(subsets(new int[]{1, 2, 3}));
    }
}` }],
  },
  { id: "recursion-easy-3", title: "Reverse String using Recursion", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(n)",
    theory: ["Reverse a character array in-place using recursion.", "**Example:** `Input: s = ['h','e','l','l','o']` → `Output: ['o','l','l','e','h']`.", "**Approach:** Recursive two-pointer swap. Swap `s[left]` and `s[right]`, then recurse on `(left+1, right-1)`."],
    keyPoints: ["Base case: `left >= right` → stop recursion"],
    code: [{ title: "Reverse String — Recursive", language: "java", content: `public class ReverseString {
    public static void reverseString(char[] s) { reverse(s, 0, s.length - 1); }
    static void reverse(char[] s, int left, int right) {
        if (left >= right) return;
        char tmp = s[left]; s[left] = s[right]; s[right] = tmp;
        reverse(s, left + 1, right - 1);
    }
    public static void main(String[] args) {
        char[] s = {'h','e','l','l','o'};
        reverseString(s);
        System.out.println(java.util.Arrays.toString(s)); // [o, l, l, e, h]
    }
}` }],
  },
];

export const recursionPracticeMedium: ContentSection[] = [
  { id: "recursion-medium-1", title: "Permutations", difficulty: "Medium", timeComplexity: "O(n * n!)", spaceComplexity: "O(n)",
    theory: ["Given an array of distinct integers, return all possible permutations.", "**Example:** `Input: nums = [1, 2, 3]` → `Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`.", "**Approach:** Swap-based backtracking. Fix element at current index by swapping with each subsequent element, recurse, then swap back."],
    keyPoints: ["Swap-based approach avoids the need for a `used` boolean array"],
    code: [{ title: "Permutations — Swap Backtracking", language: "java", content: `import java.util.*;

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
            swap(nums, idx, i);
            backtrack(nums, idx + 1, result);
            swap(nums, idx, i);
        }
    }
    static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
    public static void main(String[] args) { System.out.println(permute(new int[]{1, 2, 3})); }
}` }],
  },
  { id: "recursion-medium-2", title: "Combination Sum", difficulty: "Medium", timeComplexity: "O(2^(target/min))", spaceComplexity: "O(target/min)",
    theory: ["Given an array of distinct integers `candidates` and a target, return all unique combinations where the numbers sum to target. Each number may be used unlimited times.", "**Example:** `Input: candidates = [2, 3, 6, 7], target = 7` → `Output: [[2, 2, 3], [7]]`.", "**Approach:** Backtracking with the same start index (allowing reuse). Prune when remaining < 0."],
    keyPoints: ["Using the same start index allows unlimited reuse of elements", "Sorting + pruning when `remain < candidates[i]` speeds up"],
    code: [{ title: "Combination Sum — Backtracking", language: "java", content: `import java.util.*;

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
    public static void main(String[] args) {
        System.out.println(combinationSum(new int[]{2,3,6,7}, 7)); // [[2,2,3], [7]]
    }
}` }],
  },
  { id: "recursion-medium-3", title: "Word Search", difficulty: "Medium", timeComplexity: "O(m * n * 4^L)", spaceComplexity: "O(L)",
    theory: ["Given an m×n grid and a word, find if the word exists by following adjacent cells (horizontal/vertical). Same cell can't be used twice.", "**Example:** `Input: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"` → `Output: true`.", "**Approach:** DFS from each cell. Mark visited cells (temporarily modify board), explore 4 directions, backtrack by restoring original value."],
    keyPoints: ["Temporarily marking visited cells in-place avoids extra space for a visited array"],
    code: [{ title: "Word Search — DFS Backtracking", language: "java", content: `public class WordSearch {
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
    public static void main(String[] args) {
        char[][] board = {{'A','B','C','E'},{'S','F','C','S'},{'A','D','E','E'}};
        System.out.println(exist(board, "ABCCED")); // true
    }
}` }],
  },
];

export const recursionPracticeHard: ContentSection[] = [
  { id: "recursion-hard-1", title: "N-Queens", difficulty: "Hard", timeComplexity: "O(n!)", spaceComplexity: "O(n^2)",
    theory: ["Place N queens on an N×N chessboard such that no two queens threaten each other. Return all distinct solutions.", "**Example:** `Input: n = 4` → `Output: 2 solutions`.", "**Approach:** Place queens row by row. For each row, try every column. Check if the column, main diagonal, and anti-diagonal are safe. Use boolean arrays for O(1) conflict checking."],
    keyPoints: ["Boolean arrays for columns and diagonals give O(1) conflict checking", "Main diagonal: `row - col + n`, anti-diagonal: `row + col`"],
    code: [{ title: "N-Queens — Optimized Backtracking", language: "java", content: `import java.util.*;

public class NQueens {
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        boolean[] cols = new boolean[n], diag1 = new boolean[2*n], diag2 = new boolean[2*n];
        solve(board, 0, n, cols, diag1, diag2, result);
        return result;
    }
    static void solve(char[][] board, int row, int n, boolean[] cols, boolean[] d1, boolean[] d2, List<List<String>> res) {
        if (row == n) {
            List<String> snap = new ArrayList<>();
            for (char[] r : board) snap.add(new String(r));
            res.add(snap); return;
        }
        for (int col = 0; col < n; col++) {
            int dd1 = row - col + n, dd2 = row + col;
            if (cols[col] || d1[dd1] || d2[dd2]) continue;
            board[row][col] = 'Q'; cols[col] = d1[dd1] = d2[dd2] = true;
            solve(board, row + 1, n, cols, d1, d2, res);
            board[row][col] = '.'; cols[col] = d1[dd1] = d2[dd2] = false;
        }
    }
    public static void main(String[] args) { System.out.println(solveNQueens(4).size()); } // 2
}` }],
  },
  { id: "recursion-hard-2", title: "Sudoku Solver", difficulty: "Hard", timeComplexity: "O(9^(empty cells))", spaceComplexity: "O(81)",
    theory: ["Fill a 9×9 Sudoku board so every row, column, and 3×3 sub-box contains digits 1-9.", "**Approach:** Backtracking. Find the next empty cell, try digits 1-9, validate against row/column/box constraints, recurse. If stuck, backtrack."],
    keyPoints: ["Constraint checking: row, column, and 3×3 box must each contain unique digits"],
    code: [{ title: "Sudoku Solver — Backtracking", language: "java", content: `public class SudokuSolver {
    public static void solveSudoku(char[][] board) { solve(board); }
    static boolean solve(char[][] board) {
        for (int r = 0; r < 9; r++)
            for (int c = 0; c < 9; c++)
                if (board[r][c] == '.') {
                    for (char d = '1'; d <= '9'; d++) {
                        if (isValid(board, r, c, d)) {
                            board[r][c] = d;
                            if (solve(board)) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
        return true;
    }
    static boolean isValid(char[][] board, int r, int c, char d) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == d) return false;
            if (board[i][c] == d) return false;
            if (board[3*(r/3)+i/3][3*(c/3)+i%3] == d) return false;
        }
        return true;
    }
}` }],
  },
];

// ═══════════════════════════════════════════════════════
// DYNAMIC PROGRAMMING
// ═══════════════════════════════════════════════════════

export const dpPracticeEasy: ContentSection[] = [
  { id: "dp-easy-1", title: "Climbing Stairs", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)",
    theory: ["You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?", "**Example:** `Input: n = 4` → `Output: 5` — 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2.", "**Approach:** Fibonacci DP. `dp[i] = dp[i-1] + dp[i-2]`. Can optimize to O(1) space using two variables."],
    keyPoints: ["This is essentially the Fibonacci sequence"],
    code: [{ title: "Climbing Stairs — Space-Optimized DP", language: "java", content: `public class ClimbingStairs {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) { int c = a + b; a = b; b = c; }
        return b;
    }
    public static void main(String[] args) { System.out.println(climbStairs(4)); } // 5
}` }],
  },
  { id: "dp-easy-2", title: "Maximum Subarray (Kadane's)", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)",
    theory: ["Find the contiguous subarray with the largest sum.", "**Example:** `Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]` → `Output: 6` — subarray `[4, -1, 2, 1]` has sum 6.", "**Approach:** Kadane's Algorithm. Maintain running sum; reset when it goes below the current element. Track maximum."],
    keyPoints: ["Kadane's is a greedy/DP hybrid — one of the most elegant O(n) algorithms"],
    code: [{ title: "Kadane's Algorithm", language: "java", content: `public class MaxSubarray {
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
}` }],
  },
  { id: "dp-easy-3", title: "House Robber", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)",
    theory: ["Given an array representing money in each house, find max money you can rob without robbing two adjacent houses.", "**Example:** `Input: nums = [2, 7, 9, 3, 1]` → `Output: 12` — Rob houses 0, 2, 4 → 2 + 9 + 1 = 12.", "**Approach:** `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`. Either skip current house or rob it + previous non-adjacent."],
    keyPoints: ["Classic DP with two-variable space optimization"],
    code: [{ title: "House Robber", language: "java", content: `public class HouseRobber {
    public static int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int num : nums) { int cur = Math.max(prev1, prev2 + num); prev2 = prev1; prev1 = cur; }
        return prev1;
    }
    public static void main(String[] args) { System.out.println(rob(new int[]{2, 7, 9, 3, 1})); } // 12
}` }],
  },
];

export const dpPracticeMedium: ContentSection[] = [
  { id: "dp-medium-1", title: "Coin Change", difficulty: "Medium", timeComplexity: "O(amount * coins)", spaceComplexity: "O(amount)",
    theory: ["Given coins of different denominations and a total amount, find the fewest number of coins that make up that amount. Return -1 if not possible.", "**Example:** `Input: coins = [1, 5, 11], amount = 15` → `Output: 3` — 5 + 5 + 5 = 15.", "**Approach:** Bottom-up DP. `dp[i]` = fewest coins to make amount i. For each coin, `dp[i] = min(dp[i], dp[i-coin] + 1)`."],
    keyPoints: ["Greedy doesn't work here (11+1+1+1+1 = 5 coins vs 5+5+5 = 3 coins)"],
    code: [{ title: "Coin Change — Bottom-Up DP", language: "java", content: `import java.util.Arrays;

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
    public static void main(String[] args) { System.out.println(coinChange(new int[]{1,5,11}, 15)); } // 3
}` }],
  },
  { id: "dp-medium-2", title: "Longest Increasing Subsequence", difficulty: "Medium", timeComplexity: "O(n log n)", spaceComplexity: "O(n)",
    theory: ["Find the length of the longest strictly increasing subsequence.", "**Example:** `Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]` → `Output: 4` — LIS is `[2, 3, 7, 101]`.", "**Approach:** Patience sorting with binary search. Maintain a tails array where `tails[i]` = smallest tail of all increasing subsequences of length `i+1`."],
    keyPoints: ["Binary search on tails array gives O(n log n) vs naive O(n^2) DP"],
    code: [{ title: "LIS — Binary Search", language: "java", content: `import java.util.*;

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
    public static void main(String[] args) {
        System.out.println(lengthOfLIS(new int[]{10,9,2,5,3,7,101,18})); // 4
    }
}` }],
  },
  { id: "dp-medium-3", title: "0/1 Knapsack", difficulty: "Medium", timeComplexity: "O(n * W)", spaceComplexity: "O(W)",
    theory: ["Given weights and values of n items, find the maximum value that fits in a knapsack of capacity W.", "**Example:** `Input: weights = [1, 3, 4, 5], values = [1, 4, 5, 7], W = 7` → `Output: 9` — Take items with weight 3 and 4.", "**Approach:** 1D DP array. Iterate items, then capacities in REVERSE (to prevent reusing same item)."],
    keyPoints: ["Reverse iteration on capacity prevents reusing the same item (0/1 constraint)"],
    code: [{ title: "0/1 Knapsack — Space Optimized", language: "java", content: `public class Knapsack {
    public static int knapsack(int[] wt, int[] val, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < wt.length; i++)
            for (int w = W; w >= wt[i]; w--)
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
        return dp[W];
    }
    public static void main(String[] args) {
        System.out.println(knapsack(new int[]{1,3,4,5}, new int[]{1,4,5,7}, 7)); // 9
    }
}` }],
  },
];

export const dpPracticeHard: ContentSection[] = [
  { id: "dp-hard-1", title: "Longest Common Subsequence", difficulty: "Hard", timeComplexity: "O(m * n)", spaceComplexity: "O(m * n)",
    theory: ["Given two strings, find the length of their longest common subsequence.", "**Example:** `Input: text1 = \"abcde\", text2 = \"ace\"` → `Output: 3` — LCS is `\"ace\"`.", "**Approach:** 2D DP. If chars match, `dp[i][j] = dp[i-1][j-1] + 1`, else `max(dp[i-1][j], dp[i][j-1])`."],
    keyPoints: ["Classic 2D DP — the foundation for diff algorithms"],
    code: [{ title: "LCS — 2D DP", language: "java", content: `public class LCS {
    public static int longestCommonSubsequence(String t1, String t2) {
        int m = t1.length(), n = t2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++)
            for (int j = 1; j <= n; j++)
                dp[i][j] = t1.charAt(i-1) == t2.charAt(j-1) ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);
        return dp[m][n];
    }
    public static void main(String[] args) { System.out.println(longestCommonSubsequence("abcde", "ace")); } // 3
}` }],
  },
  { id: "dp-hard-2", title: "Matrix Chain Multiplication", difficulty: "Hard", timeComplexity: "O(n^3)", spaceComplexity: "O(n^2)",
    theory: ["Find the most efficient way to multiply a chain of matrices.", "**Example:** `Input: dimensions = [10, 30, 5, 60]` (3 matrices: 10×30, 30×5, 5×60) → `Output: 4500`.", "**Approach:** Interval DP. `dp[i][j]` = minimum cost to multiply matrices i through j. Try all split points k between i and j."],
    keyPoints: ["Interval DP pattern: iterate by chain length, then start index, then split point"],
    code: [{ title: "Matrix Chain Multiplication — Interval DP", language: "java", content: `public class MatrixChain {
    public static int mcm(int[] p) {
        int n = p.length - 1;
        int[][] dp = new int[n][n];
        for (int len = 2; len <= n; len++)
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++)
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]);
            }
        return dp[0][n - 1];
    }
    public static void main(String[] args) { System.out.println(mcm(new int[]{10, 30, 5, 60})); } // 4500
}` }],
  },
];

// ═══════════════════════════════════════════════════════
// GRAPHS
// ═══════════════════════════════════════════════════════

export const graphsEasy: ContentSection[] = [
  { id: "graphs-easy-1", title: "Number of Islands", difficulty: "Easy", timeComplexity: "O(m * n)", spaceComplexity: "O(m * n)",
    theory: ["Given a 2D grid of `'1'`s (land) and `'0'`s (water), count the number of islands. An island is connected horizontally/vertically.", "**Example:** `Input: grid = [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]]` → `Output: 2`.", "**Approach:** DFS/BFS from each unvisited `'1'`. Mark all connected land cells as visited. Each new DFS start = one island."],
    keyPoints: ["DFS/BFS with in-place marking (change '1' to '0') avoids extra visited array"],
    code: [{ title: "Number of Islands — DFS", language: "java", content: `public class NumIslands {
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
        dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);
    }
    public static void main(String[] args) {
        char[][] grid = {{'1','1','0'},{'1','0','0'},{'0','0','1'}};
        System.out.println(numIslands(grid)); // 2
    }
}` }],
  },
  { id: "graphs-easy-2", title: "Flood Fill", difficulty: "Easy", timeComplexity: "O(m * n)", spaceComplexity: "O(m * n)",
    theory: ["An image is represented by a 2D array. Given starting pixel `(sr, sc)` and new color, fill all connected same-colored pixels.", "**Example:** `Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2` → `Output: [[2,2,2],[2,2,0],[2,0,1]]`.", "**Approach:** DFS from `(sr,sc)`. If current pixel matches original color, change to new color and recurse to 4 neighbors."],
    keyPoints: ["Check if original color equals new color first to avoid infinite recursion"],
    code: [{ title: "Flood Fill — DFS", language: "java", content: `public class FloodFill {
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int original = image[sr][sc];
        if (original != color) dfs(image, sr, sc, original, color);
        return image;
    }
    static void dfs(int[][] img, int r, int c, int orig, int newColor) {
        if (r < 0 || r >= img.length || c < 0 || c >= img[0].length || img[r][c] != orig) return;
        img[r][c] = newColor;
        dfs(img, r+1, c, orig, newColor); dfs(img, r-1, c, orig, newColor);
        dfs(img, r, c+1, orig, newColor); dfs(img, r, c-1, orig, newColor);
    }
}` }],
  },
];

export const graphsMedium: ContentSection[] = [
  { id: "graphs-medium-1", title: "Course Schedule", difficulty: "Medium", timeComplexity: "O(V + E)", spaceComplexity: "O(V + E)",
    theory: ["There are `numCourses` to take, some with prerequisites. Determine if you can finish all courses (detect cycle in directed graph).", "**Example:** `Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]` → `Output: true`.", "**Approach:** Topological Sort using Kahn's BFS. Compute in-degrees, enqueue nodes with in-degree 0, process and check if all nodes were visited."],
    keyPoints: ["If topological sort processes all nodes → no cycle → can finish all courses"],
    code: [{ title: "Course Schedule — Kahn's Topological Sort", language: "java", content: `import java.util.*;

public class CourseSchedule {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); inDeg[p[0]]++; }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) if (inDeg[i] == 0) q.add(i);
        int count = 0;
        while (!q.isEmpty()) { int cur = q.poll(); count++;
            for (int next : adj.get(cur)) if (--inDeg[next] == 0) q.add(next); }
        return count == numCourses;
    }
    public static void main(String[] args) {
        System.out.println(canFinish(4, new int[][]{{1,0},{2,0},{3,1},{3,2}})); // true
    }
}` }],
  },
  { id: "graphs-medium-2", title: "Word Ladder", difficulty: "Medium", timeComplexity: "O(m^2 * n)", spaceComplexity: "O(m * n)",
    theory: ["Find the shortest transformation from `beginWord` to `endWord` by changing one letter at a time. Each transformed word must exist in the word list.", "**Example:** `Input: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]` → `Output: 5` — hit → hot → dot → dog → cog.", "**Approach:** BFS. Each word is a node. Edges connect words differing by one letter. BFS gives shortest path."],
    keyPoints: ["BFS guarantees shortest path in unweighted graphs"],
    code: [{ title: "Word Ladder — BFS", language: "java", content: `import java.util.*;

public class WordLadder {
    public static int ladderLength(String begin, String end, List<String> wordList) {
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(end)) return 0;
        Queue<String> q = new LinkedList<>();
        q.add(begin); int level = 1;
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
    public static void main(String[] args) {
        System.out.println(ladderLength("hit", "cog", Arrays.asList("hot","dot","dog","lot","log","cog"))); // 5
    }
}` }],
  },
];

export const graphsHard: ContentSection[] = [
  { id: "graphs-hard-1", title: "Dijkstra's Shortest Path", difficulty: "Hard", timeComplexity: "O((V+E) log V)", spaceComplexity: "O(V + E)",
    theory: ["Given a weighted directed graph, find the shortest path from a source to all other vertices.", "**Example:** `Input: n=5, edges=[[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]], source=0` → `Output: [0, 3, 1, 4, 7]`.", "**Approach:** Min-heap (PriorityQueue). Greedily pick the closest unvisited vertex, relax all its edges."],
    keyPoints: ["Skip outdated heap entries with `if (d > dist[u]) continue`"],
    code: [{ title: "Dijkstra's Algorithm — Min Heap", language: "java", content: `import java.util.*;

public class Dijkstra {
    public static int[] shortestPath(int n, int[][] edges, int src) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) adj.get(e[0]).add(new int[]{e[1], e[2]});
        int[] dist = new int[n]; Arrays.fill(dist, Integer.MAX_VALUE); dist[src] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, src});
        while (!pq.isEmpty()) {
            int[] cur = pq.poll(); int d = cur[0], u = cur[1];
            if (d > dist[u]) continue;
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.offer(new int[]{dist[v], v}); }
            }
        }
        return dist;
    }
    public static void main(String[] args) {
        int[][] edges = {{0,1,4},{0,2,1},{2,1,2},{1,3,1},{2,3,5},{3,4,3}};
        System.out.println(Arrays.toString(shortestPath(5, edges, 0))); // [0, 3, 1, 4, 7]
    }
}` }],
  },
  { id: "graphs-hard-2", title: "Strongly Connected Components (Kosaraju's)", difficulty: "Hard", timeComplexity: "O(V + E)", spaceComplexity: "O(V + E)",
    theory: ["Find all SCCs in a directed graph using Kosaraju's algorithm.", "**Example:** `Input: n=5, edges=[[0,1],[1,2],[2,0],[1,3],[3,4]]` → `Output: [[0,1,2], [3], [4]]`.", "**Approach:** Two-pass DFS. First pass: finish-order on original graph. Second pass: DFS on reversed graph in reverse finish order."],
    keyPoints: ["Two DFS passes + graph reversal identifies all strongly connected components"],
    code: [{ title: "Kosaraju's SCC Algorithm", language: "java", content: `import java.util.*;

public class KosarajuSCC {
    public static List<List<Integer>> findSCCs(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>(), radj = new ArrayList<>();
        for (int i = 0; i < n; i++) { adj.add(new ArrayList<>()); radj.add(new ArrayList<>()); }
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); radj.get(e[1]).add(e[0]); }
        boolean[] visited = new boolean[n]; Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (!visited[i]) dfs1(i, adj, visited, stack);
        Arrays.fill(visited, false);
        List<List<Integer>> sccs = new ArrayList<>();
        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (!visited[node]) { List<Integer> scc = new ArrayList<>(); dfs2(node, radj, visited, scc); sccs.add(scc); }
        }
        return sccs;
    }
    static void dfs1(int u, List<List<Integer>> adj, boolean[] vis, Deque<Integer> stack) {
        vis[u] = true; for (int v : adj.get(u)) if (!vis[v]) dfs1(v, adj, vis, stack); stack.push(u);
    }
    static void dfs2(int u, List<List<Integer>> radj, boolean[] vis, List<Integer> scc) {
        vis[u] = true; scc.add(u); for (int v : radj.get(u)) if (!vis[v]) dfs2(v, radj, vis, scc);
    }
    public static void main(String[] args) {
        System.out.println(findSCCs(5, new int[][]{{0,1},{1,2},{2,0},{1,3},{3,4}}));
    }
}` }],
  },
];

// ═══════════════════════════════════════════════════════
// TREES
// ═══════════════════════════════════════════════════════

export const treesEasy: ContentSection[] = [
  { id: "trees-easy-1", title: "Maximum Depth of Binary Tree", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(h)",
    theory: ["Find the maximum depth (height) of a binary tree.", "**Example:** `Input: root = [3,9,20,null,null,15,7]` → `Output: 3`.", "**Approach:** Recursive: `max(left depth, right depth) + 1`. Base case: null node = depth 0."],
    keyPoints: ["One of the simplest tree recursion problems — great warmup"],
    code: [{ title: "Maximum Depth — Recursive", language: "java", content: `public class MaxDepth {
    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}` }],
  },
  { id: "trees-easy-2", title: "Invert Binary Tree", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(h)",
    theory: ["Mirror a binary tree (swap left and right children at every node).", "**Example:** `Input: [4,2,7,1,3,6,9]` → `Output: [4,7,2,9,6,3,1]`.", "**Approach:** Recursively swap left and right children of each node."],
    keyPoints: ["The famous problem that inspired a tweet about interviews"],
    code: [{ title: "Invert Binary Tree", language: "java", content: `public class InvertTree {
    public static TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(tmp);
        return root;
    }
}` }],
  },
  { id: "trees-easy-3", title: "Same Tree", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(h)",
    theory: ["Check if two binary trees are identical.", "**Example:** `Input: p = [1,2,3], q = [1,2,3]` → `Output: true`.", "**Approach:** Recursively compare: both null → true, one null → false, values differ → false, else recurse on left and right."],
    keyPoints: ["Base cases: both null = true, one null = false"],
    code: [{ title: "Same Tree — Recursive", language: "java", content: `public class SameTree {
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}` }],
  },
];

export const treesMedium: ContentSection[] = [
  { id: "trees-medium-1", title: "Validate BST", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(h)",
    theory: ["Determine if a binary tree is a valid Binary Search Tree.", "**Example:** `Input: [5,1,4,null,null,3,6]` → `Output: false` (4 is in right subtree of 5, but 3 < 5).", "**Approach:** Pass a valid range `(min, max)` to each node. Left child must be < current, right must be >."],
    keyPoints: ["Use Long.MIN_VALUE/MAX_VALUE as initial bounds to handle Integer edge cases"],
    code: [{ title: "Validate BST — Range Checking", language: "java", content: `public class ValidateBST {
    public static boolean isValidBST(TreeNode root) { return validate(root, Long.MIN_VALUE, Long.MAX_VALUE); }
    static boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val) && validate(node.right, node.val, max);
    }
}` }],
  },
  { id: "trees-medium-2", title: "Lowest Common Ancestor", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(h)",
    theory: ["Find the LCA of two nodes in a binary tree.", "**Example:** `Input: root = [3,5,1,6,2,0,8], p = 5, q = 1` → `Output: 3`.", "**Approach:** If current node is p or q, return it. Recurse left and right. If both return non-null, current is LCA."],
    keyPoints: ["If both subtrees return non-null, the current node is the LCA"],
    code: [{ title: "Lowest Common Ancestor", language: "java", content: `public class LCA {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}` }],
  },
  { id: "trees-medium-3", title: "Level Order Traversal", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(n)",
    theory: ["Return the level order traversal of a binary tree (BFS, grouped by level).", "**Example:** `Input: [3,9,20,null,null,15,7]` → `Output: [[3],[9,20],[15,7]]`.", "**Approach:** BFS with a queue. Process one level at a time by recording queue size before processing."],
    keyPoints: ["Track queue size at start of each level to group nodes correctly"],
    code: [{ title: "Level Order Traversal — BFS", language: "java", content: `import java.util.*;

public class LevelOrder {
    public static List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> q = new LinkedList<>(); q.add(root);
        while (!q.isEmpty()) {
            int size = q.size(); List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll(); level.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            result.add(level);
        }
        return result;
    }
}` }],
  },
];

export const treesHard: ContentSection[] = [
  { id: "trees-hard-1", title: "Serialize and Deserialize Binary Tree", difficulty: "Hard", timeComplexity: "O(n)", spaceComplexity: "O(n)",
    theory: ["Design an algorithm to serialize a binary tree to a string and deserialize it back.", "**Example:** `Input: [1,2,3,null,null,4,5]` → `Serialized: \"1,2,null,null,3,4,null,null,5,null,null\"`.", "**Approach:** Preorder traversal with null markers. For deserialization, use a queue of tokens and recursively build the tree."],
    keyPoints: ["Preorder + null markers uniquely defines a binary tree"],
    code: [{ title: "Serialize & Deserialize — Preorder", language: "java", content: `import java.util.*;

public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder(); buildString(root, sb); return sb.toString();
    }
    void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.append("null,"); return; }
        sb.append(node.val).append(","); buildString(node.left, sb); buildString(node.right, sb);
    }
    public TreeNode deserialize(String data) {
        return buildTree(new LinkedList<>(Arrays.asList(data.split(","))));
    }
    TreeNode buildTree(Queue<String> q) {
        String val = q.poll(); if ("null".equals(val)) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(q); node.right = buildTree(q); return node;
    }
}` }],
  },
  { id: "trees-hard-2", title: "Binary Tree Maximum Path Sum", difficulty: "Hard", timeComplexity: "O(n)", spaceComplexity: "O(h)",
    theory: ["Find the maximum path sum in a binary tree. A path can start and end at any node.", "**Example:** `Input: [-10,9,20,null,null,15,7]` → `Output: 42` — Path 15 → 20 → 7.", "**Approach:** Post-order DFS. At each node, compute max gain from left and right subtrees. Update global max with `node.val + leftGain + rightGain`. Return `node.val + max(leftGain, rightGain)` upward."],
    keyPoints: ["Use `Math.max(0, gain)` to ignore negative subtrees"],
    code: [{ title: "Binary Tree Maximum Path Sum", language: "java", content: `public class MaxPathSum {
    static int maxSum;
    public static int maxPathSum(TreeNode root) { maxSum = Integer.MIN_VALUE; dfs(root); return maxSum; }
    static int dfs(TreeNode node) {
        if (node == null) return 0;
        int leftGain = Math.max(0, dfs(node.left));
        int rightGain = Math.max(0, dfs(node.right));
        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
        return node.val + Math.max(leftGain, rightGain);
    }
}` }],
  },
];

// ═══════════════════════════════════════════════════════
// GREEDY & SORTING
// ═══════════════════════════════════════════════════════

export const greedyEasy: ContentSection[] = [
  { id: "greedy-easy-1", title: "Best Time to Buy and Sell Stock", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)",
    theory: ["Given daily prices, find the maximum profit from one buy and one sell (buy before sell).", "**Example:** `Input: prices = [7, 1, 5, 3, 6, 4]` → `Output: 5` — Buy at 1, sell at 6.", "**Approach:** Track minimum price seen so far. At each day, compute `profit = price - minPrice`, update maxProfit."],
    keyPoints: ["Single pass greedy — track min price and max profit simultaneously"],
    code: [{ title: "Best Time to Buy & Sell Stock", language: "java", content: `public class BuySellStock {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int price : prices) { minPrice = Math.min(minPrice, price); maxProfit = Math.max(maxProfit, price - minPrice); }
        return maxProfit;
    }
    public static void main(String[] args) { System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); } // 5
}` }],
  },
  { id: "greedy-easy-2", title: "Sort Colors (Dutch National Flag)", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(1)",
    theory: ["Sort an array of 0s, 1s, and 2s in-place in one pass.", "**Example:** `Input: nums = [2, 0, 2, 1, 1, 0]` → `Output: [0, 0, 1, 1, 2, 2]`.", "**Approach:** Three pointers: lo, mid, hi. Swap 0s to front (lo), 2s to back (hi), 1s stay in middle."],
    keyPoints: ["Three-pointer partitioning solves it in a single pass"],
    code: [{ title: "Sort Colors — Dutch National Flag", language: "java", content: `public class SortColors {
    public static void sortColors(int[] nums) {
        int lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) swap(nums, lo++, mid++);
            else if (nums[mid] == 1) mid++;
            else swap(nums, mid, hi--);
        }
    }
    static void swap(int[] a, int i, int j) { int t = a[i]; a[i] = a[j]; a[j] = t; }
    public static void main(String[] args) {
        int[] nums = {2, 0, 2, 1, 1, 0}; sortColors(nums);
        System.out.println(java.util.Arrays.toString(nums)); // [0, 0, 1, 1, 2, 2]
    }
}` }],
  },
];

export const greedyMedium: ContentSection[] = [
  { id: "greedy-medium-1", title: "Jump Game", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(1)",
    theory: ["Given an array where each element represents max jump length from that position, determine if you can reach the last index.", "**Example:** `Input: nums = [2, 3, 1, 1, 4]` → `Output: true`.", "**Approach:** Greedy. Track farthest reachable index. If current index > farthest, can't proceed."],
    keyPoints: ["If `i > farthest` at any point → unreachable"],
    code: [{ title: "Jump Game — Greedy", language: "java", content: `public class JumpGame {
    public static boolean canJump(int[] nums) {
        int farthest = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > farthest) return false;
            farthest = Math.max(farthest, i + nums[i]);
        }
        return true;
    }
    public static void main(String[] args) { System.out.println(canJump(new int[]{2,3,1,1,4})); } // true
}` }],
  },
  { id: "greedy-medium-2", title: "Meeting Rooms II", difficulty: "Medium", timeComplexity: "O(n log n)", spaceComplexity: "O(n)",
    theory: ["Given meeting time intervals, find the minimum number of conference rooms required.", "**Example:** `Input: intervals = [[0,30],[5,10],[15,20]]` → `Output: 2`.", "**Approach:** Sort start times and end times separately. Two-pointer: if next start < next end → need new room, else reuse."],
    keyPoints: ["Sorting starts and ends separately simplifies the two-pointer approach"],
    code: [{ title: "Meeting Rooms II — Two Pointer", language: "java", content: `import java.util.*;

public class MeetingRooms {
    public static int minMeetingRooms(int[][] intervals) {
        int n = intervals.length;
        int[] starts = new int[n], ends = new int[n];
        for (int i = 0; i < n; i++) { starts[i] = intervals[i][0]; ends[i] = intervals[i][1]; }
        Arrays.sort(starts); Arrays.sort(ends);
        int rooms = 0, endPtr = 0;
        for (int start : starts) { if (start < ends[endPtr]) rooms++; else endPtr++; }
        return rooms;
    }
    public static void main(String[] args) {
        System.out.println(minMeetingRooms(new int[][]{{0,30},{5,10},{15,20}})); // 2
    }
}` }],
  },
  { id: "greedy-medium-3", title: "Task Scheduler", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(1)",
    theory: ["Given tasks with a cooldown period `n`, find minimum time to execute all tasks.", "**Example:** `Input: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2` → `Output: 8` — A→B→idle→A→B→idle→A→B.", "**Approach:** The most frequent task determines the frame. Idle slots = `(maxFreq - 1) * n`. Fill gaps with other tasks."],
    keyPoints: ["Formula: `(maxFreq - 1) * (n + 1) + maxCount`"],
    code: [{ title: "Task Scheduler", language: "java", content: `public class TaskScheduler {
    public static int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char t : tasks) freq[t - 'A']++;
        int maxFreq = 0, maxCount = 0;
        for (int f : freq) maxFreq = Math.max(maxFreq, f);
        for (int f : freq) if (f == maxFreq) maxCount++;
        int result = (maxFreq - 1) * (n + 1) + maxCount;
        return Math.max(tasks.length, result);
    }
    public static void main(String[] args) {
        System.out.println(leastInterval(new char[]{'A','A','A','B','B','B'}, 2)); // 8
    }
}` }],
  },
];

export const greedyHard: ContentSection[] = [
  { id: "greedy-hard-1", title: "Candy", difficulty: "Hard", timeComplexity: "O(n)", spaceComplexity: "O(n)",
    theory: ["There are `n` children in a line with ratings. Give candies: each child gets ≥1, children with higher rating than neighbors get more. Minimize total.", "**Example:** `Input: ratings = [1, 0, 2]` → `Output: 5` — Candies = [2, 1, 2].", "**Approach:** Two passes. Left-to-right: if `rating[i] > rating[i-1]`, `candy[i] = candy[i-1] + 1`. Right-to-left: if `rating[i] > rating[i+1]`, `candy[i] = max(candy[i], candy[i+1] + 1)`."],
    keyPoints: ["Two-pass greedy ensures both left and right neighbor constraints are satisfied"],
    code: [{ title: "Candy — Two-Pass Greedy", language: "java", content: `public class Candy {
    public static int candy(int[] ratings) {
        int n = ratings.length; int[] candies = new int[n];
        java.util.Arrays.fill(candies, 1);
        for (int i = 1; i < n; i++) if (ratings[i] > ratings[i-1]) candies[i] = candies[i-1] + 1;
        for (int i = n - 2; i >= 0; i--) if (ratings[i] > ratings[i+1]) candies[i] = Math.max(candies[i], candies[i+1] + 1);
        int total = 0; for (int c : candies) total += c; return total;
    }
    public static void main(String[] args) { System.out.println(candy(new int[]{1, 0, 2})); } // 5
}` }],
  },
  { id: "greedy-hard-2", title: "IPO (Initial Public Offering)", difficulty: "Hard", timeComplexity: "O(n log n)", spaceComplexity: "O(n)",
    theory: ["Given k projects with capital requirements and profits, starting with initial capital w, maximize total capital.", "**Example:** `Input: k=2, w=0, profits=[1,2,3], capital=[0,1,1]` → `Output: 4`.", "**Approach:** Greedy with two heaps. Min-heap for capital (unlock projects), max-heap for profits (pick most profitable available)."],
    keyPoints: ["Two-heap pattern: min-heap to unlock, max-heap to select"],
    code: [{ title: "IPO — Two Heaps Greedy", language: "java", content: `import java.util.*;

public class IPO {
    public static int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        PriorityQueue<int[]> minCap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int i = 0; i < n; i++) minCap.offer(new int[]{capital[i], profits[i]});
        PriorityQueue<Integer> maxProfit = new PriorityQueue<>(Collections.reverseOrder());
        for (int i = 0; i < k; i++) {
            while (!minCap.isEmpty() && minCap.peek()[0] <= w) maxProfit.offer(minCap.poll()[1]);
            if (maxProfit.isEmpty()) break;
            w += maxProfit.poll();
        }
        return w;
    }
    public static void main(String[] args) {
        System.out.println(findMaximizedCapital(2, 0, new int[]{1,2,3}, new int[]{0,1,1})); // 4
    }
}` }],
  },
];

// ═══════════════════════════════════════════════════════
// STACK & QUEUE
// ═══════════════════════════════════════════════════════

export const stackQueueEasy: ContentSection[] = [
  { id: "stackq-easy-1", title: "Valid Parentheses", difficulty: "Easy", timeComplexity: "O(n)", spaceComplexity: "O(n)",
    theory: ["Given a string containing just `(){}[]`, determine if the input string is valid.", "**Example:** `Input: s = \"({[]})\"` → `Output: true`. `Input: s = \"([)]\"` → `Output: false`.", "**Approach:** Push opening brackets onto a stack. For closing brackets, check if top of stack matches. At the end, stack must be empty."],
    keyPoints: ["Push the expected closing bracket instead of the opening bracket for cleaner code"],
    code: [{ title: "Valid Parentheses — Stack", language: "java", content: `import java.util.*;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
    public static void main(String[] args) {
        System.out.println(isValid("({[]})")); // true
        System.out.println(isValid("([)]"));   // false
    }
}` }],
  },
  { id: "stackq-easy-2", title: "Implement Queue using Stacks", difficulty: "Easy", timeComplexity: "O(1) amortized", spaceComplexity: "O(n)",
    theory: ["Implement a FIFO queue using only two stacks.", "**Example:** `push(1), push(2), peek() → 1, pop() → 1, empty() → false`.", "**Approach:** Two stacks: input and output. On pop/peek, if output is empty, transfer all from input to output (reverses order → FIFO)."],
    keyPoints: ["Amortized O(1) — each element is moved between stacks at most once"],
    code: [{ title: "Queue using Two Stacks", language: "java", content: `import java.util.*;

public class MyQueue {
    Deque<Integer> input = new ArrayDeque<>(), output = new ArrayDeque<>();
    public void push(int x) { input.push(x); }
    public int pop() { if (output.isEmpty()) transfer(); return output.pop(); }
    public int peek() { if (output.isEmpty()) transfer(); return output.peek(); }
    public boolean empty() { return input.isEmpty() && output.isEmpty(); }
    private void transfer() { while (!input.isEmpty()) output.push(input.pop()); }
    public static void main(String[] args) {
        MyQueue q = new MyQueue(); q.push(1); q.push(2);
        System.out.println(q.peek()); // 1
        System.out.println(q.pop());  // 1
    }
}` }],
  },
];

export const stackQueueMedium: ContentSection[] = [
  { id: "stackq-medium-1", title: "Daily Temperatures", difficulty: "Medium", timeComplexity: "O(n)", spaceComplexity: "O(n)",
    theory: ["Given daily temperatures, return an array where each element tells how many days until a warmer temperature.", "**Example:** `Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]` → `Output: [1, 1, 4, 2, 1, 1, 0, 0]`.", "**Approach:** Monotonic decreasing stack. Store indices. When current temp > stack top's temp, pop and compute difference."],
    keyPoints: ["Monotonic stack pattern — elements popped represent resolved queries"],
    code: [{ title: "Daily Temperatures — Monotonic Stack", language: "java", content: `import java.util.*;

public class DailyTemperatures {
    public static int[] dailyTemperatures(int[] temps) {
        int n = temps.length; int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
                int idx = stack.pop(); answer[idx] = i - idx;
            }
            stack.push(i);
        }
        return answer;
    }
    public static void main(String[] args) {
        System.out.println(Arrays.toString(dailyTemperatures(new int[]{73,74,75,71,69,72,76,73})));
        // [1, 1, 4, 2, 1, 1, 0, 0]
    }
}` }],
  },
  { id: "stackq-medium-2", title: "Min Stack", difficulty: "Medium", timeComplexity: "O(1) all operations", spaceComplexity: "O(n)",
    theory: ["Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.", "**Example:** `push(-2), push(0), push(-3), getMin()→-3, pop(), top()→0, getMin()→-2`.", "**Approach:** Two stacks: one for values, one for minimums. On push, push `min(new value, current min)` to min stack."],
    keyPoints: ["Auxiliary min stack tracks the minimum at every stack depth"],
    code: [{ title: "Min Stack — O(1) getMin", language: "java", content: `import java.util.*;

public class MinStack {
    Deque<Integer> stack = new ArrayDeque<>(), minStack = new ArrayDeque<>();
    public void push(int val) {
        stack.push(val);
        minStack.push(minStack.isEmpty() ? val : Math.min(val, minStack.peek()));
    }
    public void pop() { stack.pop(); minStack.pop(); }
    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
    public static void main(String[] args) {
        MinStack ms = new MinStack(); ms.push(-2); ms.push(0); ms.push(-3);
        System.out.println(ms.getMin()); // -3
        ms.pop(); System.out.println(ms.getMin()); // -2
    }
}` }],
  },
];

export const stackQueueHard: ContentSection[] = [
  { id: "stackq-hard-1", title: "Largest Rectangle in Histogram", difficulty: "Hard", timeComplexity: "O(n)", spaceComplexity: "O(n)",
    theory: ["Given heights of bars in a histogram, find the area of the largest rectangle.", "**Example:** `Input: heights = [2, 1, 5, 6, 2, 3]` → `Output: 10` — Rectangle of height 5, width 2.", "**Approach:** Monotonic increasing stack. When a shorter bar is encountered, pop and compute area with the popped bar as the shortest bar."],
    keyPoints: ["Append a sentinel height 0 to flush remaining elements from the stack"],
    code: [{ title: "Largest Rectangle — Monotonic Stack", language: "java", content: `import java.util.*;

public class LargestRectangle {
    public static int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>(); int maxArea = 0, n = heights.length;
        for (int i = 0; i <= n; i++) {
            int h = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && h < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
    public static void main(String[] args) {
        System.out.println(largestRectangleArea(new int[]{2,1,5,6,2,3})); // 10
    }
}` }],
  },
  { id: "stackq-hard-2", title: "Sliding Window Maximum", difficulty: "Hard", timeComplexity: "O(n)", spaceComplexity: "O(k)",
    theory: ["Given an array and a sliding window of size k, return the max element in each window position.", "**Example:** `Input: nums = [1,3,-1,-3,5,3,6,7], k = 3` → `Output: [3,3,5,5,6,7]`.", "**Approach:** Monotonic decreasing deque. Front = current window max. Remove from front if out of window, remove from back if smaller than current."],
    keyPoints: ["Deque front always holds the index of the current window's maximum"],
    code: [{ title: "Sliding Window Maximum — Monotonic Deque", language: "java", content: `import java.util.*;

public class SlidingWindowMax {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length; int[] result = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            if (!dq.isEmpty() && dq.peekFirst() < i - k + 1) dq.pollFirst();
            while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
            dq.offerLast(i);
            if (i >= k - 1) result[i - k + 1] = nums[dq.peekFirst()];
        }
        return result;
    }
    public static void main(String[] args) {
        System.out.println(Arrays.toString(maxSlidingWindow(new int[]{1,3,-1,-3,5,3,6,7}, 3)));
        // [3, 3, 5, 5, 6, 7]
    }
}` }],
  },
];

// ═══════════════════════════════════════════════════════
// HELPER: Create a difficulty group header section
// ═══════════════════════════════════════════════════════

function groupHeader(id: string, title: string, difficulty: string): ContentSection {
  return {
    id,
    title,
    difficulty: difficulty as "Easy" | "Medium" | "Hard",
    timeComplexity: "",
    spaceComplexity: "",
    theory: [],
    code: [],
  };
}

// ═══════════════════════════════════════════════════════
// CONTENT MAP
// ═══════════════════════════════════════════════════════

export const practiceContentMap: Record<string, ContentSection[]> = {
  "practice-arrays": [
    groupHeader("arrays-easy", "Easy Problems", "Easy"), ...arraysEasy,
    groupHeader("arrays-medium", "Medium Problems", "Medium"), ...arraysMedium,
    groupHeader("arrays-hard", "Hard Problems", "Hard"), ...arraysHard,
  ],
  "practice-strings": [
    groupHeader("strings-easy", "Easy Problems", "Easy"), ...stringsEasy,
    groupHeader("strings-medium", "Medium Problems", "Medium"), ...stringsMedium,
    groupHeader("strings-hard", "Hard Problems", "Hard"), ...stringsHard,
  ],
  "practice-recursion": [
    groupHeader("recursion-easy", "Easy Problems", "Easy"), ...recursionPracticeEasy,
    groupHeader("recursion-medium", "Medium Problems", "Medium"), ...recursionPracticeMedium,
    groupHeader("recursion-hard", "Hard Problems", "Hard"), ...recursionPracticeHard,
  ],
  "practice-dp": [
    groupHeader("dp-easy", "Easy Problems", "Easy"), ...dpPracticeEasy,
    groupHeader("dp-medium", "Medium Problems", "Medium"), ...dpPracticeMedium,
    groupHeader("dp-hard", "Hard Problems", "Hard"), ...dpPracticeHard,
  ],
  "practice-graphs": [
    groupHeader("graphs-easy", "Easy Problems", "Easy"), ...graphsEasy,
    groupHeader("graphs-medium", "Medium Problems", "Medium"), ...graphsMedium,
    groupHeader("graphs-hard", "Hard Problems", "Hard"), ...graphsHard,
  ],
  "practice-trees": [
    groupHeader("trees-easy", "Easy Problems", "Easy"), ...treesEasy,
    groupHeader("trees-medium", "Medium Problems", "Medium"), ...treesMedium,
    groupHeader("trees-hard", "Hard Problems", "Hard"), ...treesHard,
  ],
  "practice-greedy": [
    groupHeader("greedy-easy", "Easy Problems", "Easy"), ...greedyEasy,
    groupHeader("greedy-medium", "Medium Problems", "Medium"), ...greedyMedium,
    groupHeader("greedy-hard", "Hard Problems", "Hard"), ...greedyHard,
  ],
  "practice-stack-queue": [
    groupHeader("stackq-easy", "Easy Problems", "Easy"), ...stackQueueEasy,
    groupHeader("stackq-medium", "Medium Problems", "Medium"), ...stackQueueMedium,
    groupHeader("stackq-hard", "Hard Problems", "Hard"), ...stackQueueHard,
  ],
};
