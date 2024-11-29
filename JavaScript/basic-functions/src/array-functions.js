export function ArrayFunctions() {
    // Sprawdza, czy dana wartość jest tablicą
    console.log(Array.isArray([1, 2, 3])); // true

    // Dodaje elementy na koniec tablicy
    const arr1 = [1, 2];
    arr1.push(3, 4);
    console.log(arr1); // [1, 2, 3, 4]

    // Usuwa ostatni element tablicy
    const arr2 = [1, 2, 3];
    const last = arr2.pop();
    console.log(last); // 3
    console.log(arr2); // [1, 2]

    // Usuwa pierwszy element tablicy
    const arr3 = [1, 2, 3];
    const first = arr3.shift();
    console.log(first); // 1
    console.log(arr3); // [2, 3]

    // Dodaje elementy na początek tablicy
    const arr4 = [2, 3];
    arr4.unshift(1);
    console.log(arr4); // [1, 2, 3]

    // Tworzy nową tablicę, przekształcając elementy
    const numbers = [1, 2, 3];
    const squares = numbers.map((n) => n ** 2);
    console.log(squares); // [1, 4, 9]

    // Tworzy nową tablicę z elementami spełniającymi warunek
    const even = numbers.filter((n) => n % 2 === 0);
    console.log(even); // [2]

    // Zwraca pierwszy element spełniający warunek
    const firstEven = numbers.find((n) => n % 2 === 0);
    console.log(firstEven); // 2

    // Redukuje tablicę do pojedynczej wartości
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    console.log(sum); // 6

    // Iteruje po elementach tablicy
    numbers.forEach((n) => console.log(n * 2)); // 2, 4, 6

    // Sprawdza, czy tablica zawiera wartość
    console.log(numbers.includes(2)); // true

    // Sortuje elementy tablicy
    const unsorted = [3, 1, 4, 2];
    unsorted.sort((a, b) => a - b);
    console.log(unsorted); // [1, 2, 3, 4]

    // Tworzy nową tablicę będącą wycinkiem
    const sliced = numbers.slice(1, 3);
    console.log(sliced); // [2, 3]

    // Dodaje, usuwa lub zastępuje elementy w tablicy
    const spliced = [1, 2, 3, 4];
    spliced.splice(1, 2, 8, 9);
    console.log(spliced); // [1, 8, 9, 4]

    // Łączy dwie lub więcej tablic
    const combined = arr1.concat(arr4);
    console.log(combined); // [1, 2, 3, 4, 1, 2, 3]

    // Sprawdza, czy wszystkie elementy spełniają warunek
    console.log(numbers.every((n) => n > 0)); // true

    // Sprawdza, czy co najmniej jeden element spełnia warunek
    console.log(numbers.some((n) => n > 2)); // true

    // Odwraca kolejność elementów w tablicy
    const reversed = [...numbers].reverse(); // Kopia, aby oryginał nie zmienił się
    console.log(reversed); // [3, 2, 1]

    // Spłaszcza zagnieżdżone tablice
    const nested = [1, [2, [3, 4]]];
    console.log(nested.flat(2)); // [1, 2, 3, 4]
}
