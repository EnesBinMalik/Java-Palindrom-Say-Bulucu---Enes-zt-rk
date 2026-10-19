export interface StepTrace {
  stepNumber: number;
  tempBefore: string;
  lastDigit: string;
  reverseNumberBefore: string;
  reverseNumberAfter: string;
  tempAfter: string;
  lineHighlight: number; // Line number in the standard Java code
  explanation: string;
}

export interface PalindromeCheckResult {
  input: string;
  isValidNumber: boolean;
  isPalindrome: boolean;
  digitsCount: number;
  reverseString: string;
  steps: StepTrace[];
  errorMessage?: string;
}

export interface HistoryItem {
  id: string;
  number: string;
  isPalindrome: boolean;
  digitsCount: number;
  timestamp: number;
}

export interface LychrelStep {
  stepIndex: number;
  original: string;
  reversed: string;
  sum: string;
  isResultPalindrome: boolean;
}

export interface RangeResult {
  start: number;
  end: number;
  palindromes: number[];
  totalFound: number;
  percentage: number;
}
