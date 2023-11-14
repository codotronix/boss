import { screen, render } from '../../../test-setup/test-utils'
import Dock from './Dock'
import { APPS_DETAILS } from '../../../const/APPS_DETAILS'

describe('Dock', () => {

    it('should render', () => {
        render(<Dock />)
    })

    it('should render all the docked apps', () => {
        render(<Dock />)

        // All the apps from APPS_DETAILS with docked: true
        // should have been rendered
        const dockedApps = Object.values(APPS_DETAILS).filter(a => a.docked)
        for(let da of dockedApps) {
            const btn = screen.getByRole('button', { name: da.name })
            expect(btn).toBeInTheDocument()
        }
    })

    it('should render the toggle minimize button', () => {
        render(<Dock />)
        const btn = screen.getByRole('button', {  name: /toggle minimized apps/i})
        expect(btn).toBeInTheDocument()
    })

})