export function DateFunctions() {
    // Zwraca liczbę milisekund od 1 stycznia 1970
    console.log(Date.now()); // np. 1701309372015

    // Zwraca datę w formacie ISO 8601
    const now = new Date();
    console.log(now.toISOString()); // np. "2024-11-29T12:34:56.789Z"

    // Zwraca liczbę milisekund od 1 stycznia 1970 dla danej daty
    console.log(now.getTime()); // np. 1701309372015
}
