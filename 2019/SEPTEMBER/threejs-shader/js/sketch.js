'use strict';

/* global THREE */

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({
    canvas
  });
  renderer.autoClearColor = false;

  const camera = new THREE.OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1, // far
  );
  const scene = new THREE.Scene();
  const plane = new THREE.PlaneBufferGeometry(2, 2);

  const fragmentShader = `
  #include <common>

  uniform vec3 iResolution;
  uniform float iTime;
  uniform float xPos;
  uniform float yPos;
  uniform sampler2D iChannel0;

  // By Daedelus: https://www.shadertoy.com/user/Daedelus
  // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  #define TIMESCALE 0.25 
  #define TILES 8
  #define COLOR 0.7, 1.6, 2.8
  //Random function
  float Hash (vec2 p)
  {
    return fract (sin (dot (p, vec2 (12.56, 167.89))) * 6750.21);
  }

  //Simple noise
  float Noise (vec2 p)
  {
      vec2 lv = fract (p);
      vec2 index = floor (p);
      
      vec2 sm = 6.0 * lv * lv * lv * lv * lv -
          15.0 * lv * lv * lv * lv + 
          10.0 * lv * lv * lv; //smooth function
      
      float bl = Hash (index);
      float br = Hash (index + vec2 (1.0, 0.0));
      float b = mix (bl, br, sm.x);
      float tl = Hash (index + vec2 (0.0, 1.0));
      float tr = Hash (index + vec2 (1.0, 1.0));
      float t = mix (tl, tr, sm.x);
      
      return mix (b, t, sm.y);   
  }
  //Fractal Brownian Motion
  float FBM (vec2 p)
  {
      const int OCTAVES = 7;
      
      float result = 0.0;
      float m = 0.0;
      
      float amplitude = 1.0;
      float freq = 1.0;
      
      for (int i=0; i<OCTAVES; i++)
      {
          result += Noise (p * freq) * amplitude;
          m += amplitude;
          amplitude *= 0.5; //lacunarity
          freq *= 2.0; //gain
      }
      
      return result/m;
  }

  //Distort the domain.
  //f(p) = fbm( p + fbm( p + fbm( p ) ) )
  //IQ Domain Wraping
  //http://www.iquilezles.org/www/articles/warp/warp.htm
  float DistortDomain (vec2 p, out vec2 fDstr, out vec2 sDstr)
  {
    fDstr = vec2 (
        FBM (p + vec2 (.5, 0.3)),
          FBM (p + vec2 (2.2, 0.1)  * iTime * 0.03)
      );
              
      sDstr = vec2 (
          FBM (p + xPos * fDstr + vec2 (2.5, 0.2)  * iTime * 0.1),
          FBM (p + yPos * fDstr + vec2 (-0.2, .3)  * iTime * 0.5)
      );
              
      return FBM (p + 5.0 * sDstr);
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {

    vec2 uv = fragCoord.xy / iResolution.xy;
    // uv.x *= iResolution.x / iResolution.y;

    vec2 fDistortion;
    vec2 sDistortion;
    float noise = DistortDomain (uv, fDistortion, sDistortion);

    vec3 col1 = mix(vec3(0.11,0.3,0.3),
                	vec3(0.23,0.90,0.07),
                	clamp((noise*noise)*5.0,0.0,1.0));
    
    vec3 col2 =  mix(col1,
                	 vec3(0.35,0.34,0.87),
                	 clamp(length(fDistortion),0.0,1.0));
    
    vec3 col3 = mix (col2, 
                     vec3 (0.21, 0.63, 0.7),
                     clamp (length (sDistortion.x), 0.0, 1.0));
    
    
    //Gamma
    fragColor = pow (vec4((noise * noise * (3.0 - 2.0 * noise)) * col3, 1.), vec4 (1./2.2));  
    uv.x += (fragColor[0] * fragColor[1])/2.0;
    uv.y += (fragColor[2] * fragColor[3])/2.0;
    fragColor = texture2D(iChannel0,uv);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `;
  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/bayer.png');
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const channel0 = loader.load('../assets/photo.jpg');
  const uniforms = {
    iTime: {
      value: 0
    },
    xPos: {
      value: 0
    },
    yPos: {
      value: 0
    },
    iResolution: {
      value: new THREE.Vector3()
    },
    iChannel0: {
      value: channel0
    },
  };
  const material = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms,
  });
  scene.add(new THREE.Mesh(plane, material));

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.00025; // convert to seconds

    resizeRendererToDisplaySize(renderer);

    const canvas = renderer.domElement;
    uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    uniforms.iTime.value = time;
    uniforms.xPos.value = Math.map(mouse.x, -1, 1, 6.5, 7);
    uniforms.yPos.value = Math.map(mouse.y, -1, 1, 6.5, 7);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();

var mouse = new THREE.Vector2();

function onMouseMove(event) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);

// MATH functions
Math.map = function (value, istart, istop, ostart, ostop) {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
}