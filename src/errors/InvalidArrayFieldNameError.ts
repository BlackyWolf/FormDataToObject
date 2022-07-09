export class InvalidArrayFieldNameError extends Error {
    public invalidFieldName: string;

    constructor(fieldName: string) {
        super(`The field name '${fieldName}' is not a valid property name for arrays.`);

        this.invalidFieldName = fieldName;
    }
}
