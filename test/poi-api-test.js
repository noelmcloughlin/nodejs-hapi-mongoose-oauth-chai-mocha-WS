'use strict';

// "https://wit-hdip-comp-sci-2018-donation-web-3.glitch.me"

const _ = require("lodash");
const suite = require('mocha');
const { assert: assert1 } = require("chai");
const assert = assert1;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");

suite("Points of Interest API tests", function () {

  let pois = fixtures.pois;
  let regions = fixtures.regions;
  let newPoi = fixtures.newPoi;
  let newRegion = fixtures.newRegion;
  let region_id;

  const poisService = new PoiService("http://localhost:4000");

  // BEFORE TEST
  setup(async function() {
    await poisService.deleteAll();
    await poisService.deleteAllRegions();
    await poisService.createRegion(fixtures.setupRegion);
    let region = await poisService.getAllRegions();
    region_id = region[0]._id;
    newRegion.costalZone = region_id;
  });

  // AFTER TEST
  teardown(async function() {
    await poisService.deleteAll();
  });


  // CREATE REGION

  test("Create a Region", async function() {
    const returnedRegion = await poisService.createRegion(newRegion);
    assert(returnedRegion != null, "created region cannot be null");
    assert(_.some([returnedRegion], newRegion), "created region must be superset of NewRegion");
    assert.isDefined(returnedRegion._id, "created region must have id");
  });

  // CREATE REGION DUPLICATE

  test("Create a duplicate Region", async function() {
    const returnedRegion = await poisService.createRegion(newRegion);
    assert.isDefined(returnedRegion._id, "created region must have id");
    let result = await poisService.createRegion(newRegion);
    assert.isNull(result);
  });

  // DELETE REGION

  test("Delete a Region", async function () {
    const returnedRegion = await poisService.createRegion(newRegion);
    assert.isDefined(returnedRegion._id, "created region must have id");
    let result = await poisService.deleteRegion(returnedRegion._id);
    assert(result != null, "delete should not be null");
    result = await poisService.getRegion(returnedRegion._id);
    assert.isNull(result);
  });

  // DELETE REGION NOT EXISTING

  test("Delete a non-existing Region", async function() {
    let result = await poisService.getRegion('123455');
    assert(result == null, "delete result should be null");
    result = await poisService.deleteRegion('123455');
    assert.isNull(result);
  });

  // DELETE ALL REGION

  test("Delete all Regions", async function () {
    for (let r of regions) {
      await poisService.createRegion(r);
    }
    let result = await poisService.deleteAllRegions();
    assert(result != null, "delete result should not be null");
    result = await poisService.getAllRegions();
    assert.isNull(result);
  });

  // DELETE ALL REGION NONE EXIST

  test("Delete all Regions but none exist", async function () {
    await poisService.deleteRegion(region_id);
    let result = await poisService.deleteAllRegions();
    assert.isNull(result);
  });

  // FIND REGION

  test("Get a Region", async function() {
    const p1 = await poisService.createRegion(newRegion);
    assert(p1 != null);
    const p2 = await poisService.getRegion(p1._id);
    assert(p2 != null);
    assert.deepEqual(p1, p2);
  });

  // FIND ALL REGION

  test("Get all Region", async function () {
    for (let r of regions) {
      await poisService.createRegion(r);
    }
    let result = await poisService.getAll();
    assert(result != null);
    assert.equal(result.length, regions.length);
  });

  // FIND REGION INVALID

  test("Get invalid Region", async function () {
    const p1 = await poisService.getRegion("1234");
    assert.isNull(p1);
    const p2 = await poisService.getRegion("0123434343433434");
    assert.isNull(p2);
  });

  // FIND ALL REGION DETAILED

  test("Get all REGION detail", async function () {
    for (let r of regions) {
      await poisService.createRegion(r);
    }
    let result = await poisService.getAllRegions();
    for (let i=0; i < pois.length; i++) {
      assert(_.some([result[i], pois[i]]), "returned Region must be superset of newRegion");
    }
  });

  // FIND ALL REGION NONE EXIST

  test("Get all REGION none exist", async function () {
    await poisService.deleteRegion(region_id);
    const allRegions = await poisService.getAllRegions();
    assert.equal(allRegions.length, 0);
  });


  // CREATE POI

  test("Create a POI", async function() {
    const returnedPoi = await poisService.create(region_id, newPoi);
    assert(returnedPoi != null, "created poi cannot be null");
    assert(_.some([returnedPoi], newPoi), "created poi must be superset of NewPoi");
    assert.isDefined(returnedPoi._id, "created poi must have id");
  });

  // CREATE POI DUPLICATE

  test("Create a duplicate POI", async function() {
    const returnedPoi = await poisService.create(newPoi);
    assert(_.some([returnedPoi], newPoi), "created poi must be superset of NewPoi");
    assert.isDefined(returnedPoi._id, "created poi must have id");
    let result = await poisService.create(region_id, newPoi);
    assert(result == null, "create result should be null");
  });

  // DELETE ONE POI

  test("Delete a POI", async function () {
    let result = await poisService.create(region_id, newPoi);
    assert(result._id != null, 'create result should have id');
    await poisService.delete(region_id, result._id);
    result = await poisService.get(region_id, result._id);
    assert(result == null);
  });

  // DELETE POI NOT EXISTING

  test("Delete a non-existing POI", async function() {
    let result = await poisService.get(region_id, '12345');
    assert(result == null, "get should be null");
    result = await poisService.delete(region_id, result._id);
    assert(result == null, "delete result should be null");
  });

  // DELETE ALL POI

  test("Delete all POI", async function () {
    let result;
    for (let p of pois) {
      await poisService.create(region_id, p);
      result = p;
    }
    await poisService.deleteAll(region_id);
    result = await poisService.get(region_id, result._id);
    assert(result == null);
  });

  // DELETE ALL POI NONE EXIST

  test("Delete all POI, none existing", async function () {
    let result = await poisService.deleteAll(region_id);
    assert(result == null);
  });

  // FIND ONE

  test("Get a POI", async function() {
    const p1 = await poisService.create(region_id, newPoi);
    assert(p1 != null);
    const p2 = await poisService.get(region_id, p1._id);
    assert(p2 != null);
    assert.deepEqual(p1, p2);
  });

  // FIND ALL POI

  test("Get all POI", async function () {
    let result;
    for (let p of pois) {
      await poisService.create(region_id, p);
    }
    result = await poisService.getAll();
    assert(result != null);
    assert.equal(result.length, pois.length);
  });

  // FIND POI INVALID

  test("Get invalid POI", async function () {
    const p1 = await poisService.get(region_id,"1234");
    assert.isNull(p1);
    const p2 = await poisService.get(region_id, "0123434343433434");
    assert.isNull(p2);
  });

  // FIND ALL POI DETAIL

  test("Get all POI detail", async function () {
    let result;
    for (let c of pois) {
      await poisService.create(region_id, c);
    }
    result = await poisService.get();
    for (let i=0; i < pois.length; i++) {
      assert(_.some([result[i], pois[i]]), "returned Poi must be superset of newPoi");
    }
  });

  // FIND ALL POI NONE EXIST

  test("Get all POI none exist", async function () {
    const allPois = await poisService.get();
    assert.equal(allPois.length, 0);
  });

});


