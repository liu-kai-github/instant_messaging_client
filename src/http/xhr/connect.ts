import axios, {AxiosPromise, Canceler} from 'axios';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

interface conectParams {
    jsonrpc: '2.0';
    method: string;
    id: string;
    params: string[];
}

function connect(method: string, data: conectParams | conectParams[]): { promise: AxiosPromise, cancel: Canceler } {

    const promise: AxiosPromise = axios({
        method: 'post',
        url: 'http://localhost:8080/api',
        data,
        cancelToken: source.token,
        // baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const cancel: Canceler = source.cancel;
    return {promise, cancel};
}

export default connect;
