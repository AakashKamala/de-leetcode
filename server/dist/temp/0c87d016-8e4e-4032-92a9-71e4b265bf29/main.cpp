#include <iostream>
#include <string>
using namespace std;

void reverseString(string& s) {
    int left = 0;
    int right = s.length() - 1;

    while (left < right) {
        swap(s[left], s[right]);
        left++;
        right--;
    }
}

int main() {
    string s = "hello";
    reverseString(s);
    cout << s << endl;  // Output: "olleh"
    return 0;
}
