//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use engine_wasm::SegregationEngine;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn create_engine() {
    let engine = SegregationEngine::new(8, 8, 0.5, 0.75);
    let agent_types = engine.get_agent_types();
    let positions = engine.get_positions();
}
