// src/components/ActivityBlocks.jsx
import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Armchair,
  Backpack,
  Bell,
  BookOpen,
  Cube,
  Calculator,
  DeviceMobile,
  DeviceTablet,
  Desktop,
  Gear,
  HandSoap,
  Microphone,
  MapTrifold,
  Pencil,
  Scissors,
  TrafficSignal,
  Tree,
} from "phosphor-react";
import { getImageForItem } from "../utils/imageMap";

const ICONS = {
  pencil: Pencil,
  chair: Armchair,
  tablet: DeviceTablet,
  book: BookOpen,
  brick: Cube,
  computer: Desktop,
  calculator: Calculator,
  tree: Tree,
  scissors: Scissors,
  smartphone: DeviceMobile,
  road: MapTrifold,
  backpack: Backpack,
  soap: HandSoap,
  microphone: Microphone,
  washingMachine: Gear,
  bell: Bell,
  trafficLights: TrafficSignal,
};

const renderItemLabel = (item, size = 20) => {
  if (!item) return null;
  const imageSrc = getImageForItem(item);
  const Icon = item.icon ? ICONS[item.icon] : null;
  return (
    <span className="bc-item-label">
      {imageSrc && (
        <img
          className="bc-item-image"
          src={imageSrc}
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      )}
      {!imageSrc && Icon && (
        <Icon className="bc-item-icon" size={size} aria-hidden="true" />
      )}
      <span>{item.label}</span>
    </span>
  );
};

function MultiSelectBlock({ block, includeAnswers, onAttempt }) {
  const [selected, setSelected] = useState({});
  const [result, setResult] = useState(null);

  const toggleOption = (index) => {
    setSelected((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const checkAnswers = () => {
    const options = block.options || [];
    let totalCorrect = 0;
    let score = 0;
    let anyChecked = false;

    options.forEach((option, index) => {
      const shouldBeChecked = Boolean(option.correct);
      if (shouldBeChecked) totalCorrect += 1;
      if (selected[index]) {
        anyChecked = true;
        score += shouldBeChecked ? 1 : -0.5;
      }
    });

    if (!anyChecked) {
      setResult({ ok: false, text: block.feedback?.empty || "Select at least one option first." });
      return;
    }

    const percent = Math.max(0, Math.round((score / totalCorrect) * 100));
    const isGood = percent >= 80;
    setResult({
      ok: isGood,
      text: isGood
        ? block.feedback?.good || `Great work. Score: ${percent}%.`
        : block.feedback?.tryAgain || `Some choices need a rethink. Score: ${percent}%.`,
    });

    if (onAttempt) {
      const selectedLabels = options
        .filter((option, index) => selected[index])
        .map((option) => option.label);
      onAttempt({
        blockId: block.id || block.type,
        blockType: block.type,
        score: percent,
        answers: { selected: selectedLabels },
      });
    }
  };

  const printOptions = useMemo(() => block.options || [], [block.options]);

  return (
    <section className="bc-card bc-block">
      {block.title && <h2 className="bc-card__title">{block.title}</h2>}
      {block.prompt && <p>{block.prompt}</p>}

      <div className="bc-interactive">
        <div className="bc-chips">
          {block.options?.map((option, index) => (
            <label key={option.label} className="bc-chip">
              <input
                type="checkbox"
                checked={Boolean(selected[index])}
                onChange={() => toggleOption(index)}
              />
              {option.label}
            </label>
          ))}
        </div>

        <button className="bc-button bc-button--small" onClick={checkAnswers}>
          Check answers
        </button>

        {result && (
          <div className={`bc-result ${result.ok ? "bc-result--ok" : "bc-result--bad"}`}>
            {result.text}
          </div>
        )}
      </div>

      <div className="bc-print-only">
        <ul className="bc-print-list">
          {printOptions.map((option) => {
            const marker = includeAnswers ? (option.correct ? "[x]" : "[ ]") : "[ ]";
            return (
              <li key={option.label}>
                <span className="bc-print-marker">{marker}</span> {option.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ShortAnswerBlock({ block, includeAnswers, onAttempt }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);

  const checkAnswer = () => {
    const cleaned = answer.trim().toLowerCase();
    const answers = block.answers || (block.answer ? [block.answer] : []);
    const normalized = answers.map((value) => value.trim().toLowerCase());

    if (!cleaned) {
      setResult({ ok: false, text: block.feedback?.empty || "Type an answer first." });
      return;
    }

    const isCorrect = block.acceptAny ? true : normalized.includes(cleaned);

    if (isCorrect) {
      setResult({
        ok: true,
        text: block.feedback?.good || (block.acceptAny ? "Thanks for your answer." : "Correct."),
      });
    } else {
      setResult({ ok: false, text: block.feedback?.tryAgain || "Not quite. Try again." });
    }

    if (onAttempt) {
      onAttempt({
        blockId: block.id || block.type,
        blockType: block.type,
        score: isCorrect ? 1 : 0,
        answers: { response: answer },
      });
    }
  };

  const lines = block.print?.lines || 3;

  return (
    <section className="bc-card bc-block">
      {block.title && <h2 className="bc-card__title">{block.title}</h2>}
      {block.prompt && <p>{block.prompt}</p>}
      {block.question && (
        <p className="bc-question">
          <strong>{block.question}</strong>
        </p>
      )}

      <div className="bc-interactive">
        <input
          className="bc-input"
          placeholder="Enter your answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <button className="bc-button bc-button--small" onClick={checkAnswer}>
          Check answer
        </button>
        {result && (
          <div className={`bc-result ${result.ok ? "bc-result--ok" : "bc-result--bad"}`}>
            {result.text}
          </div>
        )}
      </div>

      <div className="bc-print-only">
        <div className="bc-print-lines" style={{ "--line-count": lines }}>
          {Array.from({ length: lines }).map((_, index) => (
            <div key={index} className="bc-print-line" />
          ))}
        </div>
        {block.print?.includeDrawingBox && (
          <div className="bc-print-drawing" aria-label="Drawing space" />
        )}
        {includeAnswers && block.printAnswers?.modelAnswer && (
          <p className="bc-print-answer">Model answer: {block.printAnswers.modelAnswer}</p>
        )}
      </div>
    </section>
  );
}

function MatchBlock({ block, includeAnswers, onAttempt }) {
  const [choices, setChoices] = useState({});
  const [result, setResult] = useState(null);
  const [options, setOptions] = useState([]);

  const shuffleOptions = (items) => {
    const list = Array.isArray(items) ? [...items] : [];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };

  useEffect(() => {
    setOptions(shuffleOptions(block.options));
  }, [block.options]);

  const setChoice = (index, value) => {
    setChoices((prev) => ({ ...prev, [index]: value }));
  };

  const resetAnswers = () => {
    setChoices({});
    setResult(null);
    setOptions(shuffleOptions(block.options));
  };

  const checkAnswers = () => {
    const items = block.items || [];
    const answered = items.some((_, index) => Boolean(choices[index]));
    if (!answered) {
      setResult({
        ok: false,
        text: block.feedback?.empty || "Choose an answer for at least one item.",
      });
      return;
    }

    let correctCount = 0;
    const wrongItems = [];

    items.forEach((item, index) => {
      const choice = choices[index];
      if (!choice) return;
      if (choice === item.answer) {
        correctCount += 1;
      } else {
        wrongItems.push({
          label: item.label,
          explanation: `Correct answer: ${item.answer}.`,
        });
      }
    });

    const percent = Math.round((correctCount / items.length) * 100);
    const isGood = percent >= 80;
    setResult({
      ok: isGood,
      text: isGood
        ? block.feedback?.correct || "Good thinking!"
        : block.feedback?.incorrect || "Some answers need another look.",
      details: wrongItems,
    });

    if (onAttempt) {
      const selections = items.map((item, index) => ({
        label: item.label,
        choice: choices[index],
      }));
      onAttempt({
        blockId: block.id || block.type,
        blockType: block.type,
        score: percent,
        answers: { selections },
      });
    }
  };

  return (
    <section className="bc-card bc-block">
      {block.title && <h2 className="bc-card__title">{block.title}</h2>}
      {block.prompt && <p>{block.prompt}</p>}

      <div className="bc-interactive">
        <div className="bc-match">
          {block.items?.map((item, index) => (
            <div key={item.label} className="bc-match__row">
              <span className="bc-match__label">{item.label}</span>
              <select
                className="bc-input bc-select bc-match__select"
                value={choices[index] || ""}
                onChange={(event) => setChoice(index, event.target.value)}
              >
                <option value="">Choose an answer</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button className="bc-button bc-button--small" onClick={checkAnswers}>
          Check answers
        </button>
        <button
          type="button"
          className="bc-button bc-button--secondary bc-button--small"
          onClick={resetAnswers}
        >
          Reset
        </button>

        {result && (
          <div className={`bc-result ${result.ok ? "bc-result--ok" : "bc-result--bad"}`}>
            <p>{result.text}</p>
            {result.details?.length > 0 && (
              <ul className="bc-result__list">
                {result.details.map((detail) => (
                  <li key={detail.label}>
                    <strong>{detail.label}:</strong> {detail.explanation}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="bc-print-only">
        <table className="bc-print-table">
          <thead>
            <tr>
              <th>{block.print?.columns?.[0] || "Item"}</th>
              <th>{block.print?.columns?.[1] || "Used for"}</th>
            </tr>
          </thead>
          <tbody>
            {block.items?.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{includeAnswers ? item.answer : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MarkdownBlock({ block }) {
  if (!block?.content) return null;

  return (
    <section className="bc-card bc-block">
      <ReactMarkdown>{block.content}</ReactMarkdown>
    </section>
  );
}

function IconGridBlock({ block }) {
  return (
    <section className="bc-card bc-block">
      {block.title && <h2 className="bc-card__title">{block.title}</h2>}
      {block.prompt && <p>{block.prompt}</p>}
      <div className="bc-icon-grid">
        {block.items?.map((item) => (
          <div key={item.label} className="bc-icon-card">
            {renderItemLabel(item, 32)}
          </div>
        ))}
      </div>
    </section>
  );
}

function RobotChoiceBlock({ block, includeAnswers, onAttempt }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [options, setOptions] = useState([]);

  const shuffleOptions = (items) => {
    const list = Array.isArray(items) ? [...items] : [];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  };

  useEffect(() => {
    setOptions(shuffleOptions(block.options));
  }, [block.options]);

  const checkChoice = (option) => {
    setSelected(option.label);
    const isCorrect = Boolean(option.correct);
    setResult({
      ok: isCorrect,
      text: isCorrect
        ? option.feedback?.good || block.feedback?.good || "Yes! That helps."
        : option.feedback?.tryAgain || block.feedback?.tryAgain || "That wouldn't help.",
    });

    if (onAttempt) {
      onAttempt({
        blockId: block.id || block.type,
        blockType: block.type,
        score: isCorrect ? 1 : 0,
        answers: { choice: option.label },
      });
    }
  };

  const resetChoices = () => {
    setSelected(null);
    setResult(null);
    setOptions(shuffleOptions(block.options));
  };

  return (
    <section className="bc-card bc-block">
      {block.title && <h2 className="bc-card__title">{block.title}</h2>}
      {block.prompt && <p>{block.prompt}</p>}

      <div className="bc-interactive">
        <div className="bc-robot">
          <div className="bc-robot__choices">
            {options.map((option) => (
              <button
                key={option.label}
                type="button"
                className={`bc-button bc-button--toggle bc-button--small ${
                  selected === option.label ? "bc-button--active" : ""
                }`}
                onClick={() => checkChoice(option)}
              >
                {renderItemLabel(option)}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="bc-button bc-button--secondary bc-button--small bc-robot__reset"
          onClick={resetChoices}
        >
          Reset
        </button>

        {result && (
          <div className={`bc-result ${result.ok ? "bc-result--ok" : "bc-result--bad"}`}>
            {result.text}
          </div>
        )}
      </div>

      <div className="bc-print-only">
        <p>{block.print?.prompt || block.prompt}</p>
        <ul className="bc-print-list">
          {block.options?.map((option) => (
            <li key={option.label}>
              [ ] {option.label}
              {includeAnswers && option.correct ? " (Correct)" : ""}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function YesNoBlock({ block, includeAnswers, onAttempt }) {
  const [choices, setChoices] = useState({});
  const [result, setResult] = useState(null);

  const setChoice = (index, value) => {
    setChoices((prev) => ({ ...prev, [index]: value }));
  };

  const resetAnswers = () => {
    setChoices({});
    setResult(null);
  };

  const checkAnswers = () => {
    const items = block.items || [];
    const answered = items.some((_, index) => choices[index] !== undefined);
    if (!answered) {
      setResult({
        ok: false,
        text: block.feedback?.empty || "Choose an answer for at least one item.",
      });
      return;
    }

    let correctCount = 0;
    const wrongItems = [];
    items.forEach((item, index) => {
      const choice = choices[index];
      if (choice === undefined) return;
      if (Boolean(item.correct) === choice) {
        correctCount += 1;
      } else {
        wrongItems.push({
          label: item.label,
          explanation:
            item.explanation ||
            (item.correct
              ? "This is technology because it was designed by humans to help with a task."
              : "This is not technology because it was not designed by humans."),
        });
      }
    });

    const percent = Math.round((correctCount / items.length) * 100);
    const isGood = percent >= 80;
    setResult({
      ok: isGood,
      text: isGood
        ? block.feedback?.correct || "Good thinking!"
        : block.feedback?.incorrect || "Some answers need another look.",
      details: wrongItems,
    });

    if (onAttempt) {
      const selections = items.map((item, index) => ({
        label: item.label,
        choice: choices[index],
      }));
      onAttempt({
        blockId: block.id || block.type,
        blockType: block.type,
        score: percent,
        answers: { selections },
      });
    }
  };

  const printItems = useMemo(() => block.items || [], [block.items]);

  return (
    <section className="bc-card bc-block">
      {block.title && <h2 className="bc-card__title">{block.title}</h2>}
      {block.prompt && <p>{block.prompt}</p>}

      <div className="bc-interactive">
        <div className="bc-list">
          {block.items?.map((item, index) => (
            <div key={item.label} className="bc-list__item">
              {renderItemLabel(item)}
              <div className="bc-button-group">
                <button
                  type="button"
                  className={`bc-button bc-button--toggle bc-button--small ${
                    choices[index] === true ? "bc-button--active" : ""
                  }`}
                  aria-pressed={choices[index] === true}
                  onClick={() => setChoice(index, true)}
                >
                  Technology
                </button>
                <button
                  type="button"
                  className={`bc-button bc-button--toggle bc-button--small ${
                    choices[index] === false ? "bc-button--active" : ""
                  }`}
                  aria-pressed={choices[index] === false}
                  onClick={() => setChoice(index, false)}
                >
                  Not technology
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="bc-button bc-button--small" onClick={checkAnswers}>
          Check answers
        </button>
        <button
          type="button"
          className="bc-button bc-button--secondary bc-button--small"
          onClick={resetAnswers}
        >
          Reset
        </button>

        {result && (
          <div className={`bc-result ${result.ok ? "bc-result--ok" : "bc-result--bad"}`}>
            <p>{result.text}</p>
            {result.details?.length > 0 && (
              <ul className="bc-result__list">
                {result.details.map((detail) => (
                  <li key={detail.label}>
                    <strong>{detail.label}:</strong> {detail.explanation}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="bc-print-only">
        <table className="bc-print-table">
          <thead>
            <tr>
              <th>{block.print?.columns?.[0] || "Item"}</th>
              <th>{block.print?.columns?.[1] || "Technology?"}</th>
              <th>{block.print?.columns?.[2] || "Not technology"}</th>
            </tr>
          </thead>
          <tbody>
            {printItems.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{includeAnswers && item.correct ? "✔" : ""}</td>
                <td>{includeAnswers && !item.correct ? "✔" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MultiChoiceExplainBlock({ block, includeAnswers, onAttempt }) {
  const [choices, setChoices] = useState({});
  const [result, setResult] = useState(null);

  const setChoice = (index, value) => {
    setChoices((prev) => ({ ...prev, [index]: value }));
  };

  const resetAnswers = () => {
    setChoices({});
    setResult(null);
  };

  const checkAnswers = () => {
    const items = block.items || [];
    const answered = items.some((_, index) => choices[index] !== undefined);
    if (!answered) {
      setResult({
        ok: false,
        text: block.feedback?.empty || "Choose an answer for at least one item.",
      });
      return;
    }

    let correctCount = 0;
    const wrongItems = [];
    items.forEach((item, index) => {
      const choice = choices[index];
      if (choice === undefined) return;
      if (Boolean(item.correct) === choice) {
        correctCount += 1;
      } else {
        wrongItems.push({
          label: item.label,
          explanation:
            item.explanation ||
            (item.correct
              ? "This is technology because it was designed by humans to help with a task."
              : "This is not technology because it was not designed by humans."),
        });
      }
    });

    const percent = Math.round((correctCount / items.length) * 100);
    const isGood = percent >= 80;
    setResult({
      ok: isGood,
      text: isGood
        ? block.feedback?.correct || "Good work."
        : block.feedback?.incorrect || "Some answers need another look.",
      details: wrongItems,
    });

    if (onAttempt) {
      const selections = items.map((item, index) => ({
        label: item.label,
        choice: choices[index],
      }));
      onAttempt({
        blockId: block.id || block.type,
        blockType: block.type,
        score: percent,
        answers: { selections },
      });
    }
  };

  const printItems = useMemo(() => block.items || [], [block.items]);

  return (
    <section className="bc-card bc-block">
      {block.title && <h2 className="bc-card__title">{block.title}</h2>}
      {block.prompt && <p>{block.prompt}</p>}

      <div className="bc-interactive">
        <div className="bc-list">
          {block.items?.map((item, index) => (
            <div key={item.label} className="bc-list__item">
              {renderItemLabel(item)}
              <div className="bc-button-group">
                <button
                  type="button"
                  className={`bc-button bc-button--toggle bc-button--small ${
                    choices[index] === true ? "bc-button--active" : ""
                  }`}
                  aria-pressed={choices[index] === true}
                  onClick={() => setChoice(index, true)}
                >
                  Technology
                </button>
                <button
                  type="button"
                  className={`bc-button bc-button--toggle bc-button--small ${
                    choices[index] === false ? "bc-button--active" : ""
                  }`}
                  aria-pressed={choices[index] === false}
                  onClick={() => setChoice(index, false)}
                >
                  Not technology
                </button>
              </div>
              {(includeAnswers || result) && item.explanation && (
                <p className="bc-helper">{item.explanation}</p>
              )}
            </div>
          ))}
        </div>

        <button className="bc-button bc-button--small" onClick={checkAnswers}>
          Check answers
        </button>
        <button
          type="button"
          className="bc-button bc-button--secondary bc-button--small"
          onClick={resetAnswers}
        >
          Reset
        </button>

        {result && (
          <div className={`bc-result ${result.ok ? "bc-result--ok" : "bc-result--bad"}`}>
            <p>{result.text}</p>
            {result.details?.length > 0 && (
              <ul className="bc-result__list">
                {result.details.map((detail) => (
                  <li key={detail.label}>
                    <strong>{detail.label}:</strong> {detail.explanation}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="bc-print-only">
        <table className="bc-print-table">
          <thead>
            <tr>
              <th>{block.print?.columns?.[0] || "Item"}</th>
              <th>{block.print?.columns?.[1] || "Technology?"}</th>
              <th>{block.print?.columns?.[2] || "Reason"}</th>
            </tr>
          </thead>
          <tbody>
            {printItems.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{includeAnswers && item.correct ? "Yes" : includeAnswers ? "No" : ""}</td>
                <td>{includeAnswers && item.explanation ? item.explanation : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ActivityBlock({ block, includeAnswers, onAttempt }) {
  if (!block || !block.type) return null;

  if (block.type === "multiSelect") {
    return (
      <MultiSelectBlock
        block={block}
        includeAnswers={includeAnswers}
        onAttempt={onAttempt}
      />
    );
  }

  if (block.type === "yesNo") {
    return (
      <YesNoBlock block={block} includeAnswers={includeAnswers} onAttempt={onAttempt} />
    );
  }

  if (block.type === "multiChoiceExplain") {
    return (
      <MultiChoiceExplainBlock
        block={block}
        includeAnswers={includeAnswers}
        onAttempt={onAttempt}
      />
    );
  }

  if (block.type === "match") {
    return (
      <MatchBlock block={block} includeAnswers={includeAnswers} onAttempt={onAttempt} />
    );
  }

  if (block.type === "markdown") {
    return <MarkdownBlock block={block} />;
  }

  if (block.type === "iconGrid") {
    return <IconGridBlock block={block} />;
  }

  if (block.type === "robotChoice") {
    return (
      <RobotChoiceBlock
        block={block}
        includeAnswers={includeAnswers}
        onAttempt={onAttempt}
      />
    );
  }

  if (block.type === "shortAnswer") {
    return (
      <ShortAnswerBlock
        block={block}
        includeAnswers={includeAnswers}
        onAttempt={onAttempt}
      />
    );
  }

  return (
    <section className="bc-card bc-block">
      <p>Unsupported block type: {block.type}</p>
    </section>
  );
}

export default ActivityBlock;
