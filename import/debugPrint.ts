import colors from 'colors';
import inquirer from 'inquirer';
import { promises as fs } from 'fs';

import { readTextFile } from './readTextFile';
import { readAbilities } from './abilityDecoder';
import { readComponents, structureComponents } from './abilityComponents';
import { structureAbilities, AbilityData } from './structureAbilities';
import { stringMatch, logAbilityError } from './utilities';
