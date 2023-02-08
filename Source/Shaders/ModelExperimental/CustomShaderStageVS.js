//This file is automatically rebuilt by the Cesium build process.
export default "vec3 customShaderStage(vec3 position) {\n\
#ifdef COMPUTE_POSITION_WC\n\
v_positionWC = (czm_model * vec4(position, 1.0)).xyz;\n\
#endif\n\
#ifdef HAS_CUSTOM_VERTEX_SHADER\n\
VertexInput vsInput;\n\
initializeInputStruct(vsInput);\n\
vertexMain(vsInput, position);\n\
#endif\n\
return position;\n\
}\n\
";
