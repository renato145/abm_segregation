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

    pub fn all_happy(&self) -> bool {
        self.agents.iter().all(|o| o.happy)
    }

    pub fn get_unhappy_ratio(&self) -> f32 {
        let unhappy_count: usize = self.agents.iter().map(|o| !o.happy as usize).sum();
        unhappy_count as f32 / self.n_agents() as f32
    }

    pub fn get_similar_nearby_ratio(&self) -> f32 {
        let similar_nearby: usize = self.agents.iter().map(|o| o.similar_nearby).sum();
        let total_nearby: usize = self.agents.iter().map(|o| o.total_nearby).sum();
        (similar_nearby as f32) / (total_nearby as f32)
    }

    fn get_agent_at(&self, x: usize, y: usize) -> Option<&Agent> {
        self.agents
            .iter()
            .filter(|o| (o.x == x) && (o.y == y))
            .next()
    }

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
        agent.similar_nearby = similar_nearby;
        agent.total_nearby = total_nearby;
    }

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

    /// Does one step and returns a summary of the state: (similar_nearby_ratio, unhappy_ratio)
    pub fn step(&mut self) -> (f32, f32) {
        if self.all_happy() {
            self.finished = true;
        } else {
            self.move_unhappy_agents();
            self.update_agents();
        }
        (self.get_similar_nearby_ratio(), self.get_unhappy_ratio())
    }
}

#[derive(Debug, Clone)]
pub struct Agent {
    pub x: usize,
    pub y: usize,
    pub team: AgentType,
    pub happy: bool,
    pub similar_nearby: usize,
    pub total_nearby: usize,
}

impl Agent {
    /// Creates a new `Agent` with a random `AgentType`.
    pub fn new(x: usize, y: usize, rng: &mut ThreadRng) -> Self {
        Self {
            x,
            y,
            team: AgentType::new_random(rng),
            happy: false,
            similar_nearby: 0,
            total_nearby: 0,
        }
    }

    /// Gets coordinates of the squares around this `Agent`.
    pub fn get_neighboor(&self, range: usize, rows: usize, cols: usize) -> Vec<(usize, usize)> {
        let col_range = (self.x - range.min(self.x))..=(self.x + range).min(cols - 1);
        let row_range = (self.y - range.min(self.y))..=(self.y + range).min(rows - 1);
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
        match rng.gen_range(0..=1) {
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
        let mut agent1 = Agent::new(8, 8, &mut rand::thread_rng());
        agent1.x = 0;
        agent1.y = 0;
        let mut agent2 = agent1.clone();
        agent2.x = 3;
        agent2.y = 3;

        let res1 = agent1.get_neighboor(1, 8, 8);
        let res2 = agent2.get_neighboor(1, 8, 8);
        println!("Agent ({:?}): {:?}", agent1, res1);
        println!("Agent ({:?}): {:?}", agent2, res2);
        assert_eq!(res1.len(), 3);
        assert_eq!(res2.len(), 8);
    }

    #[test]
    fn step() {
        let mut engine = Engine::new(8, 8, 0.5, 0.7);
        for _ in 0..100 {
            let (similar_nearby, unhappy_ratio) = engine.step();
            println!(
                "similar_nearby: {:.2} | unhappy_ratio: {:.2}",
                similar_nearby, unhappy_ratio
            );
            let x = engine.agents.iter().map(|o| o.x).max().unwrap();
            let y = engine.agents.iter().map(|o| o.y).max().unwrap();
            assert!(x < 8, "x < 8 (x={})", x);
            assert!(y < 8, "y < 8 (y={})", y);
            if engine.finished {
                break;
            }
        }
    }
}
