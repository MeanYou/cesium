/* This file is automatically rebuilt by the Cesium build process. */
define(['./BoxGeometry-91383910', './when-6655f883', './GeometryOffsetAttribute-834a3c02', './RuntimeError-5f205b85', './Transforms-e93813e8', './Matrix2-08e4fdf4', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './combine-1fd4d5cd', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './VertexFormat-d4a9fb98'], (function (BoxGeometry, when, GeometryOffsetAttribute, RuntimeError, Transforms, Matrix2, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, VertexFormat) { 'use strict';

  function createBoxGeometry(boxGeometry, offset) {
    if (when.defined(offset)) {
      boxGeometry = BoxGeometry.BoxGeometry.unpack(boxGeometry, offset);
    }
    return BoxGeometry.BoxGeometry.createGeometry(boxGeometry);
  }

  return createBoxGeometry;

}));
