declare module "nums2words-bg" {
    /** Родове */
    type Gender = "m" | "f" | "n"; // мъжки, женски, среден
    type TimeString = `${number}:${number}:${number}`;

    /** Общи опции за граматика и разделители */
    interface GrammarOptions {
        union?: string; // напр. "и"
        comma?: string; // допълнителна опция за запетаи
    }

    /** Основни опции за преобразуване на число в думи */
    interface Num2WordsOptions {
        gender?: Gender;
        grammar?: GrammarOptions;
        separator?: string; // напр. ", "
    }

    /** Опции за валута */
    interface CurrencyOptions extends Num2WordsOptions {
        currency?: "bgn" | "eur" | "usd" | "rub" | "btc" | "cny" | string;
        labelBig?: string; // напр. "лв.", "евро"
        labelSmall?: string; // напр. "ст.", "цента"
        displayBig?: boolean; // показва ли се голямата единица
        displaySmall?: boolean; // показва ли се малката единица
    }

    /** Опции за време */
    interface TimeOptions extends Num2WordsOptions {
        displayHour?: boolean;
        displayMinute?: boolean;
        displaySecond?: boolean;
        labelHour?: string;
        labelMinute?: string;
        labelSecond?: string;
    }

    /** Опции за дата / период */
    interface DateOptions extends Num2WordsOptions {
        format?: string; // напр. "a/y/d/m" или "w,d"
        labels?: Partial<
            Record<"day" | "week" | "month" | "year" | "age", string>
        >;
    }

    /** Интерфейси за добавяне на нова валута */
    interface CustomCurrency {
        labelBig: string;
        labelSmall: string;
        singular: { lv: string; st: string };
        decimals: number;
        def: { lv: Gender | string; st: Gender | string };
        gender: Record<1 | 2, Record<string, string>>;
    }

    interface CustomCurrencyMap {
        [key: string]: CustomCurrency;
    }

    /** Основен интерфейс на библиотеката */
    interface Num2WordsBG {
        (value: string, options?: Num2WordsOptions): string;

        /** Преобразува число във валута (BGN, EUR, USD, BTC, др.) */
        currency(
            value: string | number,
            options?: CurrencyOptions,
            customCurrencyMap?: () => CustomCurrencyMap
        ): string;

        /** Преобразува време (HH:MM:SS) */
        time(value: TimeString, options?: TimeOptions): string;

        /** Преобразува дата / период */
        date(value: string, options?: DateOptions): string;

        /** Налични речници / числа */
        numbers: Record<string, any>;
    }

    const nums2wordsBG: Num2WordsBG;
    export default nums2wordsBG;
}
