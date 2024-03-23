export function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Failed to create shader");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error("Failed to compile shader: " + gl.getShaderInfoLog(shader));
  }

  return shader;
}

export function createAllShader(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
) : WebGLShader[] {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  return [vertexShader, fragmentShader];
}
