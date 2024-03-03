# CodeGuard - Web-Based Source Code Vulnerability Scanner

CodeGuard is an advanced web platform designed to enhance your code security by leveraging the capabilities of industry-standard tools such as Snyk and Bandit. This platform allows developers and security professionals to perform thorough scans of their source code, identifying vulnerabilities and potential threats. The integration with these tools, coupled with a user-friendly web interface, provides a comprehensive solution for managing and addressing security concerns in your codebase.

## Deployment

### Backend
~~~bash
# Install Python Virtual Environment
sudo apt install python3-venv

# Create A Virtual Environment For Project
python3 -m venv .venv

# Switch to Virtual Environment
source .venv/bin/activate

# Install Requirements Packages
pip3 install -r requirements.txt

# Now you can run backend service.
uvicorn main:app # Uvicorn is not good for production (use Gunicorn instead)
~~~

For production i wrote a systemd service file that you can find in backend directory.

### Frontend
~~~bash
# Install nodejs & npm package manager
sudo apt install nodejs npm

# Install Reuirements Packages
npm install

# Now you can build your project
npm run build # (Your output should be in '/dist')
~~~
