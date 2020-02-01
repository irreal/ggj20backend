var db = require('./DrawBoard');
var config = { width: 3, height: 3 };
test('Instantiates', () => {
    expect(new db(config)).toBeTruthy();
});
test('get and set coords', () => {
    var b = new db(config);
    expect(b.getCoords(0, 0)).toBe(0);
    expect(b.getCoords(config.width - 1, 0)).toBe(0);
    expect(() => { b.getCoords(config.width, 0) }).toThrowError('Invalid index');
    expect(() => { b.getCoords(-1, 0) }).toThrowError('Invalid index');

    b.setCoords(0, 0, 1);
    expect(b.getCoords(0, 0)).toBe(1);

    expect(() => { b.setCoords(-1, 0, 1); }).toThrowError('Invalid index');
});

test('get board', () => {
    var b = new db(config);
    b.db[0][0] = 1;
    var gb = b.getBoard();
    expect(gb[0][0]).toBe(1);
    expect(gb[0][1]).toBe(0);
});

test('clear board', () => {
    var b = new db(config);
    b.setCoords(0, 0, 1);
    expect(b.getBoard()[0][0]).toBe(1);
    b.clearBoard();
    expect(b.getBoard()[0][0]).toBe(0);
});