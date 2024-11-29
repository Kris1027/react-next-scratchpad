export function ObjectFunctions() {
    // Zwraca tablicę kluczy obiektu
    const obj = { a: 1, b: 2, c: 3 };
    console.log(Object.keys(obj)); // ["a", "b", "c"]

    // Zwraca tablicę wartości obiektu
    console.log(Object.values(obj)); // [1, 2, 3]

    // Zwraca tablicę par [klucz, wartość]
    console.log(Object.entries(obj)); // [["a", 1], ["b", 2], ["c", 3]]

    // Kopiuje właściwości z jednego obiektu do drugiego
    const target = { d: 4 };
    Object.assign(target, obj);
    console.log(target); // { d: 4, a: 1, b: 2, c: 3 }

    // // Zamraża obiekt (uniemożliwia zmiany)
    // Object.freeze(obj);
    // obj.a = 5; // Nie działa
    // console.log(obj); // { a: 1, b: 2, c: 3 }

    // // Uszczelnia obiekt (można zmieniać, ale nie dodawać/usuwać właściwości)
    // const sealed = { x: 10 };
    // Object.seal(sealed);
    // sealed.x = 20; // Działa
    // delete sealed.x; // Nie działa
    // console.log(sealed); // { x: 20 }

    // Tworzy nowy obiekt z określonym prototypem
    const proto = {
        greet() {
            return 'Hello';
        },
    };
    const instance = Object.create(proto);
    console.log(instance.greet()); // "Hello"
}
