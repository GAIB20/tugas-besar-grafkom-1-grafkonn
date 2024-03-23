// init index.ts
import { fragmentShaderSource } from "./fragmentShaderSource";
import { vertexShaderSource } from "./vertexShaderSource";
import { createProgram } from "../utils/program";
import { resizeCanvas } from "../utils/resize-canvas";
import { createAllShader } from "../utils/shader";

function main() {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
  if (!canvas) {
    return;
  }
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  // create the shader and link the program
  const [vertexShader, fragmentShader] = createAllShader(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  );
  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // get the position
  var positionUniform = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionUniform);

  // get the uniforms
  var resolutionUniform = gl.getUniformLocation(program, "u_resolution");
  var colorUniform = gl.getUniformLocation(program, "u_color");
  var translationUniform = gl.getUniformLocation(program, "u_translation");

  resizeCanvas(canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.uniform2f(resolutionUniform, gl.canvas.width, gl.canvas.height);

  // Clear canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Create a buffer and bind it
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // CALLS only when there's a change

  // // set the color
  // gl.uniform4fv(colorLocation, color);

  // // Set the translation.
  // gl.uniform2fv(translationLocation, translation);

  // Set the rotation.
  // gl.uniform2fv(rotationLocation, rotation);
}
