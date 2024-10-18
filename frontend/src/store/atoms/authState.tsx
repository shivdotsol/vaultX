import { atom } from "recoil";
import { jwtDecode } from "jwt-decode";

//dummy jwt, just in case token is null
const dummyJwt =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwiaWF0IjoxNTE2MjM5MDIyfQ.hadEcMs26_XWrRJRYGbf4gNSfpJ0NHmF8qUMX_Q7FjQ";

export const userState = atom({
    key: "userState",
    default: jwtDecode<{
        firstName: string;
        lastName: string;
        email: string;
    }>(localStorage.getItem("token") || dummyJwt),
});
