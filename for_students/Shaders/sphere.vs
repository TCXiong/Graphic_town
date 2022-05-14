precision highp float;
precision highp int;
uniform float time;
attribute vec2 uv2;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 vUv2;

void main() {

    vNormal = normal;
    vUv = uv;
    vUv2 = uv2;
    vec3 pos = position;
    pos.x += sin(pos.y * 10.0 + time) * 0.05;
    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

}