export interface Event {
    _id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
    foodType: string;
    pickupInstructions?: string;
    eventType?: string;
    terms: boolean;
    userId: string;
}