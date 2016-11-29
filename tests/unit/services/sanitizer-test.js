import { moduleFor, test } from 'ember-qunit';

moduleFor('service:sanitizer', 'Unit | Service | sanitizer', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('It should validate number string', function(assert){
  let service = this.subject();

  assert.ok(service.validateNumber(0), "Zero numeric");
  assert.ok(service.validateNumber("0"), "Zero");
  assert.ok(service.validateNumber("1"), "Single digit");
  assert.ok(service.validateNumber("1.1"), "Float");
  assert.ok(service.validateNumber("1.01"), "Float with zero after period");
  assert.ok(service.validateNumber("1434"), "A big number");
  assert.ok(service.validateNumber("1 432.42"), "Float with a space for formatting");
  assert.ok(service.validateNumber("1 4 4343.22"), "Float with multiple spaces");
  assert.ok(service.validateNumber("123,654"), "Float using comma");
  assert.ok(service.validateNumber("1 2 3 , 6 5 4"), "Float using comma with many spaces");
  assert.ok(service.validateNumber(".1"), "Float with nothing before period");
  assert.notOk(service.validateNumber(null), "Null");
  assert.notOk(service.validateNumber("duck"), "A string");
  assert.notOk(service.validateNumber("1.2,3"), "A period and a comma");
  assert.notOk(service.validateNumber("1e12"), "Engineering notation");
  assert.notOk(service.validateNumber("0x343"), "Hex number");
  assert.notOk(service.validateNumber("1..143"), "Double period");
  assert.notOk(service.validateNumber(""), "Empty string");
  assert.notOk(service.validateNumber("   "), "Whitespace string");
  assert.notOk(service.validateNumber("."), "Single period");
});

test('It should parse string to number', function(assert){
  let service = this.subject();

  assert.strictEqual(service.parseNumber(0), 0, "Numeric zero");
  assert.strictEqual(service.parseNumber(1), 1, "Numeric one");
  assert.strictEqual(service.parseNumber(13.73), 13.73, "Numeric float");
  assert.strictEqual(service.parseNumber("1"), 1);
  assert.strictEqual(service.parseNumber(".78"), 0.78);
  assert.strictEqual(service.parseNumber("1.1"), 1.1);
  assert.strictEqual(service.parseNumber("1,1"), 1.1);
  assert.strictEqual(service.parseNumber("1 000,1"), 1000.1);
  assert.strictEqual(service.parseNumber("3 3 2 , 7 2"), 332.72);
  assert.strictEqual(service.parseNumber(""), 0);
  assert.strictEqual(service.parseNumber("kaczka"), 0);
  assert.strictEqual(service.parseNumber("3..3"), 0);
  assert.strictEqual(service.parseNumber(null), 0);
});