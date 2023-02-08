/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-6655f883', './FrustumGeometry-130fb9a6', './Transforms-e93813e8', './Matrix2-08e4fdf4', './RuntimeError-5f205b85', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './combine-1fd4d5cd', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './Plane-8bcfd1cf', './VertexFormat-d4a9fb98'], (function (when, FrustumGeometry, Transforms, Matrix2, RuntimeError, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, Plane, VertexFormat) { 'use strict';

  function createFrustumGeometry(frustumGeometry, offset) {
    if (when.defined(offset)) {
      frustumGeometry = FrustumGeometry.FrustumGeometry.unpack(frustumGeometry, offset);
    }
    return FrustumGeometry.FrustumGeometry.createGeometry(frustumGeometry);
  }

  return createFrustumGeometry;

}));
