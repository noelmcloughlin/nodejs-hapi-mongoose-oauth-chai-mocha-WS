'use strict';

// "https://wit-hdip-comp-sci-2018-donation-web-3.glitch.me"

const _ = require("lodash");
const suite = require('mocha').suite;
const assert = require('chai').assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

suite("Points of Interest API tests", function () {

  let pois = fixtures.pois;
  let regions = fixtures.regions;
  let newPoi = fixtures.newPoi;
  let newRegion = fixtures.newRegion;
  let region_id;

  const poisService = new PoiService("http://localhost:3000");

  // BEFORE SOME TESTS

  async function setup_some() {
    let result = await poisService.createRegion(fixtures.dummyRegion);
    assert.isDefined(result._id);
    region_id = result._id;
    newPoi.costalZone = pois[0].costalZone = pois[1].costalZone = region_id;
  };

  // BEFORE EACH TEST

  setup(async function() {
    await poisService.deleteAll();
    await poisService.deleteAllRegions();
  });

  // AFTER TEST
  teardown(async function() {
    await poisService.deleteAll();
  });

  // CREATE REGION

  test("Create a Region", async function() {
    const returnedRegion = await poisService.createRegion(newRegion);
    assert(_.some([returnedRegion], newRegion), "created region must be superset of NewRegion");
    assert.isDefined(returnedRegion._id);
  });

  // DELETE REGION

  test("Delete a Region", async function () {
    const returnedRegion = await poisService.createRegion(newRegion);
    assert.isDefined(returnedRegion._id, "created region must have id");
    let result = await poisService.deleteRegion(returnedRegion._id);
    result = await poisService.getRegion(returnedRegion._id);
    assert.isNull(result);
  });

  // DELETE REGION NOT EXISTING

  test("Delete a non-existing Region", async function() {
    let id = 123455
    let result = await poisService.getRegion(id);
    assert.equal(result, null);
    result = await poisService.deleteRegion(id);
    assert(_.some([result], {success: true}));
  });

  // DELETE ALL REGION

  test("Delete all Regions", async function () {
    for (let r of regions) {
      await poisService.createRegion(r);
    }
    let result = await poisService.deleteAllRegions();
    assert(result != null, "delete result should not be null");
    result = await poisService.getAllRegions();
    assert.isEmpty(result);
  });

  // DELETE ALL REGION NONE EXIST

  test("Delete all Regions but none exist", async function () {
    await setup_some();
    await poisService.deleteRegion(region_id);
    let result = await poisService.deleteAllRegions();
    assert(_.some([result], { success: true }));
  });

  // FIND ALL REGIONS

  test("Get all Regions", async function () {
    for (let r of regions) {
      await poisService.createRegion(r);
    }
    let result = await poisService.getAllRegions();
    assert(result != null);
    assert.equal(result.length, regions.length);
  });

  // FIND A REGION

  test("Get a Region", async function() {
    const p1 = await poisService.createRegion(newRegion);
    assert(p1 != null);
    let returnedRegion = await poisService.getAllRegions();
    assert.equal(returnedRegion.length, 1);
    let p2 = returnedRegion[0];
    assert(p2 != null);
    assert.isDefined(p2._id);
    assert.deepEqual(p1, p2);
  });

  // FIND REGION NOT EXIST

  test("Get invalid Region", async function () {
    const p1 = await poisService.getRegion("1234");
    assert.isNull(p1);
    const p2 = await poisService.getRegion("0123434343433434");
    assert.isNull(p2);
  });

  // FIND ALL REGION DETAILED

  test("Get all Regions, detailed checks", async function () {
    for (let r of regions) {
      await poisService.createRegion(r);
    }
    let result = await poisService.getAllRegions();
    for (let i=0; i < pois.length; i++) {
      assert(_.some([result[i], pois[i]]), "returned Region must be superset of newRegion");
    }
  });

  // FIND ALL REGION NOT EXIST

  test("Get all Region none exist", async function () {
    await setup_some();
    await poisService.deleteRegion(region_id);
    const result = await poisService.getAllRegions();
    assert.equal(result.length, 0);
  });


  // CREATE POI

  test("Create a POI", async function() {
    await setup_some();
    const returnedPoi = await poisService.create(region_id, newPoi);
    assert(returnedPoi != null, "created poi cannot be null");
    console.log(newPoi);
    console.log(returnedPoi);
    assert(_.some([returnedPoi], newPoi), "created poi must be superset of NewPoi");
    assert.isDefined(returnedPoi._id, "created poi must have id");
  });

  // DELETE ONE POI

  test("Delete a POI", async function () {
    await setup_some();
    let result = await poisService.create(region_id, newPoi);
    assert(result._id != null, 'create result should have id');
    await poisService.delete(region_id, result._id);
    result = await poisService.get(region_id, result._id);
    assert(result == null);
  });

  // DELETE POI NOT EXISTING

  test("Delete a non-existing POI", async function() {
    await setup_some();
    let id = 12345;
    let result = await poisService.get(region_id, id);
    assert(result == null, "get should be null");
    result = await poisService.delete(region_id, id);
    assert(_.some([result], {success: true}));
  });

  // DELETE ALL POI

  test("Delete all POI", async function () {
    await setup_some();
    let result;
    for (let p of pois) {
      await poisService.create(region_id, p);
      result = p;
    }
    result = await poisService.deleteAll(region_id);
    assert(_.some([result], { success: true }));
    result = await poisService.get(region_id, result._id);
    assert.isNull(result);
  });

  // DELETE ALL POI NONE EXIST

  test("Delete all POI, none exist", async function () {
    await setup_some();
    let result = await poisService.deleteAll(region_id);
    assert(_.some([result], { success: true }));
    result = await poisService.get(region_id, result._id);
    assert.isNull(result);
  });

  // FIND ONE

  test("Get a POI", async function() {
    await setup_some();
    const p1 = await poisService.create(region_id, newPoi);
    assert(p1 != null);
    const p2 = await poisService.get(region_id, p1._id);
    assert(p2 != null);
    assert.deepEqual(p1, p2);
  });

  // FIND ALL POI

  test("Get all POI", async function () {
    await setup_some();
    let result;
    for (let p of pois) {
      await poisService.create(region_id, p);
    }
    result = await poisService.getAll(region_id);
    assert(result != null);
    assert.equal(result.length, pois.length);
  });

  // FIND POI INVALID

  test("Get invalid POI", async function () {
    await setup_some();
    const p1 = await poisService.get(region_id,"1234");
    assert.isNull(p1);
    const p2 = await poisService.get(region_id, "0123434343433434");
    assert.isNull(p2);
  });

  // FIND ALL POI DETAIL

  test("Get all POI detail", async function () {
    await setup_some();
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
    await setup_some();
    const result = await poisService.getAll(region_id);
    assert.equal(result.length, 0);
  });

});


