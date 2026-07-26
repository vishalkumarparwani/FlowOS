const BASE_URL = "http://127.0.0.1:8000";

export async function getTasks() {
    const response = await fetch(`${BASE_URL}/tasks/`);
    return response.json();
}

export async function createTask(task) {
    const response = await fetch(`${BASE_URL}/tasks/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task),
    });
    return response.json();
}

export async function deleteTask(task_id) {
    await fetch(`${BASE_URL}/tasks/${task_id}`, { method: "DELETE" });
}