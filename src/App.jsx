import React, { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // 時計
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // task CRUD
  const addTask = () => {
    if (newTask && selectedSkill) {
      setTasks([...tasks, { name: newTask, skill: selectedSkill, done: false }]);
      setNewTask("");
    }
  };
  const toggleDone = (i) => setTasks(tasks.map((t,idx)=> idx===i? {...t,done:!t.done}:t));
  const deleteTask = (i)=> setTasks(tasks.filter((_,idx)=>idx!==i));

  // category CRUD
  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };
  const deleteSkill = (skill) => {
    setSkills(skills.filter((s)=>s!==skill));
    if(selectedSkill===skill) setSelectedSkill("");
  };

  return (
    <div style={{
      padding:30,
      minHeight:"100vh",
      background:"linear-gradient(to bottom right, rgba(180,240,255,0.85), rgba(90,170,255,0.6))",
      fontFamily:"Hiragino Sans, sans-serif"
    }}>

      {/* ━━━━━━━━━━━━▢ Header ▢━━━━━━━━━━━━ */}
      <header style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        paddingRight:40,
        marginBottom:30
      }}>
        <h1 style={{ fontSize:30, fontWeight:"800" }}>My Study Dashboard</h1>
        <div style={{
          padding:"6px 14px",
          marginLeft:40,
          borderRadius:999,
          background:"rgba(255,255,255,0.65)",
          boxShadow:"0 0 10px rgba(0,160,255,0.25)",
          fontVariantNumeric:"tabular-nums"
        }}>
          {now.toLocaleTimeString("ja-JP",{ hour12:false })}
        </div>
      </header>


      {/* ━━━━━━━━━━━━▢ Category Manager ▢━━━━━━━━━━━━ */}
      <section style={{marginBottom:25}}>
        <h2 style={{fontSize:18,fontWeight:700,marginBottom:6}}>📁 カテゴリ管理</h2>

        {/* カテゴリ追加 */}
        <div style={{
          background:"rgba(255,255,255,0.45)",
          padding:15,
          borderRadius:12,
          width:350,
          boxShadow:"0 0 10px rgba(0,160,255,0.25)"
        }}>
          <p style={{marginBottom:6}}>カテゴリを追加</p>

          <input 
            placeholder="例：英語 / 読書 / プログラミング"
            value={newSkill}
            onChange={e=>setNewSkill(e.target.value)}
            style={{
              width:"68%",padding:8,borderRadius:6,
              border:"1px solid rgba(0,160,255,0.4)",
              background:"rgba(255,255,255,0.75)"
            }}
          />

          <button onClick={addSkill}
            style={{
              marginLeft:8,padding:"8px 14px",
              background:"rgba(0,170,255,0.85)",color:"#fff",
              border:"none",borderRadius:6,fontWeight:600,cursor:"pointer"
            }}>＋追加</button>
        </div>

        {/* カテゴリ一覧 */}
        <div style={{marginTop:10,display:"flex",gap:8,flexWrap:"wrap",width:350}}>
          {skills.map(skill=>(
            <div key={skill} style={{
              background:"rgba(255,255,255,0.75)",
              padding:"6px 12px",
              borderRadius:20,
              display:"flex",alignItems:"center",gap:8,fontWeight:600,
              boxShadow:"0 0 6px rgba(0,160,255,0.25)"
            }}>
              {skill}

              <button onClick={()=>deleteSkill(skill)}
                style={{
                  width:22,height:22,borderRadius:"50%",
                  background:"rgba(255,60,60,0.22)",
                  fontSize:12,fontWeight:700,
                  color:"rgba(200,0,0,0.95)",
                  border:"none",cursor:"pointer",
                  display:"flex",justifyContent:"center",alignItems:"center",
                  boxShadow:"0 0 6px rgba(255,0,0,0.28)"
                }}>×</button>
            </div>
          ))}
        </div>
      </section>


      {/* ━━━━━━━━━━━━▢ Record Task ▢━━━━━━━━━━━━ */}
      <section style={{marginTop:20}}>
        <h2 style={{fontSize:18,fontWeight:700,marginBottom:6}}>📝 学習を記録</h2>

        <div style={{
          background:"rgba(255,255,255,0.45)",
          padding:15,width:350,borderRadius:12,
          boxShadow:"0 0 10px rgba(0,160,255,0.25)"
        }}>
          <input
            placeholder="例：Progate 30分 / 読書20P"
            value={newTask}
            onChange={e=>setNewTask(e.target.value)}
            style={{
              width:"65%",padding:8,borderRadius:6,
              border:"1px solid rgba(0,160,255,0.4)",
              background:"rgba(255,255,255,0.75)"
            }}
          />

          <select value={selectedSkill} onChange={e=>setSelectedSkill(e.target.value)}
            style={{
              width:"68%",marginTop:10,padding:8,borderRadius:6,
              border:"1px solid rgba(0,160,255,0.4)",
              background:"rgba(255,255,255,0.75)"
            }}>
            <option value="">カテゴリを選択</option>
            {skills.map(s=><option key={s}>{s}</option>)}
          </select>

          <button onClick={addTask}
            style={{
              width:"100%",marginTop:10,padding:"10px 0",
              background:"rgba(0,170,255,0.9)",color:"#fff",
              borderRadius:8,fontWeight:700,border:"none",cursor:"pointer"
            }}>＋ 記録追加</button>
        </div>
      </section>


      {/* ━━━━━━━━━━━━▢ History View（これが本命）▢━━━━━━━━━━━━ */}
      <section style={{marginTop:40}}>
        <h2 style={{fontSize:20,fontWeight:"800",marginBottom:10}}>
          📘 記録一覧（{tasks.length}件）
        </h2>

        <ul style={{listStyle:"none",paddingLeft:0,maxWidth:540}}>
          {tasks.map((task,i)=>(
            <li key={i} style={{
              background:"rgba(255,255,255,0.55)",
              padding:12,marginBottom:12,
              borderRadius:10,
              borderLeft:"6px solid rgba(0,170,255,0.7)",
              display:"flex",justifyContent:"space-between",alignItems:"center"
            }}>
              <div style={{
                textDecoration:task.done?"line-through":"none",
                opacity:task.done?0.55:1,fontSize:15
              }}>
                <b style={{color:"#0077aa"}}>[{task.skill}]</b> {task.name}
              </div>

              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>toggleDone(i)}
                  style={{
                    padding:"4px 10px",borderRadius:999,
                    background:task.done?"rgba(120,200,120,0.3)":"rgba(0,170,255,0.25)",
                    color:task.done?"rgba(40,100,40,0.9)":"rgba(0,70,140,0.9)",
                    fontSize:12,fontWeight:600,border:"none",cursor:"pointer"
                }}>
                  {task.done?"戻す":"完了"}
                </button>

                <button onClick={()=>deleteTask(i)}
                  style={{
                    padding:"4px 10px",borderRadius:999,
                    background:"rgba(255,80,80,0.22)",color:"rgba(190,0,0,0.9)",
                    fontSize:12,fontWeight:600,border:"none",cursor:"pointer"
                }}>削除</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
