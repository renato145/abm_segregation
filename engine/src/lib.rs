use serde::Serialize;
use rand::prelude::{IteratorRandom, Rng, ThreadRng};

#[derive(Debug)]
pub struct Engine {
    pub rows: usize,
    pub cols: usize,
    pub density: f32,
    pub similarity: f32,
    pub agents: Vec<Agent>,
    rng: ThreadRng,
}

impl Engine {
    pub fn new(rows: usize, cols: usize, density: f32, similarity: f32) -> Self {
        let size = rows * cols;
        let n_agents = (size as f32 * density).round() as usize;
        let mut rng = rand::thread_rng();
        let agents = (0..size)
            .choose_multiple(&mut rng, n_agents)
            .into_iter()
            .map(|i| Agent::new(i % rows, i / rows, &mut rng))
            .collect();

        Self {
            rows,
            cols,
            density,
            similarity,
            agents,
            rng,
        }
    }

    pub fn n_agents(&self) -> usize {
        self.agents.len()
    }

    pub fn setup(&mut self) {
        todo!()
    }

    pub fn step(&mut self) {
        todo!()
    }
}

#[derive(Debug)]
pub struct Agent {
    pub x: usize,
    pub y: usize,
    pub team: AgentType,
}

impl Agent {
    /// Creates a new `Agent` with a random `AgentType`.
    pub fn new(x: usize, y: usize, rng: &mut ThreadRng) -> Self {
        Self {
            x,
            y,
            team: AgentType::new_random(rng),
        }
    }
}

#[derive(Serialize, Debug, Clone)]
pub enum AgentType {
    Man1,
    Man2,
    // Woman1,
    // Woman2,
}

impl AgentType {
    fn new_random(rng: &mut ThreadRng) -> Self {
        match rng.gen_range(0..=2) {
            0 => AgentType::Man1,
            _ => AgentType::Man2,
            // 2 => AgentType::Woman1,
            // _ => AgentType::Woman2,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn new_engine() {
        let engine = Engine::new(8, 8, 0.5, 0.7);
        println!("{:#?}", engine);
        assert_eq!(engine.n_agents(), 32);
    }
}
