import { Question } from "../models/question";

export const questions: Question[] = [
    {
      id: 1,
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      difficulty: "Easy",
      expectedOutput: "[0, 1]",
      starterCode: `#include <iostream>
  #include <vector>
  using namespace std;
  
  vector<int> twoSum(vector<int>& nums, int target) {
      // Your solution here
  }
  
  int main() {
      vector<int> nums = {2, 7, 11, 15};
      int target = 9;
      
      vector<int> result = twoSum(nums, target);
      cout << "[" << result[0] << ", " << result[1] << "]" << endl;
      
      return 0;
  }`
    },
    {
      id: 2,
      title: "Reverse String",
      description: "Write a function that reverses a string. The input string is given as an array of characters s.",
      difficulty: "Easy",
      expectedOutput: "olleh",
      starterCode: `#include <iostream>
  #include <string>
  using namespace std;
  
  void reverseString(string& s) {
      // Your solution here
  }
  
  int main() {
      string s = "hello";
      reverseString(s);
      cout << s << endl;
      return 0;
  }`
    },
    {
      id: 3,
      title: "Fibonacci Number",
      description: "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. Write a function to calculate the nth Fibonacci number.",
      difficulty: "Medium",
      expectedOutput: "55",
      starterCode: `#include <iostream>
  using namespace std;
  
  int fib(int n) {
      // Your solution here
  }
  
  int main() {
      int n = 10;
      cout << fib(n) << endl;
      return 0;
  }`
    }
  ];