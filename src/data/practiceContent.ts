import { ContentSection } from "./recursionContent";

// ═══════════════════════════════════════════════════════
// ARRAYS & HASHING
// ═══════════════════════════════════════════════════════

export const arraysEasy: ContentSection[] = [
  {
    id: "arrays-easy",
    title: "Arrays — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Two Sum** — Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. You may assume each input has exactly one solution, and you may not use the same element twice.",
      "**Example:**\n`Input: nums = [2, 7, 11, 15], target = 9`\n`Output: [0, 1]`\n`Explanation: nums[0] + nums[1] = 2 + 7 = 9`",
      "**Approach:** Use a HashMap to store each number's index. For every element, check if `target - nums[i]` already exists in the map. If yes, return both indices. This gives O(n) time instead of brute-force O(n²).",
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
      {
        title: "Problem 2: Find Duplicates — Given an integer array, return all elements that appear more than once.",
        language: "java",
        content: `/*
 * Problem: Find All Duplicates in an Array
 * 
 * Given an integer array nums of length n where all integers
 * are in the range [1, n], return all integers that appear twice.
 *
 * Example:
 *   Input:  nums = [4, 3, 2, 7, 8, 2, 3, 1]
 *   Output: [2, 3]
 *
 * Approach: Use index-marking trick. For each value v,
 * negate nums[v-1]. If it's already negative, v is a duplicate.
 * This gives O(n) time and O(1) extra space.
 */
import java.util.*;

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

        System.out.println(findDuplicates(new int[]{1,1,2}));
        // Output: [1]
    }
}`,
      },
      {
        title: "Problem 3: Rotate Array by K Positions",
        language: "java",
        content: `/*
 * Problem: Rotate Array
 * 
 * Given an integer array nums, rotate the array to the right
 * by k steps, where k is non-negative. Do it in-place with O(1) extra space.
 *
 * Example:
 *   Input:  nums = [1, 2, 3, 4, 5, 6, 7], k = 3
 *   Output: [5, 6, 7, 1, 2, 3, 4]
 *   Explanation: rotate 1 step  → [7,1,2,3,4,5,6]
 *                rotate 2 steps → [6,7,1,2,3,4,5]
 *                rotate 3 steps → [5,6,7,1,2,3,4]
 *
 * Approach: Reverse the entire array, then reverse first k,
 * then reverse the rest. Three reversals = one rotation.
 */
import java.util.*;

public class RotateArray {
    static void reverse(int[] arr, int l, int r) {
        while (l < r) {
            int tmp = arr[l]; arr[l] = arr[r]; arr[r] = tmp;
            l++; r--;
        }
    }

    public static void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n; // handle k > n
        reverse(nums, 0, n - 1);   // reverse all
        reverse(nums, 0, k - 1);   // reverse first k
        reverse(nums, k, n - 1);   // reverse rest
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
    id: "arrays-medium",
    title: "Arrays — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Subarray Sum Equals K** — Given an integer array `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals `k`.",
      "**Example:**\n`Input: nums = [1, 1, 1], k = 2`\n`Output: 2`\n`Explanation: Subarrays [1,1] starting at index 0 and [1,1] starting at index 1 both sum to 2.`",
      "**Approach:** Use prefix sum with a HashMap. For each index, compute running prefix sum. If `prefixSum - k` has been seen before, those subarrays end at the current index. Initialize map with `{0: 1}` to handle subarrays starting from index 0.",
      "**Problem 2: Product of Array Except Self** — Given an integer array `nums`, return an array `answer` such that `answer[i]` is the product of all elements except `nums[i]`. You must solve it in O(n) time without using division.",
      "**Example:**\n`Input: nums = [1, 2, 3, 4]`\n`Output: [24, 12, 8, 6]`\n`Explanation: answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, etc.`",
      "**Approach:** Two-pass approach. First pass: build left prefix products. Second pass: multiply by right suffix products. This avoids division and runs in O(n) with O(1) extra space (output array doesn't count).",
      "**Problem 3: Longest Consecutive Sequence** — Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Must run in O(n) time.",
      "**Example:**\n`Input: nums = [100, 4, 200, 1, 3, 2]`\n`Output: 4`\n`Explanation: The longest consecutive sequence is [1, 2, 3, 4], length = 4.`",
      "**Approach:** Put all numbers in a HashSet. For each number that is the START of a sequence (i.e., `num - 1` is NOT in the set), count how many consecutive numbers follow. Track the maximum length.",
    ],
    keyPoints: [
      "Prefix sum + HashMap is one of the most powerful array patterns",
      "Two-pass (left product → right product) avoids needing division",
      "HashSet for O(1) lookups transforms O(n²) brute force into O(n)",
    ],
    code: [
      {
        title: "Subarray Sum Equals K — Prefix Sum + HashMap",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *   nums = [1, 2, 3], k = 3
 *   Prefix sums: [1, 3, 6]
 *   At index 0: prefixSum=1, need 1-3=-2 → not found
 *   At index 1: prefixSum=3, need 3-3=0 → found! count=1 (subarray [1,2])
 *   At index 2: prefixSum=6, need 6-3=3 → found! count=2 (subarray [3])
 *   Answer: 2
 */
import java.util.*;

public class SubarraySum {
    public static int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCount = new HashMap<>();
        prefixCount.put(0, 1); // empty prefix
        int sum = 0, count = 0;
        
        for (int num : nums) {
            sum += num;
            // How many prefixes had sum = (currentSum - k)?
            count += prefixCount.getOrDefault(sum - k, 0);
            prefixCount.merge(sum, 1, Integer::sum);
        }
        return count;
    }

    public static void main(String[] args) {
        System.out.println(subarraySum(new int[]{1,1,1}, 2));    // 2
        System.out.println(subarraySum(new int[]{1,2,3}, 3));    // 2
        System.out.println(subarraySum(new int[]{1,-1,0}, 0));   // 3
    }
}`,
      },
      {
        title: "Product of Array Except Self",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1) extra (output array doesn't count)
 *
 * Test Case:
 *   nums = [1, 2, 3, 4]
 *   Left pass:  result = [1, 1, 2, 6]
 *   Right pass: right=1 → result[3]=6*1=6, right=4
 *               right=4 → result[2]=2*4=8, right=12
 *               right=12 → result[1]=1*12=12, right=24
 *               right=24 → result[0]=1*24=24
 *   Final: [24, 12, 8, 6]
 */
public class ProductExceptSelf {
    public static int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        
        // Left prefix product
        result[0] = 1;
        for (int i = 1; i < n; i++)
            result[i] = result[i - 1] * nums[i - 1];
        
        // Right suffix product (accumulated in-place)
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
      {
        title: "Longest Consecutive Sequence",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *   nums = [100, 4, 200, 1, 3, 2]
 *   Set = {1, 2, 3, 4, 100, 200}
 *   
 *   num=100: 99 not in set → start! 100→101? No. len=1
 *   num=4:   3 in set → skip (not a sequence start)
 *   num=200: 199 not in set → start! 200→201? No. len=1
 *   num=1:   0 not in set → start! 1→2→3→4→5? No. len=4 ✓
 *   num=3:   2 in set → skip
 *   num=2:   1 in set → skip
 *   Answer: 4
 */
import java.util.*;

public class LongestConsecutive {
    public static int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        
        int longest = 0;
        for (int num : set) {
            // Only start counting from sequence beginning
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
        System.out.println(longestConsecutive(new int[]{0,3,7,2,5,8,4,6,0,1})); // 9
    }
}`,
      },
    ],
  },
];

export const arraysHard: ContentSection[] = [
  {
    id: "arrays-hard",
    title: "Arrays — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: Trapping Rain Water** — Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      "**Example:**\n`Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]`\n`Output: 6`\n`Explanation: The elevation map traps 6 units of rain water (visualize bars with water filling between them).`",
      "**Approach:** Two-pointer technique. Maintain `leftMax` and `rightMax`. Water at each position = `min(leftMax, rightMax) - height[i]`. Move the pointer with the smaller max inward.",
      "**Problem 2: Median of Two Sorted Arrays** — Given two sorted arrays `nums1` and `nums2`, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
      "**Example:**\n`Input: nums1 = [1, 3], nums2 = [2]`\n`Output: 2.0`\n`Explanation: merged = [1, 2, 3], median = 2.0`",
      "**Approach:** Binary search on the shorter array. Partition both arrays such that all elements on the left are ≤ all elements on the right. The partition point gives us the median.",
      "**Problem 3: First Missing Positive** — Given an unsorted integer array `nums`, return the smallest missing positive integer. Must run in O(n) time and O(1) auxiliary space.",
      "**Example:**\n`Input: nums = [3, 4, -1, 1]`\n`Output: 2`\n`Explanation: 1 is present, 2 is missing → answer is 2.`",
      "**Approach:** Place each number in its correct index (nums[i] should be at index nums[i]-1). Then scan for the first index where nums[i] != i+1. That i+1 is the answer.",
    ],
    keyPoints: [
      "Two-pointer for Trapping Rain Water avoids the O(n) space of prefix arrays",
      "Binary search on the shorter array ensures O(log(min(m,n))) for median",
      "Cyclic sort / index-marking is the key to O(1) space for missing positive",
    ],
    code: [
      {
        title: "Trapping Rain Water — Two Pointers",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   height = [0,1,0,2,1,0,1,3,2,1,2,1]
 *   
 *   Two pointers start from both ends:
 *   l=0,r=11: leftMax=0, rightMax=1 → water at l: max(0,0-0)=0
 *   l=1,r=11: leftMax=1, rightMax=1 → water at l: max(0,1-1)=0
 *   l=2,r=11: leftMax=1, rightMax=1 → water at l: max(0,1-0)=1
 *   ... continues until pointers meet
 *   Total: 6 units
 */
public class TrappingRainWater {
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
        System.out.println(trap(new int[]{4,2,0,3,2,5}));              // 9
    }
}`,
      },
      {
        title: "Median of Two Sorted Arrays — Binary Search",
        language: "java",
        content: `/*
 * Time:  O(log(min(m, n)))
 * Space: O(1)
 *
 * Test Case:
 *   nums1 = [1, 3, 8, 9, 15]
 *   nums2 = [7, 11, 18, 19, 21, 25]
 *   merged = [1,3,7,8,9,11,15,18,19,21,25] → median = 11.0
 *
 *   Binary search on nums1 (shorter):
 *   Partition nums1 at 3 elements [1,3,8 | 9,15]
 *   Partition nums2 at 3 elements [7,11,18 | 19,21,25]
 *   Left side: {1,3,8,7,11,18} Right side: {9,15,19,21,25}
 *   Check: max(8,18)=18 <= min(9,19)=9? No → adjust
 *   ... binary search finds correct partition
 */
public class MedianSortedArrays {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Ensure nums1 is the shorter array
        if (nums1.length > nums2.length)
            return findMedianSortedArrays(nums2, nums1);
        
        int m = nums1.length, n = nums2.length;
        int lo = 0, hi = m;
        
        while (lo <= hi) {
            int i = (lo + hi) / 2;        // partition in nums1
            int j = (m + n + 1) / 2 - i;  // partition in nums2
            
            int maxLeft1  = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
            int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
            int maxLeft2  = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
            int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];
            
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                // Found correct partition
                if ((m + n) % 2 == 0) {
                    return (Math.max(maxLeft1, maxLeft2) +
                            Math.min(minRight1, minRight2)) / 2.0;
                } else {
                    return Math.max(maxLeft1, maxLeft2);
                }
            } else if (maxLeft1 > minRight2) {
                hi = i - 1;
            } else {
                lo = i + 1;
            }
        }
        throw new IllegalArgumentException("Input arrays are not sorted");
    }

    public static void main(String[] args) {
        System.out.println(findMedianSortedArrays(
            new int[]{1, 3}, new int[]{2}));          // 2.0
        System.out.println(findMedianSortedArrays(
            new int[]{1, 2}, new int[]{3, 4}));        // 2.5
    }
}`,
      },
      {
        title: "First Missing Positive — Cyclic Sort",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   nums = [3, 4, -1, 1]
 *   
 *   Step 1 — Place each number at its correct index:
 *     i=0: nums[0]=3, should be at index 2 → swap → [-1, 4, 3, 1]
 *     i=0: nums[0]=-1, skip (out of range)
 *     i=1: nums[1]=4, should be at index 3 → swap → [-1, 1, 3, 4]
 *     i=1: nums[1]=1, should be at index 0 → swap → [1, -1, 3, 4]
 *     i=1: nums[1]=-1, skip
 *     i=2: nums[2]=3, at correct index 2 ✓
 *     i=3: nums[3]=4, at correct index 3 ✓
 *   
 *   Step 2 — Find first mismatch:
 *     index 0: nums[0]=1 ✓
 *     index 1: nums[1]=-1 ✗ → answer = 2
 */
public class FirstMissingPositive {
    public static int firstMissingPositive(int[] nums) {
        int n = nums.length;
        
        // Place each number at index (nums[i] - 1)
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n
                   && nums[nums[i] - 1] != nums[i]) {
                int tmp = nums[nums[i] - 1];
                nums[nums[i] - 1] = nums[i];
                nums[i] = tmp;
            }
        }
        
        // First index where nums[i] != i+1 is the answer
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }

    public static void main(String[] args) {
        System.out.println(firstMissingPositive(new int[]{3,4,-1,1}));  // 2
        System.out.println(firstMissingPositive(new int[]{1,2,0}));      // 3
        System.out.println(firstMissingPositive(new int[]{7,8,9,11,12}));// 1
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
    id: "strings-easy",
    title: "Strings — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Valid Palindrome** — Given a string `s`, determine if it is a palindrome considering only alphanumeric characters and ignoring cases.",
      "**Example:**\n`Input: s = \"A man, a plan, a canal: Panama\"`\n`Output: true`\n`Explanation: After removing non-alphanumeric chars and lowering: \"amanaplanacanalpanama\" is a palindrome.`",
      "**Approach:** Two pointers from both ends. Skip non-alphanumeric characters. Compare lowercase versions.",
      "**Problem 2: Valid Anagram** — Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`.",
      "**Example:**\n`Input: s = \"anagram\", t = \"nagaram\"`\n`Output: true`",
      "**Approach:** Use a frequency array of size 26. Increment for `s`, decrement for `t`. If all zeros at the end, they're anagrams.",
      "**Problem 3: Reverse Words in a String** — Given a string `s`, reverse the order of words. Words are separated by spaces.",
      "**Example:**\n`Input: s = \"  hello world  \"`\n`Output: \"world hello\"`",
      "**Approach:** Split by spaces, filter empty strings, reverse the list, join with single space.",
    ],
    keyPoints: [
      "Two-pointer is the standard approach for palindrome checking",
      "Frequency array (size 26) is faster than HashMap for lowercase letters",
      "String.trim() and String.split(\"\\\\s+\") handle multiple spaces cleanly",
    ],
    code: [
      {
        title: "Valid Palindrome — Two Pointers",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   s = "A man, a plan, a canal: Panama"
 *   l=0 → 'A', r=29 → 'a' → match (case-insensitive)
 *   l=1 → ' ' → skip, l=2 → 'm'
 *   r=28 → 'm' → match
 *   ... all pairs match → true
 */
public class ValidPalindrome {
    public static boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) !=
                Character.toLowerCase(s.charAt(r)))
                return false;
            l++; r--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true
        System.out.println(isPalindrome("race a car")); // false
    }
}`,
      },
      {
        title: "Valid Anagram — Frequency Count",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1) — fixed size 26 array
 *
 * Test Case:
 *   s = "anagram", t = "nagaram"
 *   freq after s: a=3, n=1, g=1, r=1, m=1
 *   freq after t: a=0, n=0, g=0, r=0, m=0 → all zero → true
 */
public class ValidAnagram {
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
}`,
      },
      {
        title: "Reverse Words in a String",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *   s = "  hello world  "
 *   After trim+split: ["hello", "world"]
 *   After reverse: ["world", "hello"]
 *   After join: "world hello"
 */
public class ReverseWords {
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
        System.out.println(reverseWords("the sky is blue")); // "blue is sky the"
    }
}`,
      },
    ],
  },
];

export const stringsMedium: ContentSection[] = [
  {
    id: "strings-medium",
    title: "Strings — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Longest Substring Without Repeating Characters** — Given a string `s`, find the length of the longest substring without repeating characters.",
      "**Example:**\n`Input: s = \"abcabcbb\"`\n`Output: 3`\n`Explanation: The longest substring is \"abc\", with length 3.`",
      "**Approach:** Sliding window. Maintain a HashMap of char→last_index. When a repeat is found, shrink the window from the left past the previous occurrence.",
      "**Problem 2: Group Anagrams** — Given an array of strings, group the anagrams together.",
      "**Example:**\n`Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]`\n`Output: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]`",
      "**Approach:** Sort each string to get a canonical form. Use it as HashMap key. All anagrams share the same sorted form.",
      "**Problem 3: Longest Palindromic Substring** — Find the longest palindromic substring in a given string.",
      "**Example:**\n`Input: s = \"babad\"`\n`Output: \"bab\" (or \"aba\")`",
      "**Approach:** Expand Around Center. For each character (and each pair), expand outward while characters match. Track the longest found.",
    ],
    keyPoints: [
      "Sliding window + HashMap is the O(n) pattern for substring problems",
      "Sorted string as HashMap key is elegant for anagram grouping",
      "Expand-around-center handles both odd and even length palindromes",
    ],
    code: [
      {
        title: "Longest Substring Without Repeating — Sliding Window",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(min(n, charset))
 *
 * Test Case:
 *   s = "abcabcbb"
 *   Window expands: a→ab→abc (len=3)
 *   'a' repeats at i=3 → left jumps to 1 → window: bca
 *   'b' repeats at i=4 → left jumps to 2 → window: cab
 *   ... max length = 3
 */
import java.util.*;

public class LongestSubstring {
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

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
        System.out.println(lengthOfLongestSubstring("bbbbb"));    // 1
        System.out.println(lengthOfLongestSubstring("pwwkew"));   // 3
    }
}`,
      },
      {
        title: "Group Anagrams",
        language: "java",
        content: `/*
 * Time:  O(n * k log k) where k = max string length
 * Space: O(n * k)
 *
 * Test Case:
 *   strs = ["eat","tea","tan","ate","nat","bat"]
 *   Sorted keys: "aet","aet","ant","aet","ant","abt"
 *   Map: { "aet": ["eat","tea","ate"],
 *          "ant": ["tan","nat"],
 *          "abt": ["bat"] }
 */
import java.util.*;

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
        // [[bat], [nat, tan], [ate, eat, tea]]
    }
}`,
      },
      {
        title: "Longest Palindromic Substring — Expand Around Center",
        language: "java",
        content: `/*
 * Time:  O(n²)
 * Space: O(1)
 *
 * Test Case:
 *   s = "babad"
 *   Center 'b'(0): expand → "b" (len=1)
 *   Center 'a'(1): expand → "a"→"bab" (len=3) ✓
 *   Center 'b'(2): expand → "b"→"aba" (len=3)
 *   Center 'a'(3): expand → "a" (len=1)
 *   Center 'd'(4): expand → "d" (len=1)
 *   Longest = "bab" (starting at index 0, length 3)
 */
public class LongestPalindrome {
    static int start = 0, maxLen = 0;

    static void expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    }

    public static String longestPalindrome(String s) {
        start = 0; maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            expand(s, i, i);     // odd-length palindromes
            expand(s, i, i + 1); // even-length palindromes
        }
        return s.substring(start, start + maxLen);
    }

    public static void main(String[] args) {
        System.out.println(longestPalindrome("babad")); // "bab" or "aba"
        System.out.println(longestPalindrome("cbbd"));  // "bb"
    }
}`,
      },
    ],
  },
];

export const stringsHard: ContentSection[] = [
  {
    id: "strings-hard",
    title: "Strings — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: Minimum Window Substring** — Given strings `s` and `t`, return the minimum window substring of `s` that contains every character of `t` (including duplicates). If no such substring exists, return \"\".",
      "**Example:**\n`Input: s = \"ADOBECODEBANC\", t = \"ABC\"`\n`Output: \"BANC\"`\n`Explanation: \"BANC\" is the smallest window in s that contains A, B, and C.`",
      "**Approach:** Sliding window with two pointers. Expand right to include characters, shrink left when all t's characters are covered. Track the minimum window.",
      "**Problem 2: Edit Distance** — Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) required to convert `word1` to `word2`.",
      "**Example:**\n`Input: word1 = \"horse\", word2 = \"ros\"`\n`Output: 3`\n`Explanation: horse → rorse (replace 'h' with 'r') → rose (remove 'r') → ros (remove 'e')`",
      "**Approach:** 2D DP. dp[i][j] = min operations for first i chars of word1 and first j chars of word2. If chars match, dp[i][j] = dp[i-1][j-1]. Otherwise, min of insert, delete, replace + 1.",
    ],
    keyPoints: [
      "Minimum Window Substring is the hardest sliding window problem — mastering it means you can solve any sliding window",
      "Edit Distance is a classic 2D DP problem that appears in spell checkers and diff algorithms",
    ],
    code: [
      {
        title: "Minimum Window Substring — Sliding Window",
        language: "java",
        content: `/*
 * Time:  O(|s| + |t|)
 * Space: O(|s| + |t|)
 *
 * Test Case:
 *   s = "ADOBECODEBANC", t = "ABC"
 *   Need: A=1, B=1, C=1
 *   
 *   Expand right until all covered:
 *     "ADOBEC" covers A,B,C → window = [0,5], len=6
 *   Shrink left:
 *     Remove 'A' → not covered → stop
 *   Continue expanding...
 *     "DOBECODEBA" → "CODEBA" covers → "ODEBANC" → "BANC"
 *   Minimum: "BANC" (len=4)
 */
import java.util.*;

public class MinWindowSubstring {
    public static String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";
        
        Map<Character, Integer> need = new HashMap<>();
        for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
        
        int required = need.size();
        int formed = 0;
        Map<Character, Integer> window = new HashMap<>();
        
        int left = 0, minLen = Integer.MAX_VALUE, minStart = 0;
        
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.merge(c, 1, Integer::sum);
            
            if (need.containsKey(c) && window.get(c).intValue() == need.get(c).intValue())
                formed++;
            
            while (formed == required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                char lc = s.charAt(left);
                window.merge(lc, -1, Integer::sum);
                if (need.containsKey(lc) && window.get(lc) < need.get(lc))
                    formed--;
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }

    public static void main(String[] args) {
        System.out.println(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
        System.out.println(minWindow("a", "a"));                // "a"
        System.out.println(minWindow("a", "aa"));               // ""
    }
}`,
      },
      {
        title: "Edit Distance — 2D DP",
        language: "java",
        content: `/*
 * Time:  O(m * n)
 * Space: O(m * n)
 *
 * Test Case:
 *   word1 = "horse", word2 = "ros"
 *   
 *   DP Table:
 *       ""  r  o  s
 *   ""   0  1  2  3
 *   h    1  1  2  3
 *   o    2  2  1  2
 *   r    3  2  2  2
 *   s    4  3  3  2
 *   e    5  4  4  3  ← answer
 *
 *   Operations: horse→rorse→rose→ros (3 operations)
 */
public class EditDistance {
    public static int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        // Base cases
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i-1) == word2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1]; // chars match, no operation
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i-1][j-1],  // replace
                        Math.min(dp[i-1][j],   // delete
                                 dp[i][j-1])    // insert
                    );
                }
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        System.out.println(minDistance("horse", "ros"));       // 3
        System.out.println(minDistance("intention", "execution")); // 5
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// RECURSION & BACKTRACKING
// ═══════════════════════════════════════════════════════

export const recursionPracticeEasy: ContentSection[] = [
  {
    id: "recursion-easy",
    title: "Recursion — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Power of Two** — Given an integer `n`, return `true` if it is a power of two.",
      "**Example:**\n`Input: n = 16`\n`Output: true (2⁴ = 16)`",
      "**Approach:** Recursively divide by 2. Base case: n == 1 → true, n <= 0 or n is odd → false.",
      "**Problem 2: Generate All Subsets** — Given an integer array `nums` of unique elements, return all possible subsets (the power set).",
      "**Example:**\n`Input: nums = [1, 2, 3]`\n`Output: [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]`",
      "**Approach:** Backtracking. At each index, choose to include or exclude the current element. When index reaches end, add current subset to result.",
      "**Problem 3: Reverse String using Recursion** — Reverse a character array in-place using recursion.",
      "**Example:**\n`Input: s = ['h','e','l','l','o']`\n`Output: ['o','l','l','e','h']`",
      "**Approach:** Recursive two-pointer swap. Swap s[left] and s[right], then recurse on (left+1, right-1).",
    ],
    code: [
      {
        title: "Power of Two — Recursive",
        language: "java",
        content: `/*
 * Time:  O(log n)
 * Space: O(log n) recursion stack
 *
 * Test Case:
 *   n = 16: 16→8→4→2→1 → true
 *   n = 6:  6 is not even divisible by 2 path → 6%2=0, 3 → 3%2!=0 → false
 */
public class PowerOfTwo {
    public static boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;
        if (n == 1) return true;
        if (n % 2 != 0) return false;
        return isPowerOfTwo(n / 2);
    }

    public static void main(String[] args) {
        System.out.println(isPowerOfTwo(16)); // true
        System.out.println(isPowerOfTwo(6));  // false
        System.out.println(isPowerOfTwo(1));  // true
    }
}`,
      },
      {
        title: "Generate All Subsets — Backtracking",
        language: "java",
        content: `/*
 * Time:  O(n * 2^n)
 * Space: O(n) recursion depth
 *
 * Test Case:
 *   nums = [1, 2, 3]
 *   Recursion tree:
 *     [] → include 1: [1] → include 2: [1,2] → include 3: [1,2,3]
 *                                              → exclude 3: [1,2]
 *                       → exclude 2: [1] → include 3: [1,3]
 *                                          → exclude 3: [1]
 *       → exclude 1: [] → include 2: [2] → ...
 *   Output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
 */
import java.util.*;

public class Subsets {
    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    static void backtrack(int[] nums, int start,
                          List<Integer> current,
                          List<List<Integer>> result) {
        result.add(new ArrayList<>(current)); // add snapshot
        for (int i = start; i < nums.length; i++) {
            current.add(nums[i]);               // choose
            backtrack(nums, i + 1, current, result); // explore
            current.remove(current.size() - 1); // un-choose
        }
    }

    public static void main(String[] args) {
        System.out.println(subsets(new int[]{1, 2, 3}));
    }
}`,
      },
      {
        title: "Reverse String — Recursive",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n) recursion stack
 *
 * Test Case:
 *   s = ['h','e','l','l','o']
 *   swap(0,4): ['o','e','l','l','h']
 *   swap(1,3): ['o','l','l','e','h']
 *   left >= right → stop
 */
public class ReverseString {
    public static void reverseString(char[] s) {
        reverse(s, 0, s.length - 1);
    }

    static void reverse(char[] s, int left, int right) {
        if (left >= right) return;
        char tmp = s[left];
        s[left] = s[right];
        s[right] = tmp;
        reverse(s, left + 1, right - 1);
    }

    public static void main(String[] args) {
        char[] s = {'h','e','l','l','o'};
        reverseString(s);
        System.out.println(java.util.Arrays.toString(s));
        // [o, l, l, e, h]
    }
}`,
      },
    ],
  },
];

export const recursionPracticeMedium: ContentSection[] = [
  {
    id: "recursion-medium",
    title: "Recursion & Backtracking — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Permutations** — Given an array of distinct integers, return all possible permutations.",
      "**Example:**\n`Input: nums = [1, 2, 3]`\n`Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`",
      "**Approach:** Swap-based backtracking. Fix element at current index by swapping with each subsequent element, recurse, then swap back.",
      "**Problem 2: Combination Sum** — Given an array of distinct integers `candidates` and a target, return all unique combinations where the numbers sum to target. Each number may be used unlimited times.",
      "**Example:**\n`Input: candidates = [2, 3, 6, 7], target = 7`\n`Output: [[2, 2, 3], [7]]`\n`Explanation: 2+2+3=7 and 7=7`",
      "**Approach:** Backtracking with the same start index (allowing reuse). Prune when remaining < 0.",
      "**Problem 3: Word Search** — Given an m×n grid and a word, find if the word exists by following adjacent cells (horizontal/vertical). Same cell can't be used twice.",
      "**Example:**\n`Input: board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"`\n`Output: true`",
      "**Approach:** DFS from each cell. Mark visited cells (temporarily modify board), explore 4 directions, backtrack by restoring original value.",
    ],
    code: [
      {
        title: "Permutations — Swap Backtracking",
        language: "java",
        content: `/*
 * Time:  O(n * n!)
 * Space: O(n) recursion depth
 *
 * Test Case:
 *   nums = [1, 2, 3]
 *   idx=0: swap(0,0)→[1,2,3] → idx=1: swap(1,1)→[1,2,3]→idx=2: add [1,2,3]
 *                                        swap(1,2)→[1,3,2]→idx=2: add [1,3,2]
 *          swap(0,1)→[2,1,3] → idx=1: ... → add [2,1,3], [2,3,1]
 *          swap(0,2)→[3,2,1] → idx=1: ... → add [3,2,1], [3,1,2]
 */
import java.util.*;

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
            swap(nums, idx, i); // backtrack
        }
    }

    static void swap(int[] a, int i, int j) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
    }

    public static void main(String[] args) {
        System.out.println(permute(new int[]{1, 2, 3}));
    }
}`,
      },
      {
        title: "Combination Sum",
        language: "java",
        content: `/*
 * Time:  O(2^(target/min))
 * Space: O(target/min) recursion depth
 *
 * Test Case:
 *   candidates = [2, 3, 6, 7], target = 7
 *   
 *   Start with []:
 *     Pick 2: [2], remain=5
 *       Pick 2: [2,2], remain=3
 *         Pick 2: [2,2,2], remain=1
 *           Pick 2: remain=-1 → prune
 *           Pick 3: remain=-2 → prune
 *         Pick 3: [2,2,3], remain=0 → ✓ ADD [2,2,3]
 *       Pick 3: [2,3], remain=2
 *         Pick 3: remain=-1 → prune
 *       Pick 6: remain=-1 → prune
 *     Pick 3: [3], remain=4
 *       Pick 3: [3,3], remain=1 → no more valid
 *     Pick 7: [7], remain=0 → ✓ ADD [7]
 */
import java.util.*;

public class CombinationSum {
    public static List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    static void backtrack(int[] c, int remain, int start,
                          List<Integer> cur, List<List<Integer>> res) {
        if (remain == 0) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = start; i < c.length && c[i] <= remain; i++) {
            cur.add(c[i]);
            backtrack(c, remain - c[i], i, cur, res); // same index = reuse allowed
            cur.remove(cur.size() - 1);
        }
    }

    public static void main(String[] args) {
        System.out.println(combinationSum(new int[]{2,3,6,7}, 7));
        // [[2,2,3], [7]]
    }
}`,
      },
      {
        title: "Word Search — DFS Backtracking",
        language: "java",
        content: `/*
 * Time:  O(m * n * 4^L) where L = word length
 * Space: O(L) recursion depth
 *
 * Test Case:
 *   board = [["A","B","C","E"],
 *            ["S","F","C","S"],
 *            ["A","D","E","E"]]
 *   word = "ABCCED"
 *   
 *   Start at (0,0)='A' matches word[0]
 *     Go right (0,1)='B' matches word[1]
 *       Go right (0,2)='C' matches word[2]
 *         Go down (1,2)='C' matches word[3]
 *           Go down (2,2)='E' matches word[4]
 *             Go left (2,1)='D' matches word[5] → FOUND!
 */
public class WordSearch {
    public static boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++)
            for (int j = 0; j < board[0].length; j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }

    static boolean dfs(char[][] board, String word, int r, int c, int idx) {
        if (idx == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length)
            return false;
        if (board[r][c] != word.charAt(idx)) return false;
        
        char temp = board[r][c];
        board[r][c] = '#'; // mark visited
        
        boolean found = dfs(board, word, r+1, c, idx+1)
                      || dfs(board, word, r-1, c, idx+1)
                      || dfs(board, word, r, c+1, idx+1)
                      || dfs(board, word, r, c-1, idx+1);
        
        board[r][c] = temp; // un-mark (backtrack)
        return found;
    }

    public static void main(String[] args) {
        char[][] board = {
            {'A','B','C','E'},
            {'S','F','C','S'},
            {'A','D','E','E'}
        };
        System.out.println(exist(board, "ABCCED")); // true
        System.out.println(exist(board, "SEE"));     // true
        System.out.println(exist(board, "ABCB"));    // false
    }
}`,
      },
    ],
  },
];

export const recursionPracticeHard: ContentSection[] = [
  {
    id: "recursion-hard",
    title: "Recursion & Backtracking — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: N-Queens** — Place N queens on an N×N chessboard such that no two queens threaten each other. Return all distinct solutions.",
      "**Example:**\n`Input: n = 4`\n`Output: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]`\n`Explanation: There are exactly 2 solutions for n=4.`",
      "**Approach:** Place queens row by row. For each row, try every column. Check if the column, main diagonal, and anti-diagonal are safe. Use boolean arrays for O(1) conflict checking.",
      "**Problem 2: Sudoku Solver** — Fill a 9×9 Sudoku board so every row, column, and 3×3 sub-box contains digits 1-9.",
      "**Example:**\n`Input: A partially filled 9×9 grid with '.' for empty cells`\n`Output: The completed valid Sudoku grid`",
      "**Approach:** Backtracking. Find the next empty cell, try digits 1-9, validate against row/column/box constraints, recurse. If stuck, backtrack.",
    ],
    code: [
      {
        title: "N-Queens — Optimized Backtracking",
        language: "java",
        content: `/*
 * Time:  O(n!)
 * Space: O(n²) for the board
 *
 * Test Case:
 *   n = 4
 *   Row 0: try col 0 → place Q at (0,0)
 *     Row 1: col 0 ✗(col), col 1 ✗(diag), col 2 → place Q at (1,2)
 *       Row 2: all blocked → backtrack
 *     Row 1: col 3 → place Q at (1,3)
 *       Row 2: col 1 → place Q at (2,1)
 *         Row 3: all blocked → backtrack
 *   Row 0: try col 1 → place Q at (0,1)
 *     Row 1: col 3 → place Q at (1,3)
 *       Row 2: col 0 → place Q at (2,0)
 *         Row 3: col 2 → place Q at (3,2) → ✓ SOLUTION 1
 *   ... continues to find solution 2
 */
import java.util.*;

public class NQueens {
    public static List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        boolean[] cols = new boolean[n];
        boolean[] diag1 = new boolean[2 * n]; // row - col + n
        boolean[] diag2 = new boolean[2 * n]; // row + col
        solve(board, 0, n, cols, diag1, diag2, result);
        return result;
    }

    static void solve(char[][] board, int row, int n,
                      boolean[] cols, boolean[] d1, boolean[] d2,
                      List<List<String>> res) {
        if (row == n) {
            List<String> snapshot = new ArrayList<>();
            for (char[] r : board) snapshot.add(new String(r));
            res.add(snapshot);
            return;
        }
        for (int col = 0; col < n; col++) {
            int dd1 = row - col + n, dd2 = row + col;
            if (cols[col] || d1[dd1] || d2[dd2]) continue;
            
            board[row][col] = 'Q';
            cols[col] = d1[dd1] = d2[dd2] = true;
            
            solve(board, row + 1, n, cols, d1, d2, res);
            
            board[row][col] = '.';
            cols[col] = d1[dd1] = d2[dd2] = false;
        }
    }

    public static void main(String[] args) {
        List<List<String>> solutions = solveNQueens(4);
        for (List<String> sol : solutions) {
            for (String row : sol) System.out.println(row);
            System.out.println("---");
        }
        // Solution 1:     Solution 2:
        // .Q..             ..Q.
        // ...Q             Q...
        // Q...             ...Q
        // ..Q.             .Q..
    }
}`,
      },
      {
        title: "Sudoku Solver",
        language: "java",
        content: `/*
 * Time:  O(9^(empty cells)) — worst case
 * Space: O(81) recursion depth
 *
 * Test Case (simplified):
 *   board[0] = ['5','3','.','.','7','.','.','.','.']
 *   ...
 *   Find first '.', try 1-9, validate, recurse.
 *   If all 9 fail → backtrack to previous cell.
 *   When no '.' remains → solved!
 */
public class SudokuSolver {
    public static void solveSudoku(char[][] board) {
        solve(board);
    }

    static boolean solve(char[][] board) {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char d = '1'; d <= '9'; d++) {
                        if (isValid(board, r, c, d)) {
                            board[r][c] = d;
                            if (solve(board)) return true;
                            board[r][c] = '.'; // backtrack
                        }
                    }
                    return false; // no valid digit → trigger backtrack
                }
            }
        }
        return true; // all cells filled
    }

    static boolean isValid(char[][] board, int r, int c, char d) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == d) return false;       // row check
            if (board[i][c] == d) return false;       // column check
            // 3×3 box check
            int br = 3 * (r / 3) + i / 3;
            int bc = 3 * (c / 3) + i % 3;
            if (board[br][bc] == d) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        char[][] board = {
            {'5','3','.','.','7','.','.','.','.'},
            {'6','.','.','1','9','5','.','.','.'},
            {'.','9','8','.','.','.','.','6','.'},
            {'8','.','.','.','6','.','.','.','3'},
            {'4','.','.','8','.','3','.','.','1'},
            {'7','.','.','.','2','.','.','.','6'},
            {'.','6','.','.','.','.','2','8','.'},
            {'.','.','.','4','1','9','.','.','5'},
            {'.','.','.','.','8','.','.','7','9'}
        };
        solveSudoku(board);
        for (char[] row : board) System.out.println(new String(row));
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// DYNAMIC PROGRAMMING
// ═══════════════════════════════════════════════════════

export const dpPracticeEasy: ContentSection[] = [
  {
    id: "dp-easy",
    title: "DP — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Climbing Stairs** — You are climbing a staircase. It takes `n` steps to reach the top. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?",
      "**Example:**\n`Input: n = 4`\n`Output: 5`\n`Explanation: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2 → 5 ways`",
      "**Approach:** Fibonacci DP. dp[i] = dp[i-1] + dp[i-2]. Can optimize to O(1) space using two variables.",
      "**Problem 2: Maximum Subarray (Kadane's)** — Find the contiguous subarray with the largest sum.",
      "**Example:**\n`Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`\n`Output: 6`\n`Explanation: subarray [4, -1, 2, 1] has the largest sum = 6`",
      "**Approach:** Kadane's Algorithm. Maintain running sum; reset when it goes below the current element. Track maximum.",
      "**Problem 3: House Robber** — Given an array representing money in each house, find max money you can rob without robbing two adjacent houses.",
      "**Example:**\n`Input: nums = [2, 7, 9, 3, 1]`\n`Output: 12`\n`Explanation: Rob houses 0, 2, 4 → 2 + 9 + 1 = 12`",
      "**Approach:** dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Either skip current house or rob it + previous non-adjacent.",
    ],
    code: [
      {
        title: "Climbing Stairs — Space-Optimized DP",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   n = 5
 *   a=1, b=2
 *   i=3: c=1+2=3, a=2, b=3
 *   i=4: c=2+3=5, a=3, b=5
 *   i=5: c=3+5=8, a=5, b=8
 *   Answer: 8
 */
public class ClimbingStairs {
    public static int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(4)); // 5
        System.out.println(climbStairs(5)); // 8
    }
}`,
      },
      {
        title: "Kadane's Algorithm — Maximum Subarray",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 *   cur=-2 max=-2
 *   cur=max(1,-2+1)=1 max=1
 *   cur=max(-3,1-3)=-2 max=1
 *   cur=max(4,-2+4)=4 max=4
 *   cur=max(-1,4-1)=3 max=4
 *   cur=max(2,3+2)=5 max=5
 *   cur=max(1,5+1)=6 max=6 ✓
 *   cur=max(-5,6-5)=1 max=6
 *   cur=max(4,1+4)=5 max=6
 *   Answer: 6
 */
public class MaxSubarray {
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
      {
        title: "House Robber",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   nums = [2, 7, 9, 3, 1]
 *   prev2=0, prev1=0
 *   i=0: cur=max(0, 0+2)=2, prev2=0, prev1=2
 *   i=1: cur=max(2, 0+7)=7, prev2=2, prev1=7
 *   i=2: cur=max(7, 2+9)=11, prev2=7, prev1=11
 *   i=3: cur=max(11, 7+3)=11, prev2=11, prev1=11
 *   i=4: cur=max(11, 11+1)=12, prev2=11, prev1=12
 *   Answer: 12
 */
public class HouseRobber {
    public static int rob(int[] nums) {
        int prev2 = 0, prev1 = 0;
        for (int num : nums) {
            int cur = Math.max(prev1, prev2 + num);
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }

    public static void main(String[] args) {
        System.out.println(rob(new int[]{2, 7, 9, 3, 1})); // 12
        System.out.println(rob(new int[]{1, 2, 3, 1}));     // 4
    }
}`,
      },
    ],
  },
];

export const dpPracticeMedium: ContentSection[] = [
  {
    id: "dp-medium",
    title: "DP — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Coin Change** — Given coins of different denominations and a total amount, find the fewest number of coins that make up that amount. Return -1 if not possible.",
      "**Example:**\n`Input: coins = [1, 5, 11], amount = 15`\n`Output: 3`\n`Explanation: 5 + 5 + 5 = 15 (not 11+1+1+1+1=15 which uses 5 coins)`",
      "**Approach:** Bottom-up DP. dp[i] = fewest coins to make amount i. For each coin, dp[i] = min(dp[i], dp[i-coin] + 1).",
      "**Problem 2: Longest Increasing Subsequence** — Find the length of the longest strictly increasing subsequence.",
      "**Example:**\n`Input: nums = [10, 9, 2, 5, 3, 7, 101, 18]`\n`Output: 4`\n`Explanation: LIS is [2, 3, 7, 101] or [2, 5, 7, 101]`",
      "**Approach:** Patience sorting with binary search. Maintain a tails array where tails[i] = smallest tail element of all increasing subsequences of length i+1.",
      "**Problem 3: 0/1 Knapsack** — Given weights and values of n items, find the maximum value that fits in a knapsack of capacity W.",
      "**Example:**\n`Input: weights = [1, 3, 4, 5], values = [1, 4, 5, 7], W = 7`\n`Output: 9`\n`Explanation: Take items with weight 3 and 4 → value = 4 + 5 = 9`",
      "**Approach:** 1D DP array. Iterate items, then capacities in REVERSE (to prevent reusing same item).",
    ],
    code: [
      {
        title: "Coin Change — Bottom-Up DP",
        language: "java",
        content: `/*
 * Time:  O(amount * coins.length)
 * Space: O(amount)
 *
 * Test Case:
 *   coins = [1, 5, 11], amount = 15
 *   dp[0]=0
 *   dp[1]=1 (1)
 *   dp[5]=1 (5)
 *   dp[10]=2 (5+5)
 *   dp[11]=1 (11)
 *   dp[15]=3 (5+5+5) ← better than 11+1+1+1+1=5
 */
import java.util.Arrays;

public class CoinChange {
    public static int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // "infinity"
        dp[0] = 0;
        
        for (int coin : coins)
            for (int i = coin; i <= amount; i++)
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        
        return dp[amount] > amount ? -1 : dp[amount];
    }

    public static void main(String[] args) {
        System.out.println(coinChange(new int[]{1,5,11}, 15)); // 3
        System.out.println(coinChange(new int[]{2}, 3));        // -1
        System.out.println(coinChange(new int[]{1,2,5}, 11));   // 3
    }
}`,
      },
      {
        title: "Longest Increasing Subsequence — Binary Search",
        language: "java",
        content: `/*
 * Time:  O(n log n)
 * Space: O(n)
 *
 * Test Case:
 *   nums = [10, 9, 2, 5, 3, 7, 101, 18]
 *   tails evolution:
 *     10:  [10]
 *     9:   [9]         (replace 10)
 *     2:   [2]         (replace 9)
 *     5:   [2, 5]      (extend)
 *     3:   [2, 3]      (replace 5)
 *     7:   [2, 3, 7]   (extend)
 *     101: [2, 3, 7, 101] (extend)
 *     18:  [2, 3, 7, 18]  (replace 101)
 *   Length = 4
 */
import java.util.*;

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
        System.out.println(lengthOfLIS(new int[]{0,1,0,3,2,3}));         // 4
    }
}`,
      },
      {
        title: "0/1 Knapsack — Space Optimized",
        language: "java",
        content: `/*
 * Time:  O(n * W)
 * Space: O(W)
 *
 * Test Case:
 *   weights = [1, 3, 4, 5], values = [1, 4, 5, 7], W = 7
 *
 *   Item 0 (w=1,v=1): dp[1..7] updated
 *   Item 1 (w=3,v=4): dp[3]=4, dp[4]=max(1,4+1)=5
 *   Item 2 (w=4,v=5): dp[4]=max(5,5)=5, dp[7]=max(5,5+4)=9
 *   Item 3 (w=5,v=7): dp[5]=7, dp[6]=max(5,7+1)=8, dp[7]=max(9,7+1)=9
 *   Answer: dp[7] = 9
 */
public class Knapsack {
    public static int knapsack(int[] wt, int[] val, int W) {
        int[] dp = new int[W + 1];
        for (int i = 0; i < wt.length; i++) {
            // Iterate REVERSE to prevent reusing same item
            for (int w = W; w >= wt[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
        return dp[W];
    }

    public static void main(String[] args) {
        int[] wt = {1, 3, 4, 5};
        int[] val = {1, 4, 5, 7};
        System.out.println(knapsack(wt, val, 7)); // 9
    }
}`,
      },
    ],
  },
];

export const dpPracticeHard: ContentSection[] = [
  {
    id: "dp-hard",
    title: "DP — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: Longest Common Subsequence** — Given two strings, find the length of their longest common subsequence.",
      "**Example:**\n`Input: text1 = \"abcde\", text2 = \"ace\"`\n`Output: 3`\n`Explanation: LCS is \"ace\", length = 3`",
      "**Approach:** 2D DP. If chars match, dp[i][j] = dp[i-1][j-1] + 1, else max(dp[i-1][j], dp[i][j-1]).",
      "**Problem 2: Matrix Chain Multiplication** — Find the most efficient way to multiply a chain of matrices.",
      "**Example:**\n`Input: dimensions = [10, 30, 5, 60]`\n`(3 matrices: 10×30, 30×5, 5×60)`\n`Output: 4500`\n`Explanation: (A₁ × A₂) × A₃ = 10×30×5 + 10×5×60 = 1500+3000 = 4500`",
      "**Approach:** Interval DP. dp[i][j] = minimum cost to multiply matrices i through j. Try all split points k between i and j.",
    ],
    code: [
      {
        title: "Longest Common Subsequence — 2D DP",
        language: "java",
        content: `/*
 * Time:  O(m * n)
 * Space: O(m * n)
 *
 * Test Case:
 *   text1 = "abcde", text2 = "ace"
 *
 *   DP Table:
 *       ""  a  c  e
 *   ""   0  0  0  0
 *   a    0  1  1  1
 *   b    0  1  1  1
 *   c    0  1  2  2
 *   d    0  1  2  2
 *   e    0  1  2  3  ← answer
 */
public class LCS {
    public static int longestCommonSubsequence(String t1, String t2) {
        int m = t1.length(), n = t2.length();
        int[][] dp = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (t1.charAt(i-1) == t2.charAt(j-1)) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }

    public static void main(String[] args) {
        System.out.println(longestCommonSubsequence("abcde", "ace")); // 3
        System.out.println(longestCommonSubsequence("abc", "def"));   // 0
    }
}`,
      },
      {
        title: "Matrix Chain Multiplication — Interval DP",
        language: "java",
        content: `/*
 * Time:  O(n³)
 * Space: O(n²)
 *
 * Test Case:
 *   p = [10, 30, 5, 60]  (matrices: 10×30, 30×5, 5×60)
 *
 *   dp[0][1] = 10*30*5 = 1500
 *   dp[1][2] = 30*5*60 = 9000
 *   dp[0][2] = min(
 *     dp[0][0] + dp[1][2] + 10*30*60 = 0 + 9000 + 18000 = 27000,
 *     dp[0][1] + dp[2][2] + 10*5*60  = 1500 + 0 + 3000 = 4500 ✓
 *   ) = 4500
 */
public class MatrixChain {
    public static int mcm(int[] p) {
        int n = p.length - 1; // number of matrices
        int[][] dp = new int[n][n];
        
        // len = chain length
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i <= n - len; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                // try all split points
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j]
                             + p[i] * p[k+1] * p[j+1];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        return dp[0][n - 1];
    }

    public static void main(String[] args) {
        System.out.println(mcm(new int[]{10, 30, 5, 60}));     // 4500
        System.out.println(mcm(new int[]{40, 20, 30, 10, 30})); // 26000
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// GRAPHS
// ═══════════════════════════════════════════════════════

export const graphsEasy: ContentSection[] = [
  {
    id: "graphs-easy",
    title: "Graphs — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Number of Islands** — Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and connected horizontally/vertically.",
      "**Example:**\n`Input: grid = [[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]]`\n`Output: 2`",
      "**Approach:** DFS/BFS from each unvisited '1'. Mark all connected land cells as visited. Each new DFS start = one island.",
      "**Problem 2: Flood Fill** — An image is represented by a 2D array. Given starting pixel (sr, sc) and new color, fill all connected same-colored pixels with the new color.",
      "**Example:**\n`Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2`\n`Output: [[2,2,2],[2,2,0],[2,0,1]]`",
      "**Approach:** DFS from (sr,sc). If current pixel matches original color, change to new color and recurse to 4 neighbors.",
    ],
    code: [
      {
        title: "Number of Islands — DFS",
        language: "java",
        content: `/*
 * Time:  O(m * n)
 * Space: O(m * n) worst case recursion
 *
 * Test Case:
 *   grid = [["1","1","0","0","0"],
 *           ["1","1","0","0","0"],
 *           ["0","0","1","0","0"],
 *           ["0","0","0","1","1"]]
 *   
 *   (0,0)='1' → DFS marks (0,0),(0,1),(1,0),(1,1) → island 1
 *   (2,2)='1' → DFS marks (2,2) → island 2
 *   (3,3)='1' → DFS marks (3,3),(3,4) → island 3
 *   Answer: 3
 */
public class NumIslands {
    public static int numIslands(char[][] grid) {
        int count = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }
        return count;
    }

    static void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length
            || grid[r][c] != '1') return;
        grid[r][c] = '0'; // mark visited
        dfs(grid, r+1, c);
        dfs(grid, r-1, c);
        dfs(grid, r, c+1);
        dfs(grid, r, c-1);
    }

    public static void main(String[] args) {
        char[][] grid = {
            {'1','1','0','0','0'},
            {'1','1','0','0','0'},
            {'0','0','1','0','0'},
            {'0','0','0','1','1'}
        };
        System.out.println(numIslands(grid)); // 3
    }
}`,
      },
      {
        title: "Flood Fill — DFS",
        language: "java",
        content: `/*
 * Time:  O(m * n)
 * Space: O(m * n) recursion
 *
 * Test Case:
 *   image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, color=2
 *   Original color at (1,1) = 1
 *   DFS: (1,1)→2, (0,1)→2, (0,0)→2, (1,0)→2, (2,0)→2, (0,2)→2
 *   Result: [[2,2,2],[2,2,0],[2,0,1]]
 */
public class FloodFill {
    public static int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int original = image[sr][sc];
        if (original != color) dfs(image, sr, sc, original, color);
        return image;
    }

    static void dfs(int[][] img, int r, int c, int orig, int newColor) {
        if (r < 0 || r >= img.length || c < 0 || c >= img[0].length
            || img[r][c] != orig) return;
        img[r][c] = newColor;
        dfs(img, r+1, c, orig, newColor);
        dfs(img, r-1, c, orig, newColor);
        dfs(img, r, c+1, orig, newColor);
        dfs(img, r, c-1, orig, newColor);
    }

    public static void main(String[] args) {
        int[][] image = {{1,1,1},{1,1,0},{1,0,1}};
        floodFill(image, 1, 1, 2);
        for (int[] row : image)
            System.out.println(java.util.Arrays.toString(row));
        // [2, 2, 2], [2, 2, 0], [2, 0, 1]
    }
}`,
      },
    ],
  },
];

export const graphsMedium: ContentSection[] = [
  {
    id: "graphs-medium",
    title: "Graphs — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Course Schedule** — There are `numCourses` to take. Some have prerequisites. Determine if you can finish all courses (detect cycle in directed graph).",
      "**Example:**\n`Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]`\n`Output: true`\n`Explanation: Take 0 → then 1,2 → then 3. No cycle.`",
      "**Approach:** Topological Sort using Kahn's BFS. Compute in-degrees, enqueue nodes with in-degree 0, process, and check if all nodes were visited.",
      "**Problem 2: Word Ladder** — Find the shortest transformation from beginWord to endWord by changing one letter at a time. Each transformed word must exist in the word list.",
      "**Example:**\n`Input: beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]`\n`Output: 5`\n`Explanation: hit → hot → dot → dog → cog (5 words)`",
      "**Approach:** BFS. Each word is a node. Edges connect words differing by one letter. BFS gives shortest path.",
    ],
    code: [
      {
        title: "Course Schedule — Kahn's Topological Sort",
        language: "java",
        content: `/*
 * Time:  O(V + E)
 * Space: O(V + E)
 *
 * Test Case:
 *   numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 *   Adj: 0→[1,2], 1→[3], 2→[3]
 *   In-degree: [0, 1, 1, 2]
 *   
 *   Queue: [0] → process 0, reduce 1→0, 2→0
 *   Queue: [1, 2] → process 1, reduce 3→1
 *   Queue: [2] → process 2, reduce 3→0
 *   Queue: [3] → process 3
 *   Count = 4 = numCourses → true (no cycle)
 */
import java.util.*;

public class CourseSchedule {
    public static boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            inDeg[p[0]]++;
        }
        
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++)
            if (inDeg[i] == 0) q.add(i);
        
        int count = 0;
        while (!q.isEmpty()) {
            int cur = q.poll();
            count++;
            for (int next : adj.get(cur))
                if (--inDeg[next] == 0) q.add(next);
        }
        return count == numCourses;
    }

    public static void main(String[] args) {
        System.out.println(canFinish(4,
            new int[][]{{1,0},{2,0},{3,1},{3,2}})); // true
        System.out.println(canFinish(2,
            new int[][]{{1,0},{0,1}}));               // false (cycle)
    }
}`,
      },
      {
        title: "Word Ladder — BFS",
        language: "java",
        content: `/*
 * Time:  O(m² * n) where m = word length, n = wordList size
 * Space: O(m * n)
 *
 * Test Case:
 *   begin = "hit", end = "cog"
 *   wordList = ["hot","dot","dog","lot","log","cog"]
 *   
 *   Level 1: "hit"
 *   Level 2: "hot" (h→h, i→o, t→t)
 *   Level 3: "dot", "lot"
 *   Level 4: "dog", "log"
 *   Level 5: "cog" ← found! Answer = 5
 */
import java.util.*;

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

    public static void main(String[] args) {
        System.out.println(ladderLength("hit", "cog",
            Arrays.asList("hot","dot","dog","lot","log","cog"))); // 5
    }
}`,
      },
    ],
  },
];

export const graphsHard: ContentSection[] = [
  {
    id: "graphs-hard",
    title: "Graphs — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: Dijkstra's Shortest Path** — Given a weighted directed graph, find the shortest path from a source to all other vertices.",
      "**Example:**\n`Input: n=5, edges=[[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]], source=0`\n`Output: [0, 3, 1, 4, 7]`\n`Explanation: Shortest distances from vertex 0`",
      "**Approach:** Min-heap (PriorityQueue). Greedily pick the closest unvisited vertex, relax all its edges. O((V+E)log V) with binary heap.",
      "**Problem 2: Strongly Connected Components** — Find all SCCs in a directed graph using Kosaraju's algorithm.",
      "**Example:**\n`Input: n=5, edges=[[0,1],[1,2],[2,0],[1,3],[3,4]]`\n`Output: SCCs = [[0,1,2], [3], [4]]`",
      "**Approach:** Two-pass DFS. First pass: finish-order on original graph. Second pass: DFS on reversed graph in reverse finish order.",
    ],
    code: [
      {
        title: "Dijkstra's Algorithm — Min Heap",
        language: "java",
        content: `/*
 * Time:  O((V + E) log V)
 * Space: O(V + E)
 *
 * Test Case:
 *   Edges: 0→1(4), 0→2(1), 2→1(2), 1→3(1), 2→3(5), 3→4(3)
 *   Source: 0
 *
 *   Heap: [(0,0)]
 *   Pop (0,0): relax 0→1(4), 0→2(1) → dist=[0,4,1,∞,∞]
 *   Heap: [(1,2),(4,1)]
 *   Pop (1,2): relax 2→1(1+2=3<4!), 2→3(1+5=6) → dist=[0,3,1,6,∞]
 *   Pop (3,1): relax 1→3(3+1=4<6!) → dist=[0,3,1,4,∞]
 *   Pop (4,3): relax 3→4(4+3=7) → dist=[0,3,1,4,7]
 */
import java.util.*;

public class Dijkstra {
    public static int[] shortestPath(int n, int[][] edges, int src) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) adj.get(e[0]).add(new int[]{e[1], e[2]});
        
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        // Min-heap: [distance, node]
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, src});
        
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int d = cur[0], u = cur[1];
            if (d > dist[u]) continue; // outdated entry
            
            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) {
        int[][] edges = {{0,1,4},{0,2,1},{2,1,2},{1,3,1},{2,3,5},{3,4,3}};
        int[] dist = shortestPath(5, edges, 0);
        System.out.println(Arrays.toString(dist)); // [0, 3, 1, 4, 7]
    }
}`,
      },
      {
        title: "Kosaraju's SCC Algorithm",
        language: "java",
        content: `/*
 * Time:  O(V + E)
 * Space: O(V + E)
 *
 * Test Case:
 *   n=5, edges: 0→1, 1→2, 2→0, 1→3, 3→4
 *   
 *   Pass 1 (finish order on original): [4, 3, 2, 1, 0]
 *   Reverse graph: 1→0, 2→1, 0→2, 3→1, 4→3
 *   Pass 2 (DFS in reverse finish order on reversed graph):
 *     Start 0: visits 0→2→1 → SCC = {0, 1, 2}
 *     Start 3: visits 3 → SCC = {3}
 *     Start 4: visits 4 → SCC = {4}
 */
import java.util.*;

public class KosarajuSCC {
    public static List<List<Integer>> findSCCs(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>(), radj = new ArrayList<>();
        for (int i = 0; i < n; i++) { adj.add(new ArrayList<>()); radj.add(new ArrayList<>()); }
        for (int[] e : edges) { adj.get(e[0]).add(e[1]); radj.get(e[1]).add(e[0]); }
        
        // Pass 1: finish order
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++)
            if (!visited[i]) dfs1(i, adj, visited, stack);
        
        // Pass 2: DFS on reversed graph
        Arrays.fill(visited, false);
        List<List<Integer>> sccs = new ArrayList<>();
        while (!stack.isEmpty()) {
            int node = stack.pop();
            if (!visited[node]) {
                List<Integer> scc = new ArrayList<>();
                dfs2(node, radj, visited, scc);
                sccs.add(scc);
            }
        }
        return sccs;
    }

    static void dfs1(int u, List<List<Integer>> adj, boolean[] vis, Deque<Integer> stack) {
        vis[u] = true;
        for (int v : adj.get(u)) if (!vis[v]) dfs1(v, adj, vis, stack);
        stack.push(u);
    }

    static void dfs2(int u, List<List<Integer>> radj, boolean[] vis, List<Integer> scc) {
        vis[u] = true;
        scc.add(u);
        for (int v : radj.get(u)) if (!vis[v]) dfs2(v, radj, vis, scc);
    }

    public static void main(String[] args) {
        int[][] edges = {{0,1},{1,2},{2,0},{1,3},{3,4}};
        System.out.println(findSCCs(5, edges));
        // [[0, 2, 1], [3], [4]]
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// TREES
// ═══════════════════════════════════════════════════════

export const treesEasy: ContentSection[] = [
  {
    id: "trees-easy",
    title: "Trees — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Maximum Depth of Binary Tree** — Find the maximum depth (height) of a binary tree.",
      "**Example:**\n`Input: root = [3,9,20,null,null,15,7]`\n`Output: 3`",
      "**Approach:** Recursive: max(left depth, right depth) + 1. Base case: null node = depth 0.",
      "**Problem 2: Invert Binary Tree** — Mirror a binary tree (swap left and right children at every node).",
      "**Example:**\n`Input: [4,2,7,1,3,6,9] → Output: [4,7,2,9,6,3,1]`",
      "**Approach:** Recursively swap left and right children of each node.",
      "**Problem 3: Same Tree** — Check if two binary trees are identical.",
      "**Example:**\n`Input: p = [1,2,3], q = [1,2,3] → Output: true`",
      "**Approach:** Recursively compare: both null → true, one null → false, values differ → false, else recurse on left and right.",
    ],
    code: [
      {
        title: "Maximum Depth — Recursive",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(h) recursion stack
 *
 * Test Case:
 *       3
 *      / \\
 *     9  20
 *       /  \\
 *      15   7
 *   
 *   maxDepth(3) = 1 + max(maxDepth(9), maxDepth(20))
 *   maxDepth(9) = 1 + max(0, 0) = 1
 *   maxDepth(20) = 1 + max(maxDepth(15), maxDepth(7))
 *                = 1 + max(1, 1) = 2
 *   maxDepth(3) = 1 + max(1, 2) = 3
 */
public class MaxDepth {
    public static int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
      },
      {
        title: "Invert Binary Tree",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(h)
 *
 * Test Case:
 *     4            4
 *    / \\   →     / \\
 *   2   7       7   2
 *  /\\ /\\     /\\ /\\
 * 1 3 6 9   9 6 3 1
 */
public class InvertTree {
    public static TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode tmp = root.left;
        root.left = invertTree(root.right);
        root.right = invertTree(tmp);
        return root;
    }
}`,
      },
      {
        title: "Same Tree — Recursive Comparison",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(h)
 *
 * Test Case:
 *   p = [1,2,3], q = [1,2,3]
 *   isSameTree(1,1): vals match
 *     isSameTree(2,2): vals match
 *       isSameTree(null,null): true
 *       isSameTree(null,null): true → true
 *     isSameTree(3,3): vals match → true
 *   Result: true
 */
public class SameTree {
    public static boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        return p.val == q.val
            && isSameTree(p.left, q.left)
            && isSameTree(p.right, q.right);
    }
}`,
      },
    ],
  },
];

export const treesMedium: ContentSection[] = [
  {
    id: "trees-medium",
    title: "Trees — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Validate BST** — Determine if a binary tree is a valid Binary Search Tree.",
      "**Example:**\n`Input: [5,1,4,null,null,3,6]`\n`Output: false (4 is in right subtree of 5, but 3 < 5)`",
      "**Approach:** Pass a valid range (min, max) to each node. Left child must be < current val, right must be >.",
      "**Problem 2: Lowest Common Ancestor** — Find the LCA of two nodes in a binary tree.",
      "**Example:**\n`Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1`\n`Output: 3`",
      "**Approach:** If current node is p or q, return it. Recurse left and right. If both return non-null, current is LCA.",
      "**Problem 3: Level Order Traversal** — Return the level order traversal of a binary tree (BFS, grouped by level).",
      "**Example:**\n`Input: [3,9,20,null,null,15,7]`\n`Output: [[3],[9,20],[15,7]]`",
      "**Approach:** BFS with a queue. Process one level at a time by recording queue size before processing.",
    ],
    code: [
      {
        title: "Validate BST — Range Checking",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(h)
 *
 * Test Case:
 *       5
 *      / \\
 *     1   4
 *        / \\
 *       3   6
 *   
 *   validate(5, -∞, +∞) → valid
 *   validate(1, -∞, 5) → valid
 *   validate(4, 5, +∞) → 4 < 5 → INVALID!
 *   Result: false
 */
public class ValidateBST {
    public static boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    static boolean validate(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return validate(node.left, min, node.val)
            && validate(node.right, node.val, max);
    }
}`,
      },
      {
        title: "Lowest Common Ancestor",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(h)
 *
 * Test Case:
 *         3
 *        / \\
 *       5   1
 *      /\\ /\\
 *     6 2 0 8
 *      /\\
 *     7  4
 *   p=5, q=1
 *   
 *   lca(3): left=lca(5)=5(found p), right=lca(1)=1(found q)
 *           both non-null → 3 is LCA!
 */
public class LCA {
    public static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
      },
      {
        title: "Level Order Traversal — BFS",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *       3
 *      / \\
 *     9  20
 *       /  \\
 *      15   7
 *   
 *   Level 0: [3], queue = [9, 20]
 *   Level 1: [9, 20], queue = [15, 7]
 *   Level 2: [15, 7], queue = []
 *   Result: [[3], [9, 20], [15, 7]]
 */
import java.util.*;

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
];

export const treesHard: ContentSection[] = [
  {
    id: "trees-hard",
    title: "Trees — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: Serialize and Deserialize Binary Tree** — Design an algorithm to serialize a binary tree to a string and deserialize it back to the original structure.",
      "**Example:**\n`Input: [1,2,3,null,null,4,5]`\n`Serialized: \"1,2,null,null,3,4,null,null,5,null,null\"`",
      "**Approach:** Preorder traversal with null markers. For deserialization, use a queue of tokens and recursively build the tree.",
      "**Problem 2: Binary Tree Maximum Path Sum** — Find the maximum path sum in a binary tree. A path can start and end at any node.",
      "**Example:**\n`Input: [-10,9,20,null,null,15,7]`\n`Output: 42`\n`Explanation: Path 15 → 20 → 7 has sum 42`",
      "**Approach:** Post-order DFS. At each node, compute max gain from left and right subtrees. Update global max with node.val + leftGain + rightGain. Return node.val + max(leftGain, rightGain) upward.",
    ],
    code: [
      {
        title: "Serialize & Deserialize — Preorder",
        language: "java",
        content: `/*
 * Time:  O(n) for both operations
 * Space: O(n)
 *
 * Test Case:
 *       1
 *      / \\
 *     2   3
 *        / \\
 *       4   5
 *   
 *   Serialize: "1,2,null,null,3,4,null,null,5,null,null"
 *   Deserialize: read "1" → node(1)
 *     left: read "2" → node(2), left=null, right=null
 *     right: read "3" → node(3)
 *       left: read "4" → node(4), left=null, right=null
 *       right: read "5" → node(5), left=null, right=null
 */
import java.util.*;

public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        buildString(root, sb);
        return sb.toString();
    }

    void buildString(TreeNode node, StringBuilder sb) {
        if (node == null) { sb.append("null,"); return; }
        sb.append(node.val).append(",");
        buildString(node.left, sb);
        buildString(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        Queue<String> q = new LinkedList<>(Arrays.asList(data.split(",")));
        return buildTree(q);
    }

    TreeNode buildTree(Queue<String> q) {
        String val = q.poll();
        if ("null".equals(val)) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = buildTree(q);
        node.right = buildTree(q);
        return node;
    }
}`,
      },
      {
        title: "Binary Tree Maximum Path Sum",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(h)
 *
 * Test Case:
 *      -10
 *      / \\
 *     9  20
 *       / \\
 *      15   7
 *   
 *   dfs(15) → gain=15, maxSum=15
 *   dfs(7) → gain=7, maxSum=15
 *   dfs(20) → path through 20: 15+20+7=42, maxSum=42
 *             return 20+max(15,7)=35 upward
 *   dfs(9) → gain=9, maxSum=42
 *   dfs(-10) → path through -10: 9+(-10)+35=34
 *              maxSum stays 42
 *   Answer: 42
 */
public class MaxPathSum {
    static int maxSum;

    public static int maxPathSum(TreeNode root) {
        maxSum = Integer.MIN_VALUE;
        dfs(root);
        return maxSum;
    }

    static int dfs(TreeNode node) {
        if (node == null) return 0;
        int leftGain = Math.max(0, dfs(node.left));   // ignore negative
        int rightGain = Math.max(0, dfs(node.right));
        
        // Path through this node
        maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
        
        // Return max gain to parent (can only take one branch)
        return node.val + Math.max(leftGain, rightGain);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(-10);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);
        System.out.println(maxPathSum(root)); // 42
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// GREEDY & SORTING
// ═══════════════════════════════════════════════════════

export const greedyEasy: ContentSection[] = [
  {
    id: "greedy-easy",
    title: "Greedy — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Best Time to Buy and Sell Stock** — Given daily prices, find the maximum profit from one buy and one sell (buy before sell).",
      "**Example:**\n`Input: prices = [7, 1, 5, 3, 6, 4]`\n`Output: 5`\n`Explanation: Buy at 1, sell at 6 → profit = 5`",
      "**Approach:** Track minimum price seen so far. At each day, compute profit = price - minPrice, update maxProfit.",
      "**Problem 2: Sort Colors (Dutch National Flag)** — Sort an array of 0s, 1s, and 2s in-place in one pass.",
      "**Example:**\n`Input: nums = [2, 0, 2, 1, 1, 0]`\n`Output: [0, 0, 1, 1, 2, 2]`",
      "**Approach:** Three pointers: lo, mid, hi. Swap 0s to front (lo), 2s to back (hi), 1s stay in middle.",
    ],
    code: [
      {
        title: "Best Time to Buy & Sell Stock",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   prices = [7, 1, 5, 3, 6, 4]
 *   min=7, profit=0
 *   min=1, profit=0
 *   min=1, profit=max(0,5-1)=4
 *   min=1, profit=max(4,3-1)=4
 *   min=1, profit=max(4,6-1)=5 ✓
 *   min=1, profit=max(5,4-1)=5
 *   Answer: 5
 */
public class BuySellStock {
    public static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, maxProfit = 0;
        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }

    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1}));    // 0
    }
}`,
      },
      {
        title: "Sort Colors — Dutch National Flag",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   nums = [2, 0, 2, 1, 1, 0]
 *   lo=0, mid=0, hi=5
 *   
 *   mid=0: nums[0]=2 → swap(0,5) → [0,0,2,1,1,2] hi=4
 *   mid=0: nums[0]=0 → swap(0,0) → [0,0,2,1,1,2] lo=1, mid=1
 *   mid=1: nums[1]=0 → swap(1,1) → lo=2, mid=2
 *   mid=2: nums[2]=2 → swap(2,4) → [0,0,1,1,2,2] hi=3
 *   mid=2: nums[2]=1 → mid=3
 *   mid=3: nums[3]=1 → mid=4
 *   mid > hi → done!
 *   Result: [0, 0, 1, 1, 2, 2]
 */
public class SortColors {
    public static void sortColors(int[] nums) {
        int lo = 0, mid = 0, hi = nums.length - 1;
        while (mid <= hi) {
            if (nums[mid] == 0) {
                swap(nums, lo++, mid++);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, hi--);
            }
        }
    }

    static void swap(int[] a, int i, int j) {
        int t = a[i]; a[i] = a[j]; a[j] = t;
    }

    public static void main(String[] args) {
        int[] nums = {2, 0, 2, 1, 1, 0};
        sortColors(nums);
        System.out.println(java.util.Arrays.toString(nums));
        // [0, 0, 1, 1, 2, 2]
    }
}`,
      },
    ],
  },
];

export const greedyMedium: ContentSection[] = [
  {
    id: "greedy-medium",
    title: "Greedy — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Jump Game** — Given an array where each element represents max jump length from that position, determine if you can reach the last index.",
      "**Example:**\n`Input: nums = [2, 3, 1, 1, 4]`\n`Output: true`\n`Explanation: Jump 1→2→4 (index 0→1→4)`",
      "**Approach:** Greedy. Track farthest reachable index. If current index > farthest, can't proceed.",
      "**Problem 2: Meeting Rooms II** — Given meeting time intervals, find the minimum number of conference rooms required.",
      "**Example:**\n`Input: intervals = [[0,30],[5,10],[15,20]]`\n`Output: 2`\n`Explanation: [0,30] and [5,10] overlap → need 2 rooms`",
      "**Approach:** Sort start times and end times separately. Two-pointer: if next start < next end → need new room, else reuse.",
      "**Problem 3: Task Scheduler** — Given tasks with a cooldown period n, find minimum time to execute all tasks.",
      "**Example:**\n`Input: tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2`\n`Output: 8`\n`Explanation: A→B→idle→A→B→idle→A→B = 8 units`",
      "**Approach:** The most frequent task determines the frame. Idle slots = (maxFreq - 1) * n. Fill gaps with other tasks.",
    ],
    code: [
      {
        title: "Jump Game — Greedy",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   nums = [2, 3, 1, 1, 4]
 *   i=0: farthest = max(0, 0+2) = 2
 *   i=1: farthest = max(2, 1+3) = 4 ≥ 4 → can reach!
 *   Answer: true
 *
 *   nums = [3, 2, 1, 0, 4]
 *   i=0: farthest=3, i=1: farthest=3, i=2: farthest=3
 *   i=3: farthest=3, i=4: 4 > 3 → unreachable!
 *   Answer: false
 */
public class JumpGame {
    public static boolean canJump(int[] nums) {
        int farthest = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > farthest) return false;
            farthest = Math.max(farthest, i + nums[i]);
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(canJump(new int[]{2,3,1,1,4})); // true
        System.out.println(canJump(new int[]{3,2,1,0,4})); // false
    }
}`,
      },
      {
        title: "Meeting Rooms II — Two Pointer",
        language: "java",
        content: `/*
 * Time:  O(n log n)
 * Space: O(n)
 *
 * Test Case:
 *   intervals = [[0,30],[5,10],[15,20]]
 *   starts = [0, 5, 15], ends = [10, 20, 30]
 *   
 *   s=0: 0 < 10 → rooms=1
 *   s=5: 5 < 10 → rooms=2
 *   s=15: 15 ≥ 10 → reuse (endPtr=1)
 *   Answer: 2
 */
import java.util.*;

public class MeetingRooms {
    public static int minMeetingRooms(int[][] intervals) {
        int n = intervals.length;
        int[] starts = new int[n], ends = new int[n];
        for (int i = 0; i < n; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }
        Arrays.sort(starts);
        Arrays.sort(ends);
        
        int rooms = 0, endPtr = 0;
        for (int start : starts) {
            if (start < ends[endPtr]) rooms++;
            else endPtr++;
        }
        return rooms;
    }

    public static void main(String[] args) {
        System.out.println(minMeetingRooms(
            new int[][]{{0,30},{5,10},{15,20}})); // 2
        System.out.println(minMeetingRooms(
            new int[][]{{7,10},{2,4}}));            // 1
    }
}`,
      },
      {
        title: "Task Scheduler",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(1)
 *
 * Test Case:
 *   tasks = ['A','A','A','B','B','B'], n = 2
 *   Frequencies: A=3, B=3
 *   maxFreq = 3, maxCount = 2 (both A and B have freq 3)
 *   
 *   Frame: (3-1) * (2+1) + 2 = 2*3 + 2 = 8
 *   Schedule: A B _ A B _ A B
 *   Answer: max(6, 8) = 8
 */
public class TaskScheduler {
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
        System.out.println(leastInterval(
            new char[]{'A','A','A','B','B','B'}, 2)); // 8
        System.out.println(leastInterval(
            new char[]{'A','A','A','B','B','B'}, 0)); // 6
    }
}`,
      },
    ],
  },
];

export const greedyHard: ContentSection[] = [
  {
    id: "greedy-hard",
    title: "Greedy — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: Candy** — There are `n` children standing in a line. Each child has a rating. Give candies such that: each child gets at least 1, children with higher rating than neighbors get more candies. Minimize total candies.",
      "**Example:**\n`Input: ratings = [1, 0, 2]`\n`Output: 5`\n`Explanation: Candies = [2, 1, 2] → total = 5`",
      "**Approach:** Two passes. Left-to-right: if rating[i] > rating[i-1], candy[i] = candy[i-1] + 1. Right-to-left: if rating[i] > rating[i+1], candy[i] = max(candy[i], candy[i+1] + 1).",
      "**Problem 2: IPO (Initial Public Offering)** — Given k projects you can complete, each with a capital requirement and profit. Starting with initial capital w, maximize your total capital.",
      "**Example:**\n`Input: k=2, w=0, profits=[1,2,3], capital=[0,1,1]`\n`Output: 4`\n`Explanation: Do project 0 (cost=0,profit=1)→w=1, then project 2 (cost=1,profit=3)→w=4`",
      "**Approach:** Greedy with two heaps. Min-heap for capital (unlock projects as capital grows), max-heap for profits (always pick most profitable available project).",
    ],
    code: [
      {
        title: "Candy — Two-Pass Greedy",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *   ratings = [1, 2, 87, 87, 87, 2, 1]
 *   Left pass:  [1, 2, 3, 1, 1, 1, 1]
 *   Right pass: [1, 2, 3, 1, 3, 2, 1]
 *   Total: 1+2+3+1+3+2+1 = 13
 */
public class Candy {
    public static int candy(int[] ratings) {
        int n = ratings.length;
        int[] candies = new int[n];
        java.util.Arrays.fill(candies, 1);
        
        // Left to right
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i-1])
                candies[i] = candies[i-1] + 1;
        }
        
        // Right to left
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i+1])
                candies[i] = Math.max(candies[i], candies[i+1] + 1);
        }
        
        int total = 0;
        for (int c : candies) total += c;
        return total;
    }

    public static void main(String[] args) {
        System.out.println(candy(new int[]{1, 0, 2}));  // 5
        System.out.println(candy(new int[]{1, 2, 2}));  // 4
    }
}`,
      },
      {
        title: "IPO — Two Heaps Greedy",
        language: "java",
        content: `/*
 * Time:  O(n log n)
 * Space: O(n)
 *
 * Test Case:
 *   k=2, w=0, profits=[1,2,3], capital=[0,1,1]
 *   
 *   Min-heap by capital: [(0,1), (1,2), (1,3)]
 *   Unlock affordable (cap≤0): (0,1)
 *   Max-heap profits: [1] → pick profit=1, w=0+1=1
 *   Unlock affordable (cap≤1): (1,2), (1,3)
 *   Max-heap profits: [3, 2] → pick profit=3, w=1+3=4
 *   Answer: 4
 */
import java.util.*;

public class IPO {
    public static int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
        int n = profits.length;
        // Min-heap by capital requirement
        PriorityQueue<int[]> minCap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        for (int i = 0; i < n; i++) minCap.offer(new int[]{capital[i], profits[i]});
        
        // Max-heap by profit
        PriorityQueue<Integer> maxProfit = new PriorityQueue<>(Collections.reverseOrder());
        
        for (int i = 0; i < k; i++) {
            // Unlock all affordable projects
            while (!minCap.isEmpty() && minCap.peek()[0] <= w)
                maxProfit.offer(minCap.poll()[1]);
            
            if (maxProfit.isEmpty()) break;
            w += maxProfit.poll(); // take most profitable
        }
        return w;
    }

    public static void main(String[] args) {
        System.out.println(findMaximizedCapital(2, 0,
            new int[]{1,2,3}, new int[]{0,1,1})); // 4
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// STACK & QUEUE
// ═══════════════════════════════════════════════════════

export const stackQueueEasy: ContentSection[] = [
  {
    id: "stackq-easy",
    title: "Stack & Queue — Easy Problems",
    difficulty: "Easy",
    theory: [
      "**Problem 1: Valid Parentheses** — Given a string containing just `(){}[]`, determine if the input string is valid (every open bracket has a matching close bracket in correct order).",
      "**Example:**\n`Input: s = \"({[]})\"`\n`Output: true`\n`Input: s = \"([)]\"`\n`Output: false`",
      "**Approach:** Push opening brackets onto a stack. For closing brackets, check if top of stack matches. At the end, stack must be empty.",
      "**Problem 2: Implement Queue using Stacks** — Implement a FIFO queue using only two stacks.",
      "**Example:**\n`push(1), push(2), peek() → 1, pop() → 1, empty() → false`",
      "**Approach:** Two stacks: input stack and output stack. On pop/peek, if output is empty, transfer all from input to output (reverses order → FIFO).",
    ],
    code: [
      {
        title: "Valid Parentheses — Stack",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *   s = "({[]})"
 *   Stack: push '('  → [(]
 *          push '{'  → [(, {]
 *          push '['  → [(, {, []
 *          ']' matches '[' → pop → [(, {]
 *          '}' matches '{' → pop → [(]
 *          ')' matches '(' → pop → []
 *   Stack empty → true
 */
import java.util.*;

public class ValidParentheses {
    public static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c)
                return false;
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isValid("({[]})")); // true
        System.out.println(isValid("([)]"));   // false
        System.out.println(isValid("{[]}"));   // true
    }
}`,
      },
      {
        title: "Queue using Two Stacks",
        language: "java",
        content: `/*
 * Amortized Time: O(1) per operation
 * Space: O(n)
 *
 * Test Case:
 *   push(1): input=[1]
 *   push(2): input=[1,2]
 *   peek(): output empty → transfer → output=[2,1] → return 1
 *   pop(): output=[2,1] → pop → 1, output=[2]
 *   peek(): output=[2] → return 2
 */
import java.util.*;

public class MyQueue {
    Deque<Integer> input = new ArrayDeque<>();
    Deque<Integer> output = new ArrayDeque<>();

    public void push(int x) { input.push(x); }

    public int pop() {
        if (output.isEmpty()) transfer();
        return output.pop();
    }

    public int peek() {
        if (output.isEmpty()) transfer();
        return output.peek();
    }

    public boolean empty() { return input.isEmpty() && output.isEmpty(); }

    private void transfer() {
        while (!input.isEmpty()) output.push(input.pop());
    }

    public static void main(String[] args) {
        MyQueue q = new MyQueue();
        q.push(1); q.push(2);
        System.out.println(q.peek()); // 1
        System.out.println(q.pop());  // 1
        System.out.println(q.empty()); // false
    }
}`,
      },
    ],
  },
];

export const stackQueueMedium: ContentSection[] = [
  {
    id: "stackq-medium",
    title: "Stack & Queue — Medium Problems",
    difficulty: "Medium",
    theory: [
      "**Problem 1: Daily Temperatures** — Given daily temperatures, return an array where each element tells how many days you'd have to wait until a warmer temperature. If no warmer day, put 0.",
      "**Example:**\n`Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]`\n`Output: [1, 1, 4, 2, 1, 1, 0, 0]`",
      "**Approach:** Monotonic decreasing stack. Store indices. When current temp > stack top's temp, pop and compute difference.",
      "**Problem 2: Min Stack** — Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.",
      "**Example:**\n`push(-2), push(0), push(-3), getMin()→-3, pop(), top()→0, getMin()→-2`",
      "**Approach:** Two stacks: one for values, one for minimums. On push, push min of (new value, current min) to min stack.",
    ],
    code: [
      {
        title: "Daily Temperatures — Monotonic Stack",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *   temps = [73, 74, 75, 71, 69, 72, 76, 73]
 *   
 *   i=0: stack=[0]
 *   i=1: 74>73 → pop 0, ans[0]=1-0=1. stack=[1]
 *   i=2: 75>74 → pop 1, ans[1]=2-1=1. stack=[2]
 *   i=3: 71<75 → stack=[2,3]
 *   i=4: 69<71 → stack=[2,3,4]
 *   i=5: 72>69 → pop 4, ans[4]=1. 72>71 → pop 3, ans[3]=2. stack=[2,5]
 *   i=6: 76>72 → pop 5, ans[5]=1. 76>75 → pop 2, ans[2]=4. stack=[6]
 *   i=7: 73<76 → stack=[6,7]
 *   Result: [1, 1, 4, 2, 1, 1, 0, 0]
 */
import java.util.*;

public class DailyTemperatures {
    public static int[] dailyTemperatures(int[] temps) {
        int n = temps.length;
        int[] answer = new int[n];
        Deque<Integer> stack = new ArrayDeque<>(); // indices
        
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
                int idx = stack.pop();
                answer[idx] = i - idx;
            }
            stack.push(i);
        }
        return answer;
    }

    public static void main(String[] args) {
        int[] result = dailyTemperatures(
            new int[]{73,74,75,71,69,72,76,73});
        System.out.println(Arrays.toString(result));
        // [1, 1, 4, 2, 1, 1, 0, 0]
    }
}`,
      },
      {
        title: "Min Stack — O(1) getMin",
        language: "java",
        content: `/*
 * All operations: O(1)
 * Space: O(n)
 *
 * Test Case:
 *   push(-2): stack=[-2], minStack=[-2]
 *   push(0):  stack=[-2,0], minStack=[-2,-2]
 *   push(-3): stack=[-2,0,-3], minStack=[-2,-2,-3]
 *   getMin(): -3
 *   pop():    stack=[-2,0], minStack=[-2,-2]
 *   top():    0
 *   getMin(): -2
 */
import java.util.*;

public class MinStack {
    Deque<Integer> stack = new ArrayDeque<>();
    Deque<Integer> minStack = new ArrayDeque<>();

    public void push(int val) {
        stack.push(val);
        int min = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
        minStack.push(min);
    }

    public void pop() {
        stack.pop();
        minStack.pop();
    }

    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }

    public static void main(String[] args) {
        MinStack ms = new MinStack();
        ms.push(-2); ms.push(0); ms.push(-3);
        System.out.println(ms.getMin()); // -3
        ms.pop();
        System.out.println(ms.top());    // 0
        System.out.println(ms.getMin()); // -2
    }
}`,
      },
    ],
  },
];

export const stackQueueHard: ContentSection[] = [
  {
    id: "stackq-hard",
    title: "Stack & Queue — Hard Problems",
    difficulty: "Hard",
    theory: [
      "**Problem 1: Largest Rectangle in Histogram** — Given heights of bars in a histogram, find the area of the largest rectangle.",
      "**Example:**\n`Input: heights = [2, 1, 5, 6, 2, 3]`\n`Output: 10`\n`Explanation: Rectangle of height 5, width 2 (bars at index 2 and 3) → area = 10`",
      "**Approach:** Monotonic increasing stack. When a shorter bar is encountered, pop and compute area with the popped bar as the shortest bar.",
      "**Problem 2: Sliding Window Maximum** — Given an array and a sliding window of size k, return the max element in each window position.",
      "**Example:**\n`Input: nums = [1,3,-1,-3,5,3,6,7], k = 3`\n`Output: [3,3,5,5,6,7]`",
      "**Approach:** Monotonic decreasing deque. Front of deque is always the current window's maximum. Remove from front if out of window, remove from back if smaller than current.",
    ],
    code: [
      {
        title: "Largest Rectangle in Histogram — Monotonic Stack",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(n)
 *
 * Test Case:
 *   heights = [2, 1, 5, 6, 2, 3]
 *   
 *   i=0: push 0, stack=[0]
 *   i=1: h[1]=1 < h[0]=2 → pop 0, width=1, area=2*1=2
 *        push 1, stack=[1]
 *   i=2: push 2, stack=[1,2]
 *   i=3: push 3, stack=[1,2,3]
 *   i=4: h[4]=2 < h[3]=6 → pop 3, width=4-2-1=1, area=6
 *        h[4]=2 < h[2]=5 → pop 2, width=4-1-1=2, area=10 ✓
 *        push 4, stack=[1,4]
 *   i=5: push 5, stack=[1,4,5]
 *   Clean up: pop remaining...
 *   Answer: 10
 */
import java.util.*;

public class LargestRectangle {
    public static int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int maxArea = 0, n = heights.length;
        
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
        System.out.println(largestRectangleArea(
            new int[]{2,1,5,6,2,3})); // 10
        System.out.println(largestRectangleArea(
            new int[]{2,4}));          // 4
    }
}`,
      },
      {
        title: "Sliding Window Maximum — Monotonic Deque",
        language: "java",
        content: `/*
 * Time:  O(n)
 * Space: O(k)
 *
 * Test Case:
 *   nums = [1,3,-1,-3,5,3,6,7], k = 3
 *   
 *   i=0: deque=[0]
 *   i=1: 3>1 → remove 0, deque=[1]
 *   i=2: -1<3, deque=[1,2], window [0,2] → max=nums[1]=3
 *   i=3: -3<-1, deque=[1,2,3], window [1,3] → max=nums[1]=3
 *   i=4: 5>-3,-1,3 → clear, deque=[4], window [2,4] → max=5
 *   i=5: 3<5, deque=[4,5], window [3,5] → max=5
 *   i=6: 6>3,5 → clear, deque=[6], window [4,6] → max=6
 *   i=7: 7>6 → deque=[7], window [5,7] → max=7
 *   Result: [3, 3, 5, 5, 6, 7]
 */
import java.util.*;

public class SlidingWindowMax {
    public static int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> dq = new ArrayDeque<>(); // indices
        
        for (int i = 0; i < n; i++) {
            // Remove indices outside window
            if (!dq.isEmpty() && dq.peekFirst() < i - k + 1)
                dq.pollFirst();
            
            // Remove smaller elements from back
            while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i])
                dq.pollLast();
            
            dq.offerLast(i);
            
            // Window is complete
            if (i >= k - 1)
                result[i - k + 1] = nums[dq.peekFirst()];
        }
        return result;
    }

    public static void main(String[] args) {
        int[] result = maxSlidingWindow(
            new int[]{1,3,-1,-3,5,3,6,7}, 3);
        System.out.println(Arrays.toString(result));
        // [3, 3, 5, 5, 6, 7]
    }
}`,
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════
// CONTENT MAP
// ═══════════════════════════════════════════════════════

export const practiceContentMap: Record<string, ContentSection[]> = {
  // Arrays
  "practice-arrays": [...arraysEasy, ...arraysMedium, ...arraysHard],
  // Strings
  "practice-strings": [...stringsEasy, ...stringsMedium, ...stringsHard],
  // Recursion & Backtracking
  "practice-recursion": [...recursionPracticeEasy, ...recursionPracticeMedium, ...recursionPracticeHard],
  // Dynamic Programming
  "practice-dp": [...dpPracticeEasy, ...dpPracticeMedium, ...dpPracticeHard],
  // Graphs
  "practice-graphs": [...graphsEasy, ...graphsMedium, ...graphsHard],
  // Trees
  "practice-trees": [...treesEasy, ...treesMedium, ...treesHard],
  // Greedy & Sorting
  "practice-greedy": [...greedyEasy, ...greedyMedium, ...greedyHard],
  // Stack & Queue
  "practice-stack-queue": [...stackQueueEasy, ...stackQueueMedium, ...stackQueueHard],
};
