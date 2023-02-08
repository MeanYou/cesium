/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-6655f883', './EllipsoidGeometry-536271bd', './GeometryOffsetAttribute-834a3c02', './RuntimeError-5f205b85', './Transforms-e93813e8', './Matrix2-08e4fdf4', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './combine-1fd4d5cd', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './IndexDatatype-e7458bc9', './VertexFormat-d4a9fb98'], (function (when, EllipsoidGeometry, GeometryOffsetAttribute, RuntimeError, Transforms, Matrix2, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, IndexDatatype, VertexFormat) { 'use strict';

  function createEllipsoidGeometry(ellipsoidGeometry, offset) {
    if (when.defined(offset)) {
      ellipsoidGeometry = EllipsoidGeometry.EllipsoidGeometry.unpack(ellipsoidGeometry, offset);
    }
    return EllipsoidGeometry.EllipsoidGeometry.createGeometry(ellipsoidGeometry);
  }

  return createEllipsoidGeometry;

}));
