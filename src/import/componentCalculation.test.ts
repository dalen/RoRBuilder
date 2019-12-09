import { getAbilityID, getComponentNumber } from './componentCalulation';

describe('getAbilityID', () => {
  test('COM_0_VAL0_DAMAGE', () => {
    expect(getAbilityID('COM_0_VAL0_DAMAGE')).toBeUndefined();
  });

  test('ABIL_8255_COM_4_RADI_FEET', () => {
    expect(getAbilityID('ABIL_8255_COM_4_RADI_FEET')).toBe(8255);
  });
});

describe('getComponentNumber', () => {
  test('COM_0_VAL0_DAMAGE', () => {
    expect(getComponentNumber('COM_0_VAL0_DAMAGE')).toBe(0);
  });

  test('ABIL_8255_COM_4_RADI_FEET', () => {
    expect(getComponentNumber('ABIL_8255_COM_4_RADI_FEET')).toBe(4);
  });

  test('COM_1_VAL0_COM_0_VAL0_TOD_DAMAGE', () => {
    expect(getComponentNumber('COM_1_VAL0_COM_0_VAL0_TOD_DAMAGE')).toBe(1);
  });
});
