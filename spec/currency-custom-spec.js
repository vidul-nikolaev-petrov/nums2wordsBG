import _translate from "../src/index.js";

const currency = _translate.currency;

const euro = function () {
    return {
        euro: {
            labelBig: "евро",
            labelSmall: "цента",
            singular: { lv: "евро", st: "цент" },
            decimals: 100,
            def: { lv: "f", st: "m" },
            gender: {
                1: { f: "едно", m: "един" },
                2: { f: "двe", m: "два" },
            },
        },
    };
};

const cases = [
    {
        input: "1",
        expected: "едно евро и нула цента",
        options: { currency: "euro" },
    },
    {
        input: "1.01",
        expected: "едно евро и един цент",
        options: { currency: "euro" },
    },
    {
        input: "1.02",
        expected: "едно евро и два цента",
        options: { currency: "euro" },
    },
    {
        input: "1.03",
        expected: "едно евро и три цента",
        options: { currency: "euro" },
    },
    {
        input: "1.28",
        expected: "едно евро и двадесет и осем цента",
        options: { currency: "euro" },
    },
    {
        input: "2",
        expected: "двe евро и нула цента",
        options: { currency: "euro" },
    },
    {
        input: "2.01",
        expected: "двe евро и един цент",
        options: { currency: "euro" },
    },
    {
        input: "2.02",
        expected: "двe евро и два цента",
        options: { currency: "euro" },
    },
    {
        input: "2.51",
        expected: "двe евро и петдесет и един цента",
        options: { currency: "euro" },
    },
    {
        input: "2.71",
        expected: "двe евро и седемдесет и един цента",
        options: { currency: "euro" },
    },
    {
        input: "10",
        expected: "десет евро и нула цента",
        options: { currency: "euro" },
    },
    {
        input: "10.01",
        expected: "десет евро и един цент",
        options: { currency: "euro" },
    },
    {
        input: "10.99",
        expected: "десет евро и деветдесет и девет цента",
        options: { currency: "euro" },
    },
    {
        input: "21000.02",
        expected: "двадесет и една хиляди евро и два цента",
        options: { currency: "euro" },
    },
    {
        input: "58000400091.01",
        expected:
            "петдесет и осем милиарда, четиристотин хиляди, деветдесет и едно евро и един цент",
        options: { currency: "euro" },
    },
];

describe("custom currency tests", () => {
    cases.forEach(({ input, expected, options }) => {
        it(`следва да върне '${expected}'`, () => {
            expect(currency(input, options, euro)).toBe(expected);
        });
    });
});
