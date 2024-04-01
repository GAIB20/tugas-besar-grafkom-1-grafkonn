export const fragmentShaderSource = 
`precision mediump float;

varying vec4 v_color;

void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);
   gl_FragColor = v_color;
}`