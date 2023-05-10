# nums2wordsBG
### Converts numbers from numeric to verbal in Bulgarian

## Install

```javascript
npm i nums2words-bg
```

## Usage

```javascript
const nums2wordsBG = require('nums2words-bg');


nums2wordsBG(201401); // двеста и една хиляди, четиристотин и едно


// the 2nd (optional) parameter: {currency: "bgn", labelLv: "лв.", labelSt: "ст.", separator:" и "}
nums2wordsBG.currency("1024.81"); // хиляда двадесет и четири лева и осемдесет и една стотинки
nums2wordsBG.currency("101.01", {separator: ", "}); // сто и един лева, една стотинка
nums2wordsBG.currency("21001.01", { labelLv: "лв.", labelSt: "ст." }); // двадесет и една хиляди и един лв. и една ст.


nums2wordsBG.currency("01.01", {currency: "rub"}); // една рубла и една копейка
nums2wordsBG.currency("21015.01", {currency: "rub"}); // двадесет и една хиляди и петнадесет рубли и една копейка
nums2wordsBG.currency("401339.02", {currency: "rub"}); // четиристотин и една хиляди, триста тридесет и девет рубли и две копейки

nums2wordsBG.currency("00.00", { currency: "usd" }); // нула долара и нула цента
nums2wordsBG.currency("1.99", { currency: "usd" }); // един долар и деветдесет и девет цента
nums2wordsBG.currency("911.01", { currency: "usd" }); // деветстотин и единадесет долара и един цент
```

The library is written in vanilla JS. [Онлайн](https://vidul-nikolaev-petrov.github.io/nums2wordsBG) пример.

