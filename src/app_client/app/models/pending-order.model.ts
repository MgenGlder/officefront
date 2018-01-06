export class Order {
    protected constructor(
        public reason: string,//using public, or any modifier, automatically instantiantes the parameter in the class for you.
        public notes: string,
        public dateOfVisit: String,
        public visitingDoctor: string,
        public reporter: string
    ) { }
}
export class SpecialistOrder extends Order {
    public typeOfOrder: string = "specialist";
    constructor(
        public type: string,
        public reason: string,
        public location: string,
        public notes: string,
        public readonly dateOfVisit: String, //has to be initialized in constructor, afterwards cannot be changed.
        public readonly visitingDoctor: string,
        public readonly reporter: string
    ) { super(reason, notes, dateOfVisit, visitingDoctor, reporter) }
}

export class TestOrder extends Order {
    public typeOfOrder: string = "test";
    constructor(
        public tests: Array<{value: string, text: string}>,
        public reason: string,
        public location: string,
        public notes: string,
        public readonly dateOfVisit: String,
        public readonly visitingDoctor: string,
        public readonly reporter: string
    ) {
        super(reason, notes, dateOfVisit, visitingDoctor, reporter);
    }
}

export class BloodworkOrder extends Order {
    public typeOfOrder: string = "bloodwork";
    constructor(
        public bloodTests: Array<{value: string, text: string}>,
        public bloodTestsMappingArray: Array<any>,
        public reason: string,
        public location: string,
        public notes: string,
        public readonly dateOfVisit: String,
        public readonly visitingDoctor: string,
        public readonly reporter: string
    ) {
        super(reason, notes, dateOfVisit, visitingDoctor, reporter);
    }
}
export class NurseOrder extends Order {
    public typeOfOrder: string = "nurse";
    constructor(
        public nursePurpose: Array<{value: string, text: string}>,
        public reason: string,
        public notes: string,
        public readonly dateOfVisit: String,
        public readonly visitingDoctor: string,
        public readonly reporter: string
    ){
        super(reason, notes, dateOfVisit, visitingDoctor, reporter);
    }
}
export class FullDoctorsOrder {
    constructor() {

    }
}