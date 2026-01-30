import { Field } from "react-final-form"
import { useEffect, useRef, useState } from "react"
import styles from "./SelectField.module.css"

type Option = {
  label: string
  value: string
}

type Props = {
  name: string
  placeholder: string
  options: Option[]
  validate?: (value: any) => string | undefined
}

export const SelectField = ({
  name,
  placeholder,
  options,
  validate,
}: Props) => {
  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => {
        const [open, setOpen] = useState(false)
        const ref = useRef<HTMLDivElement>(null)

        const allOptions: Option[] = [
          { label: placeholder, value: "" },
          ...options,
        ]

        const selected =
          allOptions.find(o => o.value === input.value) ?? allOptions[0]

        useEffect(() => {
          const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
              setOpen(false)
            }
          }

          document.addEventListener("mousedown", handleClickOutside)
          return () =>
            document.removeEventListener("mousedown", handleClickOutside)
        }, [])
        const hasError =
          (meta.touched || meta.submitFailed) && meta.error

        return (
          <div className={styles.wrapper} ref={ref}>
            <div
              className={`${styles.control} ${open ? styles.focus : ""
                } ${hasError ? styles.errorBorder : ""}`}
              onClick={() => {
                if (!open) {
                  input.onFocus()
                }
                setOpen(prev => !prev)
              }}
            >
              {selected.label}
            </div>

            {open && (
              <ul className={styles.menu}>
                {allOptions.map(opt => {
                  const isSelected = opt.value === input.value

                  return (
                    <li
                      key={opt.label}
                      className={`${styles.option} ${isSelected ? styles.selected : ""
                        }`}
                      onClick={() => {
                        input.onChange(opt.value)
                        input.onBlur()
                        setOpen(false)
                      }}
                    >
                      {isSelected && <span className={styles.check} />}
                      {opt.label}
                    </li>
                  )
                })}
              </ul>
            )}

            {hasError && <div className={styles.error}>{meta.error}</div>}
          </div>
        )
      }}
    </Field>
  )
}
