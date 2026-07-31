const BASE_URL = "http://127.0.0.1:8000";

export async function getBacklog() {
    const response = await fetch(`${BASE_URL}/tasks/`);
    return response.json();
}

export async function createBacklog(backlog_data) {
    const response = await fetch(`${BASE_URL}/tasks/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(backlog_data),
    });
    return response.json();
}


export async function updateBacklog(backlog_id, backlog_data) {
    const response = await fetch(`${BASE_URL}/tasks/${backlog_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(backlog_data),
    });

    if(!response.ok) {
        throw new Error(`Failed to update task: ${response.status}`)
    }

    return response.json();
}


export async function deleteBacklog(backlog_id) {
    await fetch(`${BASE_URL}/tasks/${backlog_id}`, { method: "DELETE" });
}