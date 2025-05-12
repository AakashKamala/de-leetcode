#include <iostream>
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
  }