# nums2wordsBG 🇧🇬
Преобразува числата в думи (converts numbers to words in Bulgarian).

## Install

```javascript
npm i nums2words-bg
```

## Usage

```javascript
const nums2wordsBG = require('nums2words-bg');


nums2wordsBG(201401); // двеста и една хиляди, четиристотин и едно


// the 2nd (optional) parameter: {currency: "bgn", labelBig: "лв.", labelSmall: "ст.", separator:" и "}
nums2wordsBG.currency("1024.81"); // хиляда двадесет и четири лева и осемдесет и една стотинки
nums2wordsBG.currency("101.1", {separator: ", "}); // сто и един лева и десет стотинки
nums2wordsBG.currency("21001.01", { labelBig: "лв.", labelSmall: "ст." }); // двадесет и една хиляди и един лв. и една ст.

nums2wordsBG.currency(".00000001", {currency: "btc"}); // нула биткойна и едно сатоши
nums2wordsBG.currency("2.01", {currency: "btc"}); // два биткойна и един милион сатоши
nums2wordsBG.currency(".208000", {currency: "btc"}); // нула биткойна и двадесет милиона и осемстотин хиляди сатоши

nums2wordsBG.currency("1.01", { currency: "cny" }); // един юан и един фен
nums2wordsBG.currency("21001.59", { currency: "cny" }); // двадесет и една хиляди и един юана и петдесет и девет фена

nums2wordsBG.currency("01.01", {currency: "rub"}); // една рубла и една копейка
nums2wordsBG.currency("21015.01", {currency: "rub"}); // двадесет и една хиляди и петнадесет рубли и една копейка

nums2wordsBG.currency("00.00", { currency: "usd" }); // нула долара и нула цента
nums2wordsBG.currency("1.99", { currency: "usd" }); // един долар и деветдесет и девет цента
```

The library is written in vanilla JS. [Онлайн](https://vidul-nikolaev-petrov.github.io/nums2wordsBG) пример. [Повече](https://github.com/vidul-nikolaev-petrov/nums2wordsBG/tree/main/spec) примери в тестовете.

