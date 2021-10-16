// The primitive types
let type_string: string = "Hello, world";
let type_number1: number = 40;
let type_number2: number = 1.;
let type_boolean: boolean = true;

let type_number_array: number[] = [1, 2, 3, 4];
let type_string_array: string[] = ["a", 'b', `c`];

let type_any: any = { x: 0 }; // Any type disables all further type checking.
type_any.x;
type_any.fun(); // This line occurs error.

// function annotation
function greet(name: string) : number {
    console.log(`Hello ${name}!`);
    return 46;
}
greet("seitamuro");

function printCoord(pt: {x: number; y: number}) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
}
printCoord({x:3, y:7});

function printName(obj: {first: string; last?: string}) {
    console.log(obj.first.toUpperCase());
    console.log(obj.last?.toUpperCase());
}
printName({first: "sei"});
printName({first: "sei", last: "tamuro"});

function printId(id: number | string) {
    if (typeof id == "string") {
        console.log(id.toUpperCase);
    } else {
        console.log(id);
    }
}
printId(101);
printId("202");

function welcomPeople(x: string[] | string) {
    if (Array.isArray(x)) {
        console.log("Hello, " + x.join(" and "));
    } else {
        console.log("Welcom lone traveler " + x);
    }
}

// Type
type Point = {
    x: number;
    y: number;
};

type SuperPoint = Point & {
    z: number
}

function printPoint(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's x value is " + pt.y);
}

printPoint({ x: 100, y: 100});

// Interface
interface Animal {
    name: string
}

interface Bear extends Animal {
    honey: boolean
}

// Type Assertions
const myCanvas1 = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");

interface Options {
    width: number;
}
function configure(x: Options | "auto") {
}
configure({ width: 100 });
configure("auto");

// non-null assertion operator(!)
function liveDangerously(x?: number | null) {
    console.log(x!.toFixed());
}

// primitive enum

//const oneHundred: bigint = BigInt(100);
//const anotherHundred: bigint = 100n;

// symbol
//const firstName = Symbol("name");
//const secondName = Symbol("name");

// typeof guards
// string number bigint symbol undefined object function

function printAll(strs: string | string[] | null) {
    if (typeof strs == "object") {
        for (const s of strs!) {
            console.log(s);
        }
    } else if (typeof strs == "string") {
        console.log(strs);
    } else {
        // do nothing
    }
}

// 0, Nan, "", 0n, null and undefine coerce to false
function getUsersOnlineMessage(numUsersOnline: number) {
    if (numUsersOnline) {
        return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here. :(";
}

Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true, value: true

function printAll2(strs: string | string[] | null) {
    if (strs && typeof strs == "object") {
        for (const s of strs!) {
            console.log(s);
        }
    } else if (typeof strs == "string") {
        console.log(strs);
    }
}

function multiplyAll(
    values: number[] | undefined,
    factor: number
): number[] | undefined {
    if (!values) {
        return values;
    } else {
        return values.map((x) => x * factor);
    }
}

function example(x: string | number, y: string | boolean) {
    if (x === y) {
        x.toUpperCase(); // type: string
        y.toLowerCase(); // type: string
    } else {
        console.log(x); // type: string | number
        console.log(y); // type: string | number
    }
}

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        animal; // type: Fish | Human
    } else {
        animal; // type: Bird | Human
    }
}

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase());
    }
}

let x = Math.random() < 0.5 ? 10 : "Hello world!"; // type: string | number

function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// Exhaustiveness checking
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;

        case "square":
            return shape.sideLength ** 2;

        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

// call sigunature
type DescribableFunction = {
    description: string;
    (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6));
}

// construct signatures