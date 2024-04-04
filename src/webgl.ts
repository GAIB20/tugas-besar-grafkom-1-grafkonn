import { fragmentShaderSource } from "./shader/fragmentShaderSource";
import { vertexShaderSource } from "./shader/vertexShaderSource";
import { AbstractShape } from "./shape/AbstractShape";
import { createProgram } from "./utils/program";
import { resizeCanvas } from "./utils/resize-canvas";
import { setupEventListener } from "./utils/setupEventListener";
import { createAllShader } from "./utils/shader";

export function createWebGL(
  setShapeTypeArr: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        type?: "line" | "square" | "rectangle" | "polygon";
      }[]
    >
  >,
  createType: string
) {
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
  if (!canvas) {
    return;
  }
  const gl = canvas.getContext("webgl2");
  if (!gl) return;

  const colorPicker = document.querySelector<HTMLInputElement>("#color-picker");
  if (!colorPicker) return;

  const selection = document.getElementById(
    "selectOption"
  ) as HTMLSelectElement;
  const selectionShapes = document.getElementById(
    "selectShape"
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
  const colorAttribute = gl.getAttribLocation(program, "a_color");

  const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
  const translationUniform = gl.getUniformLocation(program, "u_translation");
  const rotationUniform = gl.getUniformLocation(program, "u_rotation");

  // create position and color buffer
  const positionBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();

  const shapesArr: AbstractShape[] = [];
  const draggedVertexIdxArr: number[] = [];
  const changedColorVertexIdxArr: number[] = [];

  // event listeners to create shape
  let mouseDownType = "create";
  let selectedShapeIdx: number = 0;

  // event listeners to change options
  selection.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    mouseDownType = target.value;
  });
  // event listeners to change selected shape
  selectionShapes.addEventListener("change", (e: Event) => {
    const target = e.target as HTMLSelectElement;
    selectedShapeIdx = parseInt(target.value);

    // change the slider value to match the selected shape
    const sliderX = document.querySelector<HTMLInputElement>(
      "#slider-translation-x"
    );
    const sliderValX = document.querySelector<HTMLOutputElement>("#sliderValX");
    const sliderY = document.querySelector<HTMLInputElement>(
      "#slider-translation-y"
    );
    const sliderValY = document.querySelector<HTMLOutputElement>("#sliderValY");
    const sliderRotate =
      document.querySelector<HTMLInputElement>("#slider-rotation");
    const sliderValRotate =
      document.querySelector<HTMLOutputElement>("#sliderValRotation");

    if (!sliderX || !sliderY || !sliderRotate || !sliderValX || !sliderValY || !sliderValRotate) {
      throw new Error("Slider not found!");
    }
    sliderX.value = shapesArr[selectedShapeIdx].translationArr[0].toString();
    sliderValX.value = sliderX.value
    sliderY.value = shapesArr[selectedShapeIdx].translationArr[1].toString();
    sliderValY.value = sliderY.value

    const sinValue = shapesArr[selectedShapeIdx].rotation[0];
    const cosValue = shapesArr[selectedShapeIdx].rotation[1];
    const angleInRadians = Math.atan2(sinValue, cosValue);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
    sliderRotate.value = ((360 - angleInDegrees) % 360).toString();
    sliderValRotate.value = sliderRotate.value
  });

  // mouseDownType, createType, and selectedShapeIdx is not inside here because we need it to be persistent across render
  setupEventListener(
    setShapeTypeArr,
    canvas,
    colorPicker,
    selectionShapes,
    () => shapesArr,
    () => mouseDownType,
    () => createType,
    () => selectedShapeIdx,
    () => shapesArr[selectedShapeIdx],
    () => drawScene(),
    () => draggedVertexIdxArr,
    () => changedColorVertexIdxArr
  );

  colorPicker.focus();
  colorPicker.value = "#FFCC00";
  colorPicker.click();

  const drawScene = () => {
    // draw scene
    resizeCanvas(gl.canvas as HTMLCanvasElement);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(program);
    // Turn on the position attribute
    gl.enableVertexAttribArray(positionAttribute);

    // Turn on the color attribute
    gl.enableVertexAttribArray(colorAttribute);

    // set the variable
    gl.uniform2f(resolutionUniform, gl.canvas.width, gl.canvas.height);

    for (let i = 0; i < shapesArr.length; i++) {
      // set the position buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(shapesArr[i].locationArr),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 0, 0);

      // set the color buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(shapesArr[i].color),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(colorAttribute, 4, gl.FLOAT, false, 0, 0);

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
