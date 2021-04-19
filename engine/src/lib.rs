use rand::prelude::{IteratorRandom, Rng, SliceRandom, ThreadRng};
use serde::Serialize;

const MOVE_RANGE: usize = 10;

#[derive(Debug)]
pub struct Engine {
    pub rows: usize,
    pub cols: usize,
    pub density: f32,
    pub similarity: f32,
    pub agents: Vec<Agent>,
    pub finished: bool,
    rng: ThreadRng,
}

impl Engine {
    /// Creates new board setup with randomly placed agents
    pub fn new(rows: usize, cols: usize, density: f32, similarity: f32) -> Self {
        let size = rows * cols;
        let n_agents = (size as f32 * density).round() as usize;
        let mut rng = rand::thread_rng();
        let agents = (0..size)
            .choose_multiple(&mut rng, n_agents)
            .into_iter()
            .map(|i| Agent::new(i % rows, i / rows, &mut rng))
            .collect();
        let mut engine = Self {
            rows,
            cols,
            density,
            similarity,
            agents,
            finished: false,
            rng,
        };
        engine.update_agents();
        engine
    }

    pub fn n_agents(&self) -> usize {
        self.agents.len()
    }

    fn all_happy(&self) -> bool {
        self.agents.iter().all(|o| o.happy)
    }

    fn get_agent_at(&self, x: usize, y: usize) -> Option<&Agent> {
        self.agents
            .iter()
            .filter(|o| (o.x == x) && (o.y == y))
            .next()
    }

    /// Update a single `Agent`
    fn update_agent(&mut self, idx: usize) {
        let agent = self.agents.get(idx).unwrap();
        let neighboor = agent
            .get_neighboor(1, self.rows, self.cols)
            .into_iter()
            .filter_map(|(x, y)| self.get_agent_at(x, y))
            .collect::<Vec<_>>();
        let similar_nearby: usize = neighboor
            .iter()
            .map(|o| (o.team == agent.team) as usize)
            .sum();
        let other_nearby: usize = neighboor
            .iter()
            .map(|o| (o.team != agent.team) as usize)
            .sum();
        let total_nearby = similar_nearby + other_nearby;
        let happy = similar_nearby as f32 >= (self.similarity * total_nearby as f32);

        let agent = self.agents.get_mut(idx).unwrap();
        agent.happy = happy;
    }

    /// Update all `Agent`s
    fn update_agents(&mut self) {
        for i in 0..self.n_agents() {
            self.update_agent(i);
        }
    }

    fn move_unhappy_agent(&mut self, idx: usize) {
        let agent = self.agents.get(idx).unwrap();
        let neighboor = agent
            .get_neighboor(MOVE_RANGE, self.rows, self.cols)
            .into_iter()
            .filter(|&(x, y)| self.get_agent_at(x, y).is_none())
            .collect::<Vec<_>>();
        if let Some(&(x, y)) = neighboor.choose(&mut self.rng) {
            let agent = self.agents.get_mut(idx).unwrap();
            agent.x = x;
            agent.y = y;
        };
    }

    fn move_unhappy_agents(&mut self) {
        let idxs = self
            .agents
            .iter()
            .enumerate()
            .filter_map(|(i, o)| (!o.happy).then(|| i))
            .collect::<Vec<_>>();
        for i in idxs {
            self.move_unhappy_agent(i);
        }
    }

    pub fn step(&mut self) {
        if self.all_happy() {
            self.finished = true;
            return;
        }
        self.move_unhappy_agents();
    }
}

#[derive(Debug)]
pub struct Agent {
    pub x: usize,
    pub y: usize,
    pub team: AgentType,
    pub happy: bool,
}

impl Agent {
    /// Creates a new `Agent` with a random `AgentType`.
    pub fn new(x: usize, y: usize, rng: &mut ThreadRng) -> Self {
        Self {
            x,
            y,
            team: AgentType::new_random(rng),
            happy: false,
        }
    }

    /// Gets coordinates of the squares around this `Agent`.
    pub fn get_neighboor(&self, range: usize, rows: usize, cols: usize) -> Vec<(usize, usize)> {
        let col_range = self.x.checked_sub(range).unwrap_or(0)..=(self.x + range).min(cols);
        let row_range = self.y.checked_sub(range).unwrap_or(0)..=(self.y + range).min(rows);
        col_range
            .map(|i| row_range.clone().map(move |j| (i, j)))
            .flatten()
            .filter(|o| o != &(self.x, self.y))
            .collect::<Vec<_>>()
    }
}
#[derive(Serialize, Debug, Clone, PartialEq)]
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

    #[test]
    fn get_neighboor() {
        let engine = Engine::new(8, 8, 0.5, 0.7);
        let tst = &engine.agents[0];
        let res = tst.get_neighboor(1, engine.rows, engine.cols);
        println!("Agent ({} {}): {:?}", tst.x, tst.y, res);
    }
}
