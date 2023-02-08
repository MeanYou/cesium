define(['./Matrix3-51afcfcb', './defaultValue-040c41f9', './EllipseOutlineGeometry-0d232aa8', './Check-e01dbea3', './Math-f7bd710c', './Transforms-dd1e4b9a', './Matrix2-3a8613cf', './RuntimeError-3c5db370', './combine-6eb6e848', './ComponentDatatype-614bb7b9', './WebGLConstants-f7267ced', './EllipseGeometryLibrary-ce2fa88e', './GeometryAttribute-defe0105', './GeometryAttributes-52134c76', './GeometryOffsetAttribute-b6810db4', './IndexDatatype-086e75a1'], (function (Matrix3, defaultValue, EllipseOutlineGeometry, Check, Math, Transforms, Matrix2, RuntimeError, combine, ComponentDatatype, WebGLConstants, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, GeometryOffsetAttribute, IndexDatatype) { 'use strict';

  function createEllipseOutlineGeometry(ellipseGeometry, offset) {
    if (defaultValue.defined(offset)) {
      ellipseGeometry = EllipseOutlineGeometry.EllipseOutlineGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix3.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix3.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseOutlineGeometry.EllipseOutlineGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseOutlineGeometry;

}));
