/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-6655f883', './EllipsoidOutlineGeometry-6afb80eb', './GeometryOffsetAttribute-834a3c02', './RuntimeError-5f205b85', './Transforms-e93813e8', './Matrix2-08e4fdf4', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './combine-1fd4d5cd', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './IndexDatatype-e7458bc9'], (function (when, EllipsoidOutlineGeometry, GeometryOffsetAttribute, RuntimeError, Transforms, Matrix2, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, IndexDatatype) { 'use strict';

  function createEllipsoidOutlineGeometry(ellipsoidGeometry, offset) {
    if (when.defined(ellipsoidGeometry.buffer)) {
      ellipsoidGeometry = EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.unpack(
        ellipsoidGeometry,
        offset
      );
    }
    return EllipsoidOutlineGeometry.EllipsoidOutlineGeometry.createGeometry(ellipsoidGeometry);
  }

  return createEllipsoidOutlineGeometry;

}));
