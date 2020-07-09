//Gun
Gun = new Class({
    draw: function (ctx) {
      with (this) {
        //first
        ctx.save();
        ctx.translate(gun_x, gun_y);
        ctx.rotate(draw_angle);
        ctx.fillStyle = "#6100ff";
        ctx.strokeStyle = "#86006d";
        ctx.beginPath();
        ctx.arc(0, 0, 35, 2 * Math.PI, Math.PI, false);
        ctx.moveTo(15 - 50, 0);
        ctx.lineTo(30 - 50, 0 - 65);
        ctx.lineTo(70 - 50, 0 - 65);
        ctx.lineTo(85 - 50, 0);
        ctx.lineTo(15 - 50, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
        //second
        ctx.save();
        if (tic >= 100) ctx.fillStyle = "darkpurple";
        else ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(20, canvas.height - 30);
        ctx.lineTo(80, canvas.height - 30);
        ctx.lineTo(100, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    },
  });
  
  Bullet = new Class({
    initialize: function (angle) {
      this.posX = 0;
      this.posY = 0;
      this.speed = 25;
      this.size = 5;
      this.angle = angle;
    },
    fly: function () {
      p1 = this.posX * Math.tan(this.angle);
      p2 = 0.4 * this.posX ** 2;
      p3 = 2 * this.speed ** 2 * Math.cos(this.angle) ** 2;
      this.posY = p1 - p2 / p3;
      this.posX += (this.speed * Math.cos(this.angle)) / 5;
    },
    draw: function (ctx) {
      ctx.fillStyle = "purple";
      ctx.save();
      ctx.translate(gun_x, gun_y);
      ctx.beginPath();
      ctx.arc(this.posX, -this.posY, this.size + 10, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      this.fly();
    },
  });

  Enemy = new Class({
    initialize: function (pX, pY, sz, sp, pts, im) {
      this.posX = pX; // позиция фигуры по X
      this.posY = pY; // позиция фигуры по Y
      this.size = sz;
      this.speed = sp;
      this.points = pts;
      this.img = im;
    },
    draw: function (ctx) {
      ctx.drawImage(
        this.img,
        this.posX - this.size / 2,
        canvas.height - this.posY - this.size / 2,
        this.size,
        this.size
      );
    },
  });