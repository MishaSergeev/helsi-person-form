import { Field } from "react-final-form"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import "antd/dist/reset.css"

import styles from "./CalendarField.module.css"

type Props = {
    name: string
    validate?: (value: any) => string | undefined
}

export const CalendarField = ({
    name,
    validate,
}: Props) => {
    return (
        <Field name={name} validate={validate}>
            {({ input, meta }) => {
                const hasError = meta.touched && meta.error

                return (
                    <>
                        <div className={styles.inputRow}>
                            <DatePicker
                                value={input.value ? dayjs(input.value) : null}
                                format="DD.MM.YYYY"
                                placeholder="ДД.ММ.РРРР"
                                onChange={(date) =>
                                    input.onChange(date ? date.format("YYYY-MM-DD") : "")
                                }
                                onBlur={input.onBlur}
                                status={hasError ? "error" : undefined}
                                variant="borderless"
                                className={[styles.input, hasError && styles.inputError]
                                    .filter(Boolean)
                                    .join(" ")}
                            />

                        </div>

                        {hasError && (
                            <div className={styles.errorText}>{meta.error}</div>
                        )}
                    </>
                )
            }}
        </Field>
    )
}
