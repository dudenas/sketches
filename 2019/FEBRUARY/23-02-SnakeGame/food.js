class Food {
  constructor(pos) {
    this.pos = pos;
    this.eaten = false;
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  display() {
    noStroke();
    console.log(clrs['food']);
    fill(color(clrs['food']));
    rect(this.pos.x * scl, this.pos.y * scl, scl, scl);
  }
}

function addFodd() {
  let f = new Food(new p5.Vector(floor(random(cols)), floor(random(rows))));
  food.push(f);
};