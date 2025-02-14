from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rdkit import Chem

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ SMILES を受け取って pKa を予測
@app.get("/predict_pka/")
def predict_pka(smiles: str):
    try:
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            return {"error": "Invalid SMILES string"}

        # ここでは仮の pKa 値を返す（本番では予測アルゴリズムを組み込む）
        pka_value = 4.5  

        return {"smiles": smiles, "pKa": pka_value}
    except Exception as e:
        return {"error": str(e)}