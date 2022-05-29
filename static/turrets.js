class Turret extends Phaser.GameObjects.Image {
  constructor(scene) {
    super(scene);
    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
    this.nextTic = 0;
  }

  place(i, j) {            
    this.y = i * 40 + 40/2;
    this.x = j * 40 + 40/2;
    map[i][j] = 1;            
  }

  fire() {
    const enemy = getEnemy(this.x, this.y, 100);
    if (enemy) {
      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
      addBullet(this.x, this.y, angle);
      this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
    }
  }

  update(time, delta) {
    if (time > this.nextTic) {
      this.fire();
      this.nextTic = time + 1000;
    }
  }
}