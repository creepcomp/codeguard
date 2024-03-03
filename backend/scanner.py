import subprocess

async def Snyk(working_dir):
    command = ["/home/codeguard/snyk-linux", "code", "test"]
    process = subprocess.Popen(command, cwd=working_dir, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    # decode and return the output
    return stdout.decode('utf-8')

async def Bandit(working_dir):
    command = ["/home/codeguard/.venv/bin/bandit", "-r", working_dir]
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    # decode and return the output
    return stdout.decode('utf-8')
