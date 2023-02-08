/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-6655f883', './PrimitivePipeline-a1543c73', './createTaskProcessorWorker', './Transforms-e93813e8', './Matrix2-08e4fdf4', './RuntimeError-5f205b85', './ComponentDatatype-579b2047', './WebGLConstants-cf1206a6', './combine-1fd4d5cd', './GeometryAttribute-8b47e4d3', './GeometryAttributes-2b1b6e3f', './GeometryPipeline-76c71b7a', './AttributeCompression-f0abb793', './EncodedCartesian3-58e615e7', './IndexDatatype-e7458bc9', './IntersectionTests-bc616cc3', './Plane-8bcfd1cf', './WebMercatorProjection-40d158aa'], (function (when, PrimitivePipeline, createTaskProcessorWorker, Transforms, Matrix2, RuntimeError, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  /* global require */

  var moduleCache = {};

  function getModule(moduleName) {
    var module = moduleCache[moduleName];
    if (!when.defined(module)) {
      if (typeof exports === "object") {
        // Use CommonJS-style require.
        moduleCache[module] = module = require("Workers/" + moduleName);
      } else {
        // Use AMD-style require.
        // in web workers, require is synchronous
        require(["Workers/" + moduleName], function (f) {
          module = f;
          moduleCache[module] = f;
        });
      }
    }
    return module;
  }

  function createGeometry(parameters, transferableObjects) {
    var subTasks = parameters.subTasks;
    var length = subTasks.length;
    var resultsOrPromises = new Array(length);

    for (var i = 0; i < length; i++) {
      var task = subTasks[i];
      var geometry = task.geometry;
      var moduleName = task.moduleName;

      if (when.defined(moduleName)) {
        var createFunction = getModule(moduleName);
        resultsOrPromises[i] = createFunction(geometry, task.offset);
      } else {
        //Already created geometry
        resultsOrPromises[i] = geometry;
      }
    }

    return when.when.all(resultsOrPromises, function (results) {
      return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(
        results,
        transferableObjects
      );
    });
  }
  var createGeometry$1 = createTaskProcessorWorker(createGeometry);

  return createGeometry$1;

}));
