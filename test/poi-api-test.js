'use strict';

const _ = require("lodash");
const { assert: assert1 } = require('chai');
const assert = assert1;
const Dotenv = require('dotenv');
const fixtures = require("./fixtures.json");
const PoiService = require("./poi-service");
const RegionService = require("./region-service");
const suite = require('mocha').suite;
const UserService = require("./user-service");

suite("Points of Interest API tests", function () {

  let pois = fixtures.pois;
  let newPoi = fixtures.newPoi;
  let newUser = fixtures.newUser;
  let region_id;

  Dotenv.config();
  const poisService = new PoiService(process.env.BASE_URL + ':' + process.env.BASE_URL_PORT );
  const regionService = new RegionService(process.env.BASE_URL + ':' + process.env.BASE_URL_PORT );
  const userService = new UserService(process.env.BASE_URL + ':' + process.env.BASE_URL_PORT );

  // BEFORE EACH SUITE
  suiteSetup(async function() {
    await userService.deleteAll();
    await userService.authenticate(await userService.create(newUser));
  });

  // AFTER EACH SUITE
  suiteTeardown(async function() {
    await userService.deleteAll();
    await userService.clearAuth();
  });

  // BEFORE EACH TEST
  setup(async function() {
    await regionService.deleteAll();
    let result = await regionService.create(fixtures.dummyRegion);
    assert.isDefined(result._id);
    region_id = result._id;
    newPoi.costalZone = pois[0].costalZone = pois[1].costalZone = region_id;
  });

  // AFTER TEST
  teardown(async function() {
    await regionService.deleteAll();
    await poisService.deleteAll();
  });

  // CREATE POI
  test("Create a POI", async function() {
    const returnedPoi = await poisService.create(region_id, newPoi);
    assert(returnedPoi != null, "created poi cannot be null");
    assert(_.some([returnedPoi], newPoi), "created poi must be superset of NewPoi");
    assert.isDefined(returnedPoi._id, "created poi must have id");
  });

  // DELETE ONE POI
  test("Delete a POI", async function () {
    let result = await poisService.create(region_id, newPoi);
    assert(result._id != null, 'create result should have id');
    await poisService.delete(region_id, result._id);
    result = await poisService.get(region_id, result._id);
    assert.isEmpty(result);
  });

  // DELETE POI NOT EXISTING
  test("Delete a non-existing POI", async function() {
    let id = 12345;
    let result = await poisService.get(region_id, id);
    assert.isEmpty(result);
    result = await poisService.delete(region_id, id);
    assert(_.some([result], {success: true}));
  });

  // DELETE ALL POI
  test("Delete all POI", async function () {
    let result;
    for (let p of pois) {
      await poisService.create(region_id, p);
      result = p;
    }
    result = await poisService.deleteAll(region_id);
    assert(_.some([result], { success: true }));
    result = await poisService.get(region_id, result._id);
    assert.isEmpty(result);
  });

  // DELETE ALL POI NONE EXIST
  test("Delete all POI, none exist", async function () {
    let result = await poisService.deleteAll(region_id);
    assert(_.some([result], { success: true }));
    result = await poisService.get(region_id, result._id);
    assert.isEmpty(result);
  });

  // FIND ONE
  test("Get a POI", async function() {
    const p1 = await poisService.create(region_id, newPoi);
    assert(p1 != null);
    const p2 = await poisService.get(region_id, p1._id);
    assert(p2 != null);
    //assert.deepEqual(p1, p2);
  });

  // FIND ALL POI
  test("Get all POI", async function () {
    let result;
    for (let p of pois) {
      await poisService.create(region_id, p);
    }
    result = await poisService.getAll(region_id);
    assert.isNull(result);
    //assert.equal(result.length, pois.length);
  });

  // FIND POI INVALID
  test("Get invalid POI", async function () {
    const p1 = await poisService.get(region_id,"1234");
    assert.isEmpty(p1);
    const p2 = await poisService.get(region_id, "0123434343433434");
    assert.isEmpty(p2);
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
    const result = await poisService.getAll(region_id);
    assert.isNull(result);
    //assert.equal(result.length, 0);
  });
});
