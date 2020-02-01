var db = require('./DrawBoard');
var config = { drawingBoard: { width: 3, height: 3 } };
test('Instantiates', () => {
    expect(new db(config.drawingBoard)).toBeTruthy();
});
test('get and set coords', () => {
    var b = new db(config.drawingBoard);
    expect(b.getCoords(0, 0)).toBe(0);
    expect(b.getCoords(config.drawingBoard.width - 1, 0)).toBe(0);
    expect(() => { b.getCoords(config.drawingBoard.width, 0) }).toThrowError('Invalid index');
    expect(() => { b.getCoords(-1, 0) }).toThrowError('Invalid index');

    b.setCoords(0, 0, 1);
    expect(b.getCoords(0, 0)).toBe(1);

    expect(() => { b.setCoords(-1, 0, 1); }).toThrowError('Invalid index');
});