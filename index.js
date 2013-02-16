"use strict";

//Fuses vertices in a mesh to remove cracks, sliver faces
function fuseVertices(cells, positions, tolerance) {
  
  //Default tolerance === 1e-6
  tolerance = tolerance || 1e-6;
  
  //First, fuse vertices together
  var grid        = {};
  var n_positions = [];
  var n_index     = new Array(positions.length);
  var r           = new Array(positions[0].length);
  for(var i=0; i<positions.length; ++i) {
    
    var p = positions[i];
    for(var j=0; j<p.length; ++j) {
      r[j] = Math.floor(p[j] / tolerance);
    }
    if(r in grid) {
      n_index[i] = grid[r];
    } else {
      var idx = n_positions.length;
      grid[r] = idx;
      n_index[i] = idx;
      n_positions.push(p.slice(0));
    }
  }
  
  //Then fix up faces
  var n_cells = [];
i_loop:
  for(var i=0; i<cells.length; ++i) {
    var face = cells[i].slice(0);
    for(var j=0; j<face.length; ++j) {
      face[j] = n_index[face[j]];
      for(var k=0; k<j; ++k) {
        if(face[j] === face[k]) {
          continue i_loop;
        }
      }
    }
    n_faces.push(face);
  }
  
  //Return resulting mesh
  return { positions: n_positions, cells: n_faces, vertex_relabel: n_index };
};

module.exports.fuseVertices = fuseVertices;