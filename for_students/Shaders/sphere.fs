precision highp float;
precision highp int;

uniform float time;

varying vec2 vUv;

void main() {

    gl_FragColor = vec4((sin(vUv.x * 40.0 + time) + 1.0)/2.0, 
                        (sin(-vUv.x * 40.0 + time) + 1.0)/2.0, 
                        (sin(-vUv.y * 20.0 + time * 30.0) + 1.0)/2.0, 
                        1);

}