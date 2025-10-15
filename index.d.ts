declare module "nums2words-bg" {
    /** Родове */
    export type Gender = "m" | "f" | "n"; // мъжки, женски, среден

    /** Общи опции за граматика и разделители */
    export interface GrammarOptions {
        union?: string; // напр. "и"
        comma?: string; // допълнителна опция за запетаи
    }

    /** Основни опции за преобразуване на число в думи */
    export interface Num2WordsOptions {
        gender?: Gender;
        grammar?: GrammarOptions;
        separator?: string; // напр. ", "
    }

    /** Опции за валута */
    export interface CurrencyOptions extends Num2WordsOptions {
        currency?: "bgn" | "eur" | "usd" | "rub" | "btc" | "cny" | string;
        labelBig?: string; // напр. "лв.", "евро"
        labelSmall?: string; // напр. "ст.", "цента"
        displayBig?: boolean; // показва ли се голямата единица
        displaySmall?: boolean; // показва ли се малката единица
    }

    /** Опции за време */
    export interface TimeOptions extends Num2WordsOptions {
        displayHour?: boolean;
        displayMinute?: boolean;
        displaySecond?: boolean;
        labelHour?: string;
        labelMinute?: string;
        labelSecond?: string;
    }

    /** Опции за дата / период */
    export interface DateOptions extends Num2WordsOptions {
        format?: string; // напр. "a/y/d/m" или "w,d"
        labels?: Partial<
            Record<"day" | "week" | "month" | "year" | "age", string>
        >;
    }

    /** Функция за добавяне на нова валута */
    interface CustomCurrency {
        labelBig: string;
        labelSmall: string;
        singular: { lv: string; st: string };
        decimals: number;
        def: { lv: Gender | string; st: Gender | string };
        gender: Record<1 | 2, Record<string, string>>;
    }

    /** Основен интерфейс на библиотеката */
    export interface CustomCurrencyMap {
        [key: string]: CustomCurrency;
    }

    export interface Num2WordsBG {
        (value: string, options?: Num2WordsOptions): string;

        /** Преобразува число във валута (BGN, EUR, USD, BTC, др.) */
        currency(
            value: string | number,
            options?: CurrencyOptions,
            customCurrencyMap?: () => CustomCurrencyMap
        ): string;

        /** Преобразува време (HH:MM:SS) */
        time(value: string, options?: TimeOptions): string;

        /** Преобразува дата / период */
        date(value: string, options?: DateOptions): string;

        /** Налични речници / числа */
        numbers: Record<string, any>;
    }

    const nums2wordsBG: Num2WordsBG;
    export default nums2wordsBG;
}
