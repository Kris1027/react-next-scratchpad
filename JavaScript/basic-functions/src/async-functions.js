export function AsyncFunctions() {
    // Wykonuje żądanie HTTP i zwraca obietnicę
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => console.log(data)); // Wyświetli dane z API

    // Wykonuje wiele obietnic jednocześnie i zwraca ich wyniki
    const promise1 = Promise.resolve(10);
    const promise2 = Promise.resolve(20);
    Promise.all([promise1, promise2]).then((results) => console.log(results)); // [10, 20]

    // Zwraca pierwszą zakończoną obietnicę
    const slow = new Promise((resolve) => setTimeout(() => resolve('Slow'), 1000));
    const fast = new Promise((resolve) => setTimeout(() => resolve('Fast'), 500));
    Promise.race([slow, fast]).then((result) => console.log(result)); // "Fast"
}
