let path;
let turrets;
let bullets;
let enemies;

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('mainmenu')
  }

  create() {
    this.add.text(250, 250, 'Mount Urmol', { fontSize: '35pt' })
    this.add.text(300, 300, 'Tower Defense', { fontSize: '20pt' })
    this.add.text(300, 540, '[press SPACE to start]', { fontSize: '12pt' })

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.start('game')
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super('game')
  }

  preload() {
    // Load assets
    this.load.image('ground', 'assets/ground.png');
    this.load.image('path', 'assets/path.png');

    this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');    
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    this.add.image(400, 300, 'ground');

    const graphics = this.add.graphics();
    drawGrid(graphics);

    path = this.add.path(100, -32);
    path.lineTo(100, 180);
    path.lineTo(460, 180);
    path.lineTo(460, 600);
    
    graphics.lineStyle(3, 0xf0f0f0, 1);
    // visualize the path
    path.draw(graphics);

    turrets = this.add.group({ classType: Turret, runChildUpdate: true });
    bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
    enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true });
    this.nextEnemy = 0;

    this.physics.add.overlap(enemies, bullets, damageEnemy);

    this.input.on('pointerdown', placeTurret);

    this.input.keyboard.on('keydown-ESC', () => {
      this.scene.start('mainmenu')
    });
  }

  update(time, delta) {
    if (time > this.nextEnemy)
    {        
      const enemy = enemies.get();
      if (enemy)
      {
        enemy.setActive(true);
        enemy.setVisible(true);
        
        // place the enemy at the start of the path
        enemy.startOnPath();
        
        this.nextEnemy = time + 500;
      }       
    }
  }
}