define(['./PrimitivePipeline-deeb7578', './createTaskProcessorWorker', './Transforms-dd1e4b9a', './Matrix3-51afcfcb', './Check-e01dbea3', './defaultValue-040c41f9', './Math-f7bd710c', './Matrix2-3a8613cf', './RuntimeError-3c5db370', './combine-6eb6e848', './ComponentDatatype-614bb7b9', './WebGLConstants-f7267ced', './GeometryAttribute-defe0105', './GeometryAttributes-52134c76', './GeometryPipeline-34e9c8fc', './AttributeCompression-ec6d27e6', './EncodedCartesian3-c698f48c', './IndexDatatype-086e75a1', './IntersectionTests-2f303a79', './Plane-d89efb5b', './WebMercatorProjection-89a2d10a'], (function (PrimitivePipeline, createTaskProcessorWorker, Transforms, Matrix3, Check, defaultValue, Math, Matrix2, RuntimeError, combine, ComponentDatatype, WebGLConstants, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  function combineGeometry(packedParameters, transferableObjects) {
    const parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(
      packedParameters
    );
    const results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters);
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(
      results,
      transferableObjects
    );
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry);

  return combineGeometry$1;

}));
