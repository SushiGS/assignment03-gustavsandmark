export class PayloadGenerator {
    static randomGeneratedNewRoomPayload = () => {
        return {
            category: 'double',
            floor: 999,
            number: 999,
            available: true,
            price: 999,
            features: [
                'balcony', 'ensuite'
            ]
        };
    };

    static randomGeneratedRoomEditPayload = (existingRoomPayload: object) => {
        return {
            ...existingRoomPayload,
            category: 'suite',
            floor: 888,
            number: 888,
            price: 888,
            features: ['balcony', 'view'],
        };
    };

    static randomGeneratedNewClientPayload = () => {
        return {
            name: "Gustav",
            email: "Gustav@bajs.com",
            telephone: "09090909090"
        };
    };

    static randomGeneratedClientEditPayload = (existingClientPayload: object) => {
        return {
            ...existingClientPayload,
            name: "Gustav2",
            email: "Gustav@bajs.comm",
            telephone: "0909090909011"
        };
    };

    static randomGeneratedNewBillPayload = () => {
        return {
            value: 999,
            paid: false
        };
    };

    static randomGeneratedBillEditPayload = (existingBillPayload: object) => {
        return {
            ...existingBillPayload,
            value: 888,
            paid: true
        };
    };

    static randomGeneratedNewReservationPayload = () => {
        return {
            start: "1994-04-24",
            end: "2024-04-24",
            client: 1,
            room: 1,
            bill: 1
        };
    };

    static randomGeneratedReservationEditPayload = (existingReservationPayload: object) => {
        return {
            ...existingReservationPayload,
            start: "1995-04-24",
            end: "2025-04-24",
            client: 2,
            room: 2,
            bill: 2
        };
    };




}


