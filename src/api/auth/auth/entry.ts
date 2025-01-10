import BaseApiClass from '../../base-class'
import type { SignUpReq } from './requests'
import type { SignUpRes } from './responses'

class Entry extends BaseApiClass {
    public async signUp(body: SignUpReq) {
        return this.basePostMethod<SignUpRes>('sign-up', body)
    }
}

const AUTH_API = new Entry()
export { AUTH_API }
