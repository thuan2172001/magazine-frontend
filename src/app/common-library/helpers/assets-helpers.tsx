export function RemoveCSSClass(ele:any, cls:any) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
}

export function AddCSSClass(ele:any, cls:any) {
    ele.classList.add(cls);
}

export const ToAbsoluteUrl = (pathname:string) => process.env.PUBLIC_URL + pathname;
