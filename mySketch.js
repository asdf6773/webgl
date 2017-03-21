var VSHADER_SOURCE =
    'attribute vec4 a_Position;' +
    'void main(){' +
    ' gl_Position = a_Position;' +
    ' gl_PointSize = 10.;' +
    '}';
var FSHADER_SOURCE =
    'precision mediump float;' +
    'uniform vec4 u_FragColor;' +
    'void main(){' +
    '  gl_FragColor = vec4(0.5,0.4,0.4,1.0);' +
    '}';

var x;
var y;
var frame = 0;

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);

    if (!gl) {
        console.log('Failed to get the rendering for WebGL');
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }
    var n = initVertexBuffers(gl);
    if (n < 0) {
        console.log('Failed to set the position of the vertices');
    }


    //  x = Math.cos(frame);
    //  y = Math.sin(frame);
    //  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    //  if (a_Position < 0) {
    //    console.log('Failed to get the storage location of a_Position');
    //  return;
    //}

    //canvas.onmousedown = function(ev) {
    //    click(ev, gl, canvas, a_Position, u_FragColor);
    //  }
  //  var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  //  if (u_FragColor < 0) {
    //    console.log('Failed to get the storage location of u_FragColor');
    //    return;
  //  }
    //  gl.vertexAttrib3f(a_Position, 0., 0., 0.);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, n);
    //  frame += 0.01;
    //  requestAnimationFrame(main);
}


var g_points = [];
var g_colors = [];

function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect(); //get canvas position
    x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
    y = (-(y - rect.top) + canvas.height / 2) / (canvas.height / 2);
    g_points.push([x, y]);

    if (x >= 0.0 && y >= 0.0) {
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    } else if (x >= 0 && y < 0) {
        g_colors.push([1.0, 1.0, 0.0, 1.0])
    } else if (x < 0 && y < 0) {
        g_colors.push([1.0, 1.0, 1.0, 1.0])
    } else if (x < 0 && y >= 0) {
        g_colors.push([1.0, 0.0, 1.0, 1.0])
    }

    gl.clear(gl.COLOR_BUFFER_BIT); // IMPORTANT
    var len = g_points.length;

    for (var i = 0; i < len; i++) {
        var xy = g_points[i];
        var rgba = g_colors[i]
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
    console.log(len);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0,
        0.5, -0.5, -0.5,
        0.5, -0.5
    ]);
    var n = 3;
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create buffer object');
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    return n;
};


//requestAnimationFrame(main);
