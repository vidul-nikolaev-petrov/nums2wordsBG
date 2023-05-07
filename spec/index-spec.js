const translate = require("../src/index");

describe("main tests", () => {
    it("следва да върне 'едно'", () => {
        expect(translate("1")).toBe("едно");
    });

    it("следва да върне 'две'", () => {
        expect(translate("2")).toBe("две");
    });
});
