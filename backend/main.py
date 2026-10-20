from fastapi import FastAPI

app = FastAPI(
    title="Istanbul University Alumni Platform API",
    description="Backend API for Alumni Portal with modern endpoints.",
    version="1.0.0"
)

# 1. Ana Karşılama Rotası
@app.get("/")
def read_root():
    return {
        "status": "success",
        "message": "Welcome to Istanbul University Alumni API"
    }

# 2. Temel Hello Rotası
@app.get("/hello")
def get_hello():
    return {"message": "Hello, World!"}

# 3. Dinamik İsim Parametreli Rota (Path Parameter)
@app.get("/hello/{name}")
def get_hello_name(name: str):
    return {"message": f"Hello, {name}!"}

# 4. Matematiksel Toplama Rotası (Tip Dönüşümlü Path Parameter)
@app.get("/sum/{a}/{b}")
def calculate_sum(a: int, b: int):
    return {
        "operation": "addition",
        "a": a,
        "b": b,
        "result": a + b
    }

# 5. Proje ve Geliştirici Bilgisi Rotası
@app.get("/about")
def get_about():
    return {
        "project": "Alumni Platform",
        "institution": "Istanbul University",
        "version": "1.0.0",
        "features": [
            "Scrollytelling Landing Page",
            "Alumni Directory",
            "Job Board"
        ]
    }