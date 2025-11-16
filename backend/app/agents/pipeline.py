from uuid import UUID
from app.agents.auditor import AuditorAgent
from app.agents.logger import log_agent_event
from app.agents.strategist import StrategistAgent


def run_pipeline(user_id: UUID):
    """
    Pipeline:
    1. Auditor → detect risks
    2. Strategist → realtime advice
    """

    audit = AuditorAgent.run(user_id)
    log_agent_event(
        user_id,
        "Auditor",
        input_data={"stage": "run_pipeline"},
        output_data=audit,
    )

    strategy = StrategistAgent.run_realtime(user_id)
    log_agent_event(
        user_id,
        "Strategist",
        input_data={"stage": "run_pipeline", "mode": "realtime"},
        output_data=strategy,
    )

    return {
        "auditor": audit,
        "strategist": strategy
    }
