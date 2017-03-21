var VSHADER_SOURCE =
    //'uniform vec4 u_Translation;' +
    'uniform float u_CosB,u_SinB;' +
    'attribute vec4 a_Position;' +
    'void main(){' +
    ' gl_Position.x = a_Position.x*u_CosB - a_Position.y*u_SinB;' +
    ' gl_Position.y = a_Position.x*u_SinB + a_Position.y*u_CosB;' +
    ' gl_Position.z = a_Position.z;' +
    ' gl_Position.w = 1.0;'+
    //    ' gl_PointSize = 10.;' +
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

function main() {
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    var radian = Math.PI * Angle / 180;
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);
    if (!gl) {
        console.log('Failed to get the rendering for WebGL');
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders');
        return;
    }
    var n = initVertexBuffers(gl);
    var u_CosB = gl.getUniformLocation(gl.program, 'u_CosB');
    var u_SinB = gl.getUniformLocation(gl.program, 'u_SinB');
    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);

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
