export interface Payment {
    paymentId: number;
    cardHoldersName: string;
    cardNumber: string;
    cardExpiryDate: string;
    cardCVV: string;
    paymentAmount: number;
}