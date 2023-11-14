import { render, screen, act, cleanup } from './test-setup/test-utils';
import App from './App';
import { APPS_DETAILS } from './const/APPS_DETAILS';
import userEvent from '@testing-library/user-event';

describe('App', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render', () => {
        render(<App />)
    })

    it('should render The Dock', () => {
        const { container } = render(<App />)
        const dock = container.querySelector('#thedock')
        expect(dock).toBeInTheDocument()
    })

    it('should render Dock with all the Docked Apps', () => {
        render(<App />)
        let dockedAppsNames = Object.values(APPS_DETAILS).filter(a => a.docked).map(a => a.name)
        // For each docked app
        // there should be a button in the Dock
        for (let da of dockedAppsNames) {
            const btn = screen.getByRole('button', {
                name: da
            })

            expect(btn).toBeInTheDocument()
        }
    })

    it('should open apps windows if cliked on apps in Dock', () => {
        const { container } = render(<App />)
        const appsBtn = screen.getByRole('button', {
            name: 'Apps'
        })

        // 1st steps appsBtn should be present
        expect(appsBtn).toBeInTheDocument()

        // Initially there should be No WinFrames on the screen
        let winFrames = container.querySelectorAll('.WinFrame')
        expect(winFrames.length).toBe(0)

        // Now click on the button
        act(() => userEvent.click(appsBtn))

        // And there should be ONE WinFrame opened
        winFrames = container.querySelectorAll('.WinFrame')
        expect(winFrames.length).toBe(1)
    })

    it('should open multiple instances on multiple clicks on Dock Apps', () => {
        const { container } = render(<App />)
        const foldersBtn = screen.getByRole('button', {
            name: 'Folders'
        })

        // 1st steps foldersBtn should be present
        expect(foldersBtn).toBeInTheDocument()

        const previousWinFrameCount = container.querySelectorAll('.WinFrame').length

        // Since Folders is not a single instance app
        // let's try to open 3 more of it
        // Click 3 times on the foldersBtn
        act(() => userEvent.click(foldersBtn))
        act(() => userEvent.click(foldersBtn))
        act(() => userEvent.click(foldersBtn))
        
        const currentWinFrameCount = container.querySelectorAll('.WinFrame').length

        expect(currentWinFrameCount-previousWinFrameCount).toBe(3)
    })

    it('WinFrame close button should close the application', () => {
        const { container } = render(<App />)
        // let's create some winframes
        // i.e. open some applications
        const foldersBtn = screen.getByRole('button', {
            name: 'Folders'
        })
        // 1st steps foldersBtn should be present
        expect(foldersBtn).toBeInTheDocument()
        act(() => userEvent.click(foldersBtn))
        act(() => userEvent.click(foldersBtn))

        // At this point there should be >1 WinFrames
        let winframesCount = container.querySelectorAll('.WinFrame').length
        expect(winframesCount).toBeGreaterThan(1)

        // Now let's grab all the WinFrames Close buttons
        let winframeCloseBtns = screen.getAllByRole('button', {
            name: 'Close'
        })
        // Click on all the Close buttons
        act(() => {
            winframeCloseBtns.forEach(btn => userEvent.click(btn))
        })

        // There should be ZERO wireframes open
        winframesCount = container.querySelectorAll('.WinFrame').length
        expect(winframesCount).toBe(0)
    })

    // NOTE
    // THIS SHOULD BE TESTED WHEN NO APPS ARE OPEN,
    // BECAUSE SINGLE-INSTANCE APP, IF ALREADY OPEN, WON'T OPEN AGAIN...
    // IT CAN BE DONE HERE AS WE JUST CLOSED ALL THE APPS IN THE PREVIOUS TEST
    it('all the apps in the dock should open when clicked', () => {
        const { container } = render(<App />)
        let dockedAppsNames = Object.values(APPS_DETAILS).filter(a => a.docked).map(a => a.name)

        // how many WinFrames were already open?
        const previousWinFrameCount = container.querySelectorAll('.WinFrame').length

        // For each docked app
        // there should be a button in the Dock
        // Click it
        for (let da of dockedAppsNames) {
            const btn = screen.getByRole('button', {
                name: da
            })

            expect(btn).toBeInTheDocument()
            act(() => userEvent.click(btn))
        }

        // total how many winFrames are now open
        const currentWinFrameCount = container.querySelectorAll('.WinFrame').length

        // The differences should be exactly the number of apps
        // in the docks that we just clicked to open
        expect(currentWinFrameCount-previousWinFrameCount).toBe(dockedAppsNames.length)
    })
})
