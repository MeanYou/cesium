import Check from "./Check.js";
import Event from "./Event.js";
import createWorldTerrainAsync from "./createWorldTerrainAsync.js";

async function handlePromise(instance, promise) {
  try {
    const provider = await Promise.resolve(promise);

    instance._provider = provider;
    instance._readyEvent.raiseEvent(provider);
  } catch (error) {
    if (instance._errorEvent.numberOfListeners > 0) {
      instance._errorEvent.raiseEvent(error);
    } else {
      console.error(error);
    }
  }
}

/**
 * A helper function to manage async creation of a terrain provider.
 *
 * @alias TileProviderManager TODO: Naming
 * @constructor
 *
 * @see createWorldTerrainAsync
 * @see CesiumTerrainProvider
 * @see VRTheWorldTerrainProvider
 * @see GoogleEarthEnterpriseTerrainProvider
 *
 * TODO: Examples
 *
 * @param {Promise<TerrainProvider>} A promise which resolves to a terrain provider
 */
function TileProviderManager(providerPromise) {
  //>>includeStart('debug', pragmas.debug);
  Check.typeOf.object("providerPromise", providerPromise);
  //>>includeEnd('debug');

  this._provider = undefined;
  this._errorEvent = new Event();
  this._tileErrorEvent = new Event(); // TODO: bubble up errors?
  this._readyEvent = new Event();

  handlePromise(this, providerPromise);
}

Object.defineProperties(TileProviderManager.prototype, {
  /**
   * Gets an event that is raised when the terrain provider encounters an asynchronous error.  By subscribing
   * to the event, you will be notified of the error and can potentially recover from it.  Event listeners
   * are passed an instance of {@link TileProviderError}.
   * @memberof TerrainProvider.prototype
   * @type {Event<TerrainProvider.ErrorEvent>}
   * @readonly
   */
  errorEvent: {
    get: function () {
      return this._errorEvent;
    },
  },

  /**
   * Gets an event that is raised when the terrain provider encounters an asynchronous error.  By subscribing
   * to the event, you will be notified of the error and can potentially recover from it.  Event listeners
   * are passed an instance of {@link TerrainProvider}.
   * @memberof TerrainProvider.prototype
   * @type {Event<TerrainProvider.ReadyEvent>}
   * @readonly
   */
  readyEvent: {
    get: function () {
      return this._readyEvent;
    },
  },

  provider: {
    get: function () {
      return this._provider;
    },
  },

  tileErrorEvent: {
    get: function () {
      return this._tileErrorEvent;
    },
  },
});
/**
 * Creates a {@link TileProviderManager} instance for the {@link https://cesium.com/content/#cesium-world-terrain|Cesium World Terrain}.
 *
 * @function
 *
 * @param {Object} [options] Object with the following properties:
 * @param {Boolean} [options.requestVertexNormals=false] Flag that indicates if the client should request additional lighting information from the server if available.
 * @param {Boolean} [options.requestWaterMask=false] Flag that indicates if the client should request per tile water masks from the server if available.
 * @returns {<TileProviderManager>} A promise that resolves to the created CesiumTerrainProvider
 *
 * @see Ion
 *
 * @example
 * // Create Cesium World Terrain with default settings
 * const viewer = new Cesium.Viewer("cesiumContainer", {
 *   terrainProvider: TileProviderManager.fromWorldTerrain()
 * });
 *
 * @example
 * // Create Cesium World Terrain with water and normals.
 * const viewer1 = new Cesium.Viewer("cesiumContainer", {
 *   terrainProvider: TileProviderManager.fromWorldTerrain({
 *      requestWaterMask: true,
 *      requestVertexNormals: true
 *    });
 * });
 *
 * @example
 * // Handle loading events
 * const providerManager = TileProviderManager.fromWorldTerrain();
 *
 * providerManager.readyEvent.addEventListener(provider => {
 *   viewer.terrainProvider = provider;
 *   viewer.scene.globe.enableLighting = true;
 * });
 *
 * providerManager.errorEvent.addEventListener(error => {
 *   alert(`Encountered and error while loading terrain! ${error}`);
 * });
 */
TileProviderManager.fromWorldTerrain = function (options) {
  return new TileProviderManager(createWorldTerrainAsync(options));
};

/**
 * A function that is called when an error occurs.
 * @callback TileProviderManager.ErrorEvent
 *
 * @this TileProviderManager
 * @param {Error} err An object holding details about the error that occurred.
 */

/**
 * A function that is called when the provider has been created
 * @callback TileProviderManager.ReadyEvent
 *
 * @this TileProviderManager
 * @param {TerrainProvider} provider The created terrain provider.
 */

export default TileProviderManager;
