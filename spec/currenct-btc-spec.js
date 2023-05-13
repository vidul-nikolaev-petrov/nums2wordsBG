import translate from "../src/index.js";

describe("BTC currency tests", () => {
    it("следва да върне 'нула биткойна и нула сатоши'", () => {
        expect(translate.currency("00.00", { currency: "btc" })).toBe(
            "нула биткойна и нула сатоши"
        );
    });

    it("следва да върне 'нула биткойна и едно сатоши'", () => {
        expect(translate.currency(".00000001", { currency: "btc" })).toBe(
            "нула биткойна и едно сатоши"
        );
    });

    it("следва да върне 'нула биткойна и едно сатоши'", () => {
        expect(translate.currency(".000000019", { currency: "btc" })).toBe(
            "нула биткойна и едно сатоши"
        );
    });

    it("следва да върне 'един биткойн и един милион сатоши'", () => {
        expect(translate.currency("1.01", { currency: "btc" })).toBe(
            "един биткойн и един милион сатоши"
        );
    });

    it("следва да върне 'един биткойн и деветдесет и девет милиона сатоши'", () => {
        expect(translate.currency("1.99", { currency: "btc" })).toBe(
            "един биткойн и деветдесет и девет милиона сатоши"
        );
    });

    it("следва да върне 'два биткойна и един милион сатоши'", () => {
        expect(translate.currency("2.01", { currency: "btc" })).toBe(
            "два биткойна и един милион сатоши"
        );
    });

    it("следва да върне 'два биткойна и десет милиона сатоши'", () => {
        expect(translate.currency("2.1", { currency: "btc" })).toBe(
            "два биткойна и десет милиона сатоши"
        );
    });

    it("следва да върне 'пет биткойна и петдесет и пет милиона сатоши'", () => {
        expect(translate.currency("5.55", { currency: "btc" })).toBe(
            "пет биткойна и петдесет и пет милиона сатоши"
        );
    });

    it("следва да върне 'нула биткойна и петдесет и пет сатоши'", () => {
        expect(translate.currency(".00000055", { currency: "btc" })).toBe(
            "нула биткойна и петдесет и пет сатоши"
        );
    });

    it("следва да върне 'пет биткойна и нула сатоши'", () => {
        expect(translate.currency("5", { currency: "btc" })).toBe(
            "пет биткойна и нула сатоши"
        );
    });

    it("следва да върне 'нула биткойна и пет милиона сатоши'", () => {
        expect(translate.currency("0.05", { currency: "btc" })).toBe(
            "нула биткойна и пет милиона сатоши"
        );
    });

    it("следва да върне 'двеста и петнадесет хиляди, сто двадесет и осем биткойна и десет хиляди, двеста и четиридесет сатоши'", () => {
        expect(translate.currency("215128.0001024", { currency: "btc" })).toBe(
            "двеста и петнадесет хиляди, сто двадесет и осем биткойна и десет хиляди, двеста и четиридесет сатоши"
        );
    });

    it("следва да върне 'нула биткойна и двадесет милиона и осемстотин хиляди сатоши'", () => {
        expect(translate.currency(".208000", { currency: "btc" })).toBe(
            "нула биткойна и двадесет милиона и осемстотин хиляди сатоши"
        );
    });

    it("следва да върне 'хиляда сто и един биткойна и двеста и четиринадесет сатоши'", () => {
        expect(translate.currency("1101.00000214", { currency: "btc" })).toBe(
            "хиляда сто и един биткойна и двеста и четиринадесет сатоши"
        );
    });

    it("следва да върне 'две хиляди, сто и два биткойна и двеста и тринадесет сатоши'", () => {
        expect(translate.currency("2102.00000213", { currency: "btc" })).toBe(
            "две хиляди, сто и два биткойна и двеста и тринадесет сатоши"
        );
    });

});
