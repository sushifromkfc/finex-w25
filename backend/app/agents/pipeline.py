from uuid import UUID
from app.agents.auditor import AuditorAgent
from app.agents.strategist import StrategistAgent


def run_pipeline(user_id: UUID):
    """
    Pipeline:
    1. Auditor → detect risks
    2. Strategist → realtime advice
    """

    audit = AuditorAgent.run(user_id)
    strategy = StrategistAgent.run_realtime(user_id)

    return {
        "auditor": audit,
        "strategist": strategy
    }
