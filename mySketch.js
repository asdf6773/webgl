var VSHADER_SOURCE =
    'uniform mat4 u_ModelMatrix;' +
    'attribute vec4 a_Color;' +
    'varying vec4 v_Color;' +
    'attribute vec4 a_Position;' +
    'void main(){' +
    'v_Color = a_Color;' +
    'gl_Position = u_ModelMatrix*a_Position;' +
    '}';
var FSHADER_SOURCE =
    'precision mediump float;' +
    'varying vec4 v_Color;' +
    'uniform vec4 u_FragColor;' +
    'void main(){' +
    '  gl_FragColor = v_Color;' +
    '}';
var x;
var y;
var frame = 0;
var Tx = 0.5,
    Ty = 0.5,
    Tz = 0.0;
var Angle = 60;
var radian = Math.PI * Angle / 180;
var cosB = Math.cos(radian);
var sinB = Math.sin(radian);


var modelMatrix = new Matrix4();


ANGLE_STEP = 45;

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
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    var currentAngle = 0.0;
    //var ModelMatrix

    ////////////////////////////////
    var tick = function() {
        currentAngle = animate(currentAngle);
        //    console.log(currentAngle);
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick);
    }
    tick();
    /////////////////////////////////
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')
    console.log(u_ModelMatrix);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    if (n < 0) {
        console.log('Failed to set the position of the vertices');
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, n);
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) { //LOSING PARAMETER
    modelMatrix.setRotate(currentAngle, 0, 0, 1);
    modelMatrix.translate(0, 0.4, 0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.clear(gl.DEPTH_BUFFER_BIT); //FORGET SET PARAMETER
    gl.drawArrays(gl.LINE_LOOP, 0, n);
}
var g_last = Date.now();

function animate(angle) {
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now
    var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
}



function initVertexBuffers(gl) {
    var vertices = new Float32Array([-0.5, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 1.0, 0.0,
        0.5, 0.5, 0.0, 0.0, 0.1,
    ]);
    var n = 3;
    var vertexBuffer = gl.createBuffer(); //////////////create buffer
    //var colorBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create buffer object');
        return -1;
    }
    var FSIZE = vertices.BYTES_PER_ELEMENT;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); /////////////bind buffer
    //  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW); //put data
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 0);
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_Color);
    return n;
};
//requestAnimationFrame(main);
