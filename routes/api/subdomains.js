/*
 * Version		: 0.0.1
 * Description	: All routes for "/subdomains/..."
 *
 */

"use strict";


const path = require('path');
const router = require('express').Router();

const sobdomains = require(path.resolve(CONTROLLER_DIR, 'subdomains'));
const gateways = require(path.resolve(CONTROLLER_DIR, 'gateways'));
const rbac = require(path.resolve(CONTROLLER_DIR, 'rbac'));

router.get("/", rbac.setContext, sobdomains.read);  // get all subdomains
router.get("/:subdomain_id", rbac.setContext, sobdomains.read);  // get subdomain by id

router.post("/:subdomain_id/gateways", rbac.setContext, gateways.create);  // create gateway 
router.get("/:subdomain_id/gateways", rbac.setContext, gateways.read);  // get gateways for subdomain id
router.get("/:subdomain_id/gateways/:gateway_id", rbac.setContext, gateways.read);  // get gateway by id

module.exports = router;