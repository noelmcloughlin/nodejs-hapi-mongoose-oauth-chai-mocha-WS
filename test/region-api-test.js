'use strict';

const _ = require("lodash");
const suite = require('mocha').suite;
const assert = require('chai').assert;
const Dotenv = require('dotenv');
const RegionService = require("./region-service");
const fixtures = require("./fixtures.json");

suite("Region API tests", function () {

  let regions = fixtures.regions;
  let newRegion = fixtures.newRegion;

  Dotenv.config();
  const regionService = new RegionService(process.env.BASE_URL + ':' + process.env.BASE_URL_PORT );

  // BEFORE TEST
  setup(async function() {
    await regionService.deleteAll();
  });

  // AFTER TEST
  teardown(async function() {
    await regionService.deleteAll();
  });

  // CREATE REGION
  test("Create a Region", async function() {
    const returnedRegion = await regionService.create(newRegion);
    assert(_.some([returnedRegion], newRegion), "created region must be superset of NewRegion");
    assert.isDefined(returnedRegion._id);
  });

  // DELETE REGION
  test("Delete a Region", async function () {
    const returnedRegion = await regionService.create(newRegion);
    assert.isDefined(returnedRegion._id, "created region must have id");
    await regionService.delete(returnedRegion._id);
    let result = await regionService.get(returnedRegion._id);
    assert.isNull(result);
  });

  // DELETE REGION NOT EXISTING
  test("Delete a non-existing Region", async function() {
    let id = 123455;
    let result = await regionService.get(id);
    assert.isNull(result);
    result = await regionService.delete(id);
    assert.isNull(result);
    //assert(_.some([result], {success: true}));
  });

  // DELETE ALL REGIONS
  test("Delete all Regions", async function () {
    for (let r of regions) {
      await regionService.create(r);
    }
    let result = await regionService.deleteAll();
    assert(result != null, "delete result should not be null");
    result = await regionService.getAll();
    assert.isEmpty(result);
  });

  // DELETE ALL REGIONS - NONE EXIST
  test("Delete all Regions but none exist", async function () {
    let result = await regionService.deleteAll();
    assert(_.some([result], { success: true }));
  });

  // FIND ALL REGIONS
  test("Get all Regions", async function () {
    for (let r of regions) {
      await regionService.create(r);
    }
    let result = await regionService.getAll();
    assert(result != null);
    assert.equal(result.length, regions.length);
  });

  // FIND A REGION
  test("Get a Region", async function() {
    const p1 = await regionService.create(newRegion);
    assert(p1 != null);
    let returnedRegion = await regionService.getAll();
    assert.equal(returnedRegion.length, 1);
    let p2 = returnedRegion[0];
    assert(p2 != null);
    assert.isDefined(p2._id);
    assert.deepEqual(p1, p2);
  });

  // FIND REGION - NOT EXISTING
  test("Get invalid Region", async function () {
    const p1 = await regionService.get("1234");
    assert.isNull(p1);
    const p2 = await regionService.get("0123434343433434");
    assert.isNull(p2);
  });

  // FIND ALL REGIONS - DETAILED
  test("Get all Regions, detailed checks", async function () {
    for (let r of regions) {
      await regionService.create(r);
    }
    let result = await regionService.getAll();
    for (let i=0; i < regions.length; i++) {
      assert(_.some([result[i], regions[i]]), "returned Region must be superset of newRegion");
    }
  });

  // FIND ALL REGIONS - NONE EXIST
  test("Get all Region none exist", async function () {
    const result = await regionService.getAll();
    assert.equal(result.length, 0);
  });
});