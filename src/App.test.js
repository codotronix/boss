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

    // it('should open apps window if cliked on apps in dock', () => {
    //     const { container } = render(<App />)
    //     const appsBtn = screen.getByRole('button', {
    //         name: 'Apps'
    //     })

    //     // 1st steps appsBtn should be present
    //     expect(appsBtn).toBeInTheDocument()

    //     // Initially there should be No WinFrames on the screen
    //     let winFrames = container.querySelectorAll('.WinFrame')
    //     expect(winFrames.length).toBe(0)

    //     // Now click on the button
    //     act(() => userEvent.click(appsBtn))

    //     // And there should be ONE WinFrame opened
    //     winFrames = container.querySelectorAll('.WinFrame')
    //     expect(winFrames.length).toBe(1)
    // })

    it('should open only single instance for single instance applications', () => {
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

        // Clicking multiple times will NOT have more WinFrames
        // as "Apps" is a single instance only Application
        act(() => userEvent.click(appsBtn))
        act(() => userEvent.click(appsBtn))
        act(() => userEvent.click(appsBtn))
        winFrames = container.querySelectorAll('.WinFrame')
        expect(winFrames.length).toBe(1)
    })

})
