export interface SignupProps {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: number;
    houseNumber: number;
    houseType: string;
    block: string;
    color: string;
}

export interface SigninProps {
    email: string;
    password: string;
}