import { screen, render } from "../../../../test-setup/test-utils"
import DockIcon from "./DockIcon";

const createEl = () => render(<DockIcon appId="appId_1" name="my app" iconClass="fa-something" />)
beforeEach(() => createEl())

describe('DockIcon', () => {

    it('renders correctly', () => {
        render(<DockIcon />)
    })

    it('renders the button', () => {
        const el = screen.getByRole('button', {
            name: /my app/i
        })
        expect(el).toBeInTheDocument()
    })

    it('should have title as the app name', () => {
        const el = screen.getByTitle('my app')
        expect(el).toBeInTheDocument()
    })

    it('renders the icon', () => {
        const { container } = createEl()
        const icon = container.querySelector(".fa-something")
        expect(icon).toBeInTheDocument()
    })

})