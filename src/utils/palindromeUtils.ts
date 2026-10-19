import { PalindromeCheckResult, StepTrace, LychrelStep, RangeResult } from '../types/palindrome';

/**
 * Validates whether string is a positive integer or zero
 */
export function cleanNumberString(val: string): string {
  return val.replace(/\D/g, '');
}

/**
 * Executes the classic Java mathematical palindrome algorithm:
 * int temp = number, reverseNumber = 0, lastDigit;
 * while (temp != 0) {
 *     lastDigit = temp % 10;
 *     reverseNumber = (reverseNumber * 10) + lastDigit;
 *     temp /= 10;
 * }
 * return number == reverseNumber;
 */
export function analyzePalindromeMathematical(inputStr: string): PalindromeCheckResult {
  const cleaned = cleanNumberString(inputStr);

  if (!cleaned) {
    return {
      input: inputStr,
      isValidNumber: false,
      isPalindrome: false,
      digitsCount: 0,
      reverseString: '',
      steps: [],
      errorMessage: 'Lütfen geçerli bir pozitif tam sayı giriniz.',
    };
  }

  // Handle single digit edge cases (0-9 are palindromes)
  const digitsCount = cleaned.length;
  const reverseString = cleaned.split('').reverse().join('');
  const isPalindrome = cleaned === reverseString;

  // Generate step-by-step trace using BigInt to support any number length safely
  const steps: StepTrace[] = [];
  let temp = BigInt(cleaned);
  let reverseNumber = 0n;
  const ten = 10n;
  let stepIndex = 1;

  if (temp === 0n) {
    steps.push({
      stepNumber: 1,
      tempBefore: '0',
      lastDigit: '0',
      reverseNumberBefore: '0',
      reverseNumberAfter: '0',
      tempAfter: '0',
      lineHighlight: 5,
      explanation: 'Sayı 0 olduğu için döngüye girilmez, 0 sayısı tek basamaklı bir palindromdur.',
    });
  } else {
    while (temp > 0n) {
      const tempBeforeStr = temp.toString();
      const lastDigit = temp % ten;
      const reverseBeforeStr = reverseNumber.toString();
      reverseNumber = reverseNumber * ten + lastDigit;
      const reverseAfterStr = reverseNumber.toString();
      temp = temp / ten;
      const tempAfterStr = temp.toString();

      steps.push({
        stepNumber: stepIndex,
        tempBefore: tempBeforeStr,
        lastDigit: lastDigit.toString(),
        reverseNumberBefore: reverseBeforeStr,
        reverseNumberAfter: reverseAfterStr,
        tempAfter: tempAfterStr,
        lineHighlight: 6,
        explanation: `${stepIndex}. Adım: Son basamak ${lastDigit} çekildi (temp % 10). reverseNumber = (${reverseBeforeStr} * 10) + ${lastDigit} = ${reverseAfterStr}. temp 10'a bölündü: ${tempAfterStr}.`,
      });

      stepIndex++;
      if (stepIndex > 50) break; // Safety cutoff for display
    }
  }

  return {
    input: cleaned,
    isValidNumber: true,
    isPalindrome,
    digitsCount,
    reverseString,
    steps,
  };
}

/**
 * Finds all palindromes in a given numerical range
 */
export function findPalindromesInRange(start: number, end: number, limit = 500): RangeResult {
  const safeStart = Math.max(0, Math.min(start, end));
  const safeEnd = Math.min(1000000, Math.max(start, end));
  const palindromes: number[] = [];

  for (let i = safeStart; i <= safeEnd; i++) {
    const s = i.toString();
    if (s === s.split('').reverse().join('')) {
      palindromes.push(i);
      if (palindromes.length >= limit) break;
    }
  }

  const totalRange = safeEnd - safeStart + 1;
  const percentage = totalRange > 0 ? (palindromes.length / totalRange) * 100 : 0;

  return {
    start: safeStart,
    end: safeEnd,
    palindromes,
    totalFound: palindromes.length,
    percentage: Number(percentage.toFixed(2)),
  };
}

/**
 * Finds closest palindromes (smaller and larger)
 */
export function findClosestPalindromes(inputStr: string): { smaller: string | null; larger: string | null } {
  const cleaned = cleanNumberString(inputStr);
  if (!cleaned) return { smaller: null, larger: null };

  const currentBig = BigInt(cleaned);

  // Search smaller
  let smaller: string | null = null;
  let sVal = currentBig - 1n;
  let count = 0;
  while (sVal >= 0n && count < 20000) {
    const str = sVal.toString();
    if (str === str.split('').reverse().join('')) {
      smaller = str;
      break;
    }
    sVal -= 1n;
    count++;
  }

  // Search larger
  let larger: string | null = null;
  let lVal = currentBig + 1n;
  count = 0;
  while (count < 20000) {
    const str = lVal.toString();
    if (str === str.split('').reverse().join('')) {
      larger = str;
      break;
    }
    lVal += 1n;
    count++;
  }

  return { smaller, larger };
}

/**
 * Generates a random palindrome of given digit length
 */
export function generateRandomPalindrome(digits: number): string {
  const d = Math.max(1, Math.min(digits, 16));
  if (d === 1) {
    return Math.floor(Math.random() * 10).toString();
  }

  const halfLength = Math.ceil(d / 2);
  let firstHalf = '';

  // First digit cannot be 0
  firstHalf += Math.floor(Math.random() * 9 + 1).toString();

  for (let i = 1; i < halfLength; i++) {
    firstHalf += Math.floor(Math.random() * 10).toString();
  }

  let fullString = firstHalf;
  if (d % 2 === 0) {
    // Even length: mirror entire firstHalf
    fullString += firstHalf.split('').reverse().join('');
  } else {
    // Odd length: mirror excluding center
    fullString += firstHalf.slice(0, -1).split('').reverse().join('');
  }

  return fullString;
}

/**
 * Lychrel Algorithm / 196 Problem:
 * Add number to its reverse until it produces a palindrome.
 */
export function computeLychrel(inputStr: string, maxSteps = 25): { steps: LychrelStep[]; reachedPalindrome: boolean } {
  const cleaned = cleanNumberString(inputStr);
  if (!cleaned) return { steps: [], reachedPalindrome: false };

  let current = BigInt(cleaned);
  const steps: LychrelStep[] = [];

  for (let i = 1; i <= maxSteps; i++) {
    const currStr = current.toString();
    const revStr = currStr.split('').reverse().join('');
    const revBig = BigInt(revStr);
    const sumBig = current + revBig;
    const sumStr = sumBig.toString();
    const isSumPal = sumStr === sumStr.split('').reverse().join('');

    steps.push({
      stepIndex: i,
      original: currStr,
      reversed: revStr,
      sum: sumStr,
      isResultPalindrome: isSumPal,
    });

    if (isSumPal) {
      return { steps, reachedPalindrome: true };
    }

    current = sumBig;
  }

  return { steps, reachedPalindrome: false };
}

/**
 * Java Code Templates
 */
export const JAVA_CODE_TEMPLATES = {
  mathematical: `/**
 * Java ile Palindrom Sayı Bulma (Matematiksel Modulo Yöntemi)
 * Hazırlayan: Enes Öztürk
 *
 * Karmaşıklık: Zaman: O(log10(N)), Bellek: O(1)
 */
public class PalindromSayi {

    public static boolean isPalindrom(int number) {
        // Negatif sayılar palindrom kabul edilmez (örn: -121 != 121-)
        if (number < 0) {
            return false;
        }

        int temp = number;
        int reverseNumber = 0;
        int lastDigit;

        while (temp != 0) {
            lastDigit = temp % 10;                     // 1. Son basamağı al
            reverseNumber = (reverseNumber * 10) + lastDigit; // 2. Ters sayıya ekle
            temp /= 10;                                // 3. Son basamağı at
        }

        // Orijinal sayı ile ters çevrilmiş sayı eşit mi?
        return number == reverseNumber;
    }

    public static void main(String[] args) {
        int sayi = 4004;
        
        if (isPalindrom(sayi)) {
            System.out.println(sayi + " bir Palindromik Sayıdır.");
        } else {
            System.out.println(sayi + " Palindromik Sayı DEĞİLDİR.");
        }
    }
}`,

  stringBuilder: `/**
 * Java ile Palindrom Sayı Bulma (StringBuilder.reverse Yöntemi)
 * Hazırlayan: Enes Öztürk
 *
 * Pratik ve hızlı prototipleme için string tabanlı çözüm
 */
public class PalindromStringBuilder {

    public static boolean isPalindrom(int number) {
        if (number < 0) return false;

        String original = String.valueOf(number);
        String reversed = new StringBuilder(original).reverse().toString();

        return original.equals(reversed);
    }

    public static void main(String[] args) {
        int[] ornekler = {1, 8, 99, 101, 363, 4004, 9889, 1234};

        for (int sayi : ornekler) {
            System.out.println(sayi + " -> " + 
                (isPalindrom(sayi) ? "PALİNDROM" : "Palindrom Değil"));
        }
    }
}`,

  twoPointer: `/**
 * Java ile Palindrom Kontrolü (İki İşaretçi / Two-Pointer)
 * Hazırlayan: Enes Öztürk
 *
 * Baştan ve sondan karşılıklı karakterleri eşzamanlı kıyaslar
 */
public class PalindromTwoPointer {

    public static boolean isPalindrom(int number) {
        if (number < 0) return false;

        String str = String.valueOf(number);
        int left = 0;
        int right = str.length() - 1;

        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false; // Karşılıklı karakterler eşleşmedi
            }
            left++;
            right--;
        }

        return true; // Tüm basamaklar simetrik
    }

    public static void main(String[] args) {
        int testSayisi = 9889;
        System.out.println(testSayisi + " palindrom mu? " + isPalindrom(testSayisi));
    }
}`,

  fullScanner: `import java.util.Scanner;

/**
 * Palindrom Sayı Bulma - Konsol Girişli Tam Java Programı
 * Hazırlayan: Enes Öztürk
 */
public class Main {

    // Palindrom kontrol metodu (Matematiksel algoritma)
    public static boolean isPalindrom(int number) {
        if (number < 0) {
            return false;
        }

        int temp = number;
        int reverseNumber = 0;

        while (temp != 0) {
            int lastDigit = temp % 10;
            reverseNumber = (reverseNumber * 10) + lastDigit;
            temp /= 10;
        }

        return number == reverseNumber;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=========================================");
        System.out.println(" JAVA PALİNDROM SAYI BULUCU ");
        System.out.println(" Hazırlayan: Enes Öztürk ");
        System.out.println("=========================================");
        System.out.print("Lütfen kontrol edilecek sayıyı giriniz: ");

        if (scanner.hasNextInt()) {
            int sayi = scanner.nextInt();
            
            System.out.println("\\n--- Sonuç ---");
            if (isPalindrom(sayi)) {
                System.out.println("Tebrikler! " + sayi + " bir PALİNDROMİK SAYIDIR.");
                System.out.println("Düzden: " + sayi + " | Tersten: " + sayi);
            } else {
                System.out.println(sayi + " bir palindromik sayı DEĞİLDİR.");
            }
        } else {
            System.out.println("Hata: Lütfen geçerli bir tam sayı giriniz!");
        }

        scanner.close();
    }
}`
};
