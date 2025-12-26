import { render, screen } from '../../../../../test-setup/test-utils'
import userEvent from '@testing-library/user-event'
import File from './File'
import { FILE_TYPE } from '../../../../../const/FILE_CONST'

const TEST_FILE = {
    id: 'fileID1',
    name: 'file 1',
    fileType: FILE_TYPE.FILE
}
const TEST_FOLDER = {
    id: 'folderID1',
    name: 'folder 1',
    fileType: FILE_TYPE.FOLDER
}

describe('File', () => {
    it('should render', () => {
        render(<File file={TEST_FILE} />)
    })

    it('should open when double clicked', () => {
        const open = jest.fn()
        render(<File open={open} file={TEST_FILE} />)
        
        const btn = screen.getByRole('button')

        // The button should be there
        expect(btn).toBeInTheDocument()

        // Double click on the button
        userEvent.dblClick(btn)
        // Expect open to have been called
        expect(open).toHaveBeenCalledTimes(1)
    })

    it('should show file icon for file', () => {
        const { container } = render(<File file={TEST_FILE} />)
        const fileIcon = container.querySelector('i[class*="file"]')
        const folderIcon = container.querySelector('i[class*="folder"]')
        // There should be A FILE ICON
        // and NOT A FOLDER ICON
        expect(fileIcon).toBeInTheDocument()
        expect(folderIcon).not.toBeInTheDocument()
    })

    it('should show folder icon for folder/directory', () => {
        const { container } = render(<File file={TEST_FOLDER} />)
        const fileIcon = container.querySelector('i[class*="file"]')
        const folderIcon = container.querySelector('i[class*="folder"]')
        // There should be A FOLDER ICON
        // and NOT A FILE ICON
        expect(folderIcon).toBeInTheDocument()
        expect(fileIcon).not.toBeInTheDocument()
    })
})