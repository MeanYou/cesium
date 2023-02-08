define(['./Matrix3-51afcfcb', './defaultValue-040c41f9', './EllipseGeometry-2396b0d9', './Check-e01dbea3', './Math-f7bd710c', './Transforms-dd1e4b9a', './Matrix2-3a8613cf', './RuntimeError-3c5db370', './combine-6eb6e848', './ComponentDatatype-614bb7b9', './WebGLConstants-f7267ced', './EllipseGeometryLibrary-ce2fa88e', './GeometryAttribute-defe0105', './GeometryAttributes-52134c76', './GeometryInstance-22a5a495', './GeometryOffsetAttribute-b6810db4', './GeometryPipeline-34e9c8fc', './AttributeCompression-ec6d27e6', './EncodedCartesian3-c698f48c', './IndexDatatype-086e75a1', './IntersectionTests-2f303a79', './Plane-d89efb5b', './VertexFormat-4802f782'], (function (Matrix3, defaultValue, EllipseGeometry, Check, Math, Transforms, Matrix2, RuntimeError, combine, ComponentDatatype, WebGLConstants, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, GeometryInstance, GeometryOffsetAttribute, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, VertexFormat) { 'use strict';

  function createEllipseGeometry(ellipseGeometry, offset) {
    if (defaultValue.defined(offset)) {
      ellipseGeometry = EllipseGeometry.EllipseGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix3.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix3.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseGeometry.EllipseGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseGeometry;

}));
