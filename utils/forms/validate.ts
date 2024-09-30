
export const isEmailValid = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    // simplified from https://jsfiddle.net/ghvj4gy9/
    return re.test(String(email).toLowerCase());
};

export const isPasswordValid = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character (@$!%*?&)
    return re.test(password);
};

export const isNumercic = (value: string) => {
    const re = /^[0-9]+$/;
    return re.test(value);
}