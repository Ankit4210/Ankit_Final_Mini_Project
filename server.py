import http.server
import socketserver
import os
import sys
import urllib.parse

# Set UTF-8 encoding for standard output if available
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

DEFAULT_PORT = int(os.environ.get("PORT", 3000))
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))

class SmartCityHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def translate_path(self, path):
        parsed = urllib.parse.urlsplit(path)
        clean_path = urllib.parse.unquote(parsed.path)

        # Support Tomcat-style prefix /SmartCity or /SmartCity/
        if clean_path in ('/SmartCity', '/SmartCity/'):
            clean_path = '/index.html'
        elif clean_path.startswith('/SmartCity/'):
            clean_path = clean_path[len('/SmartCity'):]

        if clean_path in ('', '/'):
            clean_path = '/index.html'

        # Resolve safely inside ROOT_DIR
        rel_path = clean_path.lstrip('/')
        full_path = os.path.abspath(os.path.join(ROOT_DIR, rel_path))

        # Check directory traversal
        if not full_path.startswith(ROOT_DIR):
            return ""

        return full_path

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.end_headers()

def start_server(port):
    class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
        daemon_threads = True
        allow_reuse_address = True

    while port < 65535:
        try:
            with ThreadingHTTPServer(("0.0.0.0", port), SmartCityHandler) as httpd:
                print("\n======================================================", flush=True)
                print("[*] Safe & Smart City - Civic Issue Reporting System", flush=True)
                print("======================================================", flush=True)
                print("[+] Server running successfully!", flush=True)
                print(f"--> Local:   http://localhost:{port}/", flush=True)
                print(f"--> Network: http://127.0.0.1:{port}/", flush=True)
                print(f"--> Alias:   http://localhost:{port}/SmartCity/", flush=True)
                print("======================================================\n", flush=True)
                httpd.serve_forever()
                break
        except OSError as e:
            if e.errno == 10048 or "Address already in use" in str(e):
                print(f"[Smart City Server] Port {port} is in use. Retrying on port {port + 1}...")
                port += 1
            else:
                raise

if __name__ == "__main__":
    start_server(DEFAULT_PORT)
