import { TextField } from "./fields/TextField/TextField";
import { SelectField } from "./fields/SelectField/SelectField";
import { CalendarField } from "./fields/CalendarField/CalendarField";
import styles from "./FieldContainer.module.css";

type TextProps = {
  type: "text";
  name: string;
  label?: string;
  backgroundValue?: string;
  validate?: (value: any) => string | undefined;
  optional?: boolean;
  optionalToggleName?: string;
  disabledValue?: string;
  optionalHint?: string;
  optionalToggleDefault?: boolean;
  errorText?: string;
};

type SelectProps = {
  type: "select";
  name: string;
  label?: string;
  placeholder: string;
  options: { label: string; value: string }[];
  validate?: (value: any) => string | undefined;
};

type CalendarProps = {
  type: "calendar";
  name: string;
  label?: string;
  validate?: (value: any) => string | undefined;
};

type Props = TextProps | SelectProps | CalendarProps;

export const FieldContainer = (props: Props) => {
  const { type, label, name } = props;
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {type === "text" && <TextField {...(props as TextProps)} />}
      {type === "select" && <SelectField {...(props as SelectProps)} />}
      {type === "calendar" && <CalendarField {...(props as CalendarProps)} />}
    </div>
  );
};
