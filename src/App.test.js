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

    it('should render Dock with all the buttons', () => {
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

    it('should open apps window if cliked on apps in dock', () => {
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

    it('should open multiple instances of applications on multiple clicks', () => {
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

    it('WinFrame close buttons should close the applications', () => {
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

})
