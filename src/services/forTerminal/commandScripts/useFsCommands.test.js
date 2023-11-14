import { renderHook, AllTheProviders } from "../../../test-setup/test-utils";
import { useFsCommands } from "./useFsCommands";
import { initFileTree } from '../../../features/fileSystem/filesSlice'

const getHookResult = () => {
    const { result } = renderHook(useFsCommands, {
        wrapper: AllTheProviders
    })
    return result.current
}

describe('Test useFsCommands hook', () => {

    it('ls should return all files and folders in current directory', () => {
        const { ls } = getHookResult()
        const ctx = { currentFolderId: '/' }
        const children = Object.values(initFileTree)
                                .filter(f => f.parentId===ctx.currentFolderId)
                                .map(f => f.name)
        expect(ls(ctx)).toEqual([children, 0])
    })


    it('pwd should return the name of the current directory', () => {
        const { pwd } = getHookResult()

        // for root, the id and name both are "/"
        let ctx = { currentFolderId: '/' }
        expect(pwd(ctx)).toEqual(['/', 0])

        // for id="documents", the path name is "/Documents"
        ctx = { currentFolderId: 'documents' }
        expect(pwd(ctx)).toEqual(['/Documents', 0])
    })

    it('touch command should work properly', () => {
        const { touch } = getHookResult()
        const ctx = { currentFolderId: '/' }
        expect(touch(ctx, [])).toEqual(['', 0])
    })

    it('mkdir command should work properly', () => {
        const { mkdir } = getHookResult()
        const ctx = { currentFolderId: '/' }
        expect(mkdir(ctx, [])).toEqual(['', 0])
    })

    it('md command should work properly', () => {
        const { md } = getHookResult()
        const ctx = { currentFolderId: '/' }
        expect(md(ctx, [])).toEqual(['', 0])
    })

    it('cd command should change the directory', () => {
        const { cd } = getHookResult()
        const ctx = { currentFolderId: '/' }
        expect(cd(ctx, ['/Documents'])).toEqual(['', 0])
        expect(ctx.currentFolderId).toBe('documents')
    })

})