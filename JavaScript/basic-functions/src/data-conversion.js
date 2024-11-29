export function DataConversion() {
    // Konwertuje ciąg na liczbę całkowitą
    console.log(parseInt('42')); // 42

    // Konwertuje ciąg na liczbę zmiennoprzecinkową
    console.log(parseFloat('42.73')); // 42.73

    // Konwertuje wartość na ciąg znaków
    const num = 42;
    console.log(num.toString()); // "42"

    // Konwertuje obiekt na ciąg JSON
    const jsonObj = { name: 'Alice', age: 25 };
    console.log(JSON.stringify(jsonObj)); // '{"name":"Alice","age":25}'

    // Konwertuje ciąg JSON na obiekt
    const jsonString = '{"name":"Alice","age":25}';
    console.log(JSON.parse(jsonString)); // { name: "Alice", age: 25 }
}
