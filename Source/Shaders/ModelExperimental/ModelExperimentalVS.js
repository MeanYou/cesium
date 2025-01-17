//This file is automatically rebuilt by the Cesium build process.
export default "precision highp float;\n\
void main()\n\
{\n\
vec3 position = vec3(0.0);\n\
position = processGeometry(position);\n\
#ifdef HAS_INSTANCING\n\
position = instancingStage(position);\n\
#ifdef USE_PICKING\n\
v_pickColor = a_pickColor;\n\
#endif\n\
#endif\n\
#ifdef USE_CUSTOM_SHADER\n\
position = customShaderStage(position);\n\
#endif\n\
gl_Position = czm_modelViewProjection * vec4(position, 1.0);\n\
#ifdef PRIMITIVE_TYPE_POINTS\n\
processPoints();\n\
#endif\n\
}\n\
";
