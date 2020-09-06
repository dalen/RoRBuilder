export enum TacticType {
  CAREER,
  RENOWN,
  TOME,
  FIRST,
}

export enum TargetType {
  NONE,
  ENEMY,
  SELF,
  ALLY,
  GROUP,
  PET,
  GROUND,
}

export enum AbilityType {
  FIRST,
  DEFAULT,
  MORALE,
  TACTIC,
  GRANTED,
  PASSIVE,
  PET,
  GUILD,
}

export enum CareerLine {
  IRON_BREAKER = 1,
  SLAYER = 2,
  RUNE_PRIEST = 3,
  ENGINEER = 4,
  BLACK_ORC = 5,
  CHOPPA = 6,
  SHAMAN = 7,
  SQUIG_HERDER = 8,
  WITCH_HUNTER = 9,
  KNIGHT_OF_THE_BLAZING_SUN = 10, // 0x0000000A
  BRIGHT_WIZARD = 11, // 0x0000000B
  WARRIOR_PRIEST = 12, // 0x0000000C
  CHOSEN = 13, // 0x0000000D
  MARAUDER = 14, // 0x0000000E
  ZEALOT = 15, // 0x0000000F
  MAGUS = 16, // 0x00000010
  SWORD_MASTER = 17, // 0x00000011
  SHADOW_WARRIOR = 18, // 0x00000012
  WHITE_LION = 19, // 0x00000013
  ARCHMAGE = 20, // 0x00000014
  BLACK_GUARD = 21, // 0x00000015
  WITCH_ELF = 22, // 0x00000016
  DISCIPLE_OF_KHAINE = 23, // 0x00000017
  SORCERESS = 24, // 0x00000018
}

export enum ComponentOP {
  DAMAGE = 1,
  STAT_CHANGE = 2,
  HEAL = 3,
  DAMAGE_CHANGE_PCT = 4,
  ARMOR_CHANGE_PCT = 5,
  AP_CHANGE = 6,
  MOVEMENT_SPEED = 8,
  RESSURRECT = 10, // 0x0000000A
  MECHANIC_CHANGE = 11,
  DISABLE = 12, // 0x0000000C
  PROC = 13, // 0x0000000D
  BUFF_PARAM = 15, // 0x0000000F
  DEFENSIVE_STAT_CHANGE = 16, // 0x00000010
  AP_REGEN_CHANGE = 17, // 0x00000011
  MORALE_REGEN_CHANGE = 18, // 0x00000012
  MORALE_CHANGE = 19, // 0x00000013
  COOLDOWN_CHANGE = 20, // 0x00000014
  CASTIME_CHANGE = 21, // 0x00000015
  BONUS_TYPE = 22, // 0x00000016
  LINKED_ABILITY = 23, // 0x00000017
  KNOCKBACK = 24, // 0x00000018
  CAREER_RESOURCE = 25, // 0x00000019
  MONSTER_CONTROLLER = 26, // 0x0000001A
  SIEGE_CARRY = 28, // 0x0000001C
  STEALTH = 34, // 0x00000022
  RANK_CHANGE = 37, // 0x00000025
  IMMUNITY = 38, // 0x00000026
  CATAPULT = 46, // 0x0000002E
}

export enum AbilityFlags {
  FLAG0 = Math.pow(2, 0),
  FLAG1 = Math.pow(2, 1), // Buff tactic?
  FLAG2 = Math.pow(2, 2), // Buff general
  FLAG3 = Math.pow(2, 3), // Curse?
  FLAG4 = Math.pow(2, 4), // Damaging?
  FLAG5 = Math.pow(2, 5), // Healing
  FLAG6 = Math.pow(2, 6), // ??
  FLAG7 = Math.pow(2, 7), // ??
  FLAG8 = Math.pow(2, 8), // None
  FLAG9 = Math.pow(2, 9), // None
  FLAG10 = Math.pow(2, 10), // None
  FLAG11 = Math.pow(2, 11), // Requires Mechanic? Stealth, Mutation, Squig armor or exhaustive abilities
  FLAG12 = Math.pow(2, 12), // None
  FLAG13 = Math.pow(2, 13), // Toggle abilities?
  FLAG14 = Math.pow(2, 14), // Similar to flag13, but without flee
  FLAG15 = Math.pow(2, 15), // Gives passive buff?
  FLAG16 = Math.pow(2, 16), // CareerTactic
  FLAG17 = Math.pow(2, 17), // Requires parry/disrupt? (Also force opportunity & malignant strike)
  FLAG18 = Math.pow(2, 18), // None
  FLAG19 = Math.pow(2, 19), // ??
  FLAG20 = Math.pow(2, 20), // Seems all have this flag?
  FLAG21 = Math.pow(2, 21), // ??
  CHANNEL = Math.pow(2, 22),
  FLAG23 = Math.pow(2, 23), // Cleanseable/Shatterable?
  FLAG24 = Math.pow(2, 24), // None
  FLAG25 = Math.pow(2, 25), // ??
  FLAG26 = Math.pow(2, 26), // ??
  FLAG27 = Math.pow(2, 27), // Guard & ress and some pet abilities?
  FLAG28 = Math.pow(2, 28), // ??
  FLAG29 = Math.pow(2, 29), // None
  FLAG30 = Math.pow(2, 30), // None
  FLAG31 = Math.pow(2, 31), // None
}

export enum AttackType {
  GENERIC = 0,
  MELEE = 1,
  RANGED = 2,
  MAGIC = 3,
}

export type Stats = {
  strength: number;
  ballisticSkill: number;
  intelligence: number;
  willpower: number;
};

export enum ComponentA07Flags {
  NO_STAT_CONTRIBUTION = 1,
  FLAG2 = 2, // Used on divine Aegis heal & Soul Stealer heal, also no stat conrib?
}

export enum ComponentA15Flags {
  NO_FINAL_TICK = 1, // No tick on dot/hot/AP change apply
  FLAG1 = 2, // ??
  STATIC_VALUE = 4,
  FLAG3 = 8, // ??
  FLAG4 = 16, // ?? initial tick on channel ?
  FLAG5 = 32, // ??
  FLAG6 = 64, // ?? initial tick on channel ?
  FLAG7 = 128, // ??
}
