import { useState } from "react"

export const UseForm = (initialvalue) => {
    const [values, setValues] = useState(initialvalue);
    return [values, (formType, formValue) => {
        if (formType === 'reset') {
            return setValues(initialvalue);
        }
        return setValues ({...values, [formType]: formValue})
    }];
}