function Board(string) {
  this.input = string;
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
  this.firstMove = true;
}

Board.prototype.setUp = function() {
  var initialValues = this.input.split("");
  for (i=0; i<initialValues.length; i++) {
      var numToTest = parseInt(initialValues[i]);
    if (numToTest !== 0) {
      var innerArrayIndex = i%4;
      var outerArrayIndex = parseInt(i/4);
      this.board[outerArrayIndex][innerArrayIndex] = parseInt(initialValues[i]);
    }
  }
}

Board.prototype.toString = function(){
  var flattenedBoard = _.flatten(this.board);
  for (i=0; i<flattenedBoard.length; i++){
    flattenedBoard[i] = flattenedBoard[i].toString();
    if (i%4 === 3){
      flattenedBoard[i] += "\n";
    }
  }
  console.log(flattenedBoard.join(""));
}

Board.prototype.spawnNumber = function() {
  // check entire nested board for 0.
  // replace one of those 0s with a 2 or 4.
  var outerIndex = Math.floor(Math.random() * 4);
  var innerIndex = Math.floor(Math.random() * 4);
  if (this.board[outerIndex][innerIndex] === 0) {
    // 2 or 4
    if (this.firstMove === true){
      this.board[outerIndex][innerIndex] = 2;
      this.firstMove = false;
    }else {
      this.board[outerIndex][innerIndex] = Math.floor((Math.random() * 2) + 1 ) * 2;
    }
  }
  else {
    this.spawnNumber();
  }
}


Board.prototype.moveRight = function() {
  for (i=0; i<4; i++) {
    this.board[i] = _.without(this.board[i], 0);
    for (k=0; k < this.board[i].length - 1; k++) {
      if (this.board[i][k] === this.board[i][k+1]) {
        this.board[i][k+1] += this.board[i][k];
        this.board[i].splice(k, 1);
      }
    }
    var paddingAmount = 4 - this.board[i].length;
    for (j=0; j<paddingAmount; j++) {
      this.board[i].unshift(0);
    }
  }
  this.spawnNumber();
}

Board.prototype.moveLeft = function() {
  for (i=0; i<4; i++) {
    this.board[i] = _.without(this.board[i], 0);
    for (k=0; k < this.board[i].length - 1; k++) {
      if (this.board[i][k] === this.board[i][k+1]) {
        this.board[i][k+1] += this.board[i][k];
        this.board[i].splice(k, 1);
      }
    }
    var paddingAmount = 4 - this.board[i].length;
    for (j=0; j<paddingAmount; j++) {
      this.board[i].push(0);
    }
  }
  this.spawnNumber();
}

Board.prototype.moveUp = function() {
  var transposedBoard = _.zip.apply(_, this.board);
  for (i=0; i<4; i++) {
    transposedBoard[i] = _.without(transposedBoard[i], 0);
    for (k=0; k < transposedBoard[i].length - 1; k++) {
      if (transposedBoard[i][k] === transposedBoard[i][k+1]) {
        transposedBoard[i][k+1] += transposedBoard[i][k];
        transposedBoard[i].splice(k, 1);
      }
    }
    var paddingAmount = 4 - transposedBoard[i].length;
    for (j=0; j<paddingAmount; j++) {
      transposedBoard[i].push(0);
    }
  }
  this.board = _.zip.apply(_, transposedBoard);
  this.spawnNumber();
}

Board.prototype.moveDown = function() {
  var transposedBoard = _.zip.apply(_, this.board);
  for (i=0; i<4; i++) {
    transposedBoard[i] = _.without(transposedBoard[i], 0);
    for (k=0; k < transposedBoard[i].length - 1; k++) {
      if (transposedBoard[i][k] === transposedBoard[i][k+1]) {
        transposedBoard[i][k+1] += transposedBoard[i][k];
        transposedBoard[i].splice(k, 1);
      }
    }
    var paddingAmount = 4 - transposedBoard[i].length;
    for (j=0; j<paddingAmount; j++) {
      transposedBoard[i].unshift(0);
    }
  }
  this.board = _.zip.apply(_, transposedBoard);
  this.spawnNumber();
}

Board.prototype.draw = function() {
  document.getElementById("0-0").innerHTML = this.board[0][0];

}

