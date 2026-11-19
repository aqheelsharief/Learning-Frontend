import { useState, useEffect } from "react";
import type { FormEvent } from "react";

 export enum PetMood {
  HUNGRY,
  TIRED,
  SAD,
  EXCITED,
  HAPPY,
  SICK,
  CONTENT,
}

export const moodEmoji: Record<PetMood, string> = {
  [PetMood.HUNGRY]: "🍽️",
  [PetMood.TIRED]: "😴",
  [PetMood.SAD]: "😢",
  [PetMood.EXCITED]: "🤩",
  [PetMood.HAPPY]: "😊",
  [PetMood.SICK]: "🤒",
  [PetMood.CONTENT]: "🙂",
};

export const moodLabel: Record<PetMood, string> = {
  [PetMood.HUNGRY]: "Hungry",
  [PetMood.TIRED]: "Tired",
  [PetMood.SAD]: "Sad",
  [PetMood.EXCITED]: "Excited",
  [PetMood.HAPPY]: "Happy",
  [PetMood.SICK]: "Sick",
  [PetMood.CONTENT]: "Content",
};
export enum PetAction {
  EAT = "EAT",
  PLAY = "PLAY",
  SLEEP = "SLEEP",
}



const clamp = (n: number) => Math.min(100, Math.max(0, n));

const TICK_MS = 2000;
const TICK_HUNGER = 4;
const TICK_HAPPINESS = 4;

export const getMood = (
  hunger: number,
  happiness: number,
  energy: number
): PetMood => {
  if (hunger > 70) return PetMood.HUNGRY;
  if (energy < 30) return PetMood.TIRED;
  if (happiness < 30) return PetMood.SAD;
  if (happiness > 80 && energy > 70) return PetMood.EXCITED;
  if (happiness > 60) return PetMood.HAPPY;
  return PetMood.CONTENT;
};

const statLevel = (value: number, invert = false) => {
  const v = invert ? 100 - value : value;
  if (v > 60) return "high";
  if (v > 30) return "medium";
  return "low";
};

export const PetGame = () => {
  const [started, setStarted] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [petName, setPetName] = useState("");
  const [hunger, setHunger] = useState(0);
  const [happiness, setHappiness] = useState(100);
  const [energy, setEnergy] = useState(100);

  // Passive decay while the game is running
  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setHunger((h) => clamp(h + TICK_HUNGER));
      setHappiness((h) => clamp(h - TICK_HAPPINESS));
    }, TICK_MS);
    return () => clearInterval(id);
  }, [started]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setPetName(trimmed);
    setStarted(true);
  };

  const doAction = (action: PetAction) => {
    switch (action) {
      case PetAction.EAT:
        setHunger((h) => clamp(h - 20));
        setEnergy((e) => clamp(e + 10));
        break;
      case PetAction.PLAY:
        setEnergy((e) => clamp(e - 15));
        setHappiness((h) => clamp(h + 15));
        break;
      case PetAction.SLEEP:
        setHunger((h) => clamp(h + 10));
        setEnergy((e) => clamp(e + 30));
        break;
    }
  };

  if (!started) {
    return (
      <main className="shell">
        <form className="card name-form" onSubmit={handleSubmit}>
          <div className="egg">🥚</div>
          <h1 className="title">Hatch Your Pet</h1>
          <label htmlFor="pet-name">What will you name your pet?</label>
          <input
            id="pet-name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Enter a name..."
            autoComplete="off"
          />
          <button type="submit" className="start-btn">
            Start Game
          </button>
        </form>
      </main>
    );
  }

  const mood = getMood(hunger, happiness, energy);

  const stats = [
    { label: "Hunger", icon: "🍖", value: hunger, invert: true },
    { label: "Happiness", icon: "💖", value: happiness, invert: false },
    { label: "Energy", icon: "⚡", value: energy, invert: false },
  ];

  return (
    <main className="shell">
      <section className="card game">
        <h1 className="pet-name">{petName}</h1>
        <div className="pet-sprite" role="img" aria-label={moodLabel[mood]}>
  {moodEmoji[mood]}
</div>
<p className="mood-text">Feeling {moodLabel[mood]}</p>

        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-head">
                <span className="stat-name">
                  <span aria-hidden="true">{s.icon}</span> {s.label}
                </span>
                <span className="stat-value">{s.value}</span>
              </div>
              <div className="bar">
                <div
                  className={`bar-fill ${statLevel(s.value, s.invert)}`}
                  style={{ width: `${s.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="actions">
          <button
            id="eat-action"
            className="action eat"
            onClick={() => doAction(PetAction.EAT)}
          >
            🍎 Eat
          </button>
          <button
            id="play-action"
            className="action play"
            onClick={() => doAction(PetAction.PLAY)}
          >
            🎾 Play
          </button>
          <button
            id="sleep-action"
            className="action sleep"
            onClick={() => doAction(PetAction.SLEEP)}
          >
            🌙 Sleep
          </button>
        </div>
      </section>
    </main>
  );
};  