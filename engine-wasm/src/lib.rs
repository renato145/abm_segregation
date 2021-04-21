use engine::Engine;
use serde::Serialize;
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

    pub fn n_agents(&self) -> usize {
        self.engine.n_agents()
    }

    pub fn n_unhappy(&self) -> usize {
        self.engine.n_unhappy()
    }

    pub fn get_similar_nearby_ratio(&self) -> f32 {
        self.engine.get_similar_nearby_ratio()
    }

    pub fn get_positions(&self) -> TPositions {
        let positions = self
            .engine
            .agents
            .iter()
            .map(|o| (o.x, o.y))
            .collect::<Vec<_>>();
        JsValue::from_serde(&positions).unwrap().into()
    }

    pub fn get_agent_types(&self) -> TAgentType {
        let types = self
            .engine
            .agents
            .iter()
            .map(|o| o.team.clone())
            .collect::<Vec<_>>();
        JsValue::from_serde(&types).unwrap().into()
    }

    pub fn step(&mut self) -> TStepReport {
        let (similar_nearby_ratio, n_unhappy) = self.engine.step();
        let report = StepReport {
            similar_nearby_ratio,
            n_unhappy,
            finished: self.engine.finished,
        };
        JsValue::from_serde(&report).unwrap().into()
    }

    pub fn set_similarity(&mut self, similarity: f32) {
        self.engine.similarity = similarity;
    }
}

#[wasm_bindgen(typescript_custom_section)]
const CustomTSTypes: &'static str = r#"
export type TPositions = number[][];

export type TAgentType = ("Man1" | "Man2")[];

export interface TStepReport {
    similar_nearby_ratio: number;
    n_unhappy: number;
    finished: boolean;
}"#;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(typescript_type = "TPositions")]
    pub type TPositions;

    #[wasm_bindgen(typescript_type = "TAgentType")]
    pub type TAgentType;

    #[wasm_bindgen(typescript_type = "TStepReport")]
    pub type TStepReport;
}

#[derive(Serialize)]
struct StepReport {
    similar_nearby_ratio: f32,
    n_unhappy: usize,
    finished: bool,
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
