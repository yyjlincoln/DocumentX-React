import axios from 'axios';

export class Common {
    APIAddress: string;

    constructor({APIAddress = "https://apis.mcsrv.icu/"}: {APIAddress?: string}) {
        this.APIAddress = APIAddress;
    }

}