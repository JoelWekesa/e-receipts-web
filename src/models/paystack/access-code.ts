export interface PayStackAccessCode {
    id: string;
    status: boolean;
    message: string;
    authorization_url: string;
    access_code: string;
    reference: string;
    invoiceId: string;
}
