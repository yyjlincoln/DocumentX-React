// import axios from 'axios';
import React from 'react';

// App.js should be the provider of this context.
export const UserContext = React.createContext({})

export class Common {
    APIAddress: string;

    constructor({ APIAddress = "https://apis.mcsrv.icu/" }: { APIAddress?: string }) {
        this.APIAddress = APIAddress;

    }

}