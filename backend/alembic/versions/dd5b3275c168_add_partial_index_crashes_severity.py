"""add partial index on crashes.severity for motorcycle_involved crashes

Revision ID: dd5b3275c168
Revises: 4e646dff9c74
Create Date: 2026-07-25 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'dd5b3275c168'
down_revision: Union[str, Sequence[str], None] = '82a0515566ea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Queries consistently filter crashes by motorcycle_involved = true AND severity,
    # so a partial index scoped to motorcycle crashes serves them directly instead of
    # Postgres bitmap-ANDing the separate motorcycle_involved and severity indexes.
    op.create_index(
        'ix_crashes_severity_partial_motorcycle',
        'crashes',
        ['severity'],
        unique=False,
        postgresql_where=sa.text('motorcycle_involved = true'),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index('ix_crashes_severity_partial_motorcycle', table_name='crashes')
