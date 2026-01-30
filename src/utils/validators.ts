import dayjs from "dayjs";

export const required = (v?: string) =>
    v ? undefined : "поле не може бути пустим";

export const inp = (v?: string) =>
    !v || !v.trim() || v && !/^\d{10}$/.test(v) ? "ІПН має містити 10 цифр" : undefined;

export const minThreeLetters = (v?: string) => {
    if (!v || !v.trim()) return "поле не може бути пустим";

    const value = v.replace(/\s/g, "");

    const ukrainianLetters = value.match(/[ҐґЄєІіЇїА-ЩЬЮЯҐґЄєІіЇїа-щьюя]/g) || [];
    if (ukrainianLetters.length < 3) return "мінімум 3 літери";

    const invalidChars = value.match(/[^ҐґЄєІіЇїА-ЩЬЮЯҐґЄєІіЇїа-щьюя]/);
    if (invalidChars) return "використвуйте тільки українськи літери";

    return undefined;
}

export const minSixLetters = (v?: string) => {
    if (!v || !v.trim()) {
        return "поле не може бути пустим";
    }

    if (v.trim().length < 6) {
        return "мінімум 6 символів";
    }

    return undefined;
};

export const requiredSelect = (value?: string) =>
    value && value !== "" ? undefined : "поле не може бути пустим";

export const email = (v?: string) => {
    if (!v || !v.trim()) {
        return "поле не може бути пустим";
    }

    if (v && !/^\S+@\S+\.\S+$/.test(v)) {
        return "Некоректний email";
    }
    return undefined;
}

export const phoneUA = (v?: string) => {
    if (!v || !v.trim()) {
        return "поле не може бути пустим";
    }
    const cleaned = v.replace(/\D/g, "");

    const validOperators = [
        "044", "039", "050", "066", "095", "099", "067", "068", "096", "097", "098", "063", "073", "093", "091", "092", "094",
    ];

    const operatorCode = cleaned.slice(2, 5);

    if (!/^380\d{9}$/.test(cleaned) || !validOperators.includes(operatorCode)) {
        return "Некоректний номер телефона. Приклад: +38 (093) 999-88-77";
    }

    return undefined;
};

export const twoLettersNineDigits = (v?: string) => {
    if (!v || !v.trim()) {
        return "поле не може бути пустим";
    }

    const value = v.trim();
    const regex = /^(?:\p{L}{2})?\d{9}$/u;

    if (!regex.test(value)) {
        return "Номер введено не корректно, поле має містити 9 цифр";
    }

    return undefined;
};

export const documentNumber = (v?: string) => {
    if (!v || !v.trim()) {
        return "поле не може бути пустим";
    }

    const value = v.trim();

    const regex = new RegExp(`^["А-ЩЬЮЯҐЄІЇа-щьюяґєії"]{3}\\d{5,9}$`);

    if (!regex.test(value)) {
        return "Номер введено не корректно, поле має містити 3 українські літери та 5–9 цифр";
    }

    return undefined;
};

const calculateICAOChecksum = (value: string): number => {
    const weights = [7, 3, 1];
    let sum = 0;

    for (let i = 0; i < value.length; i++) {
        const char = value[i].toUpperCase();

        let val: number;

        if (char >= "0" && char <= "9") {
            val = parseInt(char, 10);
        } else if (char >= "A" && char <= "Z") {
            val = char.charCodeAt(0) - 55;
        } else if (char === "-") {
            val = 0;
        } else {
            val = 0;
        }

        sum += val * weights[i % 3];
    }

    return sum % 10;
};


export const personalIdValidator = (v?: string) => {
  if (!v || !v.trim()) {
    return "Поле не може бути пустим";
  }

  const value = v.trim();

  const regex = /^(\d{8})-(\d{4})(\d)$/;
  const match = value.match(regex);

  if (!match) {
    return "Номер введено некоректно, формат має бути РРРРММДД-ХХХХК";
  }

  const [, dateStr, seqStr, checkDigitStr] = match;

  if (!dayjs(dateStr, "YYYYMMDD", true).isValid()) {
    return "Некоректна дата народження";
  }

  const seq = parseInt(seqStr, 10);
  if (seq < 1 || seq > 9999) {
    return "Порядковий номер має бути в діапазоні 0001–9999";
  }

  const expectedCheck = calculateICAOChecksum(dateStr + seqStr);
  if (expectedCheck !== parseInt(checkDigitStr, 10)) {
    return "Контрольна цифра некоректна";
  }

  return undefined;
};