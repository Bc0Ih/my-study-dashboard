import React, { useState, useEffect } from "react";
import "./index.css";

const COLUMN_KEYS = ["today", "thisWeek", "someday"];

const COLUMN_META = {
  today: { title: "今日やる" },
  thisWeek: { title: "今週やる" },
  someday: { title: "いつかやる" },
};

const STORAGE_KEY = "my-study-dashboard-tasks";

function App() {
  const [tasks, setTasks] = useState({
    today: [],
    thisWeek: [],
    someday: [],
  });

  const [input, setInput] = useState({
    today: "",
    thisWeek: "",
    someday: "",
  });

  // 🔹 初回：localStorage から読み込み
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTasks({
          today: parsed.today || [],
          thisWeek: parsed.thisWeek || [],
          someday: parsed.someday || [],
        });
      }
    } catch (e) {
      console.error("Failed to load tasks", e);
    }
  }, []);

  // 🔹 更新のたびに保存
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Failed to save tasks", e);
    }
  }, [tasks]);

  const handleChangeInput = (columnKey, value) => {
    setInput((prev) => ({ ...prev, [columnKey]: value }));
  };

  const handleAddTask = (columnKey) => {
    const text = input[columnKey].trim();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => ({
      ...prev,
      [columnKey]: [newTask, ...prev[columnKey]],
    }));

    setInput((prev) => ({ ...prev, [columnKey]: "" }));
  };

  const handleDeleteTask = (columnKey, id) => {
    setTasks((prev) => ({
      ...prev,
      [columnKey]: prev[columnKey].filter((t) => t.id !== id),
    }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">My Study Dashboard</h1>
        <p className="app-subtitle">
          今日・今週・いつかやることを、スマホからでもサクッと管理。
        </p>
      </header>

      <div className="columns">
        {COLUMN_KEYS.map((key) => (
          <TaskColumn
            key={key}
            columnKey={key}
            title={COLUMN_META[key].title}
            tasks={tasks[key]}
            inputValue={input[key]}
            onChangeInput={handleChangeInput}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

function TaskColumn({
  columnKey,
  title,
  tasks,
  inputValue,
  onChangeInput,
  onAddTask,
  onDeleteTask,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAddTask(columnKey);
    }
  };

  return (
    <section className="task-column">
      <div className={`task-column-header task-column-header--${columnKey}`}>
        <h2 className="task-column-title">{title}</h2>
      </div>

      <div className="task-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onChangeInput(columnKey, e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="タスクを入力して Enter or 追加"
        />
        <button onClick={() => onAddTask(columnKey)}>追加</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 && (
          <p className="task-empty">まだタスクはありません。</p>
        )}

        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-card-main">
              <p className="task-card-text">{task.text}</p>
            </div>
            <button
              className="task-card-delete"
              onClick={() => onDeleteTask(columnKey, task.id)}
            >
              削除
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
