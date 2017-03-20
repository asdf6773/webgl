var VSHADER_SOURCE =
    'void main(){' +
    ' gl_Position = vec4(0.,0.,0.,1.);' +
    ' gl_PointSize = 10.;' +
    '}';
var FSHADER_SOURCE =
    'void main(){' +
    '  gl_FragColor = vec4(1.,0.8 ,0.3,1.);' +
    '}';


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
    gl.clearColor(0.0, 1.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
}
