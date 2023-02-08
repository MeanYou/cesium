/* This file is automatically rebuilt by the Cesium build process. */
define(['./Matrix2-08e4fdf4', './when-6655f883', './EllipseGeometry-c0510b0a', './RuntimeError-5f205b85', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './GeometryOffsetAttribute-834a3c02', './Transforms-e93813e8', './combine-1fd4d5cd', './EllipseGeometryLibrary-24d882bc', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './GeometryInstance-44c4b57d', './GeometryPipeline-76c71b7a', './AttributeCompression-f0abb793', './EncodedCartesian3-58e615e7', './IndexDatatype-e7458bc9', './IntersectionTests-bc616cc3', './Plane-8bcfd1cf', './VertexFormat-d4a9fb98'], (function (Matrix2, when, EllipseGeometry, RuntimeError, ComponentDatatype, WebGLConstants, GeometryOffsetAttribute, Transforms, combine, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, GeometryInstance, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, VertexFormat) { 'use strict';

  function createEllipseGeometry(ellipseGeometry, offset) {
    if (when.defined(offset)) {
      ellipseGeometry = EllipseGeometry.EllipseGeometry.unpack(ellipseGeometry, offset);
    }
    ellipseGeometry._center = Matrix2.Cartesian3.clone(ellipseGeometry._center);
    ellipseGeometry._ellipsoid = Matrix2.Ellipsoid.clone(ellipseGeometry._ellipsoid);
    return EllipseGeometry.EllipseGeometry.createGeometry(ellipseGeometry);
  }

  return createEllipseGeometry;

}));
