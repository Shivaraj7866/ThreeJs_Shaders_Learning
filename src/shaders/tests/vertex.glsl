//use these if you are using "RawShaderMaterial"
      // uniform mat4 projectionMatrix;
      // uniform mat4 viewMatrix;
      // uniform mat4 modelMatrix;

      uniform vec3 uFrequency;
      uniform float uTime;

//use these if you are using "RawShaderMaterial"
      // attribute vec3 position;
      // attribute vec2 uv;

      varying vec2 vUv;
      varying float vElevation;

      void main()
      {

      //we can modify each vertex position on the geometry of the mesh
      vec4 modelPosition = modelMatrix * vec4(position,1.0);

      float elavation =  sin(modelPosition.x * uFrequency.x - uTime ) * 0.1 ;
      elavation += sin(modelPosition.y * uFrequency.x - uTime ) * 0.1 ;

      modelPosition.z = elavation;

      vec4 viewPosition = viewMatrix * modelPosition ;
      vec4 projectedPosition = projectionMatrix * viewPosition ;

      gl_Position = projectedPosition ;

      vUv = uv;
      vElevation = elavation;
      
      // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
      }