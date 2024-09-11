import { ThemeColors } from '../../../themes/Theme';
import * as Themes from '../../../themes/Themes';
export interface CookieDataType<T>{ 
    key: string;
    reader: (value: object) => T;
    writer: (value: T) => any;
}

export class ThemeCookie implements CookieDataType<ThemeColors>{
    public reader: (value: object) => ThemeColors = (value: object) => {
        switch(value.toString()){
            case "blackandwhite": return Themes.blackTheme;
            case "classic": return Themes.clasicTheme;
            default: return Themes.clasicTheme;
        }
        ;
    }
    public writer: (value: ThemeColors) => any = (value: ThemeColors) => {
        switch(value){
            case Themes.blackTheme: return "blackandwhite";
            case Themes.clasicTheme: return "classic";
            default: return "classic";
        }
    }
    public key: string = "theme";
    public static lastBuild: ThemeCookie;

    public static build(): ThemeCookie{
        if(ThemeCookie.lastBuild){
            return ThemeCookie.lastBuild;
        }
        ThemeCookie.lastBuild = new ThemeCookie();
        return ThemeCookie.lastBuild
    }

}
    
export default class CookieReader {
    public static doc: Document;

    public static setup(doc: Document) {
        doc = doc;
    }

    public static getCookie<T>( cookie: CookieDataType<T>): T | undefined {
        if(CookieReader.doc){
            if(CookieReader.doc.cookie === "") CookieReader.doc.cookie = "{}";
            let read: {[key: string]: any } = JSON.parse(CookieReader.doc.cookie ?? "{}");
            if(read[cookie.key]){
                return cookie.reader(read[cookie.key]);
            }
        }
    }

    public static getCookieDef<T>( cookie: CookieDataType<T>, def: T): T {
        if(CookieReader.doc){
            if(CookieReader.doc.cookie === "") CookieReader.doc.cookie = "{}";
            let read: {[key: string]: any } = JSON.parse(CookieReader.doc.cookie ?? "{}");
            if(read[cookie.key]){
                return cookie.reader(read[cookie.key]);
            }
        }
        return def;
    }

    public static setCookie<T>( val: T, cookie: CookieDataType<T>) {
        if(CookieReader.doc){
            if(CookieReader.doc.cookie === "") CookieReader.doc.cookie = "{}";
            let read: {[key: string]: any } = JSON.parse(CookieReader.doc.cookie);
            read[cookie.key] = cookie.writer(val);
            CookieReader.doc.cookie = JSON.stringify(read);
        }
    }


}