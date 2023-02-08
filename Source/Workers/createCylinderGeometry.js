/* This file is automatically rebuilt by the Cesium build process. */
define(['./CylinderGeometry-9423a3ea', './when-6655f883', './GeometryOffsetAttribute-834a3c02', './RuntimeError-5f205b85', './Transforms-e93813e8', './Matrix2-08e4fdf4', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './combine-1fd4d5cd', './CylinderGeometryLibrary-e617f82f', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './IndexDatatype-e7458bc9', './VertexFormat-d4a9fb98'], (function (CylinderGeometry, when, GeometryOffsetAttribute, RuntimeError, Transforms, Matrix2, ComponentDatatype, WebGLConstants, combine, CylinderGeometryLibrary, GeometryAttribute, GeometryAttributes, IndexDatatype, VertexFormat) { 'use strict';

  function createCylinderGeometry(cylinderGeometry, offset) {
    if (when.defined(offset)) {
      cylinderGeometry = CylinderGeometry.CylinderGeometry.unpack(cylinderGeometry, offset);
    }
    return CylinderGeometry.CylinderGeometry.createGeometry(cylinderGeometry);
  }

  return createCylinderGeometry;

}));
