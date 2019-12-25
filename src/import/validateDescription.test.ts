import {
  extractComponentValueNames,
  escapeRegExp,
  descriptionRegexp,
} from './validateDescription';

describe('extractComponentValues', () => {
  test('Bludgeon', () => {
    expect(
      extractComponentValueNames(
        'A powerful attack which deals {COM_0_VAL0_DAMAGE} to your enemy.',
      ),
    ).toEqual(['COM_0_VAL0_DAMAGE']);
  });

  test("Sigmar's Radiance", () => {
    expect(
      extractComponentValueNames(
        'You smash into your enemy, dealing {COM_0_VAL0_DAMAGE} to them.  The power of Sigmar erupts from your weapon, healing any of your groupmates within 100 feet for {COM_1_VAL0_HEALTH} plus 50% of the damage that you dealt.',
      ),
    ).toEqual(['COM_0_VAL0_DAMAGE', 'COM_1_VAL0_HEALTH']);
  });
});

describe('escapeRegExp', () => {
  test('Bludgeon', () => {
    expect(
      escapeRegExp(
        'A powerful attack which deals {COM_0_VAL0_DAMAGE} to your enemy.',
      ),
    ).toEqual(
      'A powerful attack which deals \\{COM_0_VAL0_DAMAGE\\} to your enemy\\.',
    );
  });
});

describe('descriptionRegexp', () => {
  test('Bludgeon', () => {
    expect(
      descriptionRegexp(
        'A powerful attack which deals {COM_0_VAL0_DAMAGE} to your enemy.',
      ),
    ).toEqual('A powerful attack which deals (.*) to your enemy\\.');
  });

  test("Sigmar's Radiance", () => {
    expect(
      descriptionRegexp(
        'You smash into your enemy, dealing {COM_0_VAL0_DAMAGE} to them.  The power of Sigmar erupts from your weapon, healing any of your groupmates within 100 feet for {COM_1_VAL0_HEALTH} plus 50% of the damage that you dealt.',
      ),
    ).toEqual(
      'You smash into your enemy, dealing (.*) to them\\.  The power of Sigmar erupts from your weapon, healing any of your groupmates within 100 feet for (.*) plus 50% of the damage that you dealt\\.',
    );
  });
});
