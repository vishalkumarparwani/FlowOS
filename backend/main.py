from fastapi import FastAPI

app = FastAPI(title="FlowOS API")

@app.get("/")
def root():
    return {"message": "FlowOS API is running"}