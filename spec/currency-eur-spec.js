import translate from "../src/index.js";

describe("currency EUR tests", () => {
    it("следва да върне 'нула евро и нула цента'", () => {
        expect(translate.currency("00.00", { currency: "eur" })).toBe(
            "нула евро и нула цента"
        );
    });

    it("следва да върне 'едно евро и един цент'", () => {
        expect(translate.currency("1.01", { currency: "eur" })).toBe(
            "едно евро и един цент"
        );
    });

    it("следва да върне 'триста и едно евро и петдесет и един цента'", () => {
        expect(translate.currency("301.51", { currency: "eur" })).toBe(
            "триста и едно евро и петдесет и един цента"
        );
    });

    it("следва да върне 'десет милиона сто и петдесет хиляди сто и две евро и деветдесет и два цента'", () => {
        expect(translate.currency("10150102.92", { currency: "eur" })).toBe(
            "десет милиона сто и петдесет хиляди сто и две евро и деветдесет и два цента"
        );
    });

    it("следва да върне 'сто двадесет и осем fucking euro, девет cents'", () => {
        expect(
            translate.currency("128.09", {
                currency: "eur",
                labelBig: "fucking euro",
                labelSmall: "cents",
                separator: ", ",
            })
        ).toBe("сто двадесет и осем fucking euro, девет cents");
    });
});
