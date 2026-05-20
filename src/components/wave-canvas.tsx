"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uScroll;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = 1.8;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= 0.5;
  }
  return value;
}

float pattern(vec2 p, float t) {
  vec2 p2 = p - t * 0.008;
  return fbm(p + fbm(p2));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv -= 0.5;
  uv.x *= uResolution.x / uResolution.y;

  float scrollOffset = uScroll * 0.00015;
  vec2 p = uv * 2.5 + vec2(0.0, scrollOffset);
  float f = pattern(p, uTime);
  f = clamp(f, 0.0, 1.0);

  vec3 col = mix(uColor1, uColor2, f);
  col = mix(col, uColor3, pow(f, 3.0));

  float vignette = 1.0 - smoothstep(0.3, 1.2, length(uv * 1.2));
  col *= 0.85 + 0.15 * vignette;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(gl.getShaderInfoLog(shader));
    }
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const prog = gl.createProgram()!;
  const vShader = compileShader(gl, gl.VERTEX_SHADER, vs);
  const fShader = compileShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vShader || !fShader) return null;
  gl.attachShader(prog, vShader);
  gl.attachShader(prog, fShader);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error(gl.getProgramInfoLog(prog));
    }
    return null;
  }
  return prog;
}

/** Warm atmospheric wave background — vanilla WebGL, no deps.
 *  Pauses render loop when off-screen and respects prefers-reduced-motion.
 */
export function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) return;

    const program = createProgram(gl, VERT, FRAG);
    if (!program) return;

    const posLoc = gl.getAttribLocation(program, "position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uScroll = gl.getUniformLocation(program, "uScroll");
    const uColor1 = gl.getUniformLocation(program, "uColor1");
    const uColor2 = gl.getUniformLocation(program, "uColor2");
    const uColor3 = gl.getUniformLocation(program, "uColor3");

    const color1 = [0.95, 0.95, 0.93];
    const color2 = [0.82, 0.90, 0.88];
    const color3 = [0.94, 0.92, 0.86];

    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let animId = 0;
    const startTime = performance.now();
    let isVisible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const drawFrame = (t: number) => {
      gl!.useProgram(program);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
      gl!.enableVertexAttribArray(posLoc);
      gl!.vertexAttribPointer(posLoc, 2, gl!.FLOAT, false, 0, 0);

      gl!.uniform2f(uResolution, canvas.width, canvas.height);
      gl!.uniform1f(uTime, t);
      gl!.uniform1f(uScroll, scrollY);
      gl!.uniform3f(uColor1, color1[0], color1[1], color1[2]);
      gl!.uniform3f(uColor2, color2[0], color2[1], color2[2]);
      gl!.uniform3f(uColor3, color3[0], color3[1], color3[2]);

      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
    };

    const render = (now: number) => {
      if (!isVisible && !reducedMotion) {
        // When off-screen, skip drawing but keep loop alive to resume quickly
        animId = requestAnimationFrame(render);
        return;
      }

      const t = (now - startTime) * 0.001;
      drawFrame(t);

      if (reducedMotion) {
        // Static frame only — no continuous animation
        return;
      }

      animId = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        // If becoming visible again, restart the loop
        if (isVisible && !reducedMotion && animId === 0) {
          animId = requestAnimationFrame(render);
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas);

    // Draw initial frame
    drawFrame(0);

    if (!reducedMotion) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
