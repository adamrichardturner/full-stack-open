```mermaid
    sequenceDiagram
        participant browser
        participant server
        
        browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        activate server
        server-->>browser: JSON Object (payload) sent to POST URL
        deactivate server

        Note right of browser: Payload added to JSON file, which is rendered asynchronously in the browser
```