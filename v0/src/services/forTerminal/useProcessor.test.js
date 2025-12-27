import { renderHook, AllTheProviders } from "../../test-setup/test-utils";
import { useProcessor } from "./useProcessor";

const ctx = { currentFolderId: '/' }

const getHookResult = () => {
    const { result } = renderHook(useProcessor, {
        wrapper: AllTheProviders,
        initialProps: ctx
    })
    return result.current
}

describe('Test useProcessor', () => {

    it('should give proper response for unknown commands', () => {
        const { process } = getHookResult()
        const res = process('someCommand arg1 arg2')
        expect(res).toEqual({ 
            msg: `Sorry could not find the command "<b>someCommand</b>"`,
            code: -1,
            ctx
        })
    })
})