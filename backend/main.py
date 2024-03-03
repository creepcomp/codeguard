import uuid, os, asyncio
from fastapi import FastAPI, UploadFile
from scanner import Snyk, Bandit

app = FastAPI()

@app.post("/api/scan")
async def scan(files: list[UploadFile]):
    session = uuid.uuid4().__str__()
    working_dir = "temp/" + session

    try:
        os.makedirs(working_dir)
        for file in files:
            content = await file.read()
            with open(f"{working_dir}/{file.filename}", 'wb') as f:
                f.write(content)
    except:
        return {"error": "Error in generating session for you. (Contact Admin)"}
    
    try:
        snyk_output, bandit_output = await asyncio.gather(Snyk(working_dir), Bandit(working_dir))
    except:
        return {"error": "Error in scanning your code. (Contact Admin)"}

    result = snyk_output + bandit_output

    # Return the Snyk output
    return {"result": result}
