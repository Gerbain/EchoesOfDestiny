import {
  postUpdate,
  findMatch,
  findInGameMap,
  isValidOption,
} from './utils.js';

export class Monster {
  constructor(
    type,
    health,
    melee,
    magic,
    ranged,
    meleeDef,
    magicDef,
    rangedDef,
    experiencePoints
  ) {
    this.type = type;
    this.health = health;
    this.melee = melee;
    this.magic = magic;
    this.ranged = ranged;
    this.meleeDef = meleeDef;
    this.magicDef = magicDef;
    this.rangedDef = rangedDef;
    this.experiencePoints = experiencePoints;
  }

  attack(target) {
    const calculateDamage = (base, defense) => {
      let baseDamage = base - defense;
      const damageVariation = baseDamage * 0.15;
      const randomDamage =
        baseDamage + (Math.random() * 2 - 1) * damageVariation;
      return randomDamage > 0 ? randomDamage : 0;
    };

    let baseDamage = 0;

    if (this.type === 'melee') {
      baseDamage = calculateDamage(this.melee, target.meleeDef);
      postUpdate(`The enemy strikes at you.`);
    } else if (this.type === 'magic') {
      baseDamage = calculateDamage(this.magic, target.magicDef);
      postUpdate(`The enemy casts a spell on you.`);
    } else if (this.type === 'ranged') {
      baseDamage = calculateDamage(this.ranged, target.rangedDef);
      postUpdate(`The enemy attacks you from a distance.`);
    } else {
      postUpdate('Invalid attack type.');
      return;
    }

    const criticalChance = Math.random();
    const isCriticalHit = criticalChance <= 0.05;
    const finalDamage = isCriticalHit ? baseDamage * 2 : baseDamage;

    if (finalDamage > 0) {
      target.health -= finalDamage;
      postUpdate(`Dealt ${finalDamage.toFixed(2)} damage.`);
      if (isCriticalHit) {
        postUpdate('Critical hit! Damage doubled!');
      }
    } else {
      postUpdate('You resisted the attack!');
    }
  }
}

export class LesserDemon extends Monster {
  constructor() {
    const baseHealth = 48;
    const baseMelee = 15;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMelee = Math.round(baseMelee * 0.8); // 80% of base melee
    const maxMelee = Math.round(baseMelee * 1.2); // 120% of base melee

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const melee = Math.round(Math.random() * (maxMelee - minMelee)) + minMelee;

    super('melee', health, melee, 0, 0, 0, -5, 0, 100);
  }
}

export class GoblinArcher extends Monster {
  constructor() {
    const baseHealth = 15;
    const baseRanged = 8;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minRanged = Math.round(baseRanged * 0.8); // 80% of base ranged
    const maxRanged = Math.round(baseRanged * 1.2); // 120% of base ranged

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const ranged =
      Math.round(Math.random() * (maxRanged - minRanged)) + minRanged;

    super(
      'ranged',
      health,
      0,
      0,
      ranged,
      3, // Magic defense
      -2, // Melee defense
      2, // Ranged defense
      30
    );
  }
}

export class GoblinSpellSlinger extends Monster {
  constructor() {
    const baseHealth = 10;
    const baseMagic = 15;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMagic = Math.round(baseMagic * 0.8); // 80% of base magic
    const maxMagic = Math.round(baseMagic * 1.2); // 120% of base magic

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const magic = Math.round(Math.random() * (maxMagic - minMagic)) + minMagic;

    super(
      'magic',
      health,
      0,
      magic,
      0,
      -2, // Melee defense
      3, // Magic defense
      -1, // Ranged defense
      40
    );
  }
}

export class GoblinSoldier extends Monster {
  constructor() {
    const baseHealth = 20;
    const baseMelee = 12;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMelee = Math.round(baseMelee * 0.8); // 80% of base melee
    const maxMelee = Math.round(baseMelee * 1.2); // 120% of base melee

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const melee = Math.round(Math.random() * (maxMelee - minMelee)) + minMelee;

    super(
      'melee',
      health,
      melee,
      0,
      0,
      2, // Melee defense
      -1, // Magic defense
      -1, // Ranged defense
      30
    );
  }
}

export class Hero {
  constructor(
    archetype,
    type,
    health,
    melee,
    magic,
    ranged,
    meleeDef,
    magicDef,
    rangedDef,
    experiencePoints,
    desc
  ) {
    this.archetype = archetype;
    this.type = type;
    this.health = health;
    this.melee = melee;
    this.magic = magic;
    this.ranged = ranged;
    this.meleeDef = meleeDef;
    this.magicDef = magicDef;
    this.rangedDef = rangedDef;
    this.experiencePoints = experiencePoints;
    this.desc = desc;
  }
  levelUp() {
    if (this.experiencePoints > 100) {
      postUpdate('Hero leveled up!');
      // Increase combat stats and health by 1 to 3 points
      this.health += Math.floor(Math.random() * 3) + 1;
      this.melee > 0
        ? (this.melee += Math.floor(Math.random() * 3) + 1)
        : (this.melee = 0);
      this.magic > 0
        ? (this.magic += Math.floor(Math.random() * 3) + 1)
        : (this.magic = 0);
      this.ranged > 0
        ? (this.ranged += Math.floor(Math.random() * 3) + 1)
        : (this.ranged = 0);
      this.experiencePoints -= 100;
    } else {
      postUpdate(`You do not feel strong enough yet.`);
    }
  }

  attack(target) {
    const calculateDamage = (base, defense) => {
      let baseDamage = base - defense;
      const damageVariation = baseDamage * 0.15;
      const randomDamage =
        baseDamage + (Math.random() * 2 - 1) * damageVariation;
      return randomDamage > 0 ? randomDamage : 0;
    };

    let baseDamage = 0;

    if (this.type === 'melee') {
      baseDamage = calculateDamage(this.melee, target.meleeDef);
      postUpdate(`Attacked the enemy with melee.`);
    } else if (this.type === 'magic') {
      baseDamage = calculateDamage(this.magic, target.magicDef);
      postUpdate(`Casted a spell on the enemy.`);
    } else if (this.type === 'ranged') {
      baseDamage = calculateDamage(this.ranged, target.rangedDef);
      postUpdate(`Attacked the enemy from range.`);
    } else {
      postUpdate('Invalid attack type.');
      return;
    }

    const criticalChance = Math.random();
    const isCriticalHit = criticalChance <= 0.05;
    const finalDamage = isCriticalHit ? baseDamage * 2 : baseDamage;

    if (finalDamage > 0) {
      target.health -= finalDamage;
      postUpdate(`Dealt ${finalDamage.toFixed(2)} damage.`);
      if (isCriticalHit) {
        postUpdate('Critical hit! Damage doubled!');
      }
    } else {
      postUpdate('The enemy resisted the attack!');
    }

    if (target.health <= 0) {
      postUpdate(`You defeated the enemy!`);
    }
  }
}

export class Warrior extends Hero {
  constructor() {
    const baseHealth = 20;
    const baseMelee = 5;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMelee = Math.round(baseMelee * 0.8); // 80% of base melee
    const maxMelee = Math.round(baseMelee * 1.2); // 120% of base melee

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const melee = Math.round(Math.random() * (maxMelee - minMelee)) + minMelee;

    super(
      'warrior',
      'melee',
      health,
      melee,
      0,
      0,
      0,
      -5,
      5,
      0,
      'Exceeds in melee combat!'
    );
  }

  specialAttack() {
    postUpdate('Warrior performs a special attack!');
    // Add logic for the special attack here
  }
}

export class Mage extends Hero {
  constructor() {
    const baseHealth = 7;
    const baseMagic = 15;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMagic = Math.round(baseMagic * 0.8); // 80% of base magic
    const maxMagic = Math.round(baseMagic * 1.2); // 120% of base magic

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const magic = Math.round(Math.random() * (maxMagic - minMagic)) + minMagic;

    super(
      'mage',
      'magic',
      health,
      0,
      magic,
      0,
      5,
      0,
      -5,
      0,
      'Exceeds in magic combat!'
    );
  }

  specialAttack() {
    postUpdate('Mage casts a powerful spell!');
    // Add logic for the special attack here
  }
}

export class Ranger extends Hero {
  constructor() {
    const baseHealth = 12;
    const baseRanged = 10;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minRanged = Math.round(baseRanged * 0.8); // 80% of base ranged
    const maxRanged = Math.round(baseRanged * 1.2); // 120% of base ranged

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const ranged =
      Math.round(Math.random() * (maxRanged - minRanged)) + minRanged;

    super(
      'ranger',
      'ranged',
      health,
      0,
      0,
      ranged,
      -5,
      5,
      0,
      0,
      'Exceeds in ranged combat!'
    );
  }

  specialAttack() {
    postUpdate('Ranger fires a barrage of arrows!');
    // Add logic for the special attack here
  }
}
