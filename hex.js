// hex related
var size = 1;
var columns = 40, rows = 40;
var layout = Layout(layout_pointy, Point(size, size), Point(-30, -30));
var offset = Math.floor ((rows-1)/2);

// hash (q,r)--> (q',r) --> vIDs (q',r)
function hashHexVertex (q,r) {
    var serial = r * (columns+offset) + (q+offset);
    return vIDs[serial];
}

function initHex() {
    var geometry = new THREE.Geometry();
    var verts = geometry.vertices; // ptr assignment
    var i, j, p;

    var vID = 0;
	var nskip;
    
    // assign all vIDs to -1
    for (j = 0; j < rows; j++)
        for (i = 0; i < columns+offset; i++)
            vIDs.push (-1);
    
    for (j = 0; j < rows; j++) {  // r: [0, rows-1]
        nskip = 0;  // for every row...
        vertsInThisRow = 0;
        for (i = 0; i < columns+offset; i++) {  // q': [0, columns+offset-1]
        // for (i = -offset; i < columns; i++) {
            
            // for every row: skip first hex's if necessary
            if (nskip < offset - Math.floor (j/2)) {
                ++nskip;
            	continue;
            }

            // trailing skip
            if (vertsInThisRow == columns) continue;  // vertices already built; start skip
            
            var xy = hex_to_pixel(layout, Hex(i-offset, j, - (i-offset) - j));

            p = new THREE.Vector3(xy.x, xy.y, 0);
            verts.push(p); 
            vIDs [i+(columns+offset)*j] = vID;
            ++vID;
            ++vertsInThisRow;
        }
    }

    console.log(vIDs);

    var faces = geometry.faces;

    // looping [q,r]
    for (j = 1; j < rows; j++) {  
        for (i = -offset; i < columns - 1; i++) {
            vidA = hashHexVertex (i, j);
            vidB = hashHexVertex (i+1, j);
            vidC = hashHexVertex (i+1, j-1);
            vidD = hashHexVertex (i, j-1);
            
            if (vidA != -1 && vidC != -1 && vidB != -1)
	            faces.push(new THREE.Face3(vidA, vidC, vidB));
            if (vidA != -1 && vidD != -1 && vidC != -1)
	            faces.push(new THREE.Face3(vidA, vidD, vidC));
        }
    }

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();

    var material = new THREE.MeshLambertMaterial({
        wireframe: true,
        color: 0xff1234,
        side: THREE.DoubleSide
    });
    
    var noiseMaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
            lightPos: {
                type: 'v3',
                value: new THREE.Vector3(0, 0, 110)
            }
        },
        vertexShader: document.getElementById('myVertexShader').textContent,
        fragmentShader: document.getElementById('myFragmentShader').textContent,
        //wireframe: true
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}


// draw a six-sided polyline (of size one)
function initUnitHexMesh() {
    var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    var geometry = new THREE.Geometry();
    for (var i = 0, theta = Math.PI / 2; i < 7; i++, theta += Math.PI / 3) {
        var p = new THREE.Vector3(Math.cos(theta), Math.sin(theta), 0);
        geometry.vertices.push(p);
    }
    var line = new THREE.Line(geometry, material);
    return line;
}