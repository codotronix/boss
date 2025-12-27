import { splitter } from "./utils"

describe('Test the Splitter', () => {

    test('Splitter should split', () => {
        expect(splitter('sky is blue')).toEqual(['sky', 'is', 'blue'])
    })

    test('Splitter should eat up extra spaces', () => {
        expect(splitter('  sky     is  blue     ')).toEqual(['sky', 'is', 'blue'])
    })

    test('Splitter should split preserving the quotes', () => {
        expect(splitter('You know "The vast sky" is "not blue" but colorless')).toEqual([
            'You', 'know', 'The vast sky', 'is', 'not blue', 'but', 'colorless'
        ])
    })

    test('Splitter should split commands and args', () => {
        expect(splitter('command -v -e --abc-xyz')).toEqual([
            'command', '-v', '-e', '--abc-xyz'
        ])
    })
})