// init index.ts
import { onCreateHandleMouseDown } from "./mandatory/create";
import { handleTranslate } from "./mandatory/translate";
import { fragmentShaderSource } from "./shader/fragmentShaderSource";
import { vertexShaderSource } from "./shader/vertexShaderSource";
import { AbstractShape } from "./shape/AbstractShape";
import { createProgram } from "./utils/program";
import { resizeCanvas } from "./utils/resize-canvas";
import { setupSlider } from "./utils/setupSlider";
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

  // create position buffer and bind it
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const shapesArr: AbstractShape[] = [];
  const positionsArr: number[][] = [];
  const translationArr: number[] = [];
  const rotation: number[] = [];
  const selectedShape: number = 0;

  const color = [Math.random(), Math.random(), Math.random(), 1];

  // add event listeners
  const mouseDownType = "create"; // TODO: modify when UI ready
  const createType = "square"; // TODO: modify when UI ready
  canvas.addEventListener("mousedown", (e: MouseEvent) => {
    positionsArr.push([]);
    onCreateHandleMouseDown(
      e,
      positionsArr[shapesArr.length],
      canvas,
      shapesArr,
      translationArr,
      rotation,
      mouseDownType,
      createType
    );
    drawScene();
  });

  setupSlider("#slider-translation-x", gl.canvas.width, (e: Event) => {
    handleTranslate(e, selectedShape, translationArr, shapesArr[selectedShape], "x");
    drawScene();
  });
  setupSlider("#slider-translation-y", gl.canvas.height, (e: Event) => {
    handleTranslate(e, selectedShape, translationArr, shapesArr[selectedShape], "y");
    drawScene();
  });

  const drawScene = () => {
    // draw scene
    resizeCanvas(gl.canvas as HTMLCanvasElement);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    console.log(positionsArr[selectedShape]);

    // set the variable
    gl.uniform2f(resolutionUniform, gl.canvas.width, gl.canvas.height);

    for (let i = 0; i < positionsArr.length; i++) {
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positionsArr[i]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);
      gl.uniform4fv(colorUniform, color);
      const translate = [
        translationArr[2 * i],
        translationArr[2 * i + 1],
      ];
      gl.uniform2fv(translationUniform, translate);
      gl.drawArrays(gl.TRIANGLES, 0, positionsArr[i].length);
    }
    
  };
}
