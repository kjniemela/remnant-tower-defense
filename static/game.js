// inspiration taken from https://gamedevacademy.org/how-to-make-tower-defense-game-with-phaser-3/

const config = {
  type: Phaser.AUTO,
  parent: 'root',
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
  },
  scene: [
    MainMenuScene,
    GameScene,
  ]
};

let game = new Phaser.Game(config);

const map =  [[ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,-1, 0, 0, 0, 0, 0, 0, 0, 0]];

function placeTurret(pointer) {
  const i = Math.floor(pointer.y/40);
  const j = Math.floor(pointer.x/40);
  if (canPlaceTurret(i, j)) {
    const turret = turrets.get();
    if (turret)
    {
        turret.setActive(true);
        turret.setVisible(true);
        turret.place(i, j);
    }   
  }
}

function damageEnemy(enemy, bullet) {  
  // only if both enemy and bullet are alive
  if (enemy.active === true && bullet.active === true) {
    // we remove the bullet right away
    bullet.setActive(false);
    bullet.setVisible(false);    
    
    // decrease the enemy hp with BULLET_DAMAGE
    enemy.receiveDamage(bullet.damage);
  }
}

function getEnemy(x, y, distance) {
  const enemyUnits = enemies.getChildren();
  for (let i = 0; i < enemyUnits.length; i++) {       
    if (enemyUnits[i].active && Phaser.Math.Distance.Between(x, y, enemyUnits[i].x, enemyUnits[i].y) <= distance)
      return enemyUnits[i];
  }
  return false;
}

function addBullet(x, y, angle) {
  const bullet = bullets.get();
  if (bullet)
  {
    bullet.fire(x, y, angle);
  }
}

function canPlaceTurret(i, j) {
  return map[i][j] === 0;
}

function drawGrid(graphics) {
  graphics.lineStyle(1, 0x0000ff, 0.8);
  for(let i = 0; i < 15; i++) {
    graphics.moveTo(0, i * 40);
    graphics.lineTo(800, i * 40);
  }
  for(let j = 0; j < 20; j++) {
    graphics.moveTo(j * 40, 0);
    graphics.lineTo(j * 40, 600);
  }
  graphics.strokePath();
}