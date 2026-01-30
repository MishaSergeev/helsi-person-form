import { Form } from "react-final-form";
import { FieldContainer } from "../../ui/FieldContainer/FieldContainer";
import {
    patientDataFields,
    patientDataContactFields,
    patientDocumentFields,
} from "../config/personFieldsConfig";
import { Button } from "../../ui/Button/Button";
import type { PersonFormValues } from "../../types/person";
import styles from "./PersonForm.module.css";

const initialValues: PersonFormValues = {
    lastName: "",
    firstName: "",
    middleName: "",
    isMiddleName: true,
    inp: "",
    isInp: true,
    birthDate: "",
    gender: "",
    country: "",
    birthPlace: "",
    contactType: "",
    secretWord: "",
    phone: "",
    email: "",
    documentType: "",
    documentNumber: "",
    issuedBy: "",
    issuedAt: "",
    expiresAt: "",
    UNZR: "",
};

export const PersonForm = () => {
    return (
        <Form<PersonFormValues>
            initialValues={initialValues}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2>Дані пацієнта</h2>
                    <div className={styles.gridThree}>
                        {patientDataFields.map((field) => (
                            <FieldContainer key={field.name} {...field} />
                        ))}
                    </div>

                    <div className={styles.gridTwo}>
                        {patientDataContactFields.map((field) => (
                            <FieldContainer key={field.name} {...field} />
                        ))}
                    </div>

                    <h2>Документ, що посвідчує особу</h2>
                    <div className={styles.gridTwo}>
                        {patientDocumentFields.map((field) => (
                            <FieldContainer key={field.name} {...field} />
                        ))}
                    </div>

                    <div className={styles.buttonWrapper}>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            )}
        />
    );
};
