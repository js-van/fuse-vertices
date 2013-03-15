var fuseVertices = require("../index.js")

require("tap").test("fuseVertices", function(t) {

  var cells = [[0,1], [2,3]];
  var positions = [[0], [1], [1.000000001], [2]];
  var result = require("../index.js")(cells, positions);
  
  t.equals(result.positions.length, 3)
  t.equals(result.cells[0][0], 0)
  t.equals(result.cells[0][1], 1)
  t.equals(result.cells[1][0], 1)
  t.equals(result.cells[1][2], 2)

  t.end()
})

