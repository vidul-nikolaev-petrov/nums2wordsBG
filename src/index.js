const nums = {
    1: {
        0: "нула",
        1: "едно",
        2: "две",
        3: "три",
        4: "четири",
        5: "пет",
        6: "шест",
        7: "седем",
        8: "осем",
        9: "девет",
        gender: {
            1: { m: "един", f: "една", n: "едно" },
            2: { m: "два", f: "две", n: "две" },
        },
    },
    2: {
        10: "десет",
        11: "единадесет",
        12: "дванадесет",
        13: "тринадесет",
        14: "четиринадесет",
        15: "петнадесет",
        16: "шестнадесет",
        17: "седемнадесет",
        18: "осемнадесет",
        19: "деветнадесет",
        20: "двадесет",
        30: "тридесет",
        40: "четиридесет",
        50: "петдесет",
        60: "шестдесет",
        70: "седемдесет",
        80: "осемдесет",
        90: "деветдесет",
    },
    3: {
        100: "сто",
        200: "двеста",
        300: "триста",
        400: "четиристотин",
        500: "петстотин",
        600: "шестстотин",
        700: "седемстотин",
        800: "осемстотин",
        900: "деветстотин",
    },
    4: {
        1: ["хиляда", "една хиляди"],
        "*": "хиляди",
    },
    5: {
        1: ["един милион", "един милиона"],
        "*": "милиона",
    },
    6: {
        1: ["един милиард", "един милиарда"],
        "*": "милиарда",
    },
    7: {
        1: ["един трилион", "един трилиона"],
        "*": "трилиона",
    },
    8: {
        1: ["един квадрилион", "един квадрилиона"],
        "*": "квадрилиона",
    },
    9: {
        1: ["един квинтилион", "един квинтилиона"],
        "*": "квинтилиона",
    },
};

nums2wordsBG();

export default function nums2wordsBG(string, options = {}) {
    function translate(string) {
        return applyUnions(_translate(string)).join(" ");

        function _translate(string) {
            const numbers = BigInt(string).toLocaleString("en-US").split(",");
            const getIndex = (list, i) => list.length - i + 2;
            const countDigits = (number) => String(number).length;

            if (numbers.length === 1 && numbers[0] === "0") {
                return [nums[1][0]];
            }

            let result = [],
                match,
                index,
                ones;

            numbers.forEach((e, i) => {
                ones = e % 100 === 1;
                index = getIndex(numbers, i);

                e = Number(e);

                if (!e) return;

                result = result.concat(getName(e));

                match = nums[index];

                if (index > 3) {
                    if (ones) {
                        result.pop();
                        if (e === 1) {
                            result = result.concat(match[1][0].split(" "));
                        } else {
                            result = result.concat(match[1][1].split(" "));
                        }
                    } else {
                        result.push(nums[index]["*"]);
                    }
                }
            });

            return result;

            function getName(n) {
                const match = nums[countDigits(n)][n];
                const round = n - (n % 10 ** (countDigits(n) - 1));

                if (match) return [match];

                return getName(round).concat(getName(n - round));
            }
        }

        function applyUnions(words) {
            let result = [];
            const union = options.grammar?.union ?? "и";
            const comma = options.grammar?.comma;
            const keyWords = {
                хиляда: true,
                хиляди: true,
                милион: true,
                милиона: true,
                милиард: true,
                милиарда: true,
                трилион: true,
                трилиона: true,
                квадрилион: true,
                квадрилиона: true,
                квинтилион: true,
                квинтилиона: true,
            };

            for (let i = 0; i < words.length; i++) {
                const e = words[i];

                result.push(e);

                if (keyWords[e]) {
                    if (words[i - 1] && words[i - 2]) {
                        if (
                            !keyWords[words[i - 1]] &&
                            !keyWords[words[i - 2]]
                        ) {
                            result.splice(-2);
                            result.push(union, words[i - 1], words[i]);
                        }
                    }
                    if (words[i + 1] && !words[i + 2]) {
                        result.push(union);
                    }
                }
            }

            (function checkSmallNums() {
                const lastTwo = result.slice(-2);
                const lastThree = result.slice(-3);
                const checkAvail = (list) =>
                    !list.some((key) => keyWords[key]) && !list.includes(union);
                let tmp = [];

                if (lastThree.length === 3) {
                    if (checkAvail(lastThree)) {
                        tmp = result.splice(-3);
                        tmp.splice(2, 0, union);
                    }
                }
                if (lastTwo.length === 2 && !tmp.length) {
                    if (checkAvail(lastTwo)) {
                        tmp = result.splice(-2);
                        tmp.splice(1, 0, union);
                    }
                }

                result = result.concat(tmp);

                if (
                    keyWords[result.slice(-1)[0]] &&
                    keyWords[result.slice(-3, -2)[0]]
                ) {
                    result.splice(-2, 0, union);
                }
            })();

            (function specialCases() {
                const replace = {
                    две: nums[1].gender[2].m,
                    едно: nums[1].gender[1].m,
                };
                const replace1000 = { едно: nums[1].gender[1].f };
                const keyWords = {
                    милиона: true,
                    милиарда: true,
                    трилион: true,
                    трилиона: true,
                    квадрилиона: true,
                    квинтилиона: true,
                };

                result.forEach((e, i) => {
                    if (keyWords.hasOwnProperty(e)) {
                        if (replace[result[i - 1]]) {
                            result[i - 1] = replace[result[i - 1]];
                        }
                    } else if (
                        e === nums[4]["*"] &&
                        replace1000[result[i - 1]]
                    ) {
                        result[i - 1] = replace1000[result[i - 1]];
                    }
                });
            })();

            (function addComma() {
                if (!comma) return;
                result.forEach((e, i) => {
                    if (
                        keyWords[e] &&
                        result[i + 1] &&
                        result[i + 1] !== union &&
                        e !== nums[4][1][0]
                    ) {
                        result[i] = result[i] + comma;
                    }
                });
            })();

            (function defineGenderForLastNumber() {
                const lastWord = result[result.length - 1];
                const lastNum = string.split("").pop();

                if (
                    options.gender &&
                    (lastWord === nums[1][1] || lastWord === nums[1][2])
                ) {
                    result.pop();
                    result.push(nums[1].gender[lastNum][options.gender]);
                }
            })();

            return result;
        }
    }

    function currency(string, options = {}, f) {
        const cs = f ? f() : getCurrencies();
        const { currency = "bgn" } = options;
        const c = cs[currency];
        const defBig = c.def.lv;
        const defSmall = c.def.st;
        let {
            labelBig = c.labelBig,
            labelSmall = c.labelSmall,
            separator = " и ",
            displayBig = true,
            displaySmall = true,
            grammar = null,
        } = options;
        let [lv, st] = String(string).split(/\D+/);
        let result;

        if (Number(st)) {
            st = getFixedLength(st, c);
            st = Number("." + st);
            st = st * c.decimals;
            st = st.toFixed(0);
        }

        [lv, st] = [lv, st].map((e) => nums2wordsBG(e, { grammar }));

        if (lv === nums[1][1]) {
            if (labelBig === c.labelBig) {
                labelBig = c.singular.lv;
            }
        } else if (!lv) {
            lv = nums[1][0];
        }

        if (st === nums[1][1]) {
            if (labelSmall === c.labelSmall) {
                labelSmall = c.singular.st;
            }
        } else if (!st) {
            st = nums[1][0];
        }

        lv = replaceOneOrTwo(lv, c.gender[1][defBig], c.gender[2][defBig]);
        st = replaceOneOrTwo(st, c.gender[1][defSmall], c.gender[2][defSmall]);

        result = displayBig
            ? lv + " " + labelBig + (displaySmall ? separator : "")
            : "";
        result += displaySmall ? st + " " + labelSmall : "";

        return result;

        function getCurrencies() {
            return {
                bgn: {
                    labelBig: "лева",
                    labelSmall: "стотинки",
                    singular: { lv: "лев", st: "стотинка" },
                    decimals: 100,
                    def: { lv: "m", st: "f" },
                    gender: {
                        1: { m: nums[1].gender[1].m, f: nums[1].gender[1].f },
                        2: { m: nums[1].gender[2].m, f: nums[1].gender[2].f },
                    },
                },
                btc: {
                    labelBig: "биткойна",
                    labelSmall: "сатоши",
                    singular: { lv: "биткойн", st: "сатоши" },
                    decimals: 100000000,
                    def: { lv: "m", st: "n" },
                    gender: {
                        1: { m: nums[1].gender[1].m, n: nums[1][1] },
                        2: { m: nums[1].gender[2].m, n: nums[1][2] },
                    },
                },
                cny: {
                    labelBig: "юана",
                    labelSmall: "фена",
                    singular: { lv: "юан", st: "фен" },
                    decimals: 100,
                    def: { lv: "m", st: "m" },
                    gender: {
                        1: { m: nums[1].gender[1].m },
                        2: { m: nums[1].gender[2].m },
                    },
                },
                eur: {
                    labelBig: "евро",
                    labelSmall: "цента",
                    singular: { lv: "евро", st: "цент" },
                    decimals: 100,
                    def: { lv: "n", st: "m" },
                    gender: {
                        1: { n: nums[1][1], m: nums[1].gender[1].m },
                        2: { n: nums[1][2], m: nums[1].gender[2].m },
                    },
                },
                rub: {
                    labelBig: "рубли",
                    labelSmall: "копейки",
                    singular: { lv: "рубла", st: "копейка" },
                    decimals: 100,
                    def: { lv: "f", st: "f" },
                    gender: {
                        1: { f: nums[1].gender[1].f },
                        2: { f: nums[1].gender[2].f },
                    },
                },
                usd: {
                    labelBig: "долара",
                    labelSmall: "цента",
                    singular: { lv: "долар", st: "цент" },
                    decimals: 100,
                    def: { lv: "m", st: "m" },
                    gender: {
                        1: { m: nums[1].gender[1].m },
                        2: { m: nums[1].gender[2].m },
                    },
                },
            };
        }

        function getFixedLength(string, c) {
            return string.substring(0, String(c.decimals).length - 1);
        }
    }

    function time(string, options = {}, f) {
        const u = f ? f() : getTime();
        const { hour, minute, second } = u;
        const objs = [hour, minute, second];
        let {
            labelHour,
            labelMinute,
            labelSecond,
            separator = " и ",
            displayHour = true,
            displayMinute = true,
            displaySecond = true,
            grammar = null,
        } = options;
        let [hVal, mVal, sVal] = String(string).split(/\D+/);
        let result = "";

        [hVal, mVal, sVal] = [hVal, mVal, sVal].map((e) =>
            nums2wordsBG(e, { grammar })
        );
        [hVal, mVal, sVal] = [hVal, mVal, sVal].map((e, i) =>
            setOne(e, objs[i])
        );

        hVal = replaceOneOrTwo(hVal, hour.gender[1], hour.gender[2]);
        mVal = replaceOneOrTwo(mVal, minute.gender[1]);
        sVal = replaceOneOrTwo(sVal, second.gender[1]);

        const mOrs = displayMinute && !displaySecond;
        const sOrm = !displayMinute && displaySecond;
        const mAnds = displayMinute && displaySecond;

        if (displayHour) {
            result += hVal + " " + (labelHour ? labelHour : hour.label);
            if (mOrs ^ sOrm) {
                result += separator;
            } else if (mOrs || sOrm || mAnds) {
                result += ", ";
            }
        }
        if (displayMinute) {
            result += mVal + " " + (labelMinute ? labelMinute : minute.label);
            result += displaySecond ? separator : "";
        }
        if (displaySecond) {
            result += sVal + " " + (labelSecond ? labelSecond : second.label);
        }

        return result;

        function getTime() {
            return {
                hour: {
                    label: "часа",
                    singular: "час",
                    gender: { 1: nums[1].gender[1].m, 2: nums[1].gender[2].m },
                },
                minute: {
                    label: "минути",
                    singular: "минута",
                    gender: { 1: nums[1].gender[1].f },
                },
                second: {
                    label: "секунди",
                    singular: "секунда",
                    gender: { 1: nums[1].gender[1].f },
                },
            };
        }
    }

    function date(string, options = {}) {
        const {
            labels = {},
            separator = " и ",
            format = "d/m/y",
            grammar = null,
        } = options;
        const map = {
            d: "day",
            w: "week",
            m: "month",
            y: "year",
            a: "age",
        };
        const units = format.split(/\W+/);
        const unitName = units[0].toLowerCase();
        const u = getDate()[map[unitName]];
        const ss = String(string).split(/\W+/);
        const reFirstUnut = (e) => e.replace(/^\w+\W+/, "");
        let val = nums2wordsBG(ss[0], { grammar });

        val = setOne(val, u);
        val = replaceOneOrTwo(val, u.gender[1], u.gender[2]);
        val += " " + (labels[unitName] ? labels[unitName] : u.label);

        if (units.length > 1) {
            val += separator;
        } else if (units.length === 1) {
            return val;
        }

        return [val]
            .concat(
                date(reFirstUnut(string), {
                    labels,
                    separator,
                    format: reFirstUnut(format),
                    grammar,
                })
            )
            .join("");

        function getDate() {
            return {
                age: {
                    label: "века",
                    singular: "век",
                    gender: { 1: nums[1].gender[1].m, 2: nums[1].gender[2].m },
                },
                year: {
                    label: "години",
                    singular: "година",
                    gender: { 1: nums[1].gender[1].f, 2: nums[1].gender[2].f },
                },
                month: {
                    label: "месеца",
                    singular: "месец",
                    gender: { 1: nums[1].gender[1].m, 2: nums[1].gender[2].m },
                },
                week: {
                    label: "седмици",
                    singular: "седмица",
                    gender: { 1: nums[1].gender[1].f, 2: nums[1].gender[2].f },
                },
                day: {
                    label: "дена",
                    singular: "ден",
                    gender: { 1: nums[1].gender[1].m, 2: nums[1].gender[2].m },
                },
            };
        }
    }

    function replaceOneOrTwo(unit, replaceOne, replaceTwo) {
        const regOne = new RegExp(`${nums[1][1]}$`);
        const regTwo = new RegExp(`${nums[1][2]}$`);

        if (unit.match(regOne)) {
            return unit.replace(regOne, replaceOne);
        } else if (replaceTwo && unit.match(regTwo)) {
            return unit.replace(regTwo, replaceTwo);
        } else {
            return unit;
        }
    }

    function setOne(val, obj) {
        if (val === nums[1][1]) {
            val = obj.gender[1];
            obj.label = obj.singular;
        }
        return val;
    }

    if (!string) {
        nums2wordsBG.numbers = nums;
        nums2wordsBG.currency = currency;
        nums2wordsBG.date = date;
        nums2wordsBG.time = time;
    } else {
        return translate(string);
    }
}
