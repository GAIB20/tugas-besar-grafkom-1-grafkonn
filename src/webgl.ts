import { fragmentShaderSource } from "./shader/fragmentShaderSource";
import { vertexShaderSource } from "./shader/vertexShaderSource";
import { AbstractShape } from "./shape/AbstractShape";
import { createProgram } from "./utils/program";
import { resizeCanvas } from "./utils/resize-canvas";
import { setupEventListener } from "./utils/setupEventListener";
import { createAllShader } from "./utils/shader";

export function createWebGL() {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
  if (!canvas) {
    return;
  }
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }
  const selection = document.getElementById(
    "selectOption"
  ) as HTMLSelectElement;

  resizeCanvas(gl.canvas as HTMLCanvasElement);

  // create the shader and link the program
  const [vertexShader, fragmentShader] = createAllShader(
    gl,
    vertexShaderSource,
    fragmentShaderSource
  );
  const program = createProgram(gl, vertexShader, fragmentShader);
  gl.useProgram(program);

  // get the glsl variables
  const positionAttribute = gl.getAttribLocation(program, "a_position");
  const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
  const colorUniform = gl.getUniformLocation(program, "u_color");
  const translationUniform = gl.getUniformLocation(program, "u_translation");
  const rotationUniform = gl.getUniformLocation(program, "u_rotation");

  // create position buffer and bind it
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const shapesArr: AbstractShape[] = [];
  const draggedVertexIdxArr: number[] = [];
  const selectedShapeIdx: number = 0;

  const color = [Math.random(), Math.random(), Math.random(), 1];

  // event listeners to create shape
  let mouseDownType = "create"; // TODO: modify when UI ready
  const createType = "square"; // TODO: modify when UI ready

  // // event listeners to change options
  selection.addEventListener("change", (e: Event) => {
    const selection = e.target as HTMLSelectElement;
    mouseDownType = selection.value;
  });

  // mouseDownType and createType is not inside here because we need it to be persistent across render
  setupEventListener(
    canvas,
    () => shapesArr,
    () => mouseDownType,
    () => createType,
    () => selectedShapeIdx,
    () => shapesArr[selectedShapeIdx],
    () => drawScene(),
    () => draggedVertexIdxArr
  );

  const drawScene = () => {
    // draw scene
    resizeCanvas(gl.canvas as HTMLCanvasElement);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // set the variable
    gl.uniform2f(resolutionUniform, gl.canvas.width, gl.canvas.height);

    for (let i = 0; i < shapesArr.length; i++) {
      // set the buffer data
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(shapesArr[i].locationArr),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

      // set the color
      gl.uniform4fv(colorUniform, color);

      // set the translate and rotate
      const translate = shapesArr[i].translationArr;
      const rotate = shapesArr[i].rotation;
      gl.uniform2fv(rotationUniform, rotate);
      gl.uniform2fv(translationUniform, translate);

      // draw the arrays
      gl.drawArrays(gl.TRIANGLES, 0, shapesArr[i].locationArr.length);
    }
  };
}
