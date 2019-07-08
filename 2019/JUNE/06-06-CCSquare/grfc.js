const phrase = 'square'
const totalFrames = 10
const incr = 1
const maxLen = 64
let back = false

//————————————————————————————————————————————————————————————————————————————————— gLine
class gLine {
  constructor(y, index) {
    this.y = y
    this.index = 0
    this.phrase = 0
    this.master = this.setTxt()
    this.back = false
    this.index = index

  }

  setTxt() {
    let arr = []
    // let a = floor(random(6))
    // let b = floor(random(6))
    // while (b == a) {
    //   b = floor(random(6))
    // }
    // let c = floor(random(6))
    // while (c == a || c == b) {
    //   c = floor(random(6))
    // }
    // let d = floor(random(6))
    // while (d == a || d == b || d == c) {
    //   d = floor(random(6))
    // }

    let a = 0
    let b = 5
    let c = 1
    let d = 4
    for (let i = 0; i < phrase.length; i++) {
      let temp = phrase
      if (i == a || i == b) arr.push(new gChar(temp.charAt(i), 1))
      else if (i == c || i == d) arr.push(new gChar(temp.charAt(i), 2))
      else arr.push(new gChar(temp.charAt(i), 3))
    }
    return arr
  }

  update() {
    let percent = ((frameCount + this.index) % totalFrames) / totalFrames
    let incrCount = floor(map(percent, 0, 0.5, 0, 1))

    if (this.phrase.length > maxLen) {
      this.back = true
    }
    if (this.phrase.length < phrase.length) {
      this.back = false
    }
    this.master.forEach(elm => {
      if (this.back) {
        if (elm.count == elm.next) {
          elm.count = 0
          elm.chars = elm.chars.slice(0, -1);
        }
      } else {
        if (elm.count == elm.next) {
          elm.count = 0
          elm.chars += elm.char
        }
      }
      elm.count += incrCount
    })

    this.phrase = ''
    this.master.forEach(elm => {
      this.phrase += elm.chars
    })
  }

  //————————————————————————————————————————————————————————————————————————————————— gLine show
  show() {
    noStroke()
    fill(clrs[1])
    push()
    translate(0, this.y)
    textSize(txtSize)
    text(this.phrase, 0, 0)
    pop()
  }
}

// ————————————————————————————————————————————————————————————————————————————————— gLine
class gChar {
  constructor(char, next) {
    this.char = char
    this.chars = char
    this.incr = next
    this.next = incr * next
    this.count = 0
  }
}