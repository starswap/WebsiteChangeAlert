class Maybe {

}

export class Just extends Maybe {
    constructor(justValue) {
        super()
        this.justValue = justValue;
    }
}

export class Nothing extends Maybe {

}