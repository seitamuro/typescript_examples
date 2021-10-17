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
type SomeObject = {};
type SomeConstructor = {
    new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
    return new ctor("hello");
}

interface CallOrConstruct {
    new (s: string): Date;
    (n?: number) : number;
}
function fn2(ctor: CallOrConstruct) {
    new ctor("hello");
}

// Generic Functions
function firstElement1(arr: any[]) { // It's return any type.
    return arr[0];
}

function firstElement2<T>(arr: T[]): T | undefined {
    return arr[0];
}

const firstE1 = firstElement2(["a", "b", "c"]); // type: string
const firstE2 = firstElement2([1, 2, 3]);       // type: number
const firstE3 = firstElement2([]);              // type: undefined

function map<Input, Output>(arr: Input[], func: (args: Input) => Output) : Output[] {
    return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

function longest<Type extends { length: number}>(a: Type, b: Type) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}
const longer1 = longest([1, 2], [1, 2, 3]); // longer1 = [1, 2, 3]
const longer2 = longest("alice", "bob");    // longer2 = "alice"

// unknown
function f1(a: any) {
    a.b();
}

function f2(a: unknown) {
    // a.b();    error
}

// never
function fail(msg: string): never {
    throw new Error(msg);
}

function fn3(x: string | number) {
    if (typeof x === "string") {
        // do something
    } else if (typeof x === "number") {
        // do something
    } else {
        x; // x has type 'never'
    }
}

// rest parameters
function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
}
const a = multiply(10, 1, 2, 3, 4); // returns [10, 20, 30, 40]

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// optional properties
interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
}

function paintShape(opts: PaintOptions) {
    // ...
}

function getShape() : Shape {
    return {
        kind: "circle",
        radius: 5
    };
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

// readonly property
interface SomeType {
    readonly prop: string;
}

interface Home {
    readonly resident: {name: string, age: number};
}

function visitForBirthday(home: Home) {
    home.resident.name = "seitamuro";
    home.resident.age++;

    // home.resident = {name: "foo", age: 0}; // itself is readonly
}

// index signatures
interface StringArray {
    [index: number]: string;
}

// generic in interface
interface Box<Type> {
    contents: Type;
}

function setContents<Type>(box: Box<Type>, newContents: Type) {
    box.contents = newContents;
}

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> = Type | Type[] | null;
type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

// tuple
type StringNumberPair = [string, number];
function doSomething2(pair: [string, number]) {
    const a = pair[0];
    const b = pair[1];
}
doSomething2(["hello", 42]);

type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BoolenasStringNumber = [...boolean[], string, number];

const snb1: StringNumberBooleans = ["helo", 1];
const snb2: StringNumberBooleans = ["helo", 1, true];
const snb3: StringNumberBooleans = ["helo", 1, true, true];

// type manipulation - generic
function identity<Type>(arg: Type) : Type {
    return arg;
}

interface GenericIdentityFn<Type> {
    (arg: Type): Type;
}

let myIdentity: GenericIdentityFn<number> = identity;

class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;

    constructor(zero: NumType) {
        this.zeroValue = zero;
        this.add = function (x, y) { return this.zeroValue; };
    }
}

let myGenericNumber1 = new GenericNumber<number>(0);
myGenericNumber1.add = function (x, y) {
    return x + y;
};

let myGenericNumber2 = new GenericNumber<string>("");
myGenericNumber2.add = function (x, y) {
    return x + y;
}

interface Lengthwise {
    length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length);
    return arg;
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
}

let x2 = { a:1, b:2, c:3, d:4 };

getProperty(x2, "a");
//getProperty(x2, "m"); // error

class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nametag: string = "Mikle";
}

class Animal {
    numLens: number = 4;
}

class Bee extends Animal {
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// Type Manipulation - Keyof Type Operator
type Point2D = { x:number, y:number};
type P = keyof Point2D; // type: typeof Point

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // type: number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // type: string | number

// Type Manipulation - Typeof Type Operator
let s = "hello";
let n: typeof s; // type: string

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>; // type: boolean

function f() {
    return { x: 10, y: 3 };
}
// type P2 = ReturnType<f>;

// Type Manipulation - Conditional Types
interface IdLabel {
    id: number
}

interface NameLabel {
    name: string
}
type NameOrID<T extends number | string> = T extends number ? IdLabel : NameLabel;