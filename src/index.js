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
        gender: { 1: { m: "един", f: "една" }, 2: { m: "два", f: "две" } },
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
        gender: { 2: "два" },
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

function nums2wordsBG(string) {
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
            const union = "и";
            const comma = ",";
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
                let counter = 0;
                result.push(e);
                if (keyWords[e]) {
                    if (words[i - 1] && words[i - 2]) {
                        if (!keyWords[words[i - 1]] && !keyWords[words[i - 2]]) {
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
                const rLength = result.length - 1;
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

                if (keyWords[result.slice(-1)[0]] && keyWords[result.slice(-3, -2)[0]]) {
                    result.splice(-2, 0, union);
                }
            })();

            (function specialCases() {
                const replace = { две: nums[5].gender[2], едно: nums[1].gender[1].m };
                const replace1000 = { едно: nums[1].gender[1].f };

                result.forEach((e, i) => {
                    if (
                        e === "милиона" ||
                        e === "милиарда" ||
                        e === "трилион" ||
                        e === "трилиона" ||
                        e === "квадрилиона" ||
                        e === "квинтилиона"
                    ) {
                        if (replace[result[i - 1]]) {
                            result[i - 1] = replace[result[i - 1]];
                        }
                    } else if (e === nums[4]["*"] && replace1000[result[i - 1]]) {
                        result[i - 1] = replace1000[result[i - 1]];
                    }
                });
            })();

            (function addComma() {
                result.forEach((e, i) => {
                    if (
                        keyWords[e] &&
                        result[i + 1] &&
                        result[i + 1] !== union &&
                        e !== nums[4][1][0]
                    ) {
                        result[i] = result[i] + ",";
                    }
                });
            })();

            return result;
        }
    }

    function currency(string, options = {}) {
        const cs = getCurrencies();
        const { currency = "bgn" } = options;
        let {
            labelLv = cs[currency].labelLv,
            labelSt = cs[currency].labelSt,
            separator = " и ",
        } = options;
        let [lv, st] = String(string).split(/\D+/);
        const defLv = cs[currency].def.lv;
        const defSt = cs[currency].def.st;

        if (st && st.length === 1) {
            st += "0";
        }

        [lv, st] = [lv, st].map(nums2wordsBG);

        if (lv === nums[1][1]) {
            if (labelLv === cs[currency].labelLv) {
                labelLv = cs[currency].singular.lv;
            }
        } else if (!lv) {
            lv = nums[1][0];
        }

        if (st === nums[1][1]) {
            if (labelSt === cs[currency].labelSt) {
                labelSt = cs[currency].singular.st;
            }
        } else if (!st) {
            st = nums[1][0];
        }

        const regOne = new RegExp(`${nums[1][1]}$`);
        const regTwo = new RegExp(`${nums[1][2]}$`);

        if (lv.match(regOne)) {
            lv = lv.replace(regOne, cs[currency].gender[1][defLv]);
        } else if (lv.match(regTwo)) {
            lv = lv.replace(regTwo, cs[currency].gender[2][defLv]);
        }
        if (st.match(regOne)) {
            st = st.replace(regOne, cs[currency].gender[1][defSt]);
        } else if (st.match(regTwo)) {
            st = st.replace(regTwo, cs[currency].gender[2][defSt]);
        }

        return `${lv} ${labelLv}${separator}${st} ${labelSt}`;

        function getCurrencies() {
            return {
                bgn: {
                    labelLv: "лева",
                    labelSt: "стотинки",
                    singular: { lv: "лев", st: "стотинка" },
                    def: { lv: "m", st: "f" },
                    gender: { 1: { m: "един", f: "една" }, 2: { m: "два", f: "две" } },
                },
                rub: {
                    labelLv: "рубли",
                    labelSt: "копейки",
                    singular: { lv: "рубла", st: "копейка" },
                    def: { lv: "f", st: "f" },
                    gender: { 1: { m: "един", f: "една" }, 2: { m: "два", f: "две" } },
                },
                usd: {
                    labelLv: "долара",
                    labelSt: "цента",
                    singular: { lv: "долар", st: "цент" },
                    def: { lv: "m", st: "m" },
                    gender: { 1: { m: "един" }, 2: { m: "два" } },
                },
            };
        }
    }

    if (!string) {
        nums2wordsBG.numbers = nums;
        nums2wordsBG.currency = currency;
    } else {
        return translate(string);
    }
}

nums2wordsBG();

if (typeof module !== "undefined" && module.exports) {
    module.exports = nums2wordsBG;
}
