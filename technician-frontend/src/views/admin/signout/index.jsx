import React from "react";
import { setCookie } from "data/cookie";

export default function SignOut() {
    setCookie("type", "");
    return (<div>Hello</div>)
}