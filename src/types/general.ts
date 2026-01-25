export type Response<T> = {
    data: T;
    message: string;
    status: string;
    extra: any;
}
