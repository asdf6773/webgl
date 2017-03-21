var VSHADER_SOURCE =
    //'uniform vec4 u_Translation;' +
    'uniform vec2 u_CosBSinB;' +
    'uniform mat4 u_xformMatrix;' +
    'attribute vec4 a_Position;' +
    'void main(){' +
    'gl_Position = u_xformMatrix*a_Position;' +
    //  'gl.Position = vec4(u_CosBSinB);'
    //  ' gl_Position.x = a_Position.x*u_CosBSinB.x - a_Position.y*u_CosBSinB.y;' +
    //' gl_Position.y = a_Position.x*u_CosBSinB.y + a_Position.y*u_CosBSinB.x;' +
    //' gl_Position.z = a_Position.z;' +
    //' gl_Position.w = 1.0;' +
    //' gl_PointSize = 10.;' +
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
var Tx = 0.5,
    Ty = 0.5,
    Tz = 0.0;
var Angle = 90;
var radian = Math.PI * Angle / 180;
var cosB = Math.cos(radian);
var sinB = Math.sin(radian);
var xformMatrix = new Float32Array([
    cosB, sinB, 0.0, 0.0, -sinB, cosB, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
]);

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
    var u_CosBSinB = gl.getUniformLocation(gl.program, 'u_CosBSinB');
    var u_xformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix')
    gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);
    gl.uniform2f(u_CosBSinB, cosB, sinB);
    //  gl.uniform1f(u_SinB, sinB);

    if (n < 0) {
        console.log('Failed to set the position of the vertices');
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);
    var n = 4;
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
