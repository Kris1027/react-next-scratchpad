export function StringFunctions() {
    const str = 'Hello, world!';

    // Dzieli ciąg na tablicę podciągów
    const parts = str.split(',');
    console.log(parts); // ["Hello", " world!"]

    // Łączy elementy tablicy w ciąg znaków
    console.log(parts.join(' - ')); // "Hello -  world!"

    // Zastępuje część ciągu
    console.log(str.replace('world', 'JavaScript')); // "Hello, JavaScript!"

    // Usuwa białe znaki z początku i końca
    const trimmed = '   text   '.trim();
    console.log(trimmed); // "text"

    // Sprawdza, czy ciąg zawiera podciąg
    console.log(str.includes('world')); // true

    // Zwraca pierwszy indeks podciągu
    console.log(str.indexOf('world')); // 7

    // Zwraca podciąg z określonego zakresu indeksów
    console.log(str.substring(0, 5)); // "Hello"

    // Konwertuje ciąg na wielkie litery
    console.log(str.toUpperCase()); // "HELLO, WORLD!"

    // Konwertuje ciąg na małe litery
    console.log(str.toLowerCase()); // "hello, world!"
}
