export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Byte: { input: any; output: any };
  DateTime: { input: any; output: any };
  Duration: { input: any; output: any };
  Long: { input: any; output: any };
  Short: { input: any; output: any };
  URL: { input: any; output: any };
  UnsignedByte: { input: any; output: any };
  UnsignedInt: { input: any; output: any };
  UnsignedLong: { input: any; output: any };
  UnsignedShort: { input: any; output: any };
};

export type Ability = SearchContent & {
  __typename?: 'Ability';
  /** @deprecated Use 'info' field instead. */
  abilityType: AbilityType;
  /** @deprecated Use 'info' field instead. */
  actionPointCost: Scalars['UnsignedByte']['output'];
  /** @deprecated Use 'info' field instead. */
  castTime: Scalars['UnsignedInt']['output'];
  /** @deprecated Use 'info' field instead. */
  cooldown: Scalars['UnsignedInt']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use 'info' field instead. */
  iconUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  info: AbilityInfo;
  /** @deprecated Use 'info' field instead. */
  labels: Array<Maybe<Scalars['String']['output']>>;
  /** @deprecated Use 'info' field instead. */
  minLevel: Scalars['UnsignedByte']['output'];
  /** @deprecated Use 'info' field instead. */
  minRange: Scalars['UnsignedShort']['output'];
  /** @deprecated Use 'info' field instead. */
  moraleCost: Scalars['UnsignedShort']['output'];
  /** @deprecated Use 'info' field instead. */
  moraleLevel: Scalars['UnsignedByte']['output'];
  name?: Maybe<Scalars['String']['output']>;
  /** @deprecated Use 'info' field instead. */
  range: Scalars['UnsignedShort']['output'];
  /** @deprecated Use 'info' field instead. */
  specialization: Scalars['UnsignedByte']['output'];
};

export type AbilityInfo = SearchContent & {
  __typename?: 'AbilityInfo';
  abilityType: AbilityType;
  actionPointCost: Scalars['UnsignedByte']['output'];
  castTime: Scalars['UnsignedInt']['output'];
  cooldown: Scalars['UnsignedInt']['output'];
  description?: Maybe<Scalars['String']['output']>;
  iconUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  labels: Array<Maybe<Scalars['String']['output']>>;
  minLevel: Scalars['UnsignedByte']['output'];
  minRange: Scalars['UnsignedShort']['output'];
  moraleCost: Scalars['UnsignedShort']['output'];
  moraleLevel: Scalars['UnsignedByte']['output'];
  name?: Maybe<Scalars['String']['output']>;
  range: Scalars['UnsignedShort']['output'];
  /** Mastery path */
  specialization: Scalars['UnsignedByte']['output'];
};

export type AbilityInfoDescriptionArgs = {
  stats: CharacterStatsInput;
};

/** Ability information */
export type AbilityKillDamage = {
  __typename?: 'AbilityKillDamage';
  /** Ability information, if null it was auto attack damage */
  ability?: Maybe<AbilityInfo>;
  /** Total damage dealt by this ability */
  damageAmount: Scalars['UnsignedInt']['output'];
};

export enum AbilityType {
  /** Regular abilities */
  Default = 'DEFAULT',
  /** Unused */
  First = 'FIRST',
  /** Granted abilities */
  Granted = 'GRANTED',
  Guild = 'GUILD',
  /** Morale abilities */
  Morale = 'MORALE',
  /** Passive buffs */
  Passive = 'PASSIVE',
  /** Pet abilities */
  Pet = 'PET',
  /** Tactics */
  Tactic = 'TACTIC',
  TauntGuard = 'TAUNT_GUARD',
}

/** Player Archetypes */
export enum Archetype {
  Healer = 'HEALER',
  MeleeDps = 'MELEE_DPS',
  RangedDps = 'RANGED_DPS',
  Tank = 'TANK',
}

/** Holds information about one attacker in a kill */
export type Attacker = {
  __typename?: 'Attacker';
  /** Character information */
  character: Character;
  /** Amount of the total damage done by this attacker */
  damagePercent: Scalars['UnsignedByte']['output'];
  /** Guild at the time of the kill */
  guild?: Maybe<Guild>;
  /** Level at the time of the kill */
  level: Scalars['UnsignedByte']['output'];
  /** Renown rank at the time of the kill */
  renownRank: Scalars['UnsignedByte']['output'];
};

export type BattlefieldObjective = Location &
  SearchContent & {
    __typename?: 'BattlefieldObjective';
    /** The unique identifier of the battlefield objective. */
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    position: Position;
  };

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Player Careers */
export enum Career {
  /** Archmage */
  Archmage = 'ARCHMAGE',
  /** Black Guard */
  BlackGuard = 'BLACK_GUARD',
  /** Black Orc */
  BlackOrc = 'BLACK_ORC',
  /** Bright Wizard */
  BrightWizard = 'BRIGHT_WIZARD',
  /** Choppa */
  Choppa = 'CHOPPA',
  /** Chosen */
  Chosen = 'CHOSEN',
  /** Disciple of Khaine */
  DiscipleOfKhaine = 'DISCIPLE_OF_KHAINE',
  /** Engineer */
  Engineer = 'ENGINEER',
  /** Iron Breaker */
  IronBreaker = 'IRON_BREAKER',
  /** Knight of the Blazing Sun */
  KnightOfTheBlazingSun = 'KNIGHT_OF_THE_BLAZING_SUN',
  /** Magus */
  Magus = 'MAGUS',
  /** Marauder */
  Marauder = 'MARAUDER',
  /** Rune Priest */
  RunePriest = 'RUNE_PRIEST',
  /** Shadow Warrior */
  ShadowWarrior = 'SHADOW_WARRIOR',
  /** Shaman */
  Shaman = 'SHAMAN',
  /** Slayer */
  Slayer = 'SLAYER',
  /** Sorceress */
  Sorcerer = 'SORCERER',
  /** Squig Herder */
  SquigHerder = 'SQUIG_HERDER',
  /** Sword Master */
  SwordMaster = 'SWORD_MASTER',
  /** Warrior Priest */
  WarriorPriest = 'WARRIOR_PRIEST',
  /** White Lion */
  WhiteLion = 'WHITE_LION',
  /** Witch Elf */
  WitchElf = 'WITCH_ELF',
  /** Witch Hunter */
  WitchHunter = 'WITCH_HUNTER',
  /** Zealot */
  Zealot = 'ZEALOT',
}

export type CareerLineOperationFilterInput = {
  eq?: InputMaybe<Career>;
  in?: InputMaybe<Array<Career>>;
  neq?: InputMaybe<Career>;
  nin?: InputMaybe<Array<Career>>;
};

export enum CareerMask {
  Archmage = 'ARCHMAGE',
  Blackguard = 'BLACKGUARD',
  BlackOrc = 'BLACK_ORC',
  BrightWizard = 'BRIGHT_WIZARD',
  Choppa = 'CHOPPA',
  Chosen = 'CHOSEN',
  DiscipleOfKhaine = 'DISCIPLE_OF_KHAINE',
  Engineer = 'ENGINEER',
  Ironbreaker = 'IRONBREAKER',
  Knight = 'KNIGHT',
  Magus = 'MAGUS',
  Marauder = 'MARAUDER',
  RunePriest = 'RUNE_PRIEST',
  ShadowWarrior = 'SHADOW_WARRIOR',
  Shaman = 'SHAMAN',
  Slayer = 'SLAYER',
  Sorcerer = 'SORCERER',
  SquigHerder = 'SQUIG_HERDER',
  SwordMaster = 'SWORD_MASTER',
  WarriorPriest = 'WARRIOR_PRIEST',
  WhiteLion = 'WHITE_LION',
  WitchElf = 'WITCH_ELF',
  WitchHunter = 'WITCH_HUNTER',
  Zealot = 'ZEALOT',
}

export type CareerMaskFlagsInput = {
  isArchmage?: InputMaybe<Scalars['Boolean']['input']>;
  isBlackOrc?: InputMaybe<Scalars['Boolean']['input']>;
  isBlackguard?: InputMaybe<Scalars['Boolean']['input']>;
  isBrightWizard?: InputMaybe<Scalars['Boolean']['input']>;
  isChoppa?: InputMaybe<Scalars['Boolean']['input']>;
  isChosen?: InputMaybe<Scalars['Boolean']['input']>;
  isDiscipleOfKhaine?: InputMaybe<Scalars['Boolean']['input']>;
  isEngineer?: InputMaybe<Scalars['Boolean']['input']>;
  isIronbreaker?: InputMaybe<Scalars['Boolean']['input']>;
  isKnight?: InputMaybe<Scalars['Boolean']['input']>;
  isMagus?: InputMaybe<Scalars['Boolean']['input']>;
  isMarauder?: InputMaybe<Scalars['Boolean']['input']>;
  isRunePriest?: InputMaybe<Scalars['Boolean']['input']>;
  isShadowWarrior?: InputMaybe<Scalars['Boolean']['input']>;
  isShaman?: InputMaybe<Scalars['Boolean']['input']>;
  isSlayer?: InputMaybe<Scalars['Boolean']['input']>;
  isSorcerer?: InputMaybe<Scalars['Boolean']['input']>;
  isSquigHerder?: InputMaybe<Scalars['Boolean']['input']>;
  isSwordMaster?: InputMaybe<Scalars['Boolean']['input']>;
  isWarriorPriest?: InputMaybe<Scalars['Boolean']['input']>;
  isWhiteLion?: InputMaybe<Scalars['Boolean']['input']>;
  isWitchElf?: InputMaybe<Scalars['Boolean']['input']>;
  isWitchHunter?: InputMaybe<Scalars['Boolean']['input']>;
  isZealot?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CareerMaskOperationFilterInput = {
  eq?: InputMaybe<CareerMaskFlagsInput>;
  in?: InputMaybe<Array<CareerMaskFlagsInput>>;
  neq?: InputMaybe<CareerMaskFlagsInput>;
  nin?: InputMaybe<Array<CareerMaskFlagsInput>>;
};

export type Chapter = SearchContent & {
  __typename?: 'Chapter';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  rewards: Array<ChapterInfluenceReward>;
};

export type ChapterInfluenceReward = {
  __typename?: 'ChapterInfluenceReward';
  count: Scalars['UnsignedShort']['output'];
  item: Item;
  realm: Realm;
  tier: Scalars['UnsignedByte']['output'];
};

/** Info about a character */
export type Character = SearchContent & {
  __typename?: 'Character';
  /** Career/Class of the character */
  career: Career;
  /** Current Guild membership */
  guildMembership?: Maybe<GuildMember>;
  /** Character Id */
  id: Scalars['ID']['output'];
  /** Items equipped by the character */
  items: Array<CharacterItem>;
  /** Current Level */
  level: Scalars['UnsignedByte']['output'];
  /** First name */
  name: Scalars['String']['output'];
  /** Scenario ratings for the character */
  ratings: Array<CharacterRating>;
  /** Current Renown Rank */
  renownRank: Scalars['UnsignedByte']['output'];
};

export type CharacterFilterInput = {
  and?: InputMaybe<Array<CharacterFilterInput>>;
  /** Character career */
  careerLine?: InputMaybe<CareerLineOperationFilterInput>;
  /** Character level */
  level?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Character name */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CharacterFilterInput>>;
  /** Character renown rank */
  renownRank?: InputMaybe<UnsignedByteOperationFilterInput>;
};

export type CharacterItem = {
  __typename?: 'CharacterItem';
  /** Slot where the item is equipped */
  equipSlot: EquipSlot;
  /** Item info */
  item: Item;
  talismans: Array<Item>;
};

/** Info about a quest objective */
export type CharacterRating = {
  __typename?: 'CharacterRating';
  /** Character information */
  character: Character;
  /** Mu */
  mu: Scalars['Float']['output'];
  rating: Scalars['Float']['output'];
  /** Rating type */
  ratingType: RatingType;
  /** Season ID */
  seasonId: Scalars['ID']['output'];
  /** Sigma */
  sigma: Scalars['Float']['output'];
};

export type CharacterRatingFilterInput = {
  and?: InputMaybe<Array<CharacterRatingFilterInput>>;
  characterId?: InputMaybe<IdOperationFilterInput>;
  mu?: InputMaybe<FloatOperationFilterInput>;
  or?: InputMaybe<Array<CharacterRatingFilterInput>>;
  ratingType?: InputMaybe<RatingTypeOperationFilterInput>;
  seasonId?: InputMaybe<IdOperationFilterInput>;
  sigma?: InputMaybe<FloatOperationFilterInput>;
};

export type CharacterRatingSortInput = {
  mu?: InputMaybe<SortEnumType>;
  sigma?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type CharacterRatingsConnection = {
  __typename?: 'CharacterRatingsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CharacterRatingsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<CharacterRating>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CharacterRatingsEdge = {
  __typename?: 'CharacterRatingsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CharacterRating;
};

export type CharacterSeasonStatsFilterInput = {
  and?: InputMaybe<Array<CharacterSeasonStatsFilterInput>>;
  or?: InputMaybe<Array<CharacterSeasonStatsFilterInput>>;
};

export type CharacterSortInput = {
  level?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  renownRank?: InputMaybe<SortEnumType>;
};

export type CharacterStatsInput = {
  /** BallisticSkill */
  ballisticSkill: Scalars['Int']['input'];
  /** Intelligence */
  intelligence: Scalars['Int']['input'];
  /** Ability Level */
  level: Scalars['UnsignedByte']['input'];
  /** Strength */
  strength: Scalars['Int']['input'];
  /** Willpower */
  willpower: Scalars['Int']['input'];
};

/** A connection to a list of items. */
export type CharactersConnection = {
  __typename?: 'CharactersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CharactersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Character>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CharactersEdge = {
  __typename?: 'CharactersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Character;
};

export type CitySiegeEvent = Event & {
  __typename?: 'CitySiegeEvent';
  endTime?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
};

export enum CraftingItemType {
  Container = 'CONTAINER',
  ContainerDye = 'CONTAINER_DYE',
  ContainerEssence = 'CONTAINER_ESSENCE',
  Curio = 'CURIO',
  Extender = 'EXTENDER',
  Fixer = 'FIXER',
  Fragment = 'FRAGMENT',
  Golddust = 'GOLDDUST',
  Goldweed = 'GOLDWEED',
  GoldEssence = 'GOLD_ESSENCE',
  MagicEssence = 'MAGIC_ESSENCE',
  MainIngredient = 'MAIN_INGREDIENT',
  Multiplier = 'MULTIPLIER',
  Pigment = 'PIGMENT',
  Quicksilver = 'QUICKSILVER',
  Stabilizer = 'STABILIZER',
  Stimulant = 'STIMULANT',
  TalismanContainer = 'TALISMAN_CONTAINER',
}

export type Creature = SearchContent & {
  __typename?: 'Creature';
  id: Scalars['ID']['output'];
  modelName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  questsFinisher: Array<Quest>;
  questsStarter: Array<Quest>;
  realm?: Maybe<Realm>;
  spawns: Array<CreatureSpawn>;
  title?: Maybe<CreatureTitle>;
  /** Items sold by this creature */
  vendorItems?: Maybe<VendorItemsConnection>;
};

export type CreatureVendorItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type CreatureFilterInput = {
  and?: InputMaybe<Array<CreatureFilterInput>>;
  /** Name */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CreatureFilterInput>>;
  /** Realm */
  realm?: InputMaybe<RealmsOperationFilterInput>;
  /** Title */
  title?: InputMaybe<NullableOfCreatureTitleOperationFilterInput>;
  /** Zones */
  zones?: InputMaybe<ListIdOperationFilterInput>;
};

/** Damage dealt by a creature */
export type CreatureKillDamage = KillDamageSource & {
  __typename?: 'CreatureKillDamage';
  /** By ability */
  abilities: Array<AbilityKillDamage>;
  /** The creature doing the damage */
  attacker?: Maybe<Creature>;
  /** Damage amount */
  damageAmount: Scalars['UnsignedInt']['output'];
};

export type CreatureSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  /** Realm */
  realm?: InputMaybe<SortEnumType>;
  /** Title */
  title?: InputMaybe<SortEnumType>;
  /** Zone */
  zone?: InputMaybe<SortEnumType>;
};

export type CreatureSpawn = {
  __typename?: 'CreatureSpawn';
  creature: Creature;
  id: Scalars['ID']['output'];
  /** Position Info */
  position: Position;
  /** Zone Info */
  zone: Zone;
};

export enum CreatureTitle {
  AdvancedRenownGearMerchant = 'ADVANCED_RENOWN_GEAR_MERCHANT',
  AlcadizaarsGuard = 'ALCADIZAARS_GUARD',
  AltarofKhaineGuard = 'ALTAROF_KHAINE_GUARD',
  AnnihilatorArmorQuartermaster = 'ANNIHILATOR_ARMOR_QUARTERMASTER',
  Apothecary = 'APOTHECARY',
  ApprenticeCareerTrainer = 'APPRENTICE_CAREER_TRAINER',
  ApprenticeRenownTrainer = 'APPRENTICE_RENOWN_TRAINER',
  ArmorMerchant = 'ARMOR_MERCHANT',
  ArtilleryRangeGuard = 'ARTILLERY_RANGE_GUARD',
  Auctioneer = 'AUCTIONEER',
  Banker = 'BANKER',
  BarberSurgeon = 'BARBER_SURGEON',
  BarracksGuard = 'BARRACKS_GUARD',
  BasicRenownGearMerchant = 'BASIC_RENOWN_GEAR_MERCHANT',
  BeastPensGuard = 'BEAST_PENS_GUARD',
  BelKorhadrisGuard = 'BEL_KORHADRIS_GUARD',
  Blacksmith = 'BLACKSMITH',
  BlackMarketMerchant = 'BLACK_MARKET_MERCHANT',
  Bodyguard = 'BODYGUARD',
  BraggartArmorQuartermaster = 'BRAGGART_ARMOR_QUARTERMASTER',
  BreweryGuard = 'BREWERY_GUARD',
  Butcher = 'BUTCHER',
  CampMerchant = 'CAMP_MERCHANT',
  CannonBatteryGuard = 'CANNON_BATTERY_GUARD',
  CareerTrainer = 'CAREER_TRAINER',
  CarnageArmorQuartermaster = 'CARNAGE_ARMOR_QUARTERMASTER',
  ChallengerArmorQuartermaster = 'CHALLENGER_ARMOR_QUARTERMASTER',
  ChillwindGuard = 'CHILLWIND_GUARD',
  ChokethornGuard = 'CHOKETHORN_GUARD',
  CommoditiesQuartermaster = 'COMMODITIES_QUARTERMASTER',
  CompanionKeeper = 'COMPANION_KEEPER',
  ConquererMedallionQuartermaster = 'CONQUERER_MEDALLION_QUARTERMASTER',
  ConquerorArmorQuartermaster = 'CONQUEROR_ARMOR_QUARTERMASTER',
  ConquerorEmblemQuartermaster = 'CONQUEROR_EMBLEM_QUARTERMASTER',
  ConquerorShrineGuard = 'CONQUEROR_SHRINE_GUARD',
  CraftSupplyMerchant = 'CRAFT_SUPPLY_MERCHANT',
  CrusaderQuartermaster = 'CRUSADER_QUARTERMASTER',
  CryptGuard = 'CRYPT_GUARD',
  Cultivator = 'CULTIVATOR',
  DecimatorArmorQuartermaster = 'DECIMATOR_ARMOR_QUARTERMASTER',
  DevastatorArmorQuartermaster = 'DEVASTATOR_ARMOR_QUARTERMASTER',
  DogofWar = 'DOGOF_WAR',
  DolgrundsGuard = 'DOLGRUNDS_GUARD',
  DominatorArmorQuartermaster = 'DOMINATOR_ARMOR_QUARTERMASTER',
  DominatorEmblemQuartermaster = 'DOMINATOR_EMBLEM_QUARTERMASTER',
  DoomstrikerGuard = 'DOOMSTRIKER_GUARD',
  DoorRepairMerchant = 'DOOR_REPAIR_MERCHANT',
  DuelistArmorQuartermaster = 'DUELIST_ARMOR_QUARTERMASTER',
  DungeonWeaponsMerchant = 'DUNGEON_WEAPONS_MERCHANT',
  EliteRenownGearMerchant = 'ELITE_RENOWN_GEAR_MERCHANT',
  EverchosenGuard = 'EVERCHOSEN_GUARD',
  ExpeditionQuartermaster = 'EXPEDITION_QUARTERMASTER',
  FeitensGuard = 'FEITENS_GUARD',
  FestenplatzGuard = 'FESTENPLATZ_GUARD',
  FireguardSpireGuard = 'FIREGUARD_SPIRE_GUARD',
  FlightMaster = 'FLIGHT_MASTER',
  FortressGeneral = 'FORTRESS_GENERAL',
  FortressLord = 'FORTRESS_LORD',
  FurrigsFallGuard = 'FURRIGS_FALL_GUARD',
  General = 'GENERAL',
  GoblinArmoryGuard = 'GOBLIN_ARMORY_GUARD',
  GraveyardGuard = 'GRAVEYARD_GUARD',
  GreaterTalismanMerchant = 'GREATER_TALISMAN_MERCHANT',
  GreystoneGuard = 'GREYSTONE_GUARD',
  GromrilJunctionGuard = 'GROMRIL_JUNCTION_GUARD',
  GromrilKrukGuard = 'GROMRIL_KRUK_GUARD',
  Guard = 'GUARD',
  GuildRegistrar = 'GUILD_REGISTRAR',
  HallenfurtGuard = 'HALLENFURT_GUARD',
  HardwaterGuard = 'HARDWATER_GUARD',
  HarvestShrineGuard = 'HARVEST_SHRINE_GUARD',
  HavocArmorQuartermaster = 'HAVOC_ARMOR_QUARTERMASTER',
  HeadwallGuard = 'HEADWALL_GUARD',
  Healer = 'HEALER',
  HealingRitualist = 'HEALING_RITUALIST',
  HeavyMountVendor = 'HEAVY_MOUNT_VENDOR',
  HedgeWizard = 'HEDGE_WIZARD',
  Herald = 'HERALD',
  IcehearthGuard = 'ICEHEARTH_GUARD',
  InvaderArmorQuartermaster = 'INVADER_ARMOR_QUARTERMASTER',
  InvaderMedallionQuartermaster = 'INVADER_MEDALLION_QUARTERMASTER',
  IroncladGuard = 'IRONCLAD_GUARD',
  KaragazGuard = 'KARAGAZ_GUARD',
  KarakPalikGuard = 'KARAK_PALIK_GUARD',
  KeepFlightMaster = 'KEEP_FLIGHT_MASTER',
  KeepLord = 'KEEP_LORD',
  KillCollector = 'KILL_COLLECTOR',
  KinshelsGuard = 'KINSHELS_GUARD',
  KurlovArmoryGuard = 'KURLOV_ARMORY_GUARD',
  Librarian = 'LIBRARIAN',
  LifetapRitualist = 'LIFETAP_RITUALIST',
  LighthouseGuard = 'LIGHTHOUSE_GUARD',
  LightMountVendor = 'LIGHT_MOUNT_VENDOR',
  LiveEventMaster = 'LIVE_EVENT_MASTER',
  LobbaMillGuard = 'LOBBA_MILL_GUARD',
  LookoutGuard = 'LOOKOUT_GUARD',
  LorendythGuard = 'LORENDYTH_GUARD',
  LostLagoonGuard = 'LOST_LAGOON_GUARD',
  MadcapGuard = 'MADCAP_GUARD',
  MaidensLandingGuard = 'MAIDENS_LANDING_GUARD',
  MajorTalismanMerchant = 'MAJOR_TALISMAN_MERCHANT',
  MartyrsSquareGuard = 'MARTYRS_SQUARE_GUARD',
  MayhemArmorQuartermaster = 'MAYHEM_ARMOR_QUARTERMASTER',
  MercenaryArmorQuartermaster = 'MERCENARY_ARMOR_QUARTERMASTER',
  Merchant = 'MERCHANT',
  MilaithsMemoryGuard = 'MILAITHS_MEMORY_GUARD',
  MonasteryGuard = 'MONASTERY_GUARD',
  MountVendor = 'MOUNT_VENDOR',
  MournfireGuard = 'MOURNFIRE_GUARD',
  NameRegistrar = 'NAME_REGISTRAR',
  NeedleofEllyrionGuard = 'NEEDLEOF_ELLYRION_GUARD',
  NightflameGuard = 'NIGHTFLAME_GUARD',
  None = 'NONE',
  NordlandXiGuard = 'NORDLAND_XI_GUARD',
  NoveltyVendor = 'NOVELTY_VENDOR',
  ObliteratorArmorQuartermaster = 'OBLITERATOR_ARMOR_QUARTERMASTER',
  OfficerCoinQuartermaster = 'OFFICER_COIN_QUARTERMASTER',
  OfficerEmblemQuartermaster = 'OFFICER_EMBLEM_QUARTERMASTER',
  OfficerMedallionQuartermaster = 'OFFICER_MEDALLION_QUARTERMASTER',
  OppressorArmorQuartermaster = 'OPPRESSOR_ARMOR_QUARTERMASTER',
  OppressorEmblemQuartermaster = 'OPPRESSOR_EMBLEM_QUARTERMASTER',
  OrtelvonZarisGuard = 'ORTELVON_ZARIS_GUARD',
  OutpostGuard = 'OUTPOST_GUARD',
  PelgorathGuard = 'PELGORATH_GUARD',
  Postmaster = 'POSTMASTER',
  PotentTalismanMerchant = 'POTENT_TALISMAN_MERCHANT',
  QuarryGuard = 'QUARRY_GUARD',
  Quartermaster = 'QUARTERMASTER',
  RallyMaster = 'RALLY_MASTER',
  RankedQuartermaster = 'RANKED_QUARTERMASTER',
  Realtor = 'REALTOR',
  ReaverStablesGuard = 'REAVER_STABLES_GUARD',
  RecordsKeeper = 'RECORDS_KEEPER',
  RecruitCoinQuartermaster = 'RECRUIT_COIN_QUARTERMASTER',
  RecruitEmblemQuartermaster = 'RECRUIT_EMBLEM_QUARTERMASTER',
  RecruitMedallionQuartermaster = 'RECRUIT_MEDALLION_QUARTERMASTER',
  ReikwatchGuard = 'REIKWATCH_GUARD',
  RelicGuardian = 'RELIC_GUARDIAN',
  RenownArmorQuartermaster = 'RENOWN_ARMOR_QUARTERMASTER',
  RenownGearMerchant = 'RENOWN_GEAR_MERCHANT',
  RenownTrainer = 'RENOWN_TRAINER',
  RenownWeaponQuartermaster = 'RENOWN_WEAPON_QUARTERMASTER',
  RottenpikeGuard = 'ROTTENPIKE_GUARD',
  RoyalQuartermaster = 'ROYAL_QUARTERMASTER',
  RuinArmorQuartermaster = 'RUIN_ARMOR_QUARTERMASTER',
  RunehammerGuard = 'RUNEHAMMER_GUARD',
  Salvager = 'SALVAGER',
  SanctuaryGuard = 'SANCTUARY_GUARD',
  SarathananValeGuard = 'SARATHANAN_VALE_GUARD',
  SariDaroirGuard = 'SARI_DAROIR_GUARD',
  Scavenger = 'SCAVENGER',
  SchwenderhalleGuard = 'SCHWENDERHALLE_GUARD',
  ScoutCoinQuartermaster = 'SCOUT_COIN_QUARTERMASTER',
  ScoutEmblemQuartermaster = 'SCOUT_EMBLEM_QUARTERMASTER',
  ScoutMedallionQuartermaster = 'SCOUT_MEDALLION_QUARTERMASTER',
  SenlathianStandGuard = 'SENLATHIAN_STAND_GUARD',
  Sergeant = 'SERGEANT',
  ShadowSpireGuard = 'SHADOW_SPIRE_GUARD',
  ShardofGriefGuard = 'SHARDOF_GRIEF_GUARD',
  ShrineofTimeGuard = 'SHRINEOF_TIME_GUARD',
  SiegeCamp2Guard = 'SIEGE_CAMP2_GUARD',
  SiegeCampGuard = 'SIEGE_CAMP_GUARD',
  SiegeQuartermaster = 'SIEGE_QUARTERMASTER',
  SiegeWeaponMerchant = 'SIEGE_WEAPON_MERCHANT',
  SoldierCoinQuartermaster = 'SOLDIER_COIN_QUARTERMASTER',
  SoldierEmblemQuartermaster = 'SOLDIER_EMBLEM_QUARTERMASTER',
  SoldierMedallionQuartermaster = 'SOLDIER_MEDALLION_QUARTERMASTER',
  SovereignArmorQuartermaster = 'SOVEREIGN_ARMOR_QUARTERMASTER',
  SpecializationsTrainer = 'SPECIALIZATIONS_TRAINER',
  SpecializedArmorsmith = 'SPECIALIZED_ARMORSMITH',
  SpecialtyMountWrangler = 'SPECIALTY_MOUNT_WRANGLER',
  SpireofTeclisGuard = 'SPIREOF_TECLIS_GUARD',
  StableMaster = 'STABLE_MASTER',
  StandardMerchant = 'STANDARD_MERCHANT',
  StonemineGuard = 'STONEMINE_GUARD',
  SundriesQuartermaster = 'SUNDRIES_QUARTERMASTER',
  SuperiorTalismanMerchant = 'SUPERIOR_TALISMAN_MERCHANT',
  TacticalAdvisor = 'TACTICAL_ADVISOR',
  TalismanMerchant = 'TALISMAN_MERCHANT',
  TavernGuard = 'TAVERN_GUARD',
  ThaugamondGuard = 'THAUGAMOND_GUARD',
  TheForcesOfDestruction = 'THE_FORCES_OF_DESTRUCTION',
  TheForcesOfOrder = 'THE_FORCES_OF_ORDER',
  TomeAccessoryLibrarian = 'TOME_ACCESSORY_LIBRARIAN',
  TomeTacticLibrarian = 'TOME_TACTIC_LIBRARIAN',
  TomeTokenLibrarian = 'TOME_TOKEN_LIBRARIAN',
  TomeTrophyLibrarian = 'TOME_TROPHY_LIBRARIAN',
  Trainer = 'TRAINER',
  TriumphantEmblemQuartermaster = 'TRIUMPHANT_EMBLEM_QUARTERMASTER',
  UpgradeMerchant = 'UPGRADE_MERCHANT',
  VanquisherArmorQuartermaster = 'VANQUISHER_ARMOR_QUARTERMASTER',
  VanquisherQuartermaster = 'VANQUISHER_QUARTERMASTER',
  VaultKeeper = 'VAULT_KEEPER',
  VerentanesGuard = 'VERENTANES_GUARD',
  VerySpecialDyeVendor = 'VERY_SPECIAL_DYE_VENDOR',
  VeteranRenownGearMerchant = 'VETERAN_RENOWN_GEAR_MERCHANT',
  VictoriousQuartermaster = 'VICTORIOUS_QUARTERMASTER',
  WarlordArmorQuartermaster = 'WARLORD_ARMOR_QUARTERMASTER',
  WarCrestVaultKeeper = 'WAR_CREST_VAULT_KEEPER',
  WarEmblemMerchant = 'WAR_EMBLEM_MERCHANT',
  WarEmblemQuartermaster = 'WAR_EMBLEM_QUARTERMASTER',
  WarGuard = 'WAR_GUARD',
  WeaponMerchant = 'WEAPON_MERCHANT',
  WoodChoppazGuard = 'WOOD_CHOPPAZ_GUARD',
}

/** A connection to a list of items. */
export type CreaturesConnection = {
  __typename?: 'CreaturesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<CreaturesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Creature>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type CreaturesEdge = {
  __typename?: 'CreaturesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Creature;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A connection to a list of items. */
export type DropsFromCreaturesConnection = {
  __typename?: 'DropsFromCreaturesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DropsFromCreaturesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Creature>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DropsFromCreaturesEdge = {
  __typename?: 'DropsFromCreaturesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Creature;
};

/** A connection to a list of items. */
export type DropsFromGameObjectsConnection = {
  __typename?: 'DropsFromGameObjectsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<DropsFromGameObjectsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<GameObject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type DropsFromGameObjectsEdge = {
  __typename?: 'DropsFromGameObjectsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: GameObject;
};

export type DurationOperationFilterInput = {
  eq?: InputMaybe<Scalars['Duration']['input']>;
  gt?: InputMaybe<Scalars['Duration']['input']>;
  gte?: InputMaybe<Scalars['Duration']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Duration']['input']>>>;
  lt?: InputMaybe<Scalars['Duration']['input']>;
  lte?: InputMaybe<Scalars['Duration']['input']>;
  neq?: InputMaybe<Scalars['Duration']['input']>;
  ngt?: InputMaybe<Scalars['Duration']['input']>;
  ngte?: InputMaybe<Scalars['Duration']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Duration']['input']>>>;
  nlt?: InputMaybe<Scalars['Duration']['input']>;
  nlte?: InputMaybe<Scalars['Duration']['input']>;
};

/** Character equipment slots */
export enum EquipSlot {
  Back = 'BACK',
  Belt = 'BELT',
  Body = 'BODY',
  Boots = 'BOOTS',
  EitherHand = 'EITHER_HAND',
  Event = 'EVENT',
  Gloves = 'GLOVES',
  Helm = 'HELM',
  Jewellery1 = 'JEWELLERY1',
  Jewellery2 = 'JEWELLERY2',
  Jewellery3 = 'JEWELLERY3',
  Jewellery4 = 'JEWELLERY4',
  MainHand = 'MAIN_HAND',
  None = 'NONE',
  OffHand = 'OFF_HAND',
  Pocket1 = 'POCKET1',
  Pocket2 = 'POCKET2',
  RangedWeapon = 'RANGED_WEAPON',
  Shoulder = 'SHOULDER',
  Standard = 'STANDARD',
  Trophy1 = 'TROPHY1',
  Trophy2 = 'TROPHY2',
  Trophy3 = 'TROPHY3',
  Trophy4 = 'TROPHY4',
  Trophy5 = 'TROPHY5',
}

export type EquipSlotOperationFilterInput = {
  eq?: InputMaybe<EquipSlot>;
  in?: InputMaybe<Array<EquipSlot>>;
  neq?: InputMaybe<EquipSlot>;
  nin?: InputMaybe<Array<EquipSlot>>;
};

export type Event = {
  endTime?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
};

export type FallKillDamage = KillDamageSource & {
  __typename?: 'FallKillDamage';
  /** Ability information */
  ability?: Maybe<AbilityInfo>;
  /** Damage amount */
  damageAmount: Scalars['UnsignedInt']['output'];
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  ngt?: InputMaybe<Scalars['Float']['input']>;
  ngte?: InputMaybe<Scalars['Float']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  nlt?: InputMaybe<Scalars['Float']['input']>;
  nlte?: InputMaybe<Scalars['Float']['input']>;
};

export type GameObject = {
  __typename?: 'GameObject';
  id: Scalars['ID']['output'];
  modelName?: Maybe<Scalars['String']['output']>;
  /** The name of the Game Object */
  name: Scalars['String']['output'];
  questsFinisher: Array<Quest>;
  questsStarter: Array<Quest>;
  spawns: Array<GameObjectSpawn>;
};

export type GameObjectProtoFilterInput = {
  and?: InputMaybe<Array<GameObjectProtoFilterInput>>;
  /** Name */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<GameObjectProtoFilterInput>>;
};

export type GameObjectProtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type GameObjectSpawn = {
  __typename?: 'GameObjectSpawn';
  id: Scalars['ID']['output'];
  /** Position Info */
  position: Position;
  /** Zone Info */
  zone: Zone;
};

/** A connection to a list of items. */
export type GameObjectsConnection = {
  __typename?: 'GameObjectsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GameObjectsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<GameObject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type GameObjectsEdge = {
  __typename?: 'GameObjectsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: GameObject;
};

export type Guild = SearchContent & {
  __typename?: 'Guild';
  /** Recruiting brief description */
  briefDescription: Scalars['String']['output'];
  /** Recruiting description */
  description: Scalars['String']['output'];
  /** Guild heraldry */
  heraldry: GuildHeraldry;
  /** Guild Id */
  id: Scalars['ID']['output'];
  /** Guild leader */
  leader?: Maybe<Character>;
  /** Guild level */
  level: Scalars['UnsignedByte']['output'];
  /** Guild members */
  members?: Maybe<MembersConnection>;
  /** Guild name */
  name: Scalars['String']['output'];
  /** Guild ranks */
  ranks: Array<GuildRank>;
  /** Guild realm */
  realm: Realm;
};

export type GuildMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type GuildFeudFilterInput = {
  guild1Id: Scalars['ID']['input'];
  guild2Id: Scalars['ID']['input'];
};

export type GuildFilterInput = {
  and?: InputMaybe<Array<GuildFilterInput>>;
  /** Guild level */
  level?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Guild name */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<GuildFilterInput>>;
  /** Guild realm */
  realm?: InputMaybe<RealmsOperationFilterInput>;
};

export type GuildHeraldry = {
  __typename?: 'GuildHeraldry';
  /** Primary Color */
  color1: Scalars['Int']['output'];
  /** Secondary Color */
  color2: Scalars['Int']['output'];
  /** Emblem */
  emblem: Scalars['Int']['output'];
  /** Pattern */
  pattern: Scalars['Int']['output'];
  /** Shape */
  shape: Scalars['Int']['output'];
};

export type GuildInfoSortInput = {
  level?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type GuildMember = {
  __typename?: 'GuildMember';
  /** Character info */
  character: Character;
  /** Guild */
  guild: Guild;
  /** Guild rank */
  rank: GuildRank;
};

export type GuildRank = {
  __typename?: 'GuildRank';
  /** Rank name */
  name: Scalars['String']['output'];
  /** Rank id */
  rank: Scalars['UnsignedByte']['output'];
};

/** A connection to a list of items. */
export type GuildsConnection = {
  __typename?: 'GuildsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<GuildsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Guild>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type GuildsEdge = {
  __typename?: 'GuildsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Guild;
};

export type Icon = {
  __typename?: 'Icon';
  /** Icon Id */
  id: Scalars['ID']['output'];
  /** Name */
  name: Scalars['String']['output'];
  /** URL to image file */
  url?: Maybe<Scalars['String']['output']>;
};

export type IdOperationFilterInput = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type InfluenceEntryFilterInput = {
  and?: InputMaybe<Array<InfluenceEntryFilterInput>>;
  /** Name */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<InfluenceEntryFilterInput>>;
};

export type InfluenceEntrySortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type Instance = {
  __typename?: 'Instance';
  /** Encounters */
  encounters?: Maybe<Array<Maybe<InstanceEncounter>>>;
  /** Id */
  id: Scalars['ID']['output'];
  /** Name */
  name: Scalars['String']['output'];
  /** Zone information */
  zone: Zone;
};

export type InstanceEncounter = {
  __typename?: 'InstanceEncounter';
  /** Id */
  id: Scalars['ID']['output'];
  /** Name */
  name: Scalars['String']['output'];
};

export type InstanceEncounterRun = {
  __typename?: 'InstanceEncounterRun';
  /** If the encounter was completed */
  completed: Scalars['Boolean']['output'];
  /** Total deaths during the run */
  deaths: Scalars['Int']['output'];
  /** Duration of the run in seconds */
  duration: Scalars['Duration']['output'];
  /** Encounter info */
  encounter?: Maybe<InstanceEncounter>;
  /** The Id of the encounter */
  encounterId: Scalars['ID']['output'];
  /** End time of the run */
  end: Scalars['DateTime']['output'];
  /** The unique id of the run */
  id: Scalars['ID']['output'];
  /** Instance information */
  instance: Instance;
  /** The Id of the instance */
  instanceId: Scalars['ID']['output'];
  /** The Id of the instance run */
  instanceRunId: Scalars['ID']['output'];
  /** Scoreboard entries */
  scoreboardEntries: Array<InstanceEncounterRunScoreboardEntry>;
  /** Start time of the run */
  start: Scalars['DateTime']['output'];
};

export type InstanceEncounterRunFilterInput = {
  and?: InputMaybe<Array<InstanceEncounterRunFilterInput>>;
  averageItemRating?: InputMaybe<FloatOperationFilterInput>;
  completed?: InputMaybe<BooleanOperationFilterInput>;
  encounterId?: InputMaybe<IdOperationFilterInput>;
  end?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  instanceId?: InputMaybe<IdOperationFilterInput>;
  maxItemRating?: InputMaybe<UnsignedIntOperationFilterInput>;
  minItemRating?: InputMaybe<UnsignedIntOperationFilterInput>;
  or?: InputMaybe<Array<InstanceEncounterRunFilterInput>>;
  scoreboardEntryCount?: InputMaybe<IntOperationFilterInput>;
  start?: InputMaybe<DateTimeOperationFilterInput>;
  totalDeaths?: InputMaybe<LongOperationFilterInput>;
};

export type InstanceEncounterRunScoreboardEntry = {
  __typename?: 'InstanceEncounterRunScoreboardEntry';
  /** Archetype at the time of the run */
  archetype: Archetype;
  /** Career at the time of the run */
  career: Career;
  /** Character information */
  character: Character;
  /** Damage */
  damage: Scalars['UnsignedInt']['output'];
  /** Damage Received */
  damageReceived: Scalars['UnsignedInt']['output'];
  /** Deaths */
  deaths: Scalars['UnsignedInt']['output'];
  /** Guild at the time of the run */
  guild?: Maybe<Guild>;
  /** Healing */
  healing: Scalars['UnsignedInt']['output'];
  /** Healing of others */
  healingOthers: Scalars['UnsignedInt']['output'];
  /** Healing of self */
  healingReceived: Scalars['UnsignedInt']['output'];
  /** Healing of self */
  healingSelf: Scalars['UnsignedInt']['output'];
  /** Total item rating */
  itemRating: Scalars['UnsignedInt']['output'];
  /** Damage contributing to kills */
  killDamage: Scalars['UnsignedInt']['output'];
  /** Level at the time of the run */
  level: Scalars['UnsignedByte']['output'];
  /** Damage Prevented */
  protection: Scalars['UnsignedInt']['output'];
  /** Protection of others */
  protectionOthers: Scalars['UnsignedInt']['output'];
  /** Protection Received */
  protectionReceived: Scalars['UnsignedInt']['output'];
  /** Protection of self */
  protectionSelf: Scalars['UnsignedInt']['output'];
  /** Renown rank at the time of the run */
  renownRank: Scalars['UnsignedByte']['output'];
  /** Resurrections */
  resurrectionsDone: Scalars['UnsignedInt']['output'];
};

export type InstanceEncounterRunSortInput = {
  end?: InputMaybe<SortEnumType>;
  start?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type InstanceEncounterRunsConnection = {
  __typename?: 'InstanceEncounterRunsConnection';
  /** Average deaths of all matching runs */
  averageDeaths: Scalars['Float']['output'];
  /** Average duration of all matching runs */
  averageDuration: Scalars['Duration']['output'];
  /** Number of completed runs of all matching runs */
  completedCount: Scalars['Int']['output'];
  /** A list of edges. */
  edges?: Maybe<Array<InstanceEncounterRunsEdge>>;
  /** Max duration of all matching runs */
  maxDuration: Scalars['Duration']['output'];
  /** Median deaths of all matching runs */
  medianDeaths: Scalars['Int']['output'];
  /** Median duration of all matching runs */
  medianDuration: Scalars['Duration']['output'];
  /** Min duration of all matching runs */
  minDuration: Scalars['Duration']['output'];
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<InstanceEncounterRun>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type InstanceEncounterRunsEdge = {
  __typename?: 'InstanceEncounterRunsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: InstanceEncounterRun;
};

export type InstanceFilterInput = {
  and?: InputMaybe<Array<InstanceFilterInput>>;
  id?: InputMaybe<IdOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<InstanceFilterInput>>;
};

export type InstanceRun = {
  __typename?: 'InstanceRun';
  /** If all encounters have been completed */
  completed: Scalars['Boolean']['output'];
  /** Total deaths during the run */
  deaths: Scalars['Int']['output'];
  /** Duration of the run in seconds */
  duration: Scalars['Duration']['output'];
  /** Encounters */
  encounters: Array<InstanceEncounterRun>;
  /** End time of the run */
  end: Scalars['DateTime']['output'];
  /** The unique id of the run */
  id: Scalars['ID']['output'];
  /** Instance information */
  instance: Instance;
  /** The id of the instance */
  instanceId: Scalars['ID']['output'];
  /** Scoreboard entries */
  scoreboardEntries: Array<InstanceRunScoreboardEntry>;
  /** Start time of the run */
  start: Scalars['DateTime']['output'];
};

export type InstanceRunFilterInput = {
  and?: InputMaybe<Array<InstanceRunFilterInput>>;
  averageItemRating?: InputMaybe<FloatOperationFilterInput>;
  completed?: InputMaybe<BooleanOperationFilterInput>;
  completedEncounters?: InputMaybe<IntOperationFilterInput>;
  end?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  instanceId?: InputMaybe<IdOperationFilterInput>;
  maxItemRating?: InputMaybe<UnsignedIntOperationFilterInput>;
  minItemRating?: InputMaybe<UnsignedIntOperationFilterInput>;
  or?: InputMaybe<Array<InstanceRunFilterInput>>;
  scoreboardEntryCount?: InputMaybe<IntOperationFilterInput>;
  start?: InputMaybe<DateTimeOperationFilterInput>;
  totalDeaths?: InputMaybe<LongOperationFilterInput>;
};

export type InstanceRunScoreboardEntry = {
  __typename?: 'InstanceRunScoreboardEntry';
  /** Archetype at the time of the run */
  archetype: Archetype;
  /** Career at the time of the run */
  career: Career;
  /** Character information */
  character: Character;
  /** Damage */
  damage: Scalars['UnsignedInt']['output'];
  /** Damage Received */
  damageReceived: Scalars['UnsignedInt']['output'];
  /** Deaths */
  deaths: Scalars['UnsignedInt']['output'];
  /** Guild at the time of the run */
  guild?: Maybe<Guild>;
  /** Healing */
  healing: Scalars['UnsignedInt']['output'];
  /** Healing of others */
  healingOthers: Scalars['UnsignedInt']['output'];
  /** Healing of self */
  healingReceived: Scalars['UnsignedInt']['output'];
  /** Healing of self */
  healingSelf: Scalars['UnsignedInt']['output'];
  /** Total item rating */
  itemRating: Scalars['UnsignedInt']['output'];
  /** Damage contributing to kills */
  killDamage: Scalars['UnsignedInt']['output'];
  /** Level at the time of the run */
  level: Scalars['UnsignedByte']['output'];
  /** Damage Prevented */
  protection: Scalars['UnsignedInt']['output'];
  /** Protection of others */
  protectionOthers: Scalars['UnsignedInt']['output'];
  /** Protection Received */
  protectionReceived: Scalars['UnsignedInt']['output'];
  /** Protection of self */
  protectionSelf: Scalars['UnsignedInt']['output'];
  /** Renown rank at the time of the run */
  renownRank: Scalars['UnsignedByte']['output'];
  /** Resurrections */
  resurrectionsDone: Scalars['UnsignedInt']['output'];
};

export type InstanceRunSortInput = {
  end?: InputMaybe<SortEnumType>;
  start?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type InstanceRunsConnection = {
  __typename?: 'InstanceRunsConnection';
  /** Average deaths of all matching runs */
  averageDeaths: Scalars['Float']['output'];
  /** Average duration of all matching runs */
  averageDuration: Scalars['Duration']['output'];
  /** Number of completed runs of all matching runs */
  completedCount: Scalars['Int']['output'];
  /** A list of edges. */
  edges?: Maybe<Array<InstanceRunsEdge>>;
  /** Max duration of all matching runs */
  maxDuration: Scalars['Duration']['output'];
  /** Median deaths of all matching runs */
  medianDeaths: Scalars['Int']['output'];
  /** Median duration of all matching runs */
  medianDuration: Scalars['Duration']['output'];
  /** Min duration of all matching runs */
  minDuration: Scalars['Duration']['output'];
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<InstanceRun>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type InstanceRunsEdge = {
  __typename?: 'InstanceRunsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: InstanceRun;
};

export type InstanceSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A connection to a list of items. */
export type InstancesConnection = {
  __typename?: 'InstancesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<InstancesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Instance>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type InstancesEdge = {
  __typename?: 'InstancesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Instance;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type Item = SearchContent & {
  __typename?: 'Item';
  abilities: Array<Ability>;
  /** Armor value, block rating on shields */
  armor: Scalars['UnsignedShort']['output'];
  buffs: Array<Ability>;
  careerRestriction: Array<Career>;
  /** Description */
  description: Scalars['String']['output'];
  /** Weapon DPS */
  dps: Scalars['UnsignedShort']['output'];
  /** Creatures that drop this item */
  dropsFromCreatures?: Maybe<DropsFromCreaturesConnection>;
  /** Game Objects that drop this item */
  dropsFromGameObjects?: Maybe<DropsFromGameObjectsConnection>;
  iconUrl: Scalars['URL']['output'];
  /** Id */
  id: Scalars['ID']['output'];
  /** Item level */
  itemLevel: Scalars['UnsignedByte']['output'];
  itemSet?: Maybe<ItemSet>;
  /** Level requirement */
  levelRequirement: Scalars['UnsignedByte']['output'];
  /** Model ID */
  modelId?: Maybe<Scalars['UnsignedShort']['output']>;
  /** Name */
  name: Scalars['String']['output'];
  raceRestriction: Array<Race>;
  /** Rarity level */
  rarity: ItemRarity;
  /** Renown rank requirement */
  renownRankRequirement: Scalars['UnsignedByte']['output'];
  /** Chapters that reward this item */
  rewardedFromChapters?: Maybe<RewardedFromChaptersConnection>;
  /** Quests that reward this item */
  rewardedFromQuests?: Maybe<RewardedFromQuestsConnection>;
  /** Character equipment slot */
  slot: EquipSlot;
  /** Vendors that sell this item */
  soldByVendors?: Maybe<SoldByVendorsConnection>;
  /** Weapon speed */
  speed: Scalars['UnsignedShort']['output'];
  stats: Array<ItemStat>;
  /** Number of talisman slots */
  talismanSlots: Scalars['UnsignedByte']['output'];
  /** Type */
  type: ItemType;
  /** Unique equipped */
  uniqueEquipped: Scalars['Boolean']['output'];
  /** Vendors that trade this item */
  usedToPurchase?: Maybe<UsedToPurchaseConnection>;
};

export type ItemDropsFromCreaturesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemDropsFromGameObjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemRewardedFromChaptersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemRewardedFromQuestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemSoldByVendorsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemUsedToPurchaseArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  slot?: InputMaybe<EquipSlot>;
  usableByCareer?: InputMaybe<Career>;
};

export enum ItemBindType {
  /** Bound to account on equip */
  AccountBindOnEquip = 'ACCOUNT_BIND_ON_EQUIP',
  /** Bound to account on pickup */
  AccountBindOnPickup = 'ACCOUNT_BIND_ON_PICKUP',
  /** Bound to character on equip */
  BindOnEquip = 'BIND_ON_EQUIP',
  /** Bound to character on pickup */
  BindOnPickup = 'BIND_ON_PICKUP',
  /** Not Bound */
  None = 'NONE',
}

export enum ItemExpirationTimeType {
  /** Time offset is absolute (i.e. unix timestamp) */
  Absolute = 'ABSOLUTE',
  /** Time offset is when a live event ends. */
  LiveEvent = 'LIVE_EVENT',
  /** Time offset is relative to current time */
  Relative = 'RELATIVE',
  /** This will expire on a hardcoded time (after next zandri expedition) */
  ZandriExpedition = 'ZANDRI_EXPEDITION',
}

export enum ItemExpirationType {
  /** Normal non expiring items */
  NonExpiring = 'NON_EXPIRING',
  /** Expire stats on equip */
  OnEquip = 'ON_EQUIP',
  /** Expire starts on pickup */
  OnPickup = 'ON_PICKUP',
}

/** Item filtering options */
export type ItemFilterInput = {
  and?: InputMaybe<Array<ItemFilterInput>>;
  /** Armor value, block rating on shields */
  armor?: InputMaybe<UnsignedShortOperationFilterInput>;
  /** Description */
  description?: InputMaybe<StringOperationFilterInput>;
  /** Weapon DPS */
  dps?: InputMaybe<UnsignedShortOperationFilterInput>;
  /** Item Id */
  id?: InputMaybe<IdOperationFilterInput>;
  /** Item level */
  itemLevel?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Level requirement */
  levelRequirement?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Name */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ItemFilterInput>>;
  /** Rarity level */
  rarity?: InputMaybe<ItemRarityOperationFilterInput>;
  /** Renown rank requirement */
  renownRankRequirement?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Character equipment slot */
  slot?: InputMaybe<EquipSlotOperationFilterInput>;
  /** Weapon speed */
  speed?: InputMaybe<UnsignedShortOperationFilterInput>;
  /** Number of talisman slots */
  talismanSlots?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Type */
  type?: InputMaybe<ItemTypeOperationFilterInput>;
  /** Unique equipped */
  uniqueEquipped?: InputMaybe<BooleanOperationFilterInput>;
};

export enum ItemRarity {
  Common = 'COMMON',
  Mythic = 'MYTHIC',
  Rare = 'RARE',
  Uncommon = 'UNCOMMON',
  Utility = 'UTILITY',
  VeryRare = 'VERY_RARE',
}

export type ItemRarityOperationFilterInput = {
  eq?: InputMaybe<ItemRarity>;
  in?: InputMaybe<Array<ItemRarity>>;
  neq?: InputMaybe<ItemRarity>;
  nin?: InputMaybe<Array<ItemRarity>>;
};

export type ItemSet = SearchContent & {
  __typename?: 'ItemSet';
  bonuses: Array<ItemSetBonus>;
  id: Scalars['ID']['output'];
  items: Array<Item>;
  level: Scalars['UnsignedByte']['output'];
  name: Scalars['String']['output'];
};

export type ItemSetBonus = {
  __typename?: 'ItemSetBonus';
  bonus: ItemSetBonusValue;
  itemsRequired: Scalars['UnsignedByte']['output'];
};

export type ItemSetBonusValue = Ability | ItemStat;

/** Item sorting options */
export type ItemSortInput = {
  /** Armor value, block rating on shields */
  armor?: InputMaybe<SortEnumType>;
  /** Description */
  description?: InputMaybe<SortEnumType>;
  /** Weapon DPS */
  dps?: InputMaybe<SortEnumType>;
  /** Item Id */
  id?: InputMaybe<SortEnumType>;
  /** Item level */
  itemLevel?: InputMaybe<SortEnumType>;
  /** Level requirement */
  levelRequirement?: InputMaybe<SortEnumType>;
  /** Name */
  name?: InputMaybe<SortEnumType>;
  /** Rarity level */
  rarity?: InputMaybe<SortEnumType>;
  /** Renown rank requirement */
  renownRankRequirement?: InputMaybe<SortEnumType>;
  /** Character equipment slot */
  slot?: InputMaybe<SortEnumType>;
  /** Weapon speed */
  speed?: InputMaybe<SortEnumType>;
  /** Number of talisman slots */
  talismanSlots?: InputMaybe<SortEnumType>;
  /** Type */
  type?: InputMaybe<SortEnumType>;
};

export type ItemStat = {
  __typename?: 'ItemStat';
  /** Percentage */
  percentage: Scalars['Boolean']['output'];
  /** Stat */
  stat: Stat;
  /** Value */
  value: Scalars['Short']['output'];
};

export enum ItemType {
  Accessory = 'ACCESSORY',
  AdvancedMount = 'ADVANCED_MOUNT',
  Axe = 'AXE',
  BasicMount = 'BASIC_MOUNT',
  BasicShield = 'BASIC_SHIELD',
  Bow = 'BOW',
  Charm = 'CHARM',
  Crafting = 'CRAFTING',
  Crossbow = 'CROSSBOW',
  Currency = 'CURRENCY',
  Dagger = 'DAGGER',
  Dye = 'DYE',
  Enhancement = 'ENHANCEMENT',
  ExpertShield = 'EXPERT_SHIELD',
  Gun = 'GUN',
  Hammer = 'HAMMER',
  HeavyArmor = 'HEAVY_ARMOR',
  Lance = 'LANCE',
  LightArmor = 'LIGHT_ARMOR',
  Marketing = 'MARKETING',
  MediumArmor = 'MEDIUM_ARMOR',
  MediumRobe = 'MEDIUM_ROBE',
  None = 'NONE',
  Pistol = 'PISTOL',
  Potion = 'POTION',
  Quest = 'QUEST',
  RefinerTool = 'REFINER_TOOL',
  RepeatingCrossbow = 'REPEATING_CROSSBOW',
  Robe = 'ROBE',
  Salvaging = 'SALVAGING',
  Shield = 'SHIELD',
  Siege = 'SIEGE',
  Spear = 'SPEAR',
  Staff = 'STAFF',
  Sword = 'SWORD',
  Teleport = 'TELEPORT',
  TeleportGroup = 'TELEPORT_GROUP',
  TreasureChest = 'TREASURE_CHEST',
  TreasureKey = 'TREASURE_KEY',
  Trophy = 'TROPHY',
}

export type ItemTypeOperationFilterInput = {
  eq?: InputMaybe<ItemType>;
  in?: InputMaybe<Array<ItemType>>;
  neq?: InputMaybe<ItemType>;
  nin?: InputMaybe<Array<ItemType>>;
};

/** A connection to a list of items. */
export type ItemsConnection = {
  __typename?: 'ItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Item>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ItemsEdge = {
  __typename?: 'ItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Item;
};

export type Keep = Location &
  SearchContent & {
    __typename?: 'Keep';
    /** The unique identifier of the keep. */
    id: Scalars['ID']['output'];
    /** The name of the keep. */
    name: Scalars['String']['output'];
    position: Position;
  };

export type Kill = {
  __typename?: 'Kill';
  /** List of all enemy players contributing to the kill */
  attackers: Array<Attacker>;
  /**
   * Damage by attacker and source
   * @deprecated Use 'damageSources' instead
   */
  damage: Array<KillDamage>;
  /** Damage by attacker and source */
  damageSources: Array<KillDamageSource>;
  /** The player who landed the killing blow */
  deathblow?: Maybe<Character>;
  /** Kill Id */
  id: Scalars['ID']['output'];
  /** Scenario instance, null if not in a scenario */
  instance?: Maybe<ScenarioRecord>;
  /** Specifies the instance of a scenario this kill happened in */
  instanceId?: Maybe<Scalars['ID']['output']>;
  /** Position of the victim at the time of the kill */
  position: Position;
  /** Scenario, null if not in a scenario */
  scenario?: Maybe<Scenario>;
  /**
   * ScenarioId, 0 if not in a scenario
   * @deprecated No longer supported.
   */
  scenarioId?: Maybe<Scalars['ID']['output']>;
  /** Scenario information */
  scenarioRecord?: Maybe<ScenarioRecord>;
  /** Skirmish information */
  skirmish?: Maybe<Skirmish>;
  /** UTC Timestamp */
  time: Scalars['DateTime']['output'];
  /** The total renown generated from the kill, including AAO modifiers */
  totalRenown: Scalars['UnsignedInt']['output'];
  /** The victim */
  victim: Victim;
};

export type KillDamage = {
  __typename?: 'KillDamage';
  /** Ability information */
  ability?: Maybe<AbilityInfo>;
  /** The character doing the damage */
  attacker?: Maybe<Character>;
  /** Type of attacker */
  attackerType: KillDamageAttackerType;
  /** Damage amount */
  damageAmount: Scalars['UnsignedInt']['output'];
  /** Type of damage source */
  damageType: KillDamageSourceType;
};

export enum KillDamageAttackerType {
  Other = 'OTHER',
  Player = 'PLAYER',
}

export type KillDamageSource = {
  /** Damage amount */
  damageAmount: Scalars['UnsignedInt']['output'];
};

export enum KillDamageSourceType {
  Ability = 'ABILITY',
  FallDamage = 'FALL_DAMAGE',
  Other = 'OTHER',
}

export type KillFilterInput = {
  and?: InputMaybe<Array<KillFilterInput>>;
  /** Percent of the total damage done by the killer */
  damagePercent?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Specifies the instance of a scenario this kill happened in */
  instanceId?: InputMaybe<IdOperationFilterInput>;
  killerCareer?: InputMaybe<CareerLineOperationFilterInput>;
  killerCharacterId?: InputMaybe<IdOperationFilterInput>;
  killerGuildId?: InputMaybe<IdOperationFilterInput>;
  killerLevel?: InputMaybe<UnsignedByteOperationFilterInput>;
  killerRenownRank?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Number of assists */
  numAssists?: InputMaybe<UnsignedIntOperationFilterInput>;
  or?: InputMaybe<Array<KillFilterInput>>;
  /** ScenarioId, 0 if not in a scenario */
  scenarioId?: InputMaybe<IdOperationFilterInput>;
  /** Id of the skirmish the kill happened in */
  skirmishId?: InputMaybe<IdOperationFilterInput>;
  /** UTC Timestamp */
  time?: InputMaybe<DateTimeOperationFilterInput>;
  victimCareer?: InputMaybe<CareerLineOperationFilterInput>;
  victimCharacterId?: InputMaybe<IdOperationFilterInput>;
  victimGuildId?: InputMaybe<IdOperationFilterInput>;
  victimLevel?: InputMaybe<UnsignedByteOperationFilterInput>;
  victimRenownRank?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Zone Id */
  zoneId?: InputMaybe<IdOperationFilterInput>;
};

export type KillGuildLeaderboardEntry = {
  __typename?: 'KillGuildLeaderboardEntry';
  /** Number of deaths */
  deaths: Scalars['Int']['output'];
  /** Guild information */
  guild: Guild;
  /** Number of kills */
  kills: Scalars['Int']['output'];
  /** Rank */
  rank: Scalars['Int']['output'];
};

export type KillLeaderboardEntry = {
  __typename?: 'KillLeaderboardEntry';
  /** Character information */
  character: Character;
  /** Number of deaths */
  deaths: Scalars['Int']['output'];
  /** Number of kills */
  kills: Scalars['Int']['output'];
  /** Rank */
  rank: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type KillsConnection = {
  __typename?: 'KillsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<KillsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Kill>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type KillsEdge = {
  __typename?: 'KillsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Kill;
};

export type KillsHeatmapPoint = {
  __typename?: 'KillsHeatmapPoint';
  count: Scalars['UnsignedInt']['output'];
  x: Scalars['UnsignedInt']['output'];
  y: Scalars['UnsignedInt']['output'];
};

/** A connection to a list of items. */
export type LeaderboardConnection = {
  __typename?: 'LeaderboardConnection';
  /** A list of edges. */
  edges?: Maybe<Array<LeaderboardEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<RankedLeaderboardCharacter>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type LeaderboardEdge = {
  __typename?: 'LeaderboardEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RankedLeaderboardCharacter;
};

export type ListFilterInputTypeOfScenarioScoreboardEntryFilterInput = {
  all?: InputMaybe<ScenarioScoreboardEntryFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<ScenarioScoreboardEntryFilterInput>;
  some?: InputMaybe<ScenarioScoreboardEntryFilterInput>;
};

export type ListIdOperationFilterInput = {
  all?: InputMaybe<IdOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']['input']>;
  none?: InputMaybe<IdOperationFilterInput>;
  some?: InputMaybe<IdOperationFilterInput>;
};

export type LiveEvent = Event &
  SearchContent & {
    __typename?: 'LiveEvent';
    endTime: Scalars['DateTime']['output'];
    /** Id of the content */
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    startTime: Scalars['DateTime']['output'];
  };

export type Location = {
  /** Name */
  name: Scalars['String']['output'];
  /** Position */
  position: Position;
};

export type LongOperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']['input']>;
  gt?: InputMaybe<Scalars['Long']['input']>;
  gte?: InputMaybe<Scalars['Long']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  lt?: InputMaybe<Scalars['Long']['input']>;
  lte?: InputMaybe<Scalars['Long']['input']>;
  neq?: InputMaybe<Scalars['Long']['input']>;
  ngt?: InputMaybe<Scalars['Long']['input']>;
  ngte?: InputMaybe<Scalars['Long']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Long']['input']>>>;
  nlt?: InputMaybe<Scalars['Long']['input']>;
  nlte?: InputMaybe<Scalars['Long']['input']>;
};

export type MapSetup = {
  __typename?: 'MapSetup';
  /** The unique id of the map setup */
  id: Scalars['ID']['output'];
  /** The NW corner X coordinate of the map */
  nwCornerX: Scalars['Int']['output'];
  /** The NW corner Y coordinate of the map */
  nwCornerY: Scalars['Int']['output'];
  /** The SE corner X coordinate of the map */
  seCornerX: Scalars['Int']['output'];
  /** The SE corner Y coordinate of the map */
  seCornerY: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type MembersConnection = {
  __typename?: 'MembersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<MembersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<GuildMember>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type MembersEdge = {
  __typename?: 'MembersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: GuildMember;
};

export type NullableOfCreatureTitleOperationFilterInput = {
  eq?: InputMaybe<CreatureTitle>;
  in?: InputMaybe<Array<InputMaybe<CreatureTitle>>>;
  neq?: InputMaybe<CreatureTitle>;
  nin?: InputMaybe<Array<InputMaybe<CreatureTitle>>>;
};

export type NullableOfTomeSectionOperationFilterInput = {
  eq?: InputMaybe<TomeOfKnowledgeSection>;
  in?: InputMaybe<Array<InputMaybe<TomeOfKnowledgeSection>>>;
  neq?: InputMaybe<TomeOfKnowledgeSection>;
  nin?: InputMaybe<Array<InputMaybe<TomeOfKnowledgeSection>>>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** Indicates whether more edges exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more edges exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PlayerFeudFilterInput = {
  player1Id: Scalars['ID']['input'];
  player2Id: Scalars['ID']['input'];
};

/** Damage dealt by a player */
export type PlayerKillDamage = KillDamageSource & {
  __typename?: 'PlayerKillDamage';
  /** By ability */
  abilities: Array<AbilityKillDamage>;
  /** The character doing the damage */
  attacker?: Maybe<Character>;
  /** Amount of damage dealt */
  damageAmount: Scalars['UnsignedInt']['output'];
};

export type Position = {
  __typename?: 'Position';
  /** The map setup of the zone */
  mapSetup?: Maybe<MapSetup>;
  /** Zone X position */
  x: Scalars['UnsignedShort']['output'];
  /** Zone Y position */
  y: Scalars['UnsignedShort']['output'];
  /** Z position */
  z: Scalars['UnsignedShort']['output'];
  /** Zone Info */
  zone?: Maybe<Zone>;
  /** ZoneId */
  zoneId: Scalars['UnsignedShort']['output'];
};

export type PublicQuest = Location &
  SearchContent & {
    __typename?: 'PublicQuest';
    difficulty: PublicQuestDifficulty;
    id: Scalars['ID']['output'];
    name: Scalars['String']['output'];
    position: Position;
    type: PublicQuestType;
  };

export enum PublicQuestDifficulty {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM',
  VeryHard = 'VERY_HARD',
}

export enum PublicQuestType {
  CitySiege = 'CITY_SIEGE',
  Fortress = 'FORTRESS',
  Keep = 'KEEP',
  LiveEvent = 'LIVE_EVENT',
  None = 'NONE',
  PublicQuest = 'PUBLIC_QUEST',
}

export type Query = {
  __typename?: 'Query';
  /** Get an ability by its ID. */
  ability?: Maybe<AbilityInfo>;
  /** Number of characters participating in one or more kills during the period */
  activeCharactersStats?: Maybe<Scalars['Int']['output']>;
  /** Get one character */
  character?: Maybe<Character>;
  /** Query for CharacterRatings matching a filter */
  characterRatings?: Maybe<CharacterRatingsConnection>;
  /** Query for characters matching a filter */
  characters?: Maybe<CharactersConnection>;
  /** Get one creature */
  creature?: Maybe<Creature>;
  /** Query for creatures matching a filter */
  creatures?: Maybe<CreaturesConnection>;
  events: Array<Event>;
  /** Get one game object */
  gameObject?: Maybe<GameObject>;
  /** Query for game objects matching a filter */
  gameObjects?: Maybe<GameObjectsConnection>;
  /** Get one guild */
  guild?: Maybe<Guild>;
  /** Query for guilds matching a filter */
  guilds?: Maybe<GuildsConnection>;
  /** Get information on an instance */
  instance?: Maybe<Instance>;
  /** Get information on an instance encounter run */
  instanceEncounterRun?: Maybe<InstanceEncounterRun>;
  /** Query for instance encounter runs matching a filter */
  instanceEncounterRuns?: Maybe<InstanceEncounterRunsConnection>;
  /** Get information on an instance run */
  instanceRun?: Maybe<InstanceRun>;
  /** Query for instance runs matching a filter */
  instanceRuns?: Maybe<InstanceRunsConnection>;
  /** Query for instances matching a filter */
  instances?: Maybe<InstancesConnection>;
  /** Get one item by Id */
  item?: Maybe<Item>;
  /** Query for items matching a filter */
  items?: Maybe<ItemsConnection>;
  /** Get one kill */
  kill?: Maybe<Kill>;
  /** Query for kills matching a filter */
  kills?: Maybe<KillsConnection>;
  killsHeatmap: Array<KillsHeatmapPoint>;
  monthlyGuildKillLeaderboard: Array<KillGuildLeaderboardEntry>;
  monthlyKillLeaderboard: Array<KillLeaderboardEntry>;
  /** Get one guild */
  quest?: Maybe<Quest>;
  /** Query for quests matching a filter */
  quests?: Maybe<QuestsConnection>;
  rankedSeason?: Maybe<RankedSeason>;
  rankedSeasons: Array<RankedSeason>;
  /** Get scenario result from instance id */
  scenario?: Maybe<ScenarioRecord>;
  /** Query for scenario records matching a filter */
  scenarios?: Maybe<ScenarioRecordsConnection>;
  /** Unified search */
  search?: Maybe<SearchConnection>;
  /** Get one skirmish */
  skirmish?: Maybe<Skirmish>;
  /** Query for skirmishes records matching a filter */
  skirmishes?: Maybe<SkirmishesConnection>;
  /** Query for Tome of Knowledge Achievement entries matching a filter */
  tomeOfKnowledgeAchievementEntries?: Maybe<TomeOfKnowledgeAchievementEntriesConnection>;
  /** Get one Tome of Knowledge Achievement entry by Id */
  tomeOfKnowledgeAchievementEntry?: Maybe<TomeOfKnowledgeAchievementEntry>;
  /** Get one Tome of Knowledge Achievement subtype by Id */
  tomeOfKnowledgeAchievementSubType?: Maybe<TomeOfKnowledgeAchievementType>;
  /** Get one Tome of Knowledge Achievement type by Id */
  tomeOfKnowledgeAchievementType?: Maybe<TomeOfKnowledgeAchievementType>;
  /** Query for Tome of Knowledge Achievement subtypes matching a filter */
  tomeOfKnowledgeAchievementTypes: Array<TomeOfKnowledgeAchievementType>;
  /** Query for Tome of Knowledge entries matching a filter */
  tomeOfKnowledgeEntries?: Maybe<TomeOfKnowledgeEntriesConnection>;
  /** Get one Tome of Knowledge entry by Id */
  tomeOfKnowledgeEntry?: Maybe<TomeOfKnowledgeEntry>;
  /** Get top skirmishes in last seven days */
  topSkirmishes: Array<Skirmish>;
  /** Query for War Journal entries matching a filter */
  warJournalEntries?: Maybe<Array<Maybe<WarJournalEntry>>>;
  /** Get one War Journal Entry by Id */
  warJournalEntry?: Maybe<WarJournalEntry>;
  /** Get one War Journal Storyline by Id */
  warJournalStoryline?: Maybe<WarJournalStoryline>;
  /** Query for War Journal Storylines matching a filter */
  warJournalStorylines: Array<WarJournalStoryline>;
  weeklyGuildKillLeaderboard: Array<KillGuildLeaderboardEntry>;
  weeklyKillLeaderboard: Array<KillLeaderboardEntry>;
  /** Get one Zone by Id */
  zone?: Maybe<Zone>;
};

export type QueryAbilityArgs = {
  id: Scalars['ID']['input'];
};

export type QueryActiveCharactersStatsArgs = {
  career?: InputMaybe<Career>;
  from: Scalars['DateTime']['input'];
  maxLevel?: InputMaybe<Scalars['Byte']['input']>;
  minLevel?: InputMaybe<Scalars['Byte']['input']>;
  to: Scalars['DateTime']['input'];
};

export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCharacterRatingsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CharacterRatingSortInput>>;
  where?: InputMaybe<CharacterRatingFilterInput>;
};

export type QueryCharactersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CharacterSortInput>>;
  where?: InputMaybe<CharacterFilterInput>;
};

export type QueryCreatureArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCreaturesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<CreatureSortInput>>;
  where?: InputMaybe<CreatureFilterInput>;
};

export type QueryGameObjectArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGameObjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<GameObjectProtoSortInput>>;
  where?: InputMaybe<GameObjectProtoFilterInput>;
};

export type QueryGuildArgs = {
  id: Scalars['ID']['input'];
};

export type QueryGuildsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<GuildInfoSortInput>>;
  where?: InputMaybe<GuildFilterInput>;
};

export type QueryInstanceArgs = {
  id: Scalars['ID']['input'];
};

export type QueryInstanceEncounterRunArgs = {
  id: Scalars['ID']['input'];
};

export type QueryInstanceEncounterRunsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InstanceEncounterRunSortInput>>;
  where?: InputMaybe<InstanceEncounterRunFilterInput>;
};

export type QueryInstanceRunArgs = {
  id: Scalars['ID']['input'];
};

export type QueryInstanceRunsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InstanceRunSortInput>>;
  where?: InputMaybe<InstanceRunFilterInput>;
};

export type QueryInstancesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<InstanceSortInput>>;
  where?: InputMaybe<InstanceFilterInput>;
};

export type QueryItemArgs = {
  id: Scalars['ID']['input'];
};

export type QueryItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hasStats?: InputMaybe<Array<Stat>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ItemSortInput>>;
  usableByCareer?: InputMaybe<Career>;
  where?: InputMaybe<ItemFilterInput>;
};

export type QueryKillArgs = {
  id: Scalars['ID']['input'];
  includeAssists?: Scalars['Boolean']['input'];
};

export type QueryKillsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  guildFeudFilter?: InputMaybe<GuildFeudFilterInput>;
  includeAssists?: InputMaybe<Scalars['Boolean']['input']>;
  instanceId?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  playerFeudFilter?: InputMaybe<PlayerFeudFilterInput>;
  soloOnly?: Scalars['Boolean']['input'];
  where?: InputMaybe<KillFilterInput>;
};

export type QueryKillsHeatmapArgs = {
  from?: InputMaybe<Scalars['Long']['input']>;
  instanceId?: InputMaybe<Scalars['ID']['input']>;
  killerGuildId?: InputMaybe<Scalars['ID']['input']>;
  killerId?: InputMaybe<Scalars['ID']['input']>;
  soloOnly?: Scalars['Boolean']['input'];
  to?: InputMaybe<Scalars['Long']['input']>;
  victimGuildId?: InputMaybe<Scalars['ID']['input']>;
  victimId?: InputMaybe<Scalars['ID']['input']>;
  zoneId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryMonthlyGuildKillLeaderboardArgs = {
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type QueryMonthlyKillLeaderboardArgs = {
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type QueryQuestArgs = {
  id: Scalars['ID']['input'];
};

export type QueryQuestsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<QuestSortInput>>;
  where?: InputMaybe<QuestFilterInput>;
};

export type QueryRankedSeasonArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryScenarioArgs = {
  id: Scalars['ID']['input'];
};

export type QueryScenariosArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ScenarioRecordFilterInput>;
};

export type QuerySearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type QuerySkirmishArgs = {
  id: Scalars['ID']['input'];
};

export type QuerySkirmishesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  characterId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  guildId?: InputMaybe<Scalars['ID']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SkirmishFilterInput>;
};

export type QueryTomeOfKnowledgeAchievementEntriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TomeOfKnowledgeAchievementEntryFilterInput>;
};

export type QueryTomeOfKnowledgeAchievementEntryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTomeOfKnowledgeAchievementSubTypeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTomeOfKnowledgeAchievementTypeArgs = {
  id: Scalars['ID']['input'];
};

export type QueryTomeOfKnowledgeEntriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TomeOfKnowledgeEntryFilterInput>;
};

export type QueryTomeOfKnowledgeEntryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryWarJournalEntriesArgs = {
  where?: InputMaybe<WarJournalEntryFilterInput>;
};

export type QueryWarJournalEntryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryWarJournalStorylineArgs = {
  id: Scalars['ID']['input'];
};

export type QueryWarJournalStorylinesArgs = {
  where?: InputMaybe<WarJournalStorylineFilterInput>;
};

export type QueryWeeklyGuildKillLeaderboardArgs = {
  week: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type QueryWeeklyKillLeaderboardArgs = {
  week: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};

export type QueryZoneArgs = {
  id: Scalars['ID']['input'];
};

/** Info about a quest */
export type Quest = SearchContent & {
  __typename?: 'Quest';
  /** Available to careers */
  careerRestriction: Array<Career>;
  /** Number of choice rewards */
  choiceCount: Scalars['UnsignedByte']['output'];
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Expiration time */
  expireTime?: Maybe<Scalars['Duration']['output']>;
  /** Gold reward (in copper coins) */
  gold: Scalars['UnsignedInt']['output'];
  /** Id of the quest */
  id: Scalars['ID']['output'];
  /** Journal Entry Text */
  journalEntry?: Maybe<Scalars['String']['output']>;
  /** Maximum level */
  maxLevel: Scalars['UnsignedByte']['output'];
  /** Maximum renown */
  maxRenown: Scalars['UnsignedByte']['output'];
  /** Minimum level */
  minLevel: Scalars['UnsignedByte']['output'];
  /** Minimum renown */
  minRenown: Scalars['UnsignedByte']['output'];
  /** Name */
  name: Scalars['String']['output'];
  /** Objectives */
  objectives: Array<QuestObjective>;
  /** Available to races */
  raceRestriction: Array<Race>;
  /** Repeatable time, if repeatable type is set */
  repeatableTime: Scalars['Duration']['output'];
  /** Repeatable type */
  repeatableType: QuestRepeatableType;
  /** Choice rewards */
  rewardsChoice: Array<QuestReward>;
  /** Given rewards */
  rewardsGiven: Array<QuestReward>;
  /** Creatures starting quest */
  starterCreatures: Array<Creature>;
  /** Quest Type */
  type: QuestTypeFlagsFlags;
  /** XP Reward */
  xp: Scalars['UnsignedInt']['output'];
};

export type QuestFilterInput = {
  and?: InputMaybe<Array<QuestFilterInput>>;
  careerRestriction?: InputMaybe<CareerMaskOperationFilterInput>;
  expireTime?: InputMaybe<DurationOperationFilterInput>;
  /** Money Reward in copper coins */
  gold?: InputMaybe<UnsignedIntOperationFilterInput>;
  id?: InputMaybe<IdOperationFilterInput>;
  /** Minimum level to accept quest */
  minLevel?: InputMaybe<UnsignedByteOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<QuestFilterInput>>;
  raceRestriction?: InputMaybe<RaceMaskOperationFilterInput>;
  /** Repeat time for the quest if repeatableType is not None */
  repeatableTime?: InputMaybe<DurationOperationFilterInput>;
  repeatableType?: InputMaybe<QuestRepeatableTypeOperationFilterInput>;
  type?: InputMaybe<QuestTypeFlagsOperationFilterInput>;
  /** XP Reward */
  xp?: InputMaybe<UnsignedIntOperationFilterInput>;
};

/** Info about a quest objective */
export type QuestObjective = {
  __typename?: 'QuestObjective';
  /** Number of times the objective needs to be done */
  count: Scalars['UnsignedInt']['output'];
  /** Objective description */
  description: Scalars['String']['output'];
};

export enum QuestRepeatableType {
  /** Repeatable */
  Done = 'DONE',
  /** Not repeatable */
  None = 'NONE',
  /** Each Week */
  Weekly = 'WEEKLY',
}

export type QuestRepeatableTypeOperationFilterInput = {
  eq?: InputMaybe<QuestRepeatableType>;
  in?: InputMaybe<Array<QuestRepeatableType>>;
  neq?: InputMaybe<QuestRepeatableType>;
  nin?: InputMaybe<Array<QuestRepeatableType>>;
};

/** Info about a quest reward */
export type QuestReward = {
  __typename?: 'QuestReward';
  /** Number of items rewarded */
  count: Scalars['UnsignedShort']['output'];
  /** Item rewarded */
  item: Item;
};

export type QuestSortInput = {
  careerRestriction?: InputMaybe<SortEnumType>;
  /** Money Reward in copper coins */
  gold?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  /** Minimum level to accept quest */
  minLevel?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  raceRestriction?: InputMaybe<SortEnumType>;
  type?: InputMaybe<SortEnumType>;
  /** XP Reward */
  xp?: InputMaybe<SortEnumType>;
};

export enum QuestTypeFlags {
  Epic = 'EPIC',
  Group = 'GROUP',
  None = 'NONE',
  PlayerKill = 'PLAYER_KILL',
  RvR = 'RV_R',
  Tome = 'TOME',
  Travel = 'TRAVEL',
}

export type QuestTypeFlagsFlags = {
  __typename?: 'QuestTypeFlagsFlags';
  isEpic: Scalars['Boolean']['output'];
  isGroup: Scalars['Boolean']['output'];
  isNone: Scalars['Boolean']['output'];
  isPlayerKill: Scalars['Boolean']['output'];
  isRvR: Scalars['Boolean']['output'];
  isTome: Scalars['Boolean']['output'];
  isTravel: Scalars['Boolean']['output'];
};

export type QuestTypeFlagsFlagsInput = {
  isEpic?: InputMaybe<Scalars['Boolean']['input']>;
  isGroup?: InputMaybe<Scalars['Boolean']['input']>;
  isNone?: InputMaybe<Scalars['Boolean']['input']>;
  isPlayerKill?: InputMaybe<Scalars['Boolean']['input']>;
  isRvR?: InputMaybe<Scalars['Boolean']['input']>;
  isTome?: InputMaybe<Scalars['Boolean']['input']>;
  isTravel?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QuestTypeFlagsOperationFilterInput = {
  eq?: InputMaybe<QuestTypeFlagsFlagsInput>;
  in?: InputMaybe<Array<QuestTypeFlagsFlagsInput>>;
  neq?: InputMaybe<QuestTypeFlagsFlagsInput>;
  nin?: InputMaybe<Array<QuestTypeFlagsFlagsInput>>;
};

/** A connection to a list of items. */
export type QuestsConnection = {
  __typename?: 'QuestsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<QuestsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Quest>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type QuestsEdge = {
  __typename?: 'QuestsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Quest;
};

/** Player Races */
export enum Race {
  Chaos = 'CHAOS',
  DarkElf = 'DARK_ELF',
  Dwarf = 'DWARF',
  Empire = 'EMPIRE',
  Goblin = 'GOBLIN',
  HighElf = 'HIGH_ELF',
  Orc = 'ORC',
}

export enum RaceMask {
  Chaos = 'CHAOS',
  DarkElf = 'DARK_ELF',
  Dwarf = 'DWARF',
  Empire = 'EMPIRE',
  Goblin = 'GOBLIN',
  HighElf = 'HIGH_ELF',
  Orc = 'ORC',
}

export type RaceMaskFlagsInput = {
  isChaos?: InputMaybe<Scalars['Boolean']['input']>;
  isDarkElf?: InputMaybe<Scalars['Boolean']['input']>;
  isDwarf?: InputMaybe<Scalars['Boolean']['input']>;
  isEmpire?: InputMaybe<Scalars['Boolean']['input']>;
  isGoblin?: InputMaybe<Scalars['Boolean']['input']>;
  isHighElf?: InputMaybe<Scalars['Boolean']['input']>;
  isOrc?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RaceMaskOperationFilterInput = {
  eq?: InputMaybe<RaceMaskFlagsInput>;
  in?: InputMaybe<Array<RaceMaskFlagsInput>>;
  neq?: InputMaybe<RaceMaskFlagsInput>;
  nin?: InputMaybe<Array<RaceMaskFlagsInput>>;
};

export type RankedLeaderboardCharacter = {
  __typename?: 'RankedLeaderboardCharacter';
  /** Rank within career */
  careerRank: Scalars['UnsignedInt']['output'];
  character: Character;
  /** Draws */
  draws: Scalars['UnsignedInt']['output'];
  guild?: Maybe<Guild>;
  /** Losses */
  losses: Scalars['UnsignedInt']['output'];
  /** Matches needed */
  matchesNeeded: Scalars['UnsignedInt']['output'];
  /** Rank */
  rank: Scalars['UnsignedInt']['output'];
  /** Rating */
  rating: Scalars['UnsignedInt']['output'];
  /** Rating type */
  ratingType: RankedLeaderboardRatingType;
  /** Renown rank after last match in season */
  renownRank: Scalars['UnsignedByte']['output'];
  /** Season ID */
  seasonId: Scalars['UnsignedShort']['output'];
  /** Wins */
  wins: Scalars['UnsignedInt']['output'];
};

export enum RankedLeaderboardRatingType {
  RankedGroup = 'RANKED_GROUP',
  RankedSolo = 'RANKED_SOLO',
}

export type RankedSeason = {
  __typename?: 'RankedSeason';
  end: Scalars['DateTime']['output'];
  /** Season ID */
  id: Scalars['ID']['output'];
  leaderboard?: Maybe<LeaderboardConnection>;
  /** Is main season or off season */
  mainSeason: Scalars['Boolean']['output'];
  /** Season name */
  name: Scalars['String']['output'];
  start: Scalars['DateTime']['output'];
};

export type RankedSeasonLeaderboardArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  type: RankedLeaderboardRatingType;
  where?: InputMaybe<CharacterSeasonStatsFilterInput>;
};

export enum RatingType {
  Casual = 'CASUAL',
  City = 'CITY',
  RankedGroup = 'RANKED_GROUP',
  RankedSolo = 'RANKED_SOLO',
}

export type RatingTypeOperationFilterInput = {
  eq?: InputMaybe<RatingType>;
  in?: InputMaybe<Array<RatingType>>;
  neq?: InputMaybe<RatingType>;
  nin?: InputMaybe<Array<RatingType>>;
};

export enum Realm {
  /** Destruction */
  Destruction = 'DESTRUCTION',
  /** No realm */
  Neutral = 'NEUTRAL',
  /** Order */
  Order = 'ORDER',
}

export type RealmsOperationFilterInput = {
  eq?: InputMaybe<Realm>;
  in?: InputMaybe<Array<Realm>>;
  neq?: InputMaybe<Realm>;
  nin?: InputMaybe<Array<Realm>>;
};

/** A connection to a list of items. */
export type RewardedFromChaptersConnection = {
  __typename?: 'RewardedFromChaptersConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RewardedFromChaptersEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Chapter>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RewardedFromChaptersEdge = {
  __typename?: 'RewardedFromChaptersEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Chapter;
};

/** A connection to a list of items. */
export type RewardedFromQuestsConnection = {
  __typename?: 'RewardedFromQuestsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<RewardedFromQuestsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Quest>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type RewardedFromQuestsEdge = {
  __typename?: 'RewardedFromQuestsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Quest;
};

export type Scenario = SearchContent & {
  __typename?: 'Scenario';
  /** The unique id of the scenario */
  id: Scalars['ID']['output'];
  /** The name of the scenario */
  name: Scalars['String']['output'];
  /** Zone information */
  zone: Zone;
};

export enum ScenarioEnabledType {
  AlwaysEnabled = 'ALWAYS_ENABLED',
  ByCommand = 'BY_COMMAND',
  Developer = 'DEVELOPER',
  Disabled = 'DISABLED',
  Normal = 'NORMAL',
}

export enum ScenarioQueueType {
  /** City Sieges */
  CitySiege = 'CITY_SIEGE',
  /** Group Ranked scenarios */
  GroupRanked = 'GROUP_RANKED',
  /** Discordant scenarios */
  Solo = 'SOLO',
  /** Solo Ranked scenarios */
  SoloRanked = 'SOLO_RANKED',
  /** Normal scenarios */
  Standard = 'STANDARD',
}

export type ScenarioRecord = {
  __typename?: 'ScenarioRecord';
  /** The end time of the scenario */
  endTime: Scalars['DateTime']['output'];
  /** Scenario instance Id */
  id: Scalars['ID']['output'];
  /** The kills that occurred in the scenario */
  kills: Array<Kill>;
  /** Total number of deaths in the scenario */
  numDeaths: Scalars['Long']['output'];
  /** Total number of players in the scenario */
  numPlayers: Scalars['Int']['output'];
  /** Points for each team, 0 is order, 1 is destruction */
  points: Array<Maybe<Scalars['UnsignedInt']['output']>>;
  /** Queue type */
  queueType: Scalars['UnsignedByte']['output'];
  /** Scenario information */
  scenario: Scenario;
  /** Scenario Id */
  scenarioId: Scalars['ID']['output'];
  /** Scoreboard entries */
  scoreboardEntries: Array<ScenarioScoreboardEntry>;
  /** The skirmishes that occurred in the scenario */
  skirmishes: Array<Skirmish>;
  /** The start time of the scenario */
  startTime: Scalars['DateTime']['output'];
  /** Scenario tier */
  tier: Scalars['UnsignedByte']['output'];
  /** If the scenario was ended by surrender */
  wasSurrender: Scalars['Boolean']['output'];
  /** Winning team, 0 is order, 1 is destruction */
  winner?: Maybe<Scalars['UnsignedByte']['output']>;
};

export type ScenarioRecordFilterInput = {
  and?: InputMaybe<Array<ScenarioRecordFilterInput>>;
  /** The end time of the scenario */
  endTime?: InputMaybe<DateTimeOperationFilterInput>;
  /** Scenario instance Id */
  id?: InputMaybe<IdOperationFilterInput>;
  /** Total number of deaths in the scenario */
  numDeaths?: InputMaybe<LongOperationFilterInput>;
  /** Total number of players in the scenario */
  numPlayers?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ScenarioRecordFilterInput>>;
  /** Queue type */
  queueType?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** Scenario Id */
  scenarioId?: InputMaybe<IdOperationFilterInput>;
  /** Scoreboard entries */
  scoreboardEntries?: InputMaybe<ListFilterInputTypeOfScenarioScoreboardEntryFilterInput>;
  /** The start time of the scenario */
  startTime?: InputMaybe<DateTimeOperationFilterInput>;
  /** Scenario tier */
  tier?: InputMaybe<UnsignedByteOperationFilterInput>;
  /** If scenario ended by surrender */
  wasSurrender?: InputMaybe<BooleanOperationFilterInput>;
  /** Winning team, 0 is order, 1 is destruction */
  winner?: InputMaybe<UnsignedByteOperationFilterInput>;
};

/** A connection to a list of items. */
export type ScenarioRecordsConnection = {
  __typename?: 'ScenarioRecordsConnection';
  /** Average duration of all matching scenarios */
  averageDuration: Scalars['Duration']['output'];
  /** Average number of kills of all matching scenarios */
  averageKills: Scalars['Float']['output'];
  /** Average number of players of all matching scenarios */
  averagePlayers: Scalars['Float']['output'];
  /** A list of edges. */
  edges?: Maybe<Array<ScenarioRecordsEdge>>;
  /** Max duration of all matching scenarios */
  maxDuration: Scalars['Duration']['output'];
  /** Max number of kills of all matching scenarios */
  maxKills: Scalars['Float']['output'];
  /** Max number of players of all matching scenarios */
  maxPlayers: Scalars['Float']['output'];
  /** Median duration of all matching scenarios */
  medianDuration: Scalars['Duration']['output'];
  /** Median number of kills of all matching scenarios */
  medianKills: Scalars['Float']['output'];
  /** Median number of players of all matching scenarios */
  medianPlayers: Scalars['Float']['output'];
  /** Min duration of all matching scenarios */
  minDuration: Scalars['Duration']['output'];
  /** Min number of kills of all matching scenarios */
  minKills: Scalars['Float']['output'];
  /** Min number of players of all matching scenarios */
  minPlayers: Scalars['Float']['output'];
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<ScenarioRecord>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
  /** Number of unique characters across all matching scenarios */
  uniqueCharacters: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ScenarioRecordsEdge = {
  __typename?: 'ScenarioRecordsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ScenarioRecord;
};

export type ScenarioScoreboardEntry = {
  __typename?: 'ScenarioScoreboardEntry';
  /** Character information */
  character: Character;
  /** Damage contributing to kills of creatures */
  creatureKillDamage: Scalars['UnsignedInt']['output'];
  /** Damage */
  damage: Scalars['UnsignedInt']['output'];
  /** Damage Received */
  damageReceived: Scalars['UnsignedInt']['output'];
  /** Death blows */
  deathBlows: Scalars['UnsignedInt']['output'];
  /** Deaths */
  deaths: Scalars['UnsignedInt']['output'];
  /** Guild at the time of the scenario */
  guild?: Maybe<Guild>;
  /** Healing */
  healing: Scalars['UnsignedInt']['output'];
  /** Healing of others */
  healingOthers: Scalars['UnsignedInt']['output'];
  /** Healing Received */
  healingReceived: Scalars['UnsignedInt']['output'];
  /** Healing of self */
  healingSelf: Scalars['UnsignedInt']['output'];
  /** If the player has been in a guild premade (6 or more players of the same guild) during the scenario */
  isGuildPremade: Scalars['Boolean']['output'];
  /** Damage contributing to kills */
  killDamage: Scalars['UnsignedInt']['output'];
  /** Kills */
  kills: Scalars['UnsignedInt']['output'];
  /** Solo Kills */
  killsSolo: Scalars['UnsignedInt']['output'];
  /** Level at the time of the scenario */
  level: Scalars['UnsignedByte']['output'];
  /** Medals earned during the scenario */
  medals: Scalars['UnsignedInt']['output'];
  /** Objective Score */
  objectiveScore: Scalars['UnsignedInt']['output'];
  /** Damage Prevented */
  protection: Scalars['UnsignedInt']['output'];
  /** Protection of others */
  protectionOthers: Scalars['UnsignedInt']['output'];
  /** Protection Received */
  protectionReceived: Scalars['UnsignedInt']['output'];
  /** Protection of self */
  protectionSelf: Scalars['UnsignedInt']['output'];
  /** If true the player left the scenario before it ended */
  quitter: Scalars['Boolean']['output'];
  /** Renown rank at the time of the scenario */
  renownRank: Scalars['UnsignedByte']['output'];
  /** Resurrections */
  resurrectionsDone: Scalars['UnsignedInt']['output'];
  /** The team of the player. Normally Order=0, Destruction=1. */
  team: Scalars['UnsignedByte']['output'];
};

export type ScenarioScoreboardEntryFilterInput = {
  and?: InputMaybe<Array<ScenarioScoreboardEntryFilterInput>>;
  /** Character Id */
  characterId?: InputMaybe<IdOperationFilterInput>;
  /** Guild Id */
  guildId?: InputMaybe<IdOperationFilterInput>;
  /** If there's at least 6 or more players from the same guild in the scenario */
  isGuildPremade?: InputMaybe<BooleanOperationFilterInput>;
  /** If the entry is on the winning team */
  isWinner?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ScenarioScoreboardEntryFilterInput>>;
};

export enum ScenarioType {
  CaptureTheFlag = 'CAPTURE_THE_FLAG',
  CitySiege = 'CITY_SIEGE',
  DaemonBall = 'DAEMON_BALL',
  Deathmatch = 'DEATHMATCH',
  Domination = 'DOMINATION',
  DominationDragonsBane = 'DOMINATION_DRAGONS_BANE',
  DominationEc = 'DOMINATION_EC',
  DominationForge = 'DOMINATION_FORGE',
  DominationKhaine = 'DOMINATION_KHAINE',
  DominationPush = 'DOMINATION_PUSH',
  DominationPushCenter = 'DOMINATION_PUSH_CENTER',
  DominationTwistingTower = 'DOMINATION_TWISTING_TOWER',
  DoubleDomination = 'DOUBLE_DOMINATION',
  DropBomb = 'DROP_BOMB',
  DropPart = 'DROP_PART',
  FlagDomination = 'FLAG_DOMINATION',
  FlagDominationCreatureBoss = 'FLAG_DOMINATION_CREATURE_BOSS',
  MonsterDefend = 'MONSTER_DEFEND',
  Murderball = 'MURDERBALL',
  PickUpGroupRandom = 'PICK_UP_GROUP_RANDOM',
  Random6V6 = 'RANDOM6V6',
  ReverseDaemonBall = 'REVERSE_DAEMON_BALL',
  RotatingKingOfTheHill = 'ROTATING_KING_OF_THE_HILL',
  Scripted = 'SCRIPTED',
}

/** A connection to a list of items. */
export type ScoreboardEntriesConnection = {
  __typename?: 'ScoreboardEntriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<ScoreboardEntriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<SkirmishScoreboardEntry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type ScoreboardEntriesEdge = {
  __typename?: 'ScoreboardEntriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: SkirmishScoreboardEntry;
};

/** A connection to a list of items. */
export type SearchConnection = {
  __typename?: 'SearchConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SearchEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<SearchContent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

export type SearchContent = {
  /** Id of the content */
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

/** An edge in a connection. */
export type SearchEdge = {
  __typename?: 'SearchEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: SearchContent;
};

export enum Sex {
  /** Female */
  Female = 'FEMALE',
  /** Male */
  Male = 'MALE',
}

export type Skirmish = {
  __typename?: 'Skirmish';
  /** UTC Timestamp of Skirmish end */
  endTime: Scalars['DateTime']['output'];
  /** Heatmap of kills that happened during this skirmish primary zone */
  heatmap: Array<KillsHeatmapPoint>;
  /** Skirmish Id */
  id: Scalars['ID']['output'];
  /** Scenario instance, null if not in a scenario */
  instance?: Maybe<ScenarioRecord>;
  /** Damage leading to player kills in this skirmish */
  killDamage: Array<SkirmishKillDamage>;
  /** Damage leading to player kills in this skirmish from a specific character */
  killDamageByCharacter: Array<SkirmishKillDamage>;
  /** Kills that happened during this skirmish */
  kills?: Maybe<KillsConnection>;
  /** Total number of kills that happened during this skirmish */
  numberOfKills: Scalars['Int']['output'];
  /** Total number of kills that happened during this skirmish for Destruction */
  numberOfKillsDestruction: Scalars['Int']['output'];
  /** Total number of kills that happened during this skirmish for Order */
  numberOfKillsOrder: Scalars['Int']['output'];
  /** Total number of players that participated in this skirmish */
  numberOfPlayers: Scalars['Int']['output'];
  /** Total number of destruction players that participated in this skirmish */
  numberOfPlayersDestruction: Scalars['Int']['output'];
  /** Total number of order players that participated in this skirmish */
  numberOfPlayersOrder: Scalars['Int']['output'];
  /** Primary Zone Info */
  primaryZone?: Maybe<Zone>;
  /** Primary Zone Area Info */
  primaryZoneArea?: Maybe<ZoneArea>;
  /** Scenario, null if not in a scenario */
  scenario?: Maybe<Scenario>;
  /** Scoreboard entries */
  scoreboardEntries?: Maybe<ScoreboardEntriesConnection>;
  /** UTC Timestamp of Skirmish start */
  startTime: Scalars['DateTime']['output'];
  /** Top guilds by kills */
  topGuildsByKills: Array<SkirmishTopGuild>;
  /** Top guilds by players */
  topGuildsByPlayers: Array<SkirmishTopGuild>;
};

export type SkirmishKillDamageByCharacterArgs = {
  id: Scalars['ID']['input'];
};

export type SkirmishKillsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type SkirmishScoreboardEntriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SkirmishScoreboardEntrySortInput>>;
};

export type SkirmishFilterInput = {
  and?: InputMaybe<Array<SkirmishFilterInput>>;
  /** End time */
  endTime?: InputMaybe<DateTimeOperationFilterInput>;
  /** Scenario instance */
  instanceId?: InputMaybe<IdOperationFilterInput>;
  /** Total number of kills */
  numberOfKills?: InputMaybe<IntOperationFilterInput>;
  /** Total number of kills for destruction */
  numberOfKillsDestruction?: InputMaybe<IntOperationFilterInput>;
  /** Total number of kills for order */
  numberOfKillsOrder?: InputMaybe<IntOperationFilterInput>;
  /** Total number of players */
  numberOfPlayers?: InputMaybe<IntOperationFilterInput>;
  /** Total number of players destruction */
  numberOfPlayersDestruction?: InputMaybe<IntOperationFilterInput>;
  /** Total number of players order */
  numberOfPlayersOrder?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<SkirmishFilterInput>>;
  /** Primary Area */
  primaryAreaId?: InputMaybe<IdOperationFilterInput>;
  /** Primary Zone */
  primaryZoneId?: InputMaybe<IdOperationFilterInput>;
  /** Scenario Id */
  scenarioId?: InputMaybe<IdOperationFilterInput>;
  /** Start time */
  startTime?: InputMaybe<DateTimeOperationFilterInput>;
};

/** Damage dealt by a player in a skirmish */
export type SkirmishKillDamage = KillDamageSource & {
  __typename?: 'SkirmishKillDamage';
  /** Ability information */
  ability?: Maybe<AbilityInfo>;
  /** The character doing the damage */
  attacker?: Maybe<Character>;
  /** Type of attacker */
  attackerType: KillDamageAttackerType;
  /** Damage amount */
  damageAmount: Scalars['UnsignedInt']['output'];
  /** Type of damage source */
  damageType: KillDamageSourceType;
};

export type SkirmishScoreboardEntry = {
  __typename?: 'SkirmishScoreboardEntry';
  /** If true the player left the scenario before it ended */
  career: Career;
  /** Character information */
  character: Character;
  /** Damage contributing to kills of creatures */
  creatureKillDamage: Scalars['UnsignedInt']['output'];
  /** Damage */
  damage: Scalars['UnsignedInt']['output'];
  /** Damage Received */
  damageReceived: Scalars['UnsignedInt']['output'];
  /** Death blows */
  deathBlows: Scalars['UnsignedInt']['output'];
  /** Deaths */
  deaths: Scalars['UnsignedInt']['output'];
  /** Guild at the time of the scenario */
  guild?: Maybe<Guild>;
  /** Healing */
  healing: Scalars['UnsignedInt']['output'];
  /** Healing of others */
  healingOthers: Scalars['UnsignedInt']['output'];
  /** Healing of self */
  healingReceived: Scalars['UnsignedInt']['output'];
  /** Healing of self */
  healingSelf: Scalars['UnsignedInt']['output'];
  /** Damage contributing to kills */
  killDamage: Scalars['UnsignedInt']['output'];
  /** Kills */
  kills: Scalars['UnsignedInt']['output'];
  /** Solo Kills */
  killsSolo: Scalars['UnsignedInt']['output'];
  /** Level at the time of the scenario */
  level: Scalars['UnsignedByte']['output'];
  /** Damage Prevented */
  protection: Scalars['UnsignedInt']['output'];
  /** Protection of others */
  protectionOthers: Scalars['UnsignedInt']['output'];
  /** Protection Received */
  protectionReceived: Scalars['UnsignedInt']['output'];
  /** Protection of self */
  protectionSelf: Scalars['UnsignedInt']['output'];
  /** The realm of the player */
  realm: Realm;
  /** Renown rank at the time of the scenario */
  renownRank: Scalars['UnsignedByte']['output'];
  /** Resurrections */
  resurrectionsDone: Scalars['UnsignedInt']['output'];
};

export type SkirmishScoreboardEntrySortInput = {
  creatureKillDamage?: InputMaybe<SortEnumType>;
  damage?: InputMaybe<SortEnumType>;
  deathBlows?: InputMaybe<SortEnumType>;
  deaths?: InputMaybe<SortEnumType>;
  healing?: InputMaybe<SortEnumType>;
  killDamage?: InputMaybe<SortEnumType>;
  kills?: InputMaybe<SortEnumType>;
  level?: InputMaybe<SortEnumType>;
  protection?: InputMaybe<SortEnumType>;
  renownRank?: InputMaybe<SortEnumType>;
};

export type SkirmishTopGuild = {
  __typename?: 'SkirmishTopGuild';
  /** Value */
  count: Scalars['Int']['output'];
  /** Guild information */
  guild: Guild;
};

/** A connection to a list of items. */
export type SkirmishesConnection = {
  __typename?: 'SkirmishesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SkirmishesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<Skirmish>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SkirmishesEdge = {
  __typename?: 'SkirmishesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Skirmish;
};

/** A connection to a list of items. */
export type SoldByVendorsConnection = {
  __typename?: 'SoldByVendorsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<SoldByVendorsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<VendorItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type SoldByVendorsEdge = {
  __typename?: 'SoldByVendorsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: VendorItem;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum Stat {
  ActionPointCost = 'ACTION_POINT_COST',
  ActionPointRegen = 'ACTION_POINT_REGEN',
  AggroRadius = 'AGGRO_RADIUS',
  Agility = 'AGILITY',
  Apothecary = 'APOTHECARY',
  Armor = 'ARMOR',
  ArmorPenetration = 'ARMOR_PENETRATION',
  ArmorPenetrationReduction = 'ARMOR_PENETRATION_REDUCTION',
  AutoAttackDamage = 'AUTO_ATTACK_DAMAGE',
  AutoAttackSpeed = 'AUTO_ATTACK_SPEED',
  BallisticSkill = 'BALLISTIC_SKILL',
  Block = 'BLOCK',
  BlockStrikethrough = 'BLOCK_STRIKETHROUGH',
  BuildTime = 'BUILD_TIME',
  Butchering = 'BUTCHERING',
  Cooldown = 'COOLDOWN',
  CorporealResistance = 'CORPOREAL_RESISTANCE',
  CriticalDamage = 'CRITICAL_DAMAGE',
  CriticalDamageTakenReduction = 'CRITICAL_DAMAGE_TAKEN_REDUCTION',
  CriticalHitRate = 'CRITICAL_HIT_RATE',
  CriticalHitRateReduction = 'CRITICAL_HIT_RATE_REDUCTION',
  Cultivation = 'CULTIVATION',
  DamageAbsorb = 'DAMAGE_ABSORB',
  DismountChance = 'DISMOUNT_CHANCE',
  Disrupt = 'DISRUPT',
  DisruptStrikethrough = 'DISRUPT_STRIKETHROUGH',
  EffectBuff = 'EFFECT_BUFF',
  EffectResist = 'EFFECT_RESIST',
  ElementalResistance = 'ELEMENTAL_RESISTANCE',
  Evade = 'EVADE',
  EvadeStrikethrough = 'EVADE_STRIKETHROUGH',
  Fortitude = 'FORTITUDE',
  GoldLooted = 'GOLD_LOOTED',
  Gravity = 'GRAVITY',
  HateCaused = 'HATE_CAUSED',
  HateReceived = 'HATE_RECEIVED',
  HealingPower = 'HEALING_POWER',
  HealthRegen = 'HEALTH_REGEN',
  HealCritRate = 'HEAL_CRIT_RATE',
  IncomingDamage = 'INCOMING_DAMAGE',
  IncomingDamagePercent = 'INCOMING_DAMAGE_PERCENT',
  IncomingHealPercent = 'INCOMING_HEAL_PERCENT',
  InfluenceReceived = 'INFLUENCE_RECEIVED',
  InfluenceWorth = 'INFLUENCE_WORTH',
  Initiative = 'INITIATIVE',
  Intelligence = 'INTELLIGENCE',
  InteractTime = 'INTERACT_TIME',
  LevitationHeight = 'LEVITATION_HEIGHT',
  LootChance = 'LOOT_CHANCE',
  MagicCritRate = 'MAGIC_CRIT_RATE',
  MagicPower = 'MAGIC_POWER',
  Mastery_1Bonus = 'MASTERY_1_BONUS',
  Mastery_2Bonus = 'MASTERY_2_BONUS',
  Mastery_3Bonus = 'MASTERY_3_BONUS',
  MaxActionPoints = 'MAX_ACTION_POINTS',
  MeleeCritRate = 'MELEE_CRIT_RATE',
  MeleePower = 'MELEE_POWER',
  MinimumRange = 'MINIMUM_RANGE',
  MonetaryWorth = 'MONETARY_WORTH',
  MoraleRegen = 'MORALE_REGEN',
  OffhandDamage = 'OFFHAND_DAMAGE',
  OffhandProcChance = 'OFFHAND_PROC_CHANCE',
  OutgoingDamage = 'OUTGOING_DAMAGE',
  OutgoingDamagePercent = 'OUTGOING_DAMAGE_PERCENT',
  OutgoingHealPercent = 'OUTGOING_HEAL_PERCENT',
  Parry = 'PARRY',
  ParryStrikethrough = 'PARRY_STRIKETHROUGH',
  Radius = 'RADIUS',
  Range = 'RANGE',
  RangedCritRate = 'RANGED_CRIT_RATE',
  RangedPower = 'RANGED_POWER',
  RenownReceived = 'RENOWN_RECEIVED',
  RenownWorth = 'RENOWN_WORTH',
  Salvaging = 'SALVAGING',
  Scavenging = 'SCAVENGING',
  SetbackChance = 'SETBACK_CHANCE',
  SetbackValue = 'SETBACK_VALUE',
  Specialization = 'SPECIALIZATION',
  SpiritResistance = 'SPIRIT_RESISTANCE',
  Stealth = 'STEALTH',
  StealthDetection = 'STEALTH_DETECTION',
  Strength = 'STRENGTH',
  TalismanMaking = 'TALISMAN_MAKING',
  TargetDuration = 'TARGET_DURATION',
  Toughness = 'TOUGHNESS',
  Velocity = 'VELOCITY',
  WeaponSkill = 'WEAPON_SKILL',
  Willpower = 'WILLPOWER',
  Wounds = 'WOUNDS',
  XpReceived = 'XP_RECEIVED',
  XpWorth = 'XP_WORTH',
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum TomeHelpType {
  AdvancedHelp = 'ADVANCED_HELP',
  BeginnerHelp = 'BEGINNER_HELP',
  GameplayHelp = 'GAMEPLAY_HELP',
  None = 'NONE',
  UiHelp = 'UI_HELP',
}

export type TomeHelpTypeOperationFilterInput = {
  eq?: InputMaybe<TomeHelpType>;
  in?: InputMaybe<Array<TomeHelpType>>;
  neq?: InputMaybe<TomeHelpType>;
  nin?: InputMaybe<Array<TomeHelpType>>;
};

/** A connection to a list of items. */
export type TomeOfKnowledgeAchievementEntriesConnection = {
  __typename?: 'TomeOfKnowledgeAchievementEntriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TomeOfKnowledgeAchievementEntriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TomeOfKnowledgeAchievementEntry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type TomeOfKnowledgeAchievementEntriesEdge = {
  __typename?: 'TomeOfKnowledgeAchievementEntriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TomeOfKnowledgeAchievementEntry;
};

export type TomeOfKnowledgeAchievementEntry = {
  __typename?: 'TomeOfKnowledgeAchievementEntry';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rewards: Array<TomeOfKnowledgeAchievementReward>;
  subType: TomeOfKnowledgeAchievementSubType;
};

export type TomeOfKnowledgeAchievementEntryFilterInput = {
  and?: InputMaybe<Array<TomeOfKnowledgeAchievementEntryFilterInput>>;
  /** Name */
  description?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TomeOfKnowledgeAchievementEntryFilterInput>>;
  /** SubType */
  tomeAchievementSubTypeId?: InputMaybe<UnsignedIntOperationFilterInput>;
};

export type TomeOfKnowledgeAchievementReward = {
  id: Scalars['ID']['output'];
};

export type TomeOfKnowledgeAchievementRewardActionCounter =
  TomeOfKnowledgeAchievementReward & {
    __typename?: 'TomeOfKnowledgeAchievementRewardActionCounter';
    /** Ability Info */
    ability: AbilityInfo;
    id: Scalars['ID']['output'];
  };

export type TomeOfKnowledgeAchievementRewardItem =
  TomeOfKnowledgeAchievementReward & {
    __typename?: 'TomeOfKnowledgeAchievementRewardItem';
    /** Item is automatically added to player inventory */
    autoCreate: Scalars['Boolean']['output'];
    id: Scalars['ID']['output'];
    /** Item info */
    item: Item;
  };

export type TomeOfKnowledgeAchievementRewardTitle =
  TomeOfKnowledgeAchievementReward & {
    __typename?: 'TomeOfKnowledgeAchievementRewardTitle';
    id: Scalars['ID']['output'];
    /** Tome of Knowledge entry */
    title: TomeOfKnowledgeEntry;
  };

export type TomeOfKnowledgeAchievementSubType = {
  __typename?: 'TomeOfKnowledgeAchievementSubType';
  description: Scalars['String']['output'];
  entries: Array<TomeOfKnowledgeAchievementEntry>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  type: TomeOfKnowledgeAchievementType;
};

export type TomeOfKnowledgeAchievementType = {
  __typename?: 'TomeOfKnowledgeAchievementType';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subTypes: Array<TomeOfKnowledgeAchievementSubType>;
};

/** A connection to a list of items. */
export type TomeOfKnowledgeEntriesConnection = {
  __typename?: 'TomeOfKnowledgeEntriesConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TomeOfKnowledgeEntriesEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<TomeOfKnowledgeEntry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type TomeOfKnowledgeEntriesEdge = {
  __typename?: 'TomeOfKnowledgeEntriesEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: TomeOfKnowledgeEntry;
};

export type TomeOfKnowledgeEntry = SearchContent & {
  __typename?: 'TomeOfKnowledgeEntry';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  realm: Realm;
  xp: Scalars['UnsignedInt']['output'];
};

export type TomeOfKnowledgeEntryFilterInput = {
  and?: InputMaybe<Array<TomeOfKnowledgeEntryFilterInput>>;
  /** Description */
  description?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TomeOfKnowledgeEntryFilterInput>>;
  /** Realm */
  realm?: InputMaybe<RealmsOperationFilterInput>;
  /** Tome of Knowledge section */
  tomeSection?: InputMaybe<NullableOfTomeSectionOperationFilterInput>;
  /** Type */
  type?: InputMaybe<TomeHelpTypeOperationFilterInput>;
  /** XP reward */
  xp?: InputMaybe<UnsignedIntOperationFilterInput>;
};

/** Tome Of Knowledge sections */
export enum TomeOfKnowledgeSection {
  Achievements = 'ACHIEVEMENTS',
  Bestiary = 'BESTIARY',
  GameFaq = 'GAME_FAQ',
  GameManual = 'GAME_MANUAL',
  Help = 'HELP',
  HistoryAndLore = 'HISTORY_AND_LORE',
  LiveEvent = 'LIVE_EVENT',
  NoteworthyPersons = 'NOTEWORTHY_PERSONS',
  OldWorldArmory = 'OLD_WORLD_ARMORY',
  PlayerTitles = 'PLAYER_TITLES',
  Tactics = 'TACTICS',
  Ward = 'WARD',
  WarJournal = 'WAR_JOURNAL',
  ZoneMaps = 'ZONE_MAPS',
}

export enum TradeSkill {
  Apothecary = 'APOTHECARY',
  Butchering = 'BUTCHERING',
  Cultivation = 'CULTIVATION',
  None = 'NONE',
  Salvaging = 'SALVAGING',
  Scavenging = 'SCAVENGING',
  TalismanMaking = 'TALISMAN_MAKING',
}

export type UnsignedByteOperationFilterInput = {
  eq?: InputMaybe<Scalars['UnsignedByte']['input']>;
  gt?: InputMaybe<Scalars['UnsignedByte']['input']>;
  gte?: InputMaybe<Scalars['UnsignedByte']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UnsignedByte']['input']>>>;
  lt?: InputMaybe<Scalars['UnsignedByte']['input']>;
  lte?: InputMaybe<Scalars['UnsignedByte']['input']>;
  neq?: InputMaybe<Scalars['UnsignedByte']['input']>;
  ngt?: InputMaybe<Scalars['UnsignedByte']['input']>;
  ngte?: InputMaybe<Scalars['UnsignedByte']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UnsignedByte']['input']>>>;
  nlt?: InputMaybe<Scalars['UnsignedByte']['input']>;
  nlte?: InputMaybe<Scalars['UnsignedByte']['input']>;
};

export type UnsignedIntOperationFilterInput = {
  eq?: InputMaybe<Scalars['UnsignedInt']['input']>;
  gt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  gte?: InputMaybe<Scalars['UnsignedInt']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UnsignedInt']['input']>>>;
  lt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  lte?: InputMaybe<Scalars['UnsignedInt']['input']>;
  neq?: InputMaybe<Scalars['UnsignedInt']['input']>;
  ngt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  ngte?: InputMaybe<Scalars['UnsignedInt']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UnsignedInt']['input']>>>;
  nlt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  nlte?: InputMaybe<Scalars['UnsignedInt']['input']>;
};

export type UnsignedIntOperationFilterInputType = {
  eq?: InputMaybe<Scalars['UnsignedInt']['input']>;
  gt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  gte?: InputMaybe<Scalars['UnsignedInt']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UnsignedInt']['input']>>>;
  lt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  lte?: InputMaybe<Scalars['UnsignedInt']['input']>;
  neq?: InputMaybe<Scalars['UnsignedInt']['input']>;
  ngt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  ngte?: InputMaybe<Scalars['UnsignedInt']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UnsignedInt']['input']>>>;
  nlt?: InputMaybe<Scalars['UnsignedInt']['input']>;
  nlte?: InputMaybe<Scalars['UnsignedInt']['input']>;
};

export type UnsignedLongOperationFilterInputType = {
  eq?: InputMaybe<Scalars['UnsignedLong']['input']>;
  gt?: InputMaybe<Scalars['UnsignedLong']['input']>;
  gte?: InputMaybe<Scalars['UnsignedLong']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UnsignedLong']['input']>>>;
  lt?: InputMaybe<Scalars['UnsignedLong']['input']>;
  lte?: InputMaybe<Scalars['UnsignedLong']['input']>;
  neq?: InputMaybe<Scalars['UnsignedLong']['input']>;
  ngt?: InputMaybe<Scalars['UnsignedLong']['input']>;
  ngte?: InputMaybe<Scalars['UnsignedLong']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UnsignedLong']['input']>>>;
  nlt?: InputMaybe<Scalars['UnsignedLong']['input']>;
  nlte?: InputMaybe<Scalars['UnsignedLong']['input']>;
};

export type UnsignedShortOperationFilterInput = {
  eq?: InputMaybe<Scalars['UnsignedShort']['input']>;
  gt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  gte?: InputMaybe<Scalars['UnsignedShort']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UnsignedShort']['input']>>>;
  lt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  lte?: InputMaybe<Scalars['UnsignedShort']['input']>;
  neq?: InputMaybe<Scalars['UnsignedShort']['input']>;
  ngt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  ngte?: InputMaybe<Scalars['UnsignedShort']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UnsignedShort']['input']>>>;
  nlt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  nlte?: InputMaybe<Scalars['UnsignedShort']['input']>;
};

export type UnsignedShortOperationFilterInputType = {
  eq?: InputMaybe<Scalars['UnsignedShort']['input']>;
  gt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  gte?: InputMaybe<Scalars['UnsignedShort']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['UnsignedShort']['input']>>>;
  lt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  lte?: InputMaybe<Scalars['UnsignedShort']['input']>;
  neq?: InputMaybe<Scalars['UnsignedShort']['input']>;
  ngt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  ngte?: InputMaybe<Scalars['UnsignedShort']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['UnsignedShort']['input']>>>;
  nlt?: InputMaybe<Scalars['UnsignedShort']['input']>;
  nlte?: InputMaybe<Scalars['UnsignedShort']['input']>;
};

/** A connection to a list of items. */
export type UsedToPurchaseConnection = {
  __typename?: 'UsedToPurchaseConnection';
  /** A list of edges. */
  edges?: Maybe<Array<UsedToPurchaseEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<VendorItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type UsedToPurchaseEdge = {
  __typename?: 'UsedToPurchaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: VendorItem;
};

export type VendorItem = {
  __typename?: 'VendorItem';
  count: Scalars['UnsignedShort']['output'];
  creatures: Array<Creature>;
  item: Item;
  /** Cost in copper coins */
  price: Scalars['UnsignedInt']['output'];
  requiredItems: Array<VendorItemRequiredItem>;
  soldBy: Array<Creature>;
};

export type VendorItemRequiredItem = {
  __typename?: 'VendorItemRequiredItem';
  /** Amount needed */
  count: Scalars['UnsignedShort']['output'];
  item: Item;
};

/** A connection to a list of items. */
export type VendorItemsConnection = {
  __typename?: 'VendorItemsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<VendorItemsEdge>>;
  /** A flattened list of the nodes. */
  nodes?: Maybe<Array<VendorItem>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** Identifies the total count of items in the connection. */
  totalCount: Scalars['Int']['output'];
};

/** An edge in a connection. */
export type VendorItemsEdge = {
  __typename?: 'VendorItemsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: VendorItem;
};

/** Holds information about one attacker in a kill */
export type Victim = {
  __typename?: 'Victim';
  /** Character information */
  character: Character;
  /** Guild at the time of the kill */
  guild?: Maybe<Guild>;
  /** Level at the time of the kill */
  level: Scalars['UnsignedByte']['output'];
  /** Renown rank at the time of the kill */
  renownRank: Scalars['UnsignedByte']['output'];
};

/** Activities in a War Journal entry */
export type WarJournalActivity = {
  __typename?: 'WarJournalActivity';
  activityType: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Name of the activity */
  name: Scalars['String']['output'];
  tasks: Array<WarJournalActivityTask>;
  text: Scalars['String']['output'];
  zone?: Maybe<Zone>;
};

/** Tasks in a War Journal activity */
export type WarJournalActivityTask = {
  __typename?: 'WarJournalActivityTask';
  name: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

/** Entries in the War Journal */
export type WarJournalEntry = {
  __typename?: 'WarJournalEntry';
  activities: Array<WarJournalActivity>;
  area?: Maybe<ZoneArea>;
  id: Scalars['ID']['output'];
  influenceRewards: Array<ChapterInfluenceReward>;
  isRvR: Scalars['Boolean']['output'];
  locationText?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  npcName?: Maybe<Scalars['String']['output']>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  storyline: WarJournalStoryline;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  zone?: Maybe<Zone>;
};

export type WarJournalEntryFilterInput = {
  and?: InputMaybe<Array<WarJournalEntryFilterInput>>;
  areaId?: InputMaybe<IdOperationFilterInput>;
  isRvR?: InputMaybe<BooleanOperationFilterInput>;
  /** Name of the entry */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<WarJournalEntryFilterInput>>;
  storylineId?: InputMaybe<IdOperationFilterInput>;
  zoneId?: InputMaybe<IdOperationFilterInput>;
};

/** Storylines in the War Journal */
export type WarJournalStoryline = {
  __typename?: 'WarJournalStoryline';
  entries: Array<WarJournalEntry>;
  id: Scalars['ID']['output'];
  /** Name of the storyline */
  name: Scalars['String']['output'];
  summary: Scalars['String']['output'];
};

export type WarJournalStorylineFilterInput = {
  and?: InputMaybe<Array<WarJournalStorylineFilterInput>>;
  /** Name of the storyline */
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<WarJournalStorylineFilterInput>>;
};

export type ZandriExpeditionEvent = Event & {
  __typename?: 'ZandriExpeditionEvent';
  endTime?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
};

export type Zone = SearchContent & {
  __typename?: 'Zone';
  /** The areas of the zone */
  areas: Array<ZoneArea>;
  /** Creatures in the zone */
  creatureSpawns: Array<CreatureSpawn>;
  /** The unique id of the zone */
  id: Scalars['ID']['output'];
  /** Locations in the zone */
  locations: Array<Location>;
  /** The map setup of the zone */
  mapSetup?: Maybe<MapSetup>;
  /** The name of the zone */
  name: Scalars['String']['output'];
  /** War journal entries in the zone */
  warJournalEntries: Array<WarJournalEntry>;
};

export type ZoneArea = {
  __typename?: 'ZoneArea';
  /** Id of the zone area in the zone */
  id: Scalars['ID']['output'];
  /** The map setup of the zone area */
  mapSetup?: Maybe<MapSetup>;
  /** The name of the zone area */
  name?: Maybe<Scalars['String']['output']>;
  /** Zone information */
  zone: Zone;
};

export enum ZoneType {
  Instance = 'INSTANCE',
  Normal = 'NORMAL',
  Scenario = 'SCENARIO',
}
