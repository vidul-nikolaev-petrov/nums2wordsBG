# 🇧🇬 nums2wordsBG

Convert **numbers to Bulgarian words** — including **currencies**, **time**, **dates**, and **units**.

[![npm version](https://img.shields.io/npm/v/nums2words-bg.svg?color=007acc)](https://www.npmjs.com/package/nums2words-bg)
[![license: MIT](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![JS](https://img.shields.io/badge/Vanilla-JS-F7DF1E.svg)](#)
[![Demo](https://img.shields.io/badge/demo-online-blue.svg)](https://vidul-nikolaev-petrov.github.io/nums2wordsBG)

---

## Install

```bash
npm i nums2words-bg
```

---

## Usage

```javascript
import nums2wordsBG from "nums2words-bg";

nums2wordsBG("201401");
// двеста и една хиляди, четиристотин и едно
```

---

### Currencies

```javascript
nums2wordsBG.currency("1024.81");
// хиляда двадесет и четири лева и осемдесет и една стотинки

nums2wordsBG.currency("10122.1", { separator: ", " });
// десет хиляди, сто двадесет и два лева, десет стотинки

nums2wordsBG.currency("21001.01", { labelBig: "лв.", labelSmall: "ст." });
// двадесет и една хиляди и един лв. и една ст.

nums2wordsBG.currency("11", { displaySmall: false });
// единадесет лева

nums2wordsBG.currency("0.11", { displayBig: false });
// единадесет стотинки
```

#### ₿ Bitcoin

```javascript
nums2wordsBG.currency(".00000001", { currency: "btc" });
// нула биткойна и едно сатоши

nums2wordsBG.currency("1.00000015", { currency: "btc" });
// един биткойн и петнадесет сатоши

nums2wordsBG.currency("2.01", { currency: "btc" });
// два биткойна и един милион сатоши

nums2wordsBG.currency(".208000", { currency: "btc" });
// нула биткойна и двадесет милиона и осемстотин хиляди сатоши
```

#### Supported Fiat Currencies

| Currency | Example      | Output                                                         |
| -------- | ------------ | -------------------------------------------------------------- |
| BGN      | `"21001.59"` | двадесет и една хиляди и един лева и петдесет и девет стотинки |
| CNY      | `"1.01"`     | един юан и един фен                                            |
| EUR      | `"512.21"`   | петстотин и дванадесет евро и двадесет и един цента            |
| RUB      | `"21015.01"` | двадесет и една хиляди и петнадесет рубли и една копейка       |
| USD      | `"1.99"`     | един долар и деветдесет и девет цента                          |

---

### Time

```javascript
nums2wordsBG.time("00:01:01");
// нула часа, една минута и една секунда

nums2wordsBG.time("10:59:03");
// десет часа, петдесет и девет минути и три секунди

nums2wordsBG.time("1:30:4", { displayMinute: false, labelHour: "часа" });
// един часа и четири секунди
```

---

### Date

```javascript
nums2wordsBG.date("2 8 301", { format: "a,y,d", separator: ", " });
// два века, осем години, триста и един дена

nums2wordsBG.date("2 6", { format: "w,d" });
// две седмици и шест дена

nums2wordsBG.date("1.1.1.1", { format: "a/y/d/m", separator: ", " });
// един век, една година, един ден, един месец
```

---

### Various Units

```javascript
nums2wordsBG("1", { gender: "f" }) + " вилица"; // една вилица
nums2wordsBG("1001", { gender: "m" }) + " километра"; // хиляда и един километра
nums2wordsBG("102", { gender: "m" }) + " километра"; // сто и два километра
```

---

## Add a Custom Currency

```javascript
// Define a structure for your custom currency
const myCurrency = () => ({
    xyz: {
        labelBig: "xyz_лева",
        labelSmall: "xyz_стотинки",
        singular: { lv: "xyz_лев", st: "xyz_стотинка" },
        decimals: 100,
        def: { lv: "m", st: "f" },
        gender: {
            1: { m: "един", f: "една" },
            2: { m: "два", f: "две" },
        },
    },
});

// Use your custom currency
nums2wordsBG.currency("11.01", { currency: "xyz" }, myCurrency);
// единадесет xyz_лева и една xyz_стотинка
```

---

## Demo & Tests

-   [**Live Demo**](https://vidul-nikolaev-petrov.github.io/nums2wordsBG) for currencies.
-   [**Unit Tests**](https://github.com/vidul-nikolaev-petrov/nums2wordsBG/tree/main/spec) for exhaustive examples.

---

## License

Originally released under **GPLv3**, now relicensed under the **MIT License** as of **15.10.2025**.
