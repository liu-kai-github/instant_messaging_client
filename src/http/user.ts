import JsonRPC from './xhr/JsonRPC';

interface returnResult {
    promise: Promise<any>,
    cancel: any;
}

/**
 * 登录
 */
export function user_login(params: string[]): returnResult {
    const req = new JsonRPC('user_login', params);
    const promise = req.fetchResult();
    const cancel = req.cancel;
    return {
        promise,
        cancel,
    };
}
