class Maybe {

}

export class Just extends Maybe {
    constructor(justValue) {
        this.just = justValue;
    }
}

export class Nothing extends Maybe {

}