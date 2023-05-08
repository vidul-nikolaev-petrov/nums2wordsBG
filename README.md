# nums2wordsBG
### Converts numbers from numeric to verbal in Bulgarian
##### The library is written in vanilla JS.

```javascript
nums2wordsBG(201401); // двеста и една хиляди четиристотин и едно


// the 2nd (optional) parameter: format={lv: "лева", st: "стотинки", separator:" и "}
nums2wordsBG.currency(1024.81); // двадесет и един лева и осемдесет и една стотинки
nums2wordsBG.currency(101.01, {separator: ", "}); // сто и един лева, една стотинки
```

[Онлайн](https://vidul-nikolaev-petrov.github.io/nums2wordsBG) пример.

