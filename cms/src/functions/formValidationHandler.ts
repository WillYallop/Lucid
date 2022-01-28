// TODO: allow custom validation methods to be passed down.


interface formValidationHandlerProps {
    e: React.FormEvent
    customValidation?: Array<{
        field_name: string
        validator: (value: string) => string
    }>
    onValidatePass: (res: formSuccessRes) => any
    onValidateFail?: () => any
}
interface formSuccessRes {
    [key: string]: string
}

const formValidationHandler = (prop: formValidationHandlerProps) => {

    prop.e.preventDefault();
    
    const form = prop.e.target as HTMLFormElement;
    const field = Array.from(form.elements) as Array<HTMLFormElement>;

    // Reset fields
    field.forEach((i) => {
        i.setCustomValidity('');
        i.parentElement?.classList.remove('invalid');
    });

    // Add custom validators
    if(prop.customValidation) {
        prop.customValidation.forEach((conf) => {
            let err = conf.validator(form[conf.field_name].value);
            form[conf.field_name].setCustomValidity(err);
        });
    }

    if(!form.checkValidity()) {
        //Check fields for fail
        field.forEach((i) => {
            if(!i.checkValidity()) i.parentElement?.classList.add('invalid');
        });
        if(prop.onValidateFail) prop.onValidateFail();
    }
    else {
        let successRes: formSuccessRes = {};
        field.forEach((ele) => {
            if(ele.name) {
                successRes[ele.name] = ele.value;
            }
        });
        prop.onValidatePass(successRes);
    }
}

export default formValidationHandler;