import {
  postUpdate,
  findMatch,
  findInGameMap,
  isValidOption,
} from './utils.js';

export class Monster {
  constructor(
    type,
    name,
    health,
    maxHealth,
    melee,
    magic,
    ranged,
    meleeDef,
    magicDef,
    rangedDef,
    experiencePoints
  ) {
    this.type = type;
    this.name = name;
    this.health = health;
    this.maxHealth = health;
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

    super('melee', 'Lesser Demon', health, health, melee, 0, 0, 0, -5, 0, 100);
  }
}

export class GoblinArcher extends Monster {
  constructor() {
    const baseHealth = 10;
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
      'Goblin Archer',
      health,
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
    const baseHealth = 8;
    const baseMagic = 10;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMagic = Math.round(baseMagic * 0.8); // 80% of base magic
    const maxMagic = Math.round(baseMagic * 1.2); // 120% of base magic

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const magic = Math.round(Math.random() * (maxMagic - minMagic)) + minMagic;

    super(
      'magic',
      'Goblin Spellslinger',
      health,
      health,
      0,
      magic,
      0,
      -2, // Melee defense
      3, // Magic defense
      1, // Ranged defense
      40
    );
  }
}

export class GoblinSoldier extends Monster {
  constructor() {
    const baseHealth = 14;
    const baseMelee = 5;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMelee = Math.round(baseMelee * 0.8); // 80% of base melee
    const maxMelee = Math.round(baseMelee * 1.2); // 120% of base melee

    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const melee = Math.round(Math.random() * (maxMelee - minMelee)) + minMelee;

    super(
      'melee',
      'Goblin Soldier',
      health,
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
    name,
    type,
    specialAttValue,
    maxSpecialAttValue,
    health,
    maxHealth,
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
    this.name = name;
    this.type = type;
    this.specialAttValue = specialAttValue;
    this.maxSpecialAttValue = specialAttValue;
    this.health = health;
    this.maxHealth = health;
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
      this.maxHealth += Math.floor(Math.random() * 3) + 1;
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

  rest(){
    this.health = this.maxHealth
    this.specialAttValue += 3
    postUpdate('You feel refreshed!')
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
    }
  }
}

export class Warrior extends Hero {
  constructor() {
    const baseHealth = 30;
    const baseMelee = 12;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMelee = Math.round(baseMelee * 0.8); // 80% of base melee
    const maxMelee = Math.round(baseMelee * 1.2); // 120% of base melee
    const maxSpecialAttValue = 5
    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const melee = Math.round(Math.random() * (maxMelee - minMelee)) + minMelee;

    super(
      'warrior',
      'player',
      'melee',
      5,
      maxSpecialAttValue,
      health,
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

  specialAttack(target) {
    postUpdate('You perform a earpiercing war cry and charge at the enemy! You feel revitalized!');
    if(this.specialAttValue > 0){
      this.attack(target)
      if(Math.random() <= 0.3){
        if(target.melee > 0){
          target.melee = target.melee/2
          postUpdate('Enemy melee attack weakened!')
        }else if(target.magic > 0){
          target.magic = target.magic/2
          postUpdate('Enemy magic attack weakened!')
        }else if(target.ranged > 0){
          target.ranged = target.ranged/2
          postUpdate('Enemy ranged attack weakened!')
        }
      }else{
        postUpdate('The enemy was not affected by your attempt!')
      }
      if(this.health == this.maxHealth){
        postUpdate('You overheal for 10% of your health, FOR GLORY!')
        this.health = (this.maxHealth*1.1)
      }else if(this.health >= this.maxHealth*0.8 && this.health < this.maxHealth){
        postUpdate('You feel yourself fully restored!')
        this.health = this.maxHealth
      }else if(this.health < this.maxHealth*0.8){
        postUpdate('You regain 20% of your hp! ')
        this.health = (this.health + (this.maxHealth*0.2))
      }
    }else{
      postUpdate('You have no energy for a special attack, you attempt to attack instead..')
      this.attack(target)
    }
    this.specialAttValue -= 1
  }
}

export class Mage extends Hero {
  constructor() {
    const baseHealth = 20;
    const baseMagic = 17;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minMagic = Math.round(baseMagic * 0.8); // 80% of base magic
    const maxMagic = Math.round(baseMagic * 1.2); // 120% of base magic
    const maxSpecialAttValue = 3
    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const magic = Math.round(Math.random() * (maxMagic - minMagic)) + minMagic;

    super(
      'mage',
      'player',
      'magic',
      3,
      maxSpecialAttValue,
      health,
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

  specialAttack(target) {
    const randomizer = Math.random()
    if(this.specialAttValue > 0){
      postUpdate('You conjure a massive icicle and fire it at the enemy!');
      if(Math.random() <= 0.05){
        target.health = 0
        postUpdate('You obliterate the enemy!')
      }else if(randomizer > 0.06 && randomizer <= 0.55){
        postUpdate(`You grazed the enemy and managed to do ${target.health/2} damage!`)
        target.health = target.health/2
      }else{
        postUpdate('You missed the enemy, brace for retaliation!')
      }
      this.specialAttValue -= 1
   }else{
    postUpdate('You do not have the mana to cast a powerfull spell right now.. You desperately attack in attempt to defend yourself.')
    this.attack(target)
   }
  }
}

export class Ranger extends Hero {
  constructor() {
    const baseHealth = 24;
    const baseRanged = 16;

    const minHealth = Math.round(baseHealth * 0.8); // 80% of base health
    const maxHealth = Math.round(baseHealth * 1.2); // 120% of base health
    const minRanged = Math.round(baseRanged * 0.8); // 80% of base ranged
    const maxRanged = Math.round(baseRanged * 1.2); // 120% of base ranged
    const maxSpecialAttValue = 3
    const health =
      Math.round(Math.random() * (maxHealth - minHealth)) + minHealth;
    const ranged =
      Math.round(Math.random() * (maxRanged - minRanged)) + minRanged;

    super(
      'ranger',
      'player',
      'ranged',
      3,
      maxSpecialAttValue,
      health,
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

  specialAttack(target) {
    postUpdate('You fire a volley of arrows!');
    const randomizer = Math.random()
    if(this.specialAttValue > 0){
      if(randomizer > 0.16){
        postUpdate('You fire an arrow-at the speed of light!')
        this.attack(target)
        postUpdate('Another arrow quickly follow the first one')
        this.attack(target)
      }else if(randomizer <= 0.15){
        postUpdate('You fire an arrow-at the speed of light!')
        this.attack(target)
        postUpdate('Another arrow quickly follow the first one')
        this.attack(target)
        postUpdate('What is this? A third arrow?')
        this.attack(target)
      }else if(randomizer <= 0.05){
        postUpdate('You fire an arrow-at the speed of light!')
        this.attack(target)
        postUpdate('Another arrow quickly follow the first one')
        this.attack(target)
        postUpdate('What is this? A third arrow?')
        this.attack(target)
        postUpdate('AND ANOTHER ONE?')
        this.attack(target)
      }else if(randomizer <= 0.01){
        postUpdate('You fire an arrow-at the speed of light!')
        this.attack(target)
        postUpdate('Another arrow quickly follow the first one')
        this.attack(target)
        postUpdate('What is this? A third arrow?')
        this.attack(target)
        postUpdate('AND ANOTHER ONE?')
        this.attack(target)
        postUpdate('ITS OVER 9000!!')
        this.attack(target);
      }
      this.specialAttValue -= 1
    }else{
      postUpdate('This is not the moment to act like Legolas, you manage to fire just one arrow')
      this.attack(target)
    }
  }
}
