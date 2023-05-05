function nums2wordsBG(number) {
    const nums = {
        translate: function (_num) {
            const union = "и";
            const num = _num.toString();
            const getRegExp = (num) => () => new RegExp("^(\\d+)0{" + num + "}$");
            const countDigits = (number, count = 0) => {
                if (!number) return count;
                return countDigits(Math.floor(number / 10), ++count);
            };
            const regexp = {
                4: getRegExp(3),
                5: getRegExp(3),
                6: getRegExp(3),
                7: getRegExp(6),
                8: getRegExp(6),
                9: getRegExp(6),
            };

            const getFirstIntegers = (n) => {
                const num = n.toString();

                try {
                    const pattern = regexp[num.length];
                    const match = num.match(pattern());

                    if (!match) throw new Error();

                    return match[1];
                } catch {
                    return;
                }
            };

            const getName = (n) => {
                const firstIntegers = getFirstIntegers(n);
                const getLength = () => countDigits(n);
                const getPlural = () => this[getLength()]["*"];

                let result = [];
                let match = this[getLength()][n];

                if (match) {
                    if (Array.isArray(match)) {
                        if (num / 2 > n) {
                            match = match[1].split(" ");
                        } else {
                            match = match[0].split(" ");
                        }
                        result = result.concat(match);
                        return result;
                    }
                    result.push(match);
                    return result;
                }

                if (firstIntegers) {
                    if (startsWith()) {
                        return getName(firstIntegers).concat(getPlural());
                    } else {
                        return getName(firstIntegers);
                    }
                }

                function getLeadingNums() {
                    const offset = countDigits(num) - countDigits(n);
                    const result = String(num).slice(offset);
                    return result;
                }
                function startsWith() {
                    return getLeadingNums().startsWith(String(firstIntegers));
                }

                let roundTmp;
                let round = n - (n % 10 ** (getLength() - 1));
                if (Math.floor(round / 10000)) {
                    roundTmp = Math.floor((n % round) / (round / 10)) * (round / 10);
                    if (round + roundTmp < n) {
                        round += roundTmp;
                    }
                }

                return getName(round).concat(getName(n - round));
            };

            return applyUnions(getName(num)).join(" ");

            function applyUnions(words) {
                let result = [];
                const keyWords = { хиляда: true, хиляди: true, милион: true, милиона: true };

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
                        !list.some((key) => keyWords.hasOwnProperty(key)) && !list.includes(union);
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
                })();

                return result;
            }
        },
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
            1000: ["хиляда", "една хиляди"],
            "*": "хиляди",
        },
        5: {
            "*": "хиляди",
        },
        6: {
            "*": "хиляди",
        },
        7: {
            1000000: ["един милион", "един милиона"],
            "*": "милиона",
        },
        8: {
            "*": "милиона",
        },
        9: {
            "*": "милиона",
        },
    };

    if (!number) {
        return (nums2wordsBG.numbers = nums);
    }
    return nums.translate(number);
}

nums2wordsBG(); // init nums for later settings

// // quick check:
// const log = (e) => console.log(nums2wordsBG(e));
// [1, 8, 16, 32, 128, 256, 1024, 12021, 20048, 400960, 801920, 800008, 550660128, 901999000].forEach(log);
