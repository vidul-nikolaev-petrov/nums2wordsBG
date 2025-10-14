import translate from "../src/index.js";

describe("currency RUB tests", () => {
    it("следва да върне 'нула рубли и нула копейки'", () => {
        expect(translate.currency("00.00", { currency: "rub" })).toBe(
            "нула рубли и нула копейки"
        );
    });

    it("следва да върне 'една рубла и една копейка'", () => {
        expect(translate.currency("1.01", { currency: "rub" })).toBe(
            "една рубла и една копейка"
        );
    });

    it("следва да върне 'триста и една рубли и петдесет и една копейки'", () => {
        expect(translate.currency("301.51", { currency: "rub" })).toBe(
            "триста и една рубли и петдесет и една копейки"
        );
    });

    it("следва да върне 'десет милиона сто и петдесет хиляди сто и две рубли и деветдесет и две копейки'", () => {
        expect(translate.currency("10150102.92", { currency: "rub" })).toBe(
            "десет милиона сто и петдесет хиляди сто и две рубли и деветдесет и две копейки"
        );
    });

    it("следва да върне 'нула руб., нула коп.'", () => {
        expect(
            translate.currency("00.00", {
                currency: "rub",
                labelBig: "руб.",
                labelSmall: "коп.",
                separator: ", "
            })
        ).toBe("нула руб., нула коп.");
    });
});
