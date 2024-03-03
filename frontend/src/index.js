import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container,  Alert, Button, Form, Spinner } from "react-bootstrap";

const App = () => {
    const [files, setFiles] = React.useState([]);
    const [result, setResult] = React.useState();
    const [error, setError] = React.useState();
    
    const scan = () => {
        setResult(true);
        const data = new FormData();
        files.forEach(file => {
            data.append("files", file);
        });
        fetch("/api/scan", {
            method: "POST",
            body: data,
        }).then(async response => {
            const data = await response.json();
            if (response.ok) setResult(data.result);
            else setError(data.error);
        });
    };

    const _export = () => {
        const blob = new Blob([result], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `CodeGuard-${Date.now()}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Container className="my-1">
            <h1 className="text-center">CodeGuard</h1>
            <h4 className="text-center">Source Code Vulnerability Tester</h4>
            <Alert className="my-1 p-2">
                <p><strong>CodeGuard</strong>. Find and automatically fix vulnerabilities in your code, open source dependencies, containers, and infrastructure as code.</p>
                <p><b>Supprted Languages:</b> .NET, C/C++, Dart/Flutter, Elixir, Go, Java and Kotlin, Javascript, PHP, Python, Ruby, Rust, Scala, Swift & Objective-C</p>
            </Alert>
            {error ? (
                <Alert variant="danger" className="my-1 p-2">{error}</Alert>
            ) : null}
            {result ? (
                <Alert variant="success" className="my-1 p-2">
                    {result == true ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <Spinner size="sm" className="me-2" /> Scanning ..
                        </div>
                    ) : (
                        <div>
                            <pre>{result}</pre>
                            <Button className="d-block mx-auto" onClick={_export}>Export</Button>
                        </div>
                    )}
                </Alert>
            ) : null}
            {files.map((file, index) => (
                <div className="bg-light rounded border mb-1 p-1 d-flex justify-content-between align-items-center">
                    <span className="m-2">{file.name}</span>
                    <Button
                        variant="danger"
                        onClick={() => {
                            files.splice(index, 1);
                            setFiles([...files]);
                        }}>
                        X
                    </Button>
                </div>
            ))}
            <Form.Control className="mb-1" type="file" multiple
                onChange={e => {
                    setFiles(files => [...files, ...e.target.files]);
                }}
            />
            <Button className="w-100" onClick={scan}>Scan</Button>
        </Container>
    );
};

const domNode = document.getElementById("app");
const root = createRoot(domNode);
root.render(<App />);
