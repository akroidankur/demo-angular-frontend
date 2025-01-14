import { Observable } from "rxjs";

export interface Fetchfunction<T> {
    (): Observable<T>;
}
