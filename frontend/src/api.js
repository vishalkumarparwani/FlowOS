const BASE_URL = "http://127.0.0.1:8000";

export async function getBacklog() {
    const response = await fetch(`${BASE_URL}/tasks/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch backlog: ${response.status}`);
    }
    return response.json();
}

export async function createBacklog(item_data) {
    const response = await fetch(`${BASE_URL}/tasks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item_data),
    });
    if (!response.ok) {
        throw new Error(`Failed to create item: ${response.status}`);
    }
    return response.json();
}

export async function updateBacklog(item_id, item_data) {
    const response = await fetch(`${BASE_URL}/tasks/${item_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item_data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update item: ${response.status}`);
    }

    return response.json();
}

export async function deleteBacklog(item_id) {
    const response = await fetch(`${BASE_URL}/tasks/${item_id}`, { 
        method: "DELETE" 
    });
    if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
    }
}