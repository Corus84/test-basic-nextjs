import { IdObject } from "./id-object";

export interface PostData extends IdObject {
    title: string;
    id: string;
    date: Date;
}
