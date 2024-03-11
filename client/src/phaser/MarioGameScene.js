import Phaser from 'phaser';

export default class MarioGameScene extends Phaser.Scene {
  constructor(difficulty) {
    super('MarioGame');
    this.difficulty = difficulty;
  }

  preload() {
    this.load.image('mario', 'assets/mario.png');
    this.load.image('mushroom', 'assets/mushroom.png');
  }

  create() {
    this.mario = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'mario').setOrigin(0.5, 0.5);
    this.mario.setCollideWorldBounds(true);

    this.input.on('pointermove', (pointer) => {
      this.physics.moveToObject(this.mario, pointer, 400); 
    }, this);

    this.mushrooms = this.physics.add.group();

    this.physics.add.overlap(this.mario, this.mushrooms, () => this.resetGame(), null, this);

    this.time.addEvent({
      delay: 1000, 
      callback: this.spawnMushroom,
      callbackScope: this,
      loop: true
    });
  }

  spawnMushroom() {
    const position = this.getRandomPosition();
    const mushroom = this.mushrooms.create(position.x, position.y, 'mushroom').setOrigin(0.5, 0.5);

    let scaleSize = this.difficulty === 'easy' ? 0.1 : 0.25;
    mushroom.setScale(scaleSize);

    this.physics.moveTo(mushroom, window.innerWidth / 2, window.innerHeight / 2, 60); 
    mushroom.setData('targetReached', false);
}


  update() {
    this.mushrooms.children.each((mushroom) => {
      if (!mushroom.getData('targetReached')) {
        const distance = Phaser.Math.Distance.Between(mushroom.x, mushroom.y, window.innerWidth / 2, window.innerHeight / 2);
        if (distance < 10) {
          mushroom.setData('targetReached', true);
          mushroom.destroy();
        }
      }
    }, this);
  }

  getRandomPosition() {
    let x, y;
    switch (Phaser.Math.Between(0, 3)) {
      case 0: 
        x = Phaser.Math.Between(0, window.innerWidth);
        y = -50;
        break;
      case 1: 
        x = Phaser.Math.Between(0, window.innerWidth);
        y = window.innerHeight + 50;
        break;
      case 2: 
        x = -50;
        y = Phaser.Math.Between(0, window.innerHeight);
        break;
      case 3: 
        x = window.innerWidth + 50;
        y = Phaser.Math.Between(0, window.innerHeight);
        break;
      default:
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }
    return { x, y };
  }

  resetGame() {
    this.scene.restart(); 
  }
}
