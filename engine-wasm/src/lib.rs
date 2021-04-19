use engine::Engine;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct SegregationEngine {
    engine: Engine,
}

#[wasm_bindgen]
impl SegregationEngine {
    #[wasm_bindgen(constructor)]
    pub fn new(rows: usize, cols: usize, density: f32, similarity: f32) -> Self {
        Self {
            engine: Engine::new(rows, cols, density, similarity),
        }
    }

    pub fn get_positions(&self) -> JsValue {
        let positions = self
            .engine
            .agents
            .iter()
            .map(|o| (o.x, o.y))
            .collect::<Vec<_>>();
        JsValue::from_serde(&positions).unwrap()
    }

    pub fn get_agent_types(&self) -> JsValue {
        let types = self
            .engine
            .agents
            .iter()
            .map(|o| o.team.clone())
            .collect::<Vec<_>>();
        JsValue::from_serde(&types).unwrap()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn create_engine() {
        let _engine = SegregationEngine::new(8, 8, 0.5, 0.75);
        // #[cfg(target_arch = "wasm32")]
        // {
        //     let agent_types = engine.get_agent_types();
        //     println!("{:?}", agent_types);
        // }
    }
}
