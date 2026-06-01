import { useEffect, useMemo, useState } from 'react';
import { api } from './api.js';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [healthStatus, setHealthStatus] = useState('checking');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  const completedCount = useMemo(
    () => tasks.filter((task) => task.status === 'done').length,
    [tasks],
  );

  async function loadTasks(nextStatus = statusFilter) {
    setLoading(true);
    setMessage('');

    try {
      const response = await api.listTasks(nextStatus);
      setTasks(response.data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function checkHealth() {
    try {
      await api.health();
      setHealthStatus('online');
    } catch {
      setHealthStatus('offline');
    }
  }

  useEffect(() => {
    checkHealth();
    loadTasks('all');
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setMessage('Task title is required.');
      return;
    }

    try {
      await api.createTask({
        title: form.title,
        description: form.description,
        priority: form.priority,
      });

      setForm({ title: '', description: '', priority: 'medium' });
      setMessage('Task created successfully.');
      await loadTasks(statusFilter);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleStatusChange(task, nextStatus) {
    try {
      await api.updateTask(task.id, { status: nextStatus });
      await loadTasks(statusFilter);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleDelete(task) {
    try {
      await api.deleteTask(task.id);
      setMessage('Task deleted successfully.');
      await loadTasks(statusFilter);
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleFilterChange(event) {
    const nextStatus = event.target.value;
    setStatusFilter(nextStatus);
    loadTasks(nextStatus);
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Cloud Full-Stack Deployment</p>
          <h1>DevTask Cloud</h1>
          <p className="hero-copy">
            A lightweight task manager deployed as a full-stack cloud application with
            CI/CD, PostgreSQL, security middleware, monitoring, and scaling strategy.
          </p>
        </div>

        <div className={`health-pill ${healthStatus}`}>
          API {healthStatus === 'online' ? 'Online' : healthStatus === 'offline' ? 'Offline' : 'Checking'}
        </div>
      </section>

      <section className="stats-grid">
        <article className="stat-card">
          <span>Total Tasks</span>
          <strong>{tasks.length}</strong>
        </article>
        <article className="stat-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </article>
        <article className="stat-card">
          <span>Filter</span>
          <strong>{statusFilter.replace('_', ' ')}</strong>
        </article>
      </section>

      <section className="content-grid">
        <form className="panel" onSubmit={handleSubmit}>
          <h2>Create Task</h2>

          <label>
            Title
            <input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Example: Prepare deployment screenshots"
            />
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              placeholder="Write a short task description"
              rows="4"
            />
          </label>

          <label>
            Priority
            <select
              value={form.priority}
              onChange={(event) => setForm({ ...form, priority: event.target.value })}
            >
              {priorityOptions.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Add Task</button>
          {message ? <p className="message">{message}</p> : null}
        </form>

        <section className="panel">
          <div className="task-header">
            <h2>Task List</h2>
            <select value={statusFilter} onChange={handleFilterChange}>
              <option value="all">All</option>
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {loading ? <p className="empty-state">Loading tasks...</p> : null}

          {!loading && tasks.length === 0 ? (
            <p className="empty-state">No task found. Create your first cloud task.</p>
          ) : null}

          <div className="task-list">
            {tasks.map((task) => (
              <article key={task.id} className="task-card">
                <div>
                  <div className="task-title-row">
                    <h3>{task.title}</h3>
                    <span className={`priority ${task.priority}`}>{task.priority}</span>
                  </div>
                  <p>{task.description || 'No description.'}</p>
                </div>

                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(event) => handleStatusChange(task, event.target.value)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>

                  <button className="ghost-button" type="button" onClick={() => handleDelete(task)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
