import { Field, useForm, useField } from "react-final-form"
import { useEffect, useRef } from "react"
import { CustomSwitch } from "../../../Switch/CustomSwitch"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import styles from "./TextField.module.css"

type Props = {
  name: string
  backgroundValue?: string
  validate?: (value: any) => string | undefined
  errorText?: string
  optional?: boolean
  optionalToggleName?: string
  disabledValue?: string
  optionalHint?: string
  optionalToggleDefault?: boolean
  bottomText?: string
}

export const TextField = ({
  name,
  backgroundValue = "",
  validate,
  optional = false,
  optionalToggleName,
  disabledValue = "",
  optionalHint = "",
  optionalToggleDefault = true,
  bottomText = "",
}: Props) => {
  const form = useForm()
  const previousValueRef = useRef<string | null>(null)

  const toggleField =
    optional && optionalToggleName
      ? useField<boolean>(optionalToggleName, {
        subscription: { value: true },
        initialValue: optionalToggleDefault,
      })
      : null

  const isEnabled = toggleField ? !!toggleField.input.value : true
  const isDisabled = !isEnabled

  useEffect(() => {
    if (isDisabled) {
      if (previousValueRef.current === null) {
        previousValueRef.current = form.getFieldState(name)?.value ?? ""
        form.change(name, disabledValue)
      }
    } else {
      if (previousValueRef.current !== null) {
        form.change(name, previousValueRef.current)
        previousValueRef.current = null
      }
    }
  }, [isDisabled, form, name, disabledValue])

  return (
    <Field
      name={name}
      validate={isDisabled ? undefined : validate}
    >
      {({ input, meta }) => {
        const hasError = meta.touched && meta.error
        const showBackground = !input.value && backgroundValue

        return (
          <>
            <div className={styles.inputRow}>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  {...input}
                  disabled={isDisabled}
                  className={[
                    styles.input,
                    isDisabled && styles.inputDisabled,
                    hasError && styles.inputError,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />

                {showBackground && (
                  <span className={styles.backgroundValue}>
                    {backgroundValue}
                  </span>
                )}
              </div>

              {optional && toggleField && (
                <div className={styles.toggle}>
                  <CustomSwitch
                    checked={!!toggleField.input.value}
                    onChange={(e) => toggleField.input.onChange(e.target.checked)}
                  />
                </div>
              )}

              {hasError && (
                <InfoOutlinedIcon
                  className={
                    optional
                      ? styles.errorIconWithToggle
                      : styles.errorIconNoToggle
                  }
                />
              )}
            </div>

            {hasError && !isDisabled && (
              <div className={styles.errorText}>{meta.error}</div>
            )}
            {!hasError && isDisabled && optionalHint && (
              <div className={styles.optionalHint}>{optionalHint}</div>
            )}
            {!hasError && bottomText && (
              <div className={styles.optionalHint}>{bottomText}</div>
            )}
          </>
        )
      }}
    </Field>

  )
}