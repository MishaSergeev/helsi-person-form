import {
  required,
  inp,
  minThreeLetters,
  requiredSelect,
  minSixLetters,
  email,
  phoneUA,
  twoLettersNineDigits,
  //documentNumber,
  personalIdValidator
} from "../../utils/validators";

type BaseFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
  backgroundValue?: string;
  validate?: (value: any) => string | undefined;
  errorText?: string;
  optional?: boolean;
  optionalToggleName?: string;
  disabledValue?: string;
  optionalHint?: string;
  optionalToggleDefault?: boolean;
  bottomText?: string;
};

export type TextProps = BaseFieldProps & { type: "text" };
export type SelectProps = BaseFieldProps & {
  type: "select";
  placeholder: string;
  options: { label: string; value: string }[];
};
export type CalendarProps = BaseFieldProps & { type: "calendar" };

export type FieldProps = TextProps | SelectProps | CalendarProps;

export const patientDataFields: FieldProps[] = [
  {
    type: "text",
    name: "lastName",
    label: "Прізвище*",
    validate: minThreeLetters,
  },
  {
    type: "text",
    name: "firstName",
    label: "Імʼя*",
    validate: minThreeLetters,
  },
  {
    type: "text",
    name: "middleName",
    label: "По батькові*",
    validate: minThreeLetters,
    errorText: "поле не може бути пустим",
    optional: true,
    optionalToggleName: "isMiddleName",
    disabledValue: "Немає по батькові",
    optionalHint: "Немає по батькові згідно документів",
    optionalToggleDefault: true,
  },
  {
    type: "text",
    name: "inp",
    label: "РНОКПП (ІНП)*",
    validate: inp,
    errorText: "поле не може бути пустим",
    optional: true,
    optionalToggleName: "isInp",
    disabledValue: "Немає по батькові",
    optionalHint: "Немає по батькові згідно документів",
    optionalToggleDefault: true,
  },
  {
    type: "calendar",
    name: "birthDate",
    label: "Дата народження*",
    validate: required,
  },
  {
    type: "select",
    name: "gender",
    label: "Стать*",
    placeholder: "-- Вибрати --",
    options: [
      { label: "жіноча", value: "жіноча" },
      { label: "чоловіча", value: "чоловіча" },
    ],
    validate: requiredSelect,
  },
];

export const patientDataContactFields: FieldProps[] = [
  {
    type: "text",
    name: "country",
    backgroundValue: "Країна народження*",
    validate: minThreeLetters,
  },
  {
    type: "text",
    name: "birthPlace",
    backgroundValue: "Місце народження*",
    validate: minThreeLetters,
  },
  {
    type: "select",
    name: "contactType",
    label: "Бажаний спосіб зв'язку з пацієнтом",
    placeholder: "-- Вибрати --",
    options: [
      { label: "Електронною поштою", value: "Електронною поштою" },
      { label: "Телефоном", value: "Телефоном" },
    ],
    validate: requiredSelect,
  },
  {
    type: "text",
    name: "secretWord",
    backgroundValue: "Секретне слово(не менше 6 символів)*",
    validate: minSixLetters,
  },
  {
    type: "text",
    name: "phone",
    label: "Контактний номер телефону",
    backgroundValue: "+38 (___) ___-__-__",
    validate: phoneUA,
  },
  {
    type: "text",
    name: "email",
    label: "Адреса електронної пошти",
    backgroundValue: "example@example.com",
    validate: email,
  },
];

export const patientDocumentFields: FieldProps[] = [
  {
    type: "select",
    name: "documentType",
    label: "Тип документу*",
    placeholder: "-- Вибрати --",
    options: [
      { label: "Посвідчення особи, яка потребує додаткового захисту", value: "Посвідчення особи, яка потребує додаткового захисту" },
      { label: "Паспорт (ID-картка)", value: "Паспорт (ID-картка)" },
      { label: "Паспорт (книжечка)", value: "Паспорт (книжечка)" },
      { label: "Посвідка на постійне проживання в Україні", value: "Посвідка на постійне проживання в Україні" },
      { label: "Посвідка біженця", value: "Посвідка біженця" },
      { label: "Посвідка на проживання", value: "Посвідка на проживання" },
      { label: "Тимчасове посвідчення громадянина України", value: "Тимчасове посвідчення громадянина України" },
    ],
    validate: requiredSelect,
  },
  {
    type: "text",
    name: "documentNumber",
    backgroundValue: "Серія (за наявності), номер*",
    validate: twoLettersNineDigits,
  },
  {
    type: "calendar",
    name: "issuedBy",
    label: "Коли видано*",
    validate: required,
  },
  {
    type: "calendar",
    name: "issuedAt",
    label: "Діє до",
  },
  {
    type: "text",
    name: "expiresAt",
    label: "Ким видано*",
    validate: minThreeLetters,
  },
  {
    type: "text",
    name: "UNZR",
    label: "Запис №(УНЗР)",
    backgroundValue: "РРРРММДД-ХХХХХ",
    validate: personalIdValidator,
    bottomText:"Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)",
  },
];
