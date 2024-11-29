export function BasicFunctions() {
    // Wyświetla dane w konsoli
    console.log('Hello, world!'); // Hello, world!

    // Wyświetla okno dialogowe z wiadomością
    alert('This is an alert!'); // Wyświetli okno alertu

    // Wyświetla okno dialogowe do wprowadzenia danych
    const name = prompt('What is your name?');
    console.log(name); // Wyświetli wprowadzone imię

    // Wykonuje funkcję po określonym czasie (jednorazowo)
    setTimeout(() => {
        console.log('Executed after 2 seconds');
    }, 2000); // Po 2 sekundach: "Executed after 2 seconds"

    // Powtarza wykonanie funkcji w określonych odstępach czasu
    const intervalId = setInterval(() => {
        console.log('Repeats every second');
    }, 1000);

    // Zatrzymuje cykliczne wywołania ustawione przez `setInterval`
    setTimeout(() => {
        clearInterval(intervalId); // Zatrzymuje po 5 sekundach
        console.log('Interval cleared');
    }, 5000);

    // Anuluje wcześniej ustawiony `setTimeout`
    const timeoutId = setTimeout(() => {
        console.log("This won't run");
    }, 5000);
    clearTimeout(timeoutId); // Zatrzymuje wywołanie funkcji
}
