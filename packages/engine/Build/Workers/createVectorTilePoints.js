define(['./AttributeCompression-ec6d27e6', './Matrix3-51afcfcb', './Math-f7bd710c', './Matrix2-3a8613cf', './createTaskProcessorWorker', './ComponentDatatype-614bb7b9', './defaultValue-040c41f9', './Check-e01dbea3', './WebGLConstants-f7267ced', './RuntimeError-3c5db370'], (function (AttributeCompression, Matrix3, Math, Matrix2, createTaskProcessorWorker, ComponentDatatype, defaultValue, Check, WebGLConstants, RuntimeError) { 'use strict';

  const maxShort = 32767;

  const scratchBVCartographic = new Matrix3.Cartographic();
  const scratchEncodedPosition = new Matrix3.Cartesian3();

  const scratchRectangle = new Matrix2.Rectangle();
  const scratchEllipsoid = new Matrix3.Ellipsoid();
  const scratchMinMaxHeights = {
    min: undefined,
    max: undefined,
  };

  function unpackBuffer(packedBuffer) {
    packedBuffer = new Float64Array(packedBuffer);

    let offset = 0;
    scratchMinMaxHeights.min = packedBuffer[offset++];
    scratchMinMaxHeights.max = packedBuffer[offset++];

    Matrix2.Rectangle.unpack(packedBuffer, offset, scratchRectangle);
    offset += Matrix2.Rectangle.packedLength;

    Matrix3.Ellipsoid.unpack(packedBuffer, offset, scratchEllipsoid);
  }

  function createVectorTilePoints(parameters, transferableObjects) {
    const positions = new Uint16Array(parameters.positions);

    unpackBuffer(parameters.packedBuffer);
    const rectangle = scratchRectangle;
    const ellipsoid = scratchEllipsoid;
    const minimumHeight = scratchMinMaxHeights.min;
    const maximumHeight = scratchMinMaxHeights.max;

    const positionsLength = positions.length / 3;
    const uBuffer = positions.subarray(0, positionsLength);
    const vBuffer = positions.subarray(positionsLength, 2 * positionsLength);
    const heightBuffer = positions.subarray(
      2 * positionsLength,
      3 * positionsLength
    );
    AttributeCompression.AttributeCompression.zigZagDeltaDecode(uBuffer, vBuffer, heightBuffer);

    const decoded = new Float64Array(positions.length);
    for (let i = 0; i < positionsLength; ++i) {
      const u = uBuffer[i];
      const v = vBuffer[i];
      const h = heightBuffer[i];

      const lon = Math.CesiumMath.lerp(rectangle.west, rectangle.east, u / maxShort);
      const lat = Math.CesiumMath.lerp(rectangle.south, rectangle.north, v / maxShort);
      const alt = Math.CesiumMath.lerp(minimumHeight, maximumHeight, h / maxShort);

      const cartographic = Matrix3.Cartographic.fromRadians(
        lon,
        lat,
        alt,
        scratchBVCartographic
      );
      const decodedPosition = ellipsoid.cartographicToCartesian(
        cartographic,
        scratchEncodedPosition
      );
      Matrix3.Cartesian3.pack(decodedPosition, decoded, i * 3);
    }

    transferableObjects.push(decoded.buffer);

    return {
      positions: decoded.buffer,
    };
  }
  var createVectorTilePoints$1 = createTaskProcessorWorker(createVectorTilePoints);

  return createVectorTilePoints$1;

}));
