import Phaser from 'phaser';
import MarioGameScene from './MarioGameScene';

export function launch(containerId, difficulty) {
    return new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerId,
      width: window.innerWidth,   
      height: window.innerHeight, 
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: [new MarioGameScene(difficulty)]
    });
  }
  
