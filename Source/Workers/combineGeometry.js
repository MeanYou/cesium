/* This file is automatically rebuilt by the Cesium build process. */
define(['./PrimitivePipeline-a1543c73', './createTaskProcessorWorker', './Transforms-e93813e8', './Matrix2-08e4fdf4', './RuntimeError-5f205b85', './when-6655f883', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './combine-1fd4d5cd', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './GeometryPipeline-76c71b7a', './AttributeCompression-f0abb793', './EncodedCartesian3-58e615e7', './IndexDatatype-e7458bc9', './IntersectionTests-bc616cc3', './Plane-8bcfd1cf', './WebMercatorProjection-40d158aa'], (function (PrimitivePipeline, createTaskProcessorWorker, Transforms, Matrix2, RuntimeError, when, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  function combineGeometry(packedParameters, transferableObjects) {
    var parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(
      packedParameters
    );
    var results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters);
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(
      results,
      transferableObjects
    );
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry);

  return combineGeometry$1;

}));
