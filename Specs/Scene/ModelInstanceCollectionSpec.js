/*global defineSuite*/
defineSuite([
        'Scene/ModelInstanceCollection',
        'Core/BoundingSphere',
        'Core/defaultValue',
        'Core/defined',
        'Core/Cartesian3',
        'Core/HeadingPitchRange',
        'Core/JulianDate',
        'Core/Math',
        'Core/Matrix4',
        'Core/PrimitiveType',
        'Core/Transforms',
        'Scene/Model',
        'Scene/ModelAnimationLoop',
        'Scene/SceneMode',
        'Specs/createScene',
        'Specs/pollToPromise',
        'ThirdParty/when'
    ], function(
        ModelInstanceCollection,
        BoundingSphere,
        defaultValue,
        defined,
        Cartesian3,
        HeadingPitchRange,
        JulianDate,
        CesiumMath,
        Matrix4,
        PrimitiveType,
        Transforms,
        Model,
        ModelAnimationLoop,
        SceneMode,
        createScene,
        pollToPromise,
        when) {
    "use strict";

    var boxUrl = './Data/Models/Box/CesiumBoxTest.gltf';
    var cesiumAirUrl = './Data/Models/CesiumAir/Cesium_Air.gltf';
    var riggedFigureUrl = './Data/Models/rigged-figure-test/rigged-figure-test.gltf';
    var movingBoxUrl = './Data/Models/moving-box/moving-box.gltf';

    var boxGltf;
    var cesiumAirGltf;
    var riggedFigureGltf;
    var movingBoxGltf;

    var boxRadius;

    var scene;

    beforeAll(function() {
        scene = createScene();

        var modelPromises = [];
        modelPromises.push(loadModel(boxUrl).then(function(model) {
            boxGltf = model.gltf;
            boxRadius = model.boundingSphere.radius;
            scene.primitives.remove(model);
        }));
        modelPromises.push(loadModel(cesiumAirUrl).then(function(model) {
            cesiumAirGltf = model.gltf;
            scene.primitives.remove(model);
        }));
        modelPromises.push(loadModel(riggedFigureUrl).then(function(model) {
            riggedFigureGltf = model.gltf;
            scene.primitives.remove(model);
        }));
        modelPromises.push(loadModel(movingBoxUrl).then(function(model) {
            movingBoxGltf = model.gltf;
            scene.primitives.remove(model);
        }));

        return when.all(modelPromises);
    });

    afterAll(function() {
        scene.destroyForSpecs();
    });

    afterEach(function() {
        scene.primitives.removeAll();
    });

    function loadModel(url) {
        var model = scene.primitives.add(Model.fromGltf({
            url : url
        }));

        return pollToPromise(function() {
            // Render scene to progressively load the model
            scene.renderForSpecs();
            return model.ready;
        }).then(function() {
            return model;
        });
    }

    function loadCollection(options) {
        var collection = scene.primitives.add(new ModelInstanceCollection(options));

        return pollToPromise(function() {
            // Render scene to progressively load the model
            scene.renderForSpecs();
            return collection.ready;
        }).then(function() {
            return collection;
        });
    }

    function createInstances(count, heightOffset) {
        heightOffset = defaultValue(heightOffset, 0.0);

        var spacing = 20.0;
        var centerLongitude = -123.0744619;
        var centerLatitude = 44.0503706;
        var height = 5000.0 + heightOffset;

        var instances = [];
        for (var i = 0; i < count; ++i) {
            var instanceHeight = height + spacing * i;
            var position = Cartesian3.fromDegrees(centerLongitude, centerLatitude, instanceHeight);
            var heading = Math.PI/2.0;
            var pitch = 0.0;
            var roll = 0.0;
            var modelMatrix = Transforms.headingPitchRollToFixedFrame(position, heading, pitch, roll);
            instances.push({
                modelMatrix : modelMatrix
            });
        }

        return instances;
    }

    function getBoundingVolume(instances, modelRadius) {
        var length = instances.length;
        var points = new Array(length);
        for (var i = 0; i < length; ++i) {
            var translation = new Cartesian3();
            Matrix4.getTranslation(instances[i].modelMatrix, translation);
            points[i] = translation;
        }
        var boundingSphere = new BoundingSphere();
        BoundingSphere.fromPoints(points, boundingSphere);
        boundingSphere.radius += modelRadius;
        return boundingSphere;
    }

    var centerScratch = new Cartesian3();

    function zoomTo(collection, instance) {
        var center = Matrix4.getTranslation(collection._instances[instance].modelMatrix, centerScratch);
        var camera = scene.camera;
        camera.lookAt(center, new HeadingPitchRange(0.0, 0.0, 10.0));
    }

    function verifyRender(collection, expectColor, time) {
        expectColor = defaultValue(expectColor, true);

        collection.show = false;
        expect(scene.renderForSpecs(time)).toEqual([0, 0, 0, 255]);
        collection.show = true;

        // Verify each instance
        var length = collection.length;
        for (var i = 0; i < length; ++i) {
            zoomTo(collection, i);
            if (expectColor) {
                expect(scene.renderForSpecs(time)).not.toEqual([0, 0, 0, 255]);
            } else {
                expect(scene.renderForSpecs(time)).toEqual([0, 0, 0, 255]);
            }
        }
    }

    it('throws if neither options.gltf nor options.url are provided', function() {
        expect(function() {
            return new ModelInstanceCollection();
        }).toThrowDeveloperError();
    });

    it('throws when both options.gltf and options.url are provided', function() {
        expect(function() {
            return new ModelInstanceCollection({
                url : boxUrl,
                gltf : boxGltf
            });
        }).toThrowDeveloperError();
    });

    it('sets properties', function() {
        return loadCollection({
            url : boxUrl,
            instances : createInstances(4)
        }).then(function(collection) {
            expect(collection.ready).toEqual(true);
            expect(collection.show).toEqual(true);
            expect(collection.allowPicking).toEqual(true);
            expect(collection.length).toEqual(4);
            expect(collection.debugShowBoundingVolume).toEqual(false);
            expect(collection.debugWireframe).toEqual(false);
            expect(collection._dynamic).toEqual(false);
            expect(collection._cull).toEqual(true);
            expect(collection._model).toBeDefined();
            expect(collection._model.ready).toEqual(true);
            expect(collection._model.cacheKey).toEqual(boxUrl + '#instanced');
        });
    });

    it('renders from url', function() {
        return loadCollection({
            url : boxUrl,
            instances : createInstances(4)
        }).then(function(collection) {
            verifyRender(collection);
        });
    });

    it('renders from gltf', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            verifyRender(collection);
        });
    });

    it('resolves readyPromise', function(done) {
        var collection = scene.primitives.add(new ModelInstanceCollection({
            gltf : boxGltf,
            instances : createInstances(4)
        }));

        collection.readyPromise.then(function(collection) {
            expect(collection.ready).toEqual(true);
            done();
        });

        for (var i = 0; i < 10; ++i) {
            scene.renderForSpecs();
        }
    });

    it('renders one instance', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(1)
        }).then(function(collection) {
            verifyRender(collection);
        });
    });

    it('renders zero instances', function() {
        var collection = scene.primitives.add(new ModelInstanceCollection({
            gltf : boxGltf,
            instances : createInstances(0)
        }));

        // Collection never reaches the ready state due to returning early
        for (var i = 0; i < 10; ++i) {
            verifyRender(collection, false);
            expect(collection.ready).toBe(false);
        }
    });

    it('renders 100 instances', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(100)
        }).then(function(collection) {
            verifyRender(collection);
        });
    });

    it('renders cesiumAir', function() {
        return loadCollection({
            gltf : cesiumAirGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            verifyRender(collection);
        });
    });

    it('renders rigged figure', function() {
        return loadCollection({
            gltf : riggedFigureGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            verifyRender(collection);
        });
    });

    it('renders when instancing is disabled', function() {
        // Disable extension
        var instancedArrays = scene.context._instancedArrays;
        scene.context._instancedArrays = undefined;

        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            verifyRender(collection);
            // Re-enable extension
            scene.context._instancedArrays = instancedArrays;
        });
    });

    it('renders when dynamic is true', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4),
            dynamic : true
        }).then(function(collection) {
            verifyRender(collection);
        });
    });

    it('verify bounding volume', function() {
        var instances = createInstances(4);
        return loadCollection({
            gltf : boxGltf,
            instances : instances
        }).then(function(collection) {
            var boundingVolume = getBoundingVolume(instances, boxRadius);
            expect(collection._boundingVolume.center).toEqual(boundingVolume.center);
            expect(collection._boundingVolume.radius).toEqual(boundingVolume.radius);
        });
    });

    it('renders bounding volume', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            collection.debugShowBoundingVolume = true;
            verifyRender(collection);
        });
    });

    it('renders in wireframe', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            collection.debugWireframe = true;
            scene.renderForSpecs();
            expect(collection._drawCommands[0].primitiveType).toEqual(PrimitiveType.LINES);
        });
    });

    it('renders with animations', function() {
        // All instances should be animating. The moving box is at the center on frame 1 and off to the side by frame 5.
        return loadCollection({
            gltf : movingBoxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            collection.activeAnimations.addAll();

            // Render when animation is in view
            var time = JulianDate.now();
            verifyRender(collection, true, time);

            // Render when animation is out of view
            time = JulianDate.addSeconds(time, 0.1, new JulianDate());
            verifyRender(collection, false, time);
        });
    });

    it('renders with animations when instancing is disabled', function() {
        // Instance transforms are updated differently when instancing is disabled

        // Disable extension
        var instancedArrays = scene.context._instancedArrays;
        scene.context._instancedArrays = undefined;

        return loadCollection({
            gltf : movingBoxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            collection.activeAnimations.addAll();

            // Render when animation is in view
            var time = JulianDate.now();
            verifyRender(collection, true, time);

            // Render when animation is out of view
            time = JulianDate.addSeconds(time, 0.1, new JulianDate());
            verifyRender(collection, false, time);

            // Re-enable extension
            scene.context._instancedArrays = instancedArrays;
        });
    });

    it('only renders when mode is SCENE3D', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            verifyRender(collection);
            scene.mode = SceneMode.SCENE2D;
            verifyRender(collection, false);
            scene.mode = SceneMode.SCENE3D;
        });
    });

    it('renders two model instance collections that use the same cache key', function() {
        var collections = [];
        var promises = [];

        promises.push(loadCollection({
            url : boxUrl,
            instances : createInstances(2)
        }).then(function(collection) {
            collections.push(collection);
        }));

        promises.push(loadCollection({
            url : boxUrl,
            instances : createInstances(2, 1000.0)
        }).then(function(collection) {
            collections.push(collection);
        }));

        return when.all(promises).then(function() {
            var resourcesFirst = collections[0]._model._rendererResources;
            var resourcesSecond = collections[1]._model._rendererResources;
            var name;

            expect(collections[0]._model.cacheKey).toEqual(collections[1]._model.cacheKey);
            zoomTo(collections[0], 0);
            verifyRender(collections[0]);
            zoomTo(collections[1], 0);
            verifyRender(collections[1]);

            // Check that buffers are equal
            for (name in resourcesFirst.buffers) {
                if (resourcesFirst.buffers.hasOwnProperty(name)) {
                    expect(resourcesFirst.buffers[name]).toEqual(resourcesSecond.buffers[name]);
                }
            }

            // Check that programs are equal
            for (name in resourcesFirst.programs) {
                if (resourcesFirst.programs.hasOwnProperty(name)) {
                    expect(resourcesFirst.programs[name]).toEqual(resourcesSecond.programs[name]);
                }
            }

            // Check that vertex arrays are different, since each collection has a unique vertex buffer for instanced attributes.
            for (name in resourcesFirst.vertexArrays) {
                if (resourcesFirst.vertexArrays.hasOwnProperty(name)) {
                    expect(resourcesFirst.vertexArrays[name]).not.toEqual(resourcesSecond.vertexArrays[name]);
                }
            }
        });
    });

    it('culls when out of view and cull is true', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4),
            cull : true
        }).then(function(collection) {
            scene.renderForSpecs();
            expect(scene._frustumCommandsList.length).not.toEqual(0);
            scene.camera.lookAt(new Cartesian3(100000.0, 0.0, 0.0), new HeadingPitchRange(0.0, 0.0, 10.0));
            scene.renderForSpecs();
            expect(scene._frustumCommandsList.length).toEqual(0);
        });
    });

    it('does not cull when out of view and cull is false', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4),
            cull : false
        }).then(function(collection) {
            scene.renderForSpecs();
            expect(scene._frustumCommandsList.length).not.toEqual(0);
            scene.camera.lookAt(new Cartesian3(100000.0, 0.0, 0.0), new HeadingPitchRange(0.0, 0.0, 10.0));
            scene.renderForSpecs();
            expect(scene._frustumCommandsList.length).not.toEqual(0);
        });
    });

    it('destroys', function() {
        return loadCollection({
            gltf : boxGltf,
            instances : createInstances(4)
        }).then(function(collection) {
            expect(collection.isDestroyed()).toEqual(false);
            scene.primitives.remove(collection);
            expect(collection.isDestroyed()).toEqual(true);
        });
    });
});
