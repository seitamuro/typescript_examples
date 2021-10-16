TypeScriptの[HandBook](https://www.typescriptlang.org/docs/handbook/intro.html)をみて作っています｡

# Primitive Type

|Type名|概要|
|----|----|
|string|文字列|
|number|整数､少数｡いわゆるfloatやintをまとめたもの|
|boolean|true か false|
|[type名][]|配列|
|any|オブジェクト型など|

# function

```
function 関数名(引数: 引数の型, ...) : 戻り値の型 {}

function 関数名(引数: {フィールド名: フィールドの型, ...}}) {}

function 関数名(引数: {フィールド名?: フィールドの型, ...}}) {}

function 関数名(引数 = 10) {}
```

フィールド名に`?`がついていればそのフィールドを`null`か`undefined`､つまり書かずに引数として利用することができます｡
# Type defination

```
type 型名 = {
    フィールド名: フィールドの型;
    ...
};

type 型名 = Primitive型;
```

この型名を関数の引数の型として使うこともできる｡

# interface

```
interface インターフェイス名 {
    フィールド名: フィールド名の型
    ...
}
```

# Type と interfaceの違い

`Type`と`interface`は継承のようにして､フィールドを追加することができる｡

```
// Type の場合
type Point = {
    x: number;
    y: number;
}

type Point3D = Point & {
    z: number;
}

// interface の場合
interface Animal {
    name: string
}

interface Bear extends Animal {
    hony: booelan
}
```

# Union

どちらかの型となることを表しています｡

```
type type名 = 型 | 型 | ...;
```

functionの引数の型やフィールドの型としてつかうことができる｡

# Type assertions

型がわからない場合は`as`を使うことで型を与えることができる｡`<>`と書くことでも同じように機能する｡
 
```
const 変数名 = 不明の型 as 型;
const 変数名 = <型>不明の型;
```

# 等号

TypeScriptでは一部の値が`true`や`false`として解釈される｡
`false`として解釈される値は`0`､`Nan`､`0n`､`null`､`undefined`です｡それ以外の値は`true`として解釈されます｡

```
if (0) { console.log("This text is not shown."); }
if (1) { console.log("This text is shown.); }
```

加えて､数値のみの`string`と`number`はときに同じ値として解釈されることがあります｡型まで一致しているかを検証する場合は`===`を使用します｡
```
0 ==  "0" // true
0 === "0" // false
```

値が`true`になるか`false`になるかは`Boolean`関数を使用することでもとめられる｡この関数は`!!`で代用することができる｡
```
Boolean("hello") // true
!!"hello"        // true
```

# in符号

渡されたオブジェクトに`in`の左辺にかかれているフィールドが存在するかを検証することができる｡

```
let obj = { f1: number, f2: number };
"f1" in obj; // true
"f3" in obj; // false
```

# type predicate

if文の中の型を推論するために､`isFish(obj)`のような関数をつくることを考える｡`Fish`型は`swim`関数を持つものとする｡`isFish`関数が明示的に`Fish`型であるかを判定している関数であることを表すために戻り値に`is`を使用することができる｡うまく説明できないので具体例｡

```
type Fish = { swim: () => void };
type Cat = {};

function isFish(pet: Cat | Fish) : pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function eatFish(obj: Cat | Fish) { 
    if (isFish(obj)) {
        console.log("yummy"); // ここでobjがFish型であることが確定している｡コンパイラにもこれがわかる｡
    }

    console.log("I can't eat this.");
}
```

# Construct signature

`new`コマンドをフィールドにつけることで関数として呼び出すことができます｡
```
type SomeObject = {};
type SomeConstructor = {
    new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
    return new ctor("Hello");
}

interface CallOrConstruct {
    new (s: string): Date;
    (n?: number): number;
}
```

# Generic function

配列の先頭の要素を返す関数を考える｡

```
function firstElement(arr: any[]) : any { // 戻り値の型は省略可能
    return arr[0];
}
```

この関数の戻り値は`any`型となるので扱いづらい｡ここで`Generic`を使うことで返り値の型を明示的にすることができる｡

```
function firstElement<Type>(arr: Type[]) : Type | undefined {
    return arr[0];
}
```

`関数名<Type>`の`Type`が`Generic`にあたるもの｡コンパイル時に自動的に`Type`が`string`や`number`に置き換えられる｡戻り値が`Type | undefined`となっているのは`arr`が`[]`のとき`Type`が`undefined`になるためである｡

`Generic`に特定のフィールドを持っているかを指定することができる｡

```
function longest<T extends { length: number}>(a: T, b: T) {
    if (a.length >= b.length) {
        return a;
    } else {
        return b;
    }
}
```

ここでは`a`と`b`が`length`というフィールドを持つことを指定している｡`Generic`は型の数が多くなるほどコンパイラの推論がうまくいきにくくなるため､数は少ないほうがいい｡

# unknown

`unknown`は`any`と似ているが､`unknown`のほうが安全｡`unknown`は`any`と異なり､フィールドをもつオブジェクトを取ることができない｡そのため､以下の`f1`関数はエラーにならないが､`f2`関数はエラーとなる｡

```
function f1(a: any) {
    a.b(); // ok
}

function f2(a: unknown) {
    a.b(); // error 
}
```

# never

`never`は`void`と異なり､値を返さないことを表す｡言い換えると､関数が実行されたら､その関数は終了しない(=戻り値を返すという処理が行われない)という意味になる｡もしくは､そのものが起こり得ないことを表している｡

```
function panic() : never {
    throw new Error("panic!");
}
```

# rest function

複数の引数を1つの配列として受け取る関数です｡以下に例を示します｡
```
function multiply(n: number, ...m: number[]) {
    returm m.map((x) => n * x);
}
```

`...`は配列の中身を展開して､関数への引数として渡すことができる｡
```
const a = [1, 2, 3, 4];
multiply(10, ...a); // returns [10, 20, 30, 40]
```

# readonly

`readonly`をつけられたフィールドの値は再代入することができない｡しかし､`readonly`はオブジェクト自体の変更はできないが､そのプロパティに`readonly`がつけられていなければプロパティを変更することはできる｡

```
interface Home {
    readonly resident: {name: string, age: number};
}

function visitForBirthday(home: Home) {
    home.resident.name = "rewritable";
    home.resident.age++;

    // home.resident = {name: "seitamuro", age:20000}; // this line occurs error.
}
```