from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.inspection import inspect
import openai

openai.api_key ="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"


DATABASE_URL = "postgresql://postgres:postgres@localhost/gen_ai_test_data"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/schema")
def get_schema():
    inspector = inspect(engine)
    tables = {}

    for table_name in inspector.get_table_names():
        columns = inspector.get_columns(table_name)
        foreign_keys = inspector.get_foreign_keys(table_name)

        # Extract column details
        tables[table_name] = {
            "columns": [
                {
                    "name": col["name"],
                    "type": str(col["type"]),
                    "nullable": col["nullable"],
                    "default": str(col.get("default", None)),
                }
                for col in columns
            ],
            "relationships": [
                {
                    "name": fk["name"],
                    "constrained_columns": fk["constrained_columns"],
                    "referred_table": fk["referred_table"],
                    "referred_columns": fk["referred_columns"],
                }
                for fk in foreign_keys
            ],
        }

    return tables

@app.post("/generate-sql")
def generate_sql():
    query = "List all users in the database"
    print(query)
    prompt = f"Generate a SQL query for this: {query}"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            store=True,
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        return print(response.choices[0].message);
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
def read_root():
    return {"message": "Welcome to Gen AI Test Data Tool"}
