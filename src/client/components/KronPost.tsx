import * as React from "react";

export const Router= (path: string, element: (props?)=>(React.JSX.Element), ...props) =>{
    if(window.location.pathname.toLowerCase().startsWith(path)){
        if(props){
            return element(props);
        }else{
            return element();
        }
    }
    return (<span></span>);
}