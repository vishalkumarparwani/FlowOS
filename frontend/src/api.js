const BASE_URL = "http://127.0.0.1:8000";

export async function getIssues() {
    const response = await fetch(`${BASE_URL}/issues/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch backlog: ${response.status}`);
    }
    return response.json();
}

export async function createIssue(item_data) {
    const response = await fetch(`${BASE_URL}/issues/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item_data),
    });
    if (!response.ok) {
        throw new Error(`Failed to create item: ${response.status}`);
    }
    return response.json();
}

export async function updateIssue(item_id, item_data) {
    const response = await fetch(`${BASE_URL}/issues/${item_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item_data),
    });

    if (!response.ok) {
        throw new Error(`Failed to update item: ${response.status}`);
    }

    return response.json();
}

export async function deleteIssue(item_id) {
    const response = await fetch(`${BASE_URL}/issues/${item_id}`, { 
        method: "DELETE" 
    });
    if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.status}`);
    }
}

export async function getServices() {
    const response = await fetch(`${BASE_URL}/services/`);
    if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.status}`);
    }
    return response.json();
}

export async function runTriage(rawText) {
    const response = await fetch(`${BASE_URL}/triage/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ raw_text: rawText, }),
    });
    if(!response.ok) {
        throw new Error(`AI triage failed: ${response.status}`);
    }
    return response.json();
}