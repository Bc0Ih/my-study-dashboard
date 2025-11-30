// App.jsx
import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  // ⏰ 時計
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };

    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  // 📁 カテゴリ管理
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    const name = newCategory.trim();
    if (!name) return;
    if (categories.includes(name)) return;

    setCategories((prev) => [...prev, name]);
    setNewCategory("");
    if (!selectedCategory) {
      setSelectedCategory(name);
    }
  };

  // ✏️ 学習記録
  const [records, setRecords] = useState([]);
  const [newRecordText, setNewRecordText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!newRecordText.trim() || !selectedCategory) return;

    const now = new Date();
    const record = {
      id: now.getTime(),
      text: newRecordText.trim(),
      category: selectedCategory,
      createdAt: now,
    };

    setRecords((prev) => [...prev, record]);
    setNewRecordText("");
  };

  const formatRecordTime = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <div className="app">
      {/* ヘッダー */}
      <header className="app-header">
        <h1 className="app-title">My Study Dashboard</h1>
        <div className="clock-pill">{time}</div>
      </header>

      {/* 📁 カテゴリ管理 */}
      <section className="section">
        <h2 className="section-title">📁 カテゴリ管理</h2>

        <div className="card">
          <form className="card-form" onSubmit={handleAddCategory}>
            <label className="card-label">カテゴリを追加</label>
            <input
              type="text"
              className="text-input"
              placeholder="例：英語 / 読書 / プログラミング"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="submit" className="primary-button">
              ＋ 追加
            </button>
          </form>
        </div>
      </section>

      {/* ✏️ 学習を記録 */}
      <section className="section">
        <h2 className="section-title">✏️ 学習を記録</h2>

        <div className="card">
          <form className="card-form" onSubmit={handleAddRecord}>
            <label className="card-label">学習内容</label>
            <input
              type="text"
              className="text-input"
              placeholder="例：Progate 30分 / 読書20P"
              value={newRecordText}
              onChange={(e) => setNewRecordText(e.target.value)}
            />

            <label className="card-label">カテゴリ</label>
            <select
              className="select-input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">カテゴリを選択</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button type="submit" className="primary-button">
              ＋ 記録追加
            </button>
          </form>
        </div>
      </section>

      {/* 📘 記録一覧 */}
      <section className="section">
        <h2 className="section-title">
          📘 記録一覧（{records.length}件）
        </h2>

        {records.length === 0 ? (
          <p className="empty-text">まだ記録がありません。</p>
        ) : (
          <ul className="record-list">
            {records.map((record) => (
              <li className="record-item" key={record.id}>
                <span className="record-category-tag">{record.category}</span>
                <span className="record-text">{record.text}</span>
                <span className="record-time">
                  {formatRecordTime(record.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
