/* This file is automatically rebuilt by the Cesium build process. */
define(['./Matrix2-08e4fdf4', './when-6655f883', './EllipseOutlineGeometry-ea0e237c', './RuntimeError-5f205b85', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './GeometryOffsetAttribute-834a3c02', './Transforms-e93813e8', './combine-1fd4d5cd', './EllipseGeometryLibrary-24d882bc', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './IndexDatatype-e7458bc9'], (function (Matrix2, when, EllipseOutlineGeometry, RuntimeError, ComponentDatatype, WebGLConstants, GeometryOffsetAttribute, Transforms, combine, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, IndexDatatype) { 'use strict';

  function createEllipseOutlineGeometry(ellipseGeometry, offset) {
    if (when.defined(offset)) {
      ellipseGeometry = EllipseOutlineGeometry.EllipseOutlineGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix2.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseOutlineGeometry.EllipseOutlineGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseOutlineGeometry;

}));
