import { generateText } from '../src/util/build-page';

test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe("Max (29 years old)");
});