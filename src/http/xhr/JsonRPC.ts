import {AxiosPromise, Canceler} from 'axios';
import * as uuid from 'uuid';

import connect from './connect';

class JsonRPC {
    cancel: Canceler | null = null;
    private res: { promise: AxiosPromise, cancel: Canceler } | null;
    private url: string = '';

    constructor(method: string, params: string[]) {

        const data = {
            jsonrpc: '2.0' as '2.0',
            id: uuid.v1(),
            method,
            params,
        };

        this.res = connect(method, data);
        this.cancel = this.res.cancel;
    }

    async fetchResult() {
        try {
            const res = this.res ? (await this.res.promise) : null;
            if (res) {
                if (res.status === 200) {
                    return res.data;
                } else {
                    return new Error('接口出错 ' + this.url)
                }
            }
        } catch (e) {
            console.log(e);
        }

    }
}

export default JsonRPC;
