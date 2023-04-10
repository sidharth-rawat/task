export const http_formatter = (data: any, message: string = 'ok', success: boolean = true) => {
    if (success === false && data.code == 11000) {
        message = ``;
        Object.keys(data.keyValue).forEach(key => {
            message += `${key} : ${data.keyValue[key]} already exist in our record. `
        })
    }
    if(success === false && data.name === 'ZodError'){
        message = data.issues.map((el: any) => (
            `${el.path.join(",")} : ${el.message}`
        )).join(". ");
    }
    if (success === false && data.name == "ValidationError") message = data.message;

    return { data, success, message }
}

export const isEmail = (email: string):boolean =>  {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

export const AUTH_ERROR = "UserName or password not matched, please retry.";