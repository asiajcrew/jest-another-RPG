const Potion = require('../lib/Potion');

// Player() creates a new player with a name equal to whatever the user inputs.
// health will be a random number 95- 105
// strength will be a random number 7- 12
// agility will be a random number 7- 12
// Pass 'health' through the name parametor of the potion constructor. Default value is for a random type to be chosen.
function Player(name = '') {
    this.name = name;

    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
    this.inventory = [new Potion('health'), new Potion()];
}

// When getStats() is executed, the potions, health, strength, and agility will display.
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

// If there is any value/ length in the inventory then return/ display the inventory items.
// If there are no values in the inventory then do not display anything.
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory;
    }
    return false;
};
// This function dynamically takes in the player's name & their health and returns a stringified statement.
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}`;
};

// if player's health is equal to 0, then isAlive() is false (player is not alive).
// if player's health is anything but 0, then isAlive() is true (player is alive).
Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// If the player's health goes below 0 then make the health equal 0 (health can not be negative).
Player.prototype.reduceHealth = function(health) {
    this.health -= health;
    // ^ this is the same as "this.health = this.health - health"
    if (this.health < 0) {
        this.health = 0;
    }
};

// The player's strength minus 5 is the minimum attack strength and the player's strength plus 5 is the maximum attack strength.
// Math.random() will randomly determine how strong the player's attack is 
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
};

// find the player's inventory then add a new potionto it
Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
};

// remove a potion from the inventory and place that removed potion in a new array at index 0.
// switch statements are if/else statements. So if the potion name is "agility" then add potion.value to this.agility
Player.prototype.usePotion = function(index) {
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    }
};
module.exports = Player;