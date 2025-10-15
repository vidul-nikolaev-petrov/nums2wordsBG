import translate from "../src/index.js";

describe("grammar tests", () => {
    it("следва да върне 'тридесет хиляди триста и едно'", () => {
        expect(translate("30301", { grammar: { comma: "" } })).toBe(
            "тридесет хиляди триста и едно"
        );
    });

    it("следва да върне 'тридесет хиляди∞ триста и едно'", () => {
        expect(translate("30301", { grammar: { comma: "∞" } })).toBe(
            "тридесет хиляди∞ триста и едно"
        );
    });

    it("следва да върне 'петдесет хиляди• петстотин и един лева и нула стотинки'", () => {
        expect(
            translate.currency("50501", {
                currency: "bgn",
                grammar: { comma: "•" },
            })
        ).toBe("петдесет хиляди• петстотин и един лева и нула стотинки");
    });

    it("следва да върне 'петдесет хиляди• петстотин и един ча̀са'", () => {
        expect(
            translate.time("50501:0:0", {
                displayMinute: false,
                displaySecond: false,
                grammar: {comma: "•"},
                labelHour: "ча̀са",
            })
        ).toBe("петдесет хиляди• петстотин и един ча̀са");
    });

    it("следва да върне 'десет хиляди• двадесет и четири годинии двадесет и две хиляди• тридесет и три дена'", () => {
        expect(
            translate.date("10024 22033", {
                format: "y/d",
                grammar: { comma: "•" },
            })
        ).toBe(
            "десет хиляди• двадесет и четири години и двадесет и две хиляди• тридесет и три дена"
        );
    });

    it("следва да върне 'пет хиляди ••• триста'", () => {
        expect(translate("5300", { grammar: { union: "•••" } })).toBe(
            "пет хиляди ••• триста"
        );
    });

    it("следва да върне 'сто ••• един лева и нула стотинки'", () => {
        expect(
            translate.currency("101", {
                currency: "bgn",
                grammar: { union: "•••" },
            })
        ).toBe("сто ••• един лева и нула стотинки");
    });

    it("следва да върне 'петдесет хиляди петстотин ••• един ча̀са'", () => {
        expect(
            translate.time("50501:0:0", {
                displayMinute: false,
                displaySecond: false,
                grammar: {union: "•••"},
                labelHour: "ча̀са",
            })
        ).toBe("петдесет хиляди петстотин ••• един ча̀са");
    });

     it("следва да върне 'сто ••• една години'", () => {
        expect(
            translate.date("101", {
                format: "y",
                grammar: { union: "•••" },
            })
        ).toBe(
            "сто ••• една години"
        );
    });
});
