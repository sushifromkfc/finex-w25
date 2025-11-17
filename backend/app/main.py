from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from app.routers.users_router import router as users_router
from app.routers.transactions_router import router as transactions_router
from app.routers.budgets_router import router as budgets_router
from app.routers.risk_flags_router import router as risk_flags_router
from app.routers.insights_router import router as insights_router
from app.routers.action_plans_router import router as action_plans_router
from app.routers.agent_logs_router import router as agent_logs_router
from app.routers.agent_router import router as agent_router


app = FastAPI(
    title="Finex Backend",
    description="Backend API powering Finex (Fine-Ex), the autonomous financial agent.",
    version="1.0.0",
)

# ----------------------------------------
# CORS (IMPORTANT for connecting your frontend)
# ----------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # <- during hackathon we allow everything
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------
# Health Check
# ----------------------------------------
@app.get("/health")
def health():
    return {"status": "ok", "api": "Finex Backend Running"}


# ----------------------------------------
# Router Registration
# ----------------------------------------
app.include_router(users_router)
app.include_router(transactions_router)
app.include_router(budgets_router)
app.include_router(risk_flags_router)
app.include_router(insights_router)
app.include_router(action_plans_router)
app.include_router(agent_logs_router)
app.include_router(agent_router, prefix="/agent")
app.include_router(agent_router, prefix="/agents")  # plural alias expected by frontend
