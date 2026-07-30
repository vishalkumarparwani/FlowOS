const BASE_URL = "http://127.0.0.1:8000";

export async function getTasks() {
    const response = await fetch(`${BASE_URL}/tasks/`);
    return response.json();
}

export async function createTask(taskData) {
    const response = await fetch(`${BASE_URL}/tasks/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(taskData),
    });
    return response.json();
}


export async function updateTask(task_id, taskData) {
    const response = await fetch(`${BASE_URL}/tasks/${task_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(taskData),
    });

    if(!response.ok) {
        throw new Error(`Failed to update task: ${response.status}`)
    }

    return response.json();
}


export async function deleteTask(task_id) {
    await fetch(`${BASE_URL}/tasks/${task_id}`, { method: "DELETE" });
}