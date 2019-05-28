'use strict';

const _ = require("lodash");
const assert = require('chai').assert;
const Dotenv = require('dotenv');
const fixtures = require("./fixtures.json");
const RegionService = require("./region-service");
const suite = require('mocha').suite;
const UserService = require("./user-service");

suite("Region API tests", function () {
  let regions = fixtures.regions;
  let newRegion = fixtures.newRegion;
  let newUser = fixtures.newUser;

  Dotenv.config();
  const regionService = new RegionService(process.env.BASE_URL + ':' + process.env.BASE_PORT );
  const userService = new UserService(process.env.BASE_URL + ':' + process.env.BASE_PORT );

  // BEFORE SUITE
  suiteSetup(async function() {
    await userService.deleteAll();
    await userService.authenticate(await userService.create(newUser));
  });

  // AFTER SUITE
  suiteTeardown(async function() {
    await userService.deleteAll();
    await userService.clearAuth();
  });

  // BEFORE TEST
  setup(async function() {
    await regionService.deleteAllRegions();
  });

  // AFTER TEST
  teardown(async function() {
    await regionService.deleteAllRegions();
  });

  // CREATE REGION
  test("Create a Region", async function() {
    const returnedRegion = await regionService.createRegion(newRegion);
    assert(_.some([returnedRegion], newRegion), "created region must be superset of NewRegion");
    assert.isDefined(returnedRegion._id);
  });

  // DELETE REGION
  test("Delete a Region", async function () {
    const returnedRegion = await regionService.createRegion(newRegion);
    assert.isDefined(returnedRegion._id, "created region must have id");
    let result = await regionService.deleteRegion(returnedRegion._id);
    console.log(result);
    result = await regionService.getRegion(returnedRegion._id);
    assert.isNull(result);
  });

  // DELETE REGION NOT EXISTING
  test("Delete a non-existing Region", async function() {
    let id = 123455;
    let result = await regionService.getRegion(id);
    assert.isNull(result);
    result = await regionService.deleteRegion(id);
    assert(_.some([result], {success: true}));
  });

  // DELETE ALL REGIONS
  test("Delete all Regions", async function () {
    for (let r of regions) {
      await regionService.createRegion(r);
    }
    let result = await regionService.deleteAllRegions();
    assert(_.some([result], {success: true}));
    result = await regionService.getAllRegions();
    assert.isEmpty(result);
  });

  // DELETE ALL REGIONS - NONE EXIST
  test("Delete all Regions but none exist", async function () {
    let result = await regionService.deleteAllRegions();
    console.log(result);
    assert(_.some([result], { success: true }));
  });

  // FIND ALL REGIONS
  test("Get all Regions", async function () {
    for (let r of regions) {
      await regionService.createRegion(r);
    }
    let result = await regionService.getAllRegions();
    assert(result != null);
    assert.equal(result.length, regions.length);
  });

  // FIND A REGION
  test("Get a Region", async function() {
    const p1 = await regionService.createRegion(newRegion);
    assert(p1 != null);
    let returnedRegion = await regionService.getAllRegions();
    assert.equal(returnedRegion.length, 1);
    let p2 = returnedRegion[0];
    assert(p2 != null);
    assert.isDefined(p2._id);
    assert.deepEqual(p1, p2);
  });

  // FIND REGION - NOT EXISTING
  test("Get invalid Region", async function () {
    const p1 = await regionService.getRegion("1234");
    assert.isNull(p1);
    const p2 = await regionService.getRegion("0123434343433434");
    assert.isNull(p2);
  });

  // FIND ALL REGIONS - DETAILED
  test("Get all Regions, detailed checks", async function () {
    for (let r of regions) {
      await regionService.createRegion(r);
    }
    let result = await regionService.getAllRegions();
    for (let i=0; i < regions.length; i++) {
      assert(_.some([result[i], regions[i]]), "returned Region must be superset of newRegion");
    }
  });

  // FIND ALL REGIONS - NONE EXIST
  test("Get all Region none exist", async function () {
    const result = await regionService.getAllRegions();
    assert.equal(result.length, 0);
  });
});